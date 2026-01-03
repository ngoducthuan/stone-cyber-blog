import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { Box, Typography } from "@mui/material";
import PropTypes from "prop-types";

import BlogHeading from "layouts/blog/components/blogHeading";
import BlogParagraph from "layouts/blog/components/blogParagraph";
import CodeBlock from "layouts/blog/components/codeBlock";

/**
 * Convert React children tree (string | array | React elements) -> plain text
 * Needed because rehype-highlight turns code into <span>...</span> nodes
 */
const toText = (node) => {
  if (node == null) return "";
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(toText).join("");
  // React element object
  if (typeof node === "object" && node.props) return toText(node.props.children);
  return "";
};

export default function MarkdownRenderer({ content }) {
  return (
    <Box>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        // Chuẩn hoá URL ảnh (fix GitHub Pages + base path)
        urlTransform={(url) => {
          const raw = String(url || "").trim();

          // Giữ nguyên link http / https / data:
          if (/^(https?:)?\/\//i.test(raw) || raw.startsWith("data:")) return raw;

          // Bỏ "public/" nếu lỡ viết
          let cleaned = raw.replace(/^public\//, "");

          // Đảm bảo có dấu /
          if (!cleaned.startsWith("/")) cleaned = `/${cleaned}`;

          const base = (process.env.PUBLIC_URL || "").replace(/\/$/, "");
          return `${base}${cleaned}`;
        }}
        components={{
          /* ===== Headings ===== */
          h1: ({ children }) => <BlogHeading level={1}>{children}</BlogHeading>,
          h2: ({ children }) => <BlogHeading level={2}>{children}</BlogHeading>,
          h3: ({ children }) => <BlogHeading level={3}>{children}</BlogHeading>,
          h4: ({ children }) => <BlogHeading level={4}>{children}</BlogHeading>,

          /* ===== Paragraph ===== */
          p: ({ children }) => <BlogParagraph>{children}</BlogParagraph>,

          /* ===== Lists ===== */
          ul: ({ children }) => (
            <Box component="ul" sx={{ pl: 3, mb: 2 }}>
              {children}
            </Box>
          ),
          ol: ({ children }) => (
            <Box component="ol" sx={{ pl: 3, mb: 2 }}>
              {children}
            </Box>
          ),
          li: ({ children }) => (
            <li>
              <Typography component="span" sx={{ fontSize: 16, lineHeight: 1.85 }}>
                {children}
              </Typography>
            </li>
          ),

          /* ===== Images (caption = alt) ===== */
          img: ({ alt, src, ...props }) => (
            <Box
              sx={{
                my: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box
                component="img"
                src={src}
                alt={alt || ""}
                {...props}
                sx={{
                  width: "100%",
                  maxWidth: 900,
                  height: "auto",
                  borderRadius: 2,
                  display: "block",
                }}
              />
              {alt ? (
                <Typography variant="caption" color="text.secondary" textAlign="center" mt={1}>
                  {alt}
                </Typography>
              ) : null}
            </Box>
          ),

          /* ===== Code ===== */
          code: ({ inline, className, children }) => {
            // Inline code
            if (inline) {
              return (
                <Box
                  component="code"
                  sx={{
                    px: 0.6,
                    py: 0.1,
                    borderRadius: 1,
                    bgcolor: "action.hover",
                    fontFamily: "monospace",
                    fontSize: "0.9em",
                  }}
                >
                  {children}
                </Box>
              );
            }

            // Block code
            const lang =
              (className || "")
                .replace("hljs", "")
                .replace("language-", "")
                .trim() || "bash";

            // IMPORTANT: rehype-highlight turns code into elements => must toText()
            const codeString = toText(children).replace(/\n$/, "");

            return <CodeBlock lang={lang}>{codeString}</CodeBlock>;
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </Box>
  );
}

MarkdownRenderer.propTypes = {
  content: PropTypes.string.isRequired,
};
