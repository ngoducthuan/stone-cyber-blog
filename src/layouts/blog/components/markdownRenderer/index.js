import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { Box, Typography } from "@mui/material";
import PropTypes from "prop-types";
import BlogHeading from "layouts/blog/components/blogHeading";
import BlogParagraph from "layouts/blog/components/blogParagraph";

// Nếu bạn muốn dùng CodeBlock component sẵn có của bạn:
import CodeBlock from "layouts/blog/components/codeBlock"; // chỉnh path nếu khác

export default function MarkdownRenderer({ content }) {
  return (
    <Box>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          h1: ({ children }) => <BlogHeading level={1}>{children}</BlogHeading>,
          h2: ({ children }) => <BlogHeading level={2}>{children}</BlogHeading>,
          h3: ({ children }) => <BlogHeading level={3}>{children}</BlogHeading>,
          h4: ({ children }) => <BlogHeading level={4}>{children}</BlogHeading>,
          p: ({ children }) => <BlogParagraph>{children}</BlogParagraph>,

          // List
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

          // Ảnh
          img: ({ alt, ...props }) => (
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
                {...props}
                alt={alt || ""}
                sx={{
                  width: "100%",
                  maxWidth: 900,   // chỉnh tùy ý
                  height: "auto",
                  borderRadius: 2,
                  display: "block",
                }}
              />

              {alt ? (
                <Typography
                  variant="caption"
                  color="text.secondary"
                  textAlign="center"   // 👈 caption căn giữa
                  mt={1}
                >
                  {alt}
                </Typography>
              ) : null}
            </Box>
          ),

          // Code inline + code block
          code: ({ inline, className, children }) => {
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

          const lang = (className || "").replace("hljs language-", "") || "bash";
          const codeString = String(children ?? "").replace(/\n$/, "");

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