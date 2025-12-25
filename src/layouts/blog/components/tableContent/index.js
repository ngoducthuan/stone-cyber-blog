// layouts/blog/components/tableContent/index.js
import { useEffect, useMemo, useRef, useState } from "react";
import PropTypes from "prop-types";

import Card from "@mui/material/Card";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { alpha } from "@mui/material/styles";

// ====== SAMPLE ITEMS (hiển thị khi chưa có heading thật) ======
const SAMPLE_ITEMS = [
  { id: "intro", text: "Giới thiệu (H2)", level: 2 },
  { id: "static-analysis", text: "Static Analysis (H2)", level: 2 },
  { id: "dynamic-analysis", text: "Dynamic Analysis (H2)", level: 2 },
  { id: "when-to-use", text: "When to Use Which? (H2)", level: 2 },
  { id: "conclusion", text: "Kết luận (H2)", level: 2 },
];

export default function TableOfContents({
  containerSelector = "#blog-content",
  maxLevel = 3,
  headerOffset = 80,
  useSample = true,
  excludeSelectors = ["header", "#page-hero", "#newest-blogs", "[data-toc='exclude']", ".toc-exclude"],
}) {
  const [items, setItems] = useState([]);
  const [activeId, setActiveId] = useState("");

  const ioRef = useRef(null);
  const reconnectTimerRef = useRef(null);

  const selector = useMemo(
    () => Array.from({ length: maxLevel }, (_, i) => `h${i + 2}`).join(","),
    [maxLevel]
  );

  const isExcluded = (node) => excludeSelectors.some((sel) => node.closest(sel));

  const attachObserver = (nodes) => {
    if (ioRef.current) ioRef.current.disconnect();

    ioRef.current = new IntersectionObserver(
      (entries) => {
        if (reconnectTimerRef.current) return;

        const first = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) =>
              a.target.getBoundingClientRect().top - b.target.getBoundingClientRect().top
          )[0];
        if (first) setActiveId(first.target.id);
      },
      {
        root: null,
        rootMargin: `${-(Math.max(0, headerOffset + 8))}px 0px -50% 0px`,
        threshold: [0, 1],
      }
    );

    nodes.forEach((n) => ioRef.current.observe(n));
  };

  const pauseObserver = (ms = 900) => {
    if (ioRef.current) ioRef.current.disconnect();
    if (reconnectTimerRef.current) clearTimeout(reconnectTimerRef.current);

    reconnectTimerRef.current = setTimeout(() => {
      reconnectTimerRef.current = null;
      const container = document.querySelector(containerSelector) || document;
      const nodes = Array.from(container.querySelectorAll(selector)).filter((n) => !isExcluded(n));
      attachObserver(nodes);
    }, ms);
  };

  useEffect(() => {
    const container = document.querySelector(containerSelector) || document;
    const allNodes = Array.from(container.querySelectorAll(selector));
    const nodes = allNodes.filter((n) => !isExcluded(n));

    if (nodes.length === 0 && useSample) {
      setItems(SAMPLE_ITEMS);
      setActiveId(SAMPLE_ITEMS[0]?.id || "");
      return;
    }

    const mapped = nodes.map((n) => {
      const id = n.id || n.textContent.trim().toLowerCase().replace(/\s+/g, "-");
      if (!n.id) n.id = id;
      return { id, text: n.textContent, level: Number(n.tagName.slice(1)), el: n };
    });

    setItems(mapped);
    attachObserver(nodes);

    return () => {
      if (ioRef.current) ioRef.current.disconnect();
      if (reconnectTimerRef.current) clearTimeout(reconnectTimerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerSelector, selector, headerOffset, useSample, excludeSelectors]);

  const handleClick = (id) => {
    setActiveId(id);
    pauseObserver(900);

    const el = document.getElementById(id);
    if (!el) return;

    const target = el.getBoundingClientRect().top + window.scrollY - headerOffset;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const safeTop = Math.max(0, Math.min(target, maxScroll));

    window.scrollTo({ top: safeTop, behavior: "smooth" });
  };

  return (
    <Card
      elevation={0}
      sx={(theme) => {
        const isDark = theme.palette.mode === "dark";
        return {
          position: { md: "sticky" },
          top: { md: theme.spacing(10) },
          bgcolor: isDark ? "transparent.main" : alpha(theme.palette.common.black, 0.02),
          boxShadow: "none",
          borderRadius: 2,
          border: `1px solid ${theme.vars?.palette?.divider || (isDark
            ? alpha(theme.palette.common.white, 0.08)
            : alpha(theme.palette.common.black, 0.12))}`,
          overflow: "hidden",
        };
      }}
    >
      <Typography
        variant="overline"
        sx={(theme) => ({
          px: 2,
          py: 1.25,
          letterSpacing: 0.6,
          opacity: 0.9,
          color: theme.palette.text.secondary, // tự đổi theo mode
          // color: isDark ? "#cac6c6" : "#273239",
          fontSize: "0.9rem",
          textTransform: "none",
          fontWeight: 700,
        })}
      >
        Table of Contents
      </Typography>

      <List dense disablePadding sx={{ py: 0.25 }}>
        {items.map((it) => {
          const indent = Math.max(0, (it.level - 2) * 2); // h2=0, h3=2, h4=4
          return (
            <ListItemButton
              key={it.id}
              onClick={() => handleClick(it.id)}
              selected={it.id === activeId}
              aria-current={it.id === activeId ? "true" : undefined}
              sx={(theme) => {
                const isDark = theme.palette.mode === "dark";
                const base = isDark ? theme.palette.common.white : theme.palette.common.black;
                // const base = isDark ? "#cac6c6" : "#273239";

                return {
                  pl: 2 + indent,
                  my: "0.15rem",
                  pr: 1.75,
                  py: 0.65,
                  color: theme.palette.text.primary,
                  borderLeft: `3px solid ${
                    it.id === activeId ? theme.palette.info.main : "transparent"
                  }`,
                  backgroundColor:
                    it.id === activeId
                      ? alpha(theme.palette.info.main, isDark ? 0.12 : 0.10)
                      : "transparent",
                  "&.Mui-selected": {
                    backgroundColor: alpha(theme.palette.info.main, isDark ? 0.14 : 0.12),
                  },
                  "&.Mui-selected:hover": {
                    backgroundColor: alpha(theme.palette.info.main, isDark ? 0.18 : 0.16),
                  },
                  "&:hover": { backgroundColor: alpha(base, isDark ? 0.06 : 0.04) },
                  transition: "background-color 160ms ease, border-color 160ms ease",
                  borderRadius: 0,
                };
              }}
            >
              <ListItemText
                primary={it.text}
                primaryTypographyProps={{
                  sx: (theme) => ({
                    fontSize: "0.9rem",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    color: theme.palette.mode === "dark" ? "#cac6c6" : "#273239", // ✅ OK
                    fontWeight: it.id === activeId ? 600 : 400,
                    opacity: 0.92,
                  }),
                }}
              />
            </ListItemButton>
          );
        })}
      </List>
    </Card>
  );
}

TableOfContents.propTypes = {
  containerSelector: PropTypes.string,
  maxLevel: PropTypes.number,
  headerOffset: PropTypes.number,
  useSample: PropTypes.bool,
  excludeSelectors: PropTypes.arrayOf(PropTypes.string),
};

TableOfContents.defaultProps = {
  containerSelector: "#blog-content",
  maxLevel: 3,
  headerOffset: 80,
  useSample: true,
  excludeSelectors: ["header", "#page-hero", "#newest-blogs", "[data-toc='exclude']", ".toc-exclude"],
};
