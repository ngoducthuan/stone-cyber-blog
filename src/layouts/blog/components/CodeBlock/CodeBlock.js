// src/examples/CodeBlock/index.js
import React from "react";
import PropTypes from "prop-types";
import { Box, Stack, Chip, IconButton, Tooltip, Paper } from "@mui/material";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import { useTheme, alpha } from "@mui/material/styles";

/* ---------- dedent ---------- */
function dedent(str = "") {
  let s = String(str).replace(/^\n/, "").replace(/\s+$/, "");
  const lines = s.split("\n");
  let min = null;
  for (const l of lines) {
    if (!l.trim()) continue;
    const indent = (l.match(/^[ \t]*/)?.[0].length) || 0;
    min = min === null ? indent : Math.min(min, indent);
  }
  if (!min) return s;
  return lines.map((l) => l.slice(min)).join("\n");
}

/* ---------- token colors theo mode ---------- */
function useCodeColors() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const base = isDark ? theme.palette.common.white : theme.palette.common.black;

  return {
    // text tổng thể
    text: isDark ? alpha(base, 0.90) : alpha(base, 0.85),
    prompt: isDark ? alpha(base, 0.60) : alpha(base, 0.55),

    // bash
    wrapper: isDark ? "#FDE047" : "#B45309", // sudo/doas
    cmd: isDark ? "#7DD3FC" : "#0369A1",
    flag: isDark ? "#60A5FA" : "#1D4ED8",
    str: isDark ? "#A7F3D0" : "#047857",
    path: isDark ? "#F59E0B" : "#B45309",
    num: isDark ? "#C4B5FD" : "#6D28D9",
    var: isDark ? "#F472B6" : "#9D174D",
    op: isDark ? alpha(base, 0.75) : alpha(base, 0.75),
    comment: isDark ? alpha(base, 0.60) : alpha(base, 0.55),

    // generic code
    kw: isDark ? "#93C5FD" : "#1D4ED8",
    prop: isDark ? "#FCA5A5" : "#B91C1C",

    // surfaces
    surface: isDark ? alpha(theme.palette.common.white, 0.04) : alpha(theme.palette.common.black, 0.03),
    border: isDark ? alpha(theme.palette.common.white, 0.12) : alpha(theme.palette.common.black, 0.12),
    borderSoft: isDark ? alpha(theme.palette.common.white, 0.10) : alpha(theme.palette.common.black, 0.10),
    chipBg: isDark ? alpha(theme.palette.common.white, 0.06) : alpha(theme.palette.common.black, 0.05),
    chipBorder: isDark ? alpha(theme.palette.common.white, 0.18) : alpha(theme.palette.common.black, 0.18),
    headerShadow: isDark ? alpha(theme.palette.common.black, 0.25) : alpha(theme.palette.common.black, 0.06),
  };
}

/* ---------- splitKeep, sets, renderers giữ nguyên logic ---------- */
const splitKeep = (line) =>
  line.match(/"[^"]*"|'[^']*'|`[^`]*`|\/\/.*|#[^'"]*|\s+|[^\s]+/g) || [line];

const WRAPPERS = new Set(["sudo", "doas", "env", "time", "nohup"]);

const KW_SET = new Set([
  "public","private","protected","static","final","abstract","sealed",
  "void","int","long","short","char","byte","float","double","boolean","string","var",
  "class","interface","enum","extends","implements","package","namespace","module","import","from","export","using",
  "if","else","switch","case","default","break","continue","for","while","do","return","yield",
  "try","catch","finally","throw","throws",
  "new","this","super","true","false","null","undefined",
  "async","await","typeof","instanceof",
  "const","let","function",
]);

function renderBashLine(line, key, C) {
  let rest = line;
  const out = [];

  if (/^\s*\$ /.test(rest)) {
    out.push(<span key={`p-${key}`} style={{ color: C.prompt }}>$ </span>);
    rest = rest.replace(/^\s*\$ /, "");
  }

  const tokens = splitKeep(rest);
  const firstNonSpace = tokens.findIndex((t) => t.trim().length);
  const firstPlain =
    firstNonSpace !== -1 ? tokens[firstNonSpace].replace(/^['"]|['"]$/g, "") : "";
  const isWrapper = WRAPPERS.has(firstPlain);

  let cmdIdx = -1;
  if (firstNonSpace !== -1) {
    if (isWrapper) {
      for (let i = firstNonSpace + 1; i < tokens.length; i++) {
        const t = tokens[i];
        if (!t.trim()) continue;
        if (/^#/.test(t)) break;
        if (/^--?/.test(t)) continue;
        cmdIdx = i;
        break;
      }
    } else {
      cmdIdx = firstNonSpace;
    }
  }

  let sawComment = false;
  tokens.forEach((tok, i) => {
    if (sawComment) {
      out.push(<span key={`c-${key}-${i}`} style={{ color: C.comment, fontStyle: "italic" }}>{tok}</span>);
      return;
    }
    if (/^\s+$/.test(tok)) { out.push(tok); return; }
    if (/^#/.test(tok)) { sawComment = true; out.push(<span key={`c-${key}-${i}`} style={{ color: C.comment, fontStyle: "italic" }}>{tok}</span>); return; }

    let style = { color: C.text };
    if (/^".*"$|^'.*'$|^`.*`$/.test(tok)) style = { color: C.str };
    else if (/^https?:\/\//.test(tok)) style = { color: C.path, textDecoration: "none" };
    else if (/^(\/|\.\/).+|.+\/.+/.test(tok)) style = { color: C.path };
    else if (/^\$[A-Za-z_]\w*$/.test(tok)) style = { color: C.var };
    else if (/^--?[\w-]+$/.test(tok)) style = { color: C.flag };
    else if (/^\d+$/.test(tok)) style = { color: C.num };
    else if (/^\|{1,2}$|^&&$|^[><]{1,2}$/.test(tok)) style = { color: C.op };
    else if (isWrapper && i === firstNonSpace) style = { color: C.wrapper };
    else if (i === cmdIdx) style = { color: C.cmd };

    out.push(<span key={`t-${key}-${i}`} style={style}>{tok}</span>);
  });

  return out;
}

function renderCodeLine(line, key, C) {
  const toks = splitKeep(line);
  const out = [];
  let sawLineComment = false;

  toks.forEach((t, i) => {
    if (sawLineComment) {
      out.push(<span key={`gc-c-${key}-${i}`} style={{ color: C.comment, fontStyle: "italic" }}>{t}</span>);
      return;
    }
    if (/^\s+$/.test(t)) { out.push(t); return; }

    if (/^\/\/.*/.test(t) || (/^#/.test(t) && i === 0)) {
      sawLineComment = true;
      out.push(<span key={`gc-c-${key}-${i}`} style={{ color: C.comment, fontStyle: "italic" }}>{t}</span>);
      return;
    }

    let style = { color: C.text };
    if (/^".*"$|^'.*'$|^`.*`$/.test(t)) style = { color: C.str };
    else if (/^\d+(\.\d+)?$/.test(t)) style = { color: C.num };
    else if (KW_SET.has(t)) style = { color: C.kw };
    else if (/^[A-Za-z_$]\w*(?=\s*:)/.test(t)) style = { color: C.prop };

    out.push(<span key={`gc-t-${key}-${i}`} style={style}>{t}</span>);
  });

  return out;
}

/* ---------- Component ---------- */
function CodeBlock({ children, lang = "bash", command = false, wrap = true, sx = {} }) {
  const theme = useTheme();
  const C = useCodeColors();

  const raw = typeof children === "string" ? children : String(children ?? "");
  const text = dedent(raw);

  const isBashLike = command || /^(ba?sh|sh|zsh)$/i.test(lang);

  const toCopy = isBashLike ? text.replace(/^\s*\$\s?/gm, "") : text;

  const [copied, setCopied] = React.useState(false);
  React.useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 1200);
    return () => clearTimeout(t);
  }, [copied]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(toCopy);
      setCopied(true);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = toCopy;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
    }
  };

  const lines = text.split("\n");

  return (
    <Paper
      elevation={0}
      sx={{
        my: 2,
        borderRadius: 2,
        border: `1px solid ${C.border}`,
        bgcolor: C.surface,
        overflow: "hidden",
        ...sx,
      }}
    >
      {/* header */}
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          px: 1.25,
          py: 0.75,
          borderBottom: `1px solid ${C.borderSoft}`,
          backdropFilter: "blur(2px)",
          boxShadow: `inset 0 0 0 1px ${alpha(C.surface, 0)}, 0 4px 12px ${C.headerShadow}`,
        }}
      >
        <Chip
          size="small"
          label={lang}
          sx={{
            color: C.text,
            textTransform: "lowercase",
            bgcolor: C.chipBg,
            border: `1px solid ${C.chipBorder}`,
          }}
        />
        <Tooltip title={copied ? "Copied!" : "Copy"}>
          <IconButton size="small" onClick={handleCopy} sx={{ color: C.text }}>
            {copied ? <CheckRoundedIcon fontSize="small" /> : <ContentCopyRoundedIcon fontSize="small" />}
          </IconButton>
        </Tooltip>
      </Stack>

      {/* body */}
      <Box
        component="pre"
        sx={{
          m: 0,
          p: 1.5,
          fontSize: 14,
          lineHeight: 1.55,
          whiteSpace: wrap ? "pre-wrap" : "pre",
          overflowX: wrap ? "hidden" : "auto",
          color: C.text,
          fontFamily:
            'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace',
        }}
      >
        <code>
          {lines.map((ln, i) => (
            <React.Fragment key={i}>
              {isBashLike ? renderBashLine(ln, i, C) : renderCodeLine(ln, i, C)}
              {i < lines.length - 1 ? "\n" : null}
            </React.Fragment>
          ))}
        </code>
      </Box>
    </Paper>
  );
}

CodeBlock.propTypes = {
  children: PropTypes.string.isRequired,
  lang: PropTypes.string,
  command: PropTypes.bool,
  wrap: PropTypes.bool,
  sx: PropTypes.object,
};

export default CodeBlock;
