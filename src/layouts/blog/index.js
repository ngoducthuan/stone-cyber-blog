import { useEffect, useState } from "react";
import { useParams, Link as RouterLink, useLocation } from "react-router-dom";
import yaml from "js-yaml";

import BlogDetailLayout from "layouts/blog/components/blogDetailLayout/BlogDetailLayout";
import MarkdownRenderer from "layouts/blog/components/markdownRenderer";

import { Box, Card, Typography, Button } from "@mui/material";

function parseFrontMatter(raw) {
  const fm = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/);

  if (!fm) return { data: {}, content: raw };

  const [, yamlText, content] = fm;
  let data = {};
  try {
    data = yaml.load(yamlText) || {};
  } catch {
    data = {};
  }
  return { data, content };
}

export default function BlogIndex() {
  const params = useParams();
  const location = useLocation();

  // Priorities params ( when route is /blog/:category/:slug)
  let category = params.category;
  let slug = params.slug;

  // Fallback (when route is literal /blog/test/hello in routes.js)
  if (!category || !slug) {
    const parts = location.pathname.split("/").filter(Boolean);
    // parts = ["blog","test","hello"]
    if (parts[0] === "blog") {
      category = category || parts[1];
      slug = slug || parts[2];
    }
  }
  
  const [meta, setMeta] = useState({});
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let alive = true;

    async function loadMarkdown() {
      try {
        setLoading(true);
        setError(null);

        // Prefix with PUBLIC_URL (GitHub Pages base path safe)
        const base = (process.env.PUBLIC_URL || "").replace(/\/$/, "");
        const mdPath = (`${base}/content/${category}/${slug}.md`);

        const res = await fetch(mdPath);
        if (!res.ok) {
          throw new Error(`Cannot load markdown: ${mdPath} (HTTP ${res.status})`);
        }

        // Detect HTML fallback (index.html instead of markdown)
        const ct = res.headers.get("content-type") || "";
        const raw = await res.text();

        if (
          ct.includes("text/html") ||
          raw.trim().startsWith("<!DOCTYPE html") ||
          raw.includes('<div id="root">')
        ) {
          throw new Error(
            `Markdown file not found (server returned HTML). Check file path: ${mdPath}`
          );
        }

        const parsed = parseFrontMatter(raw);
        if (!alive) return;

        setMeta(parsed.data || {});
        setContent(parsed.content || "");
      } catch (err) {
        if (!alive) return;
        setError(err?.message || String(err));
      } finally {
        if (!alive) return;
        setLoading(false);
      }
    }

    loadMarkdown();
    return () => {
      alive = false;
    };
  }, [category, slug]);

  /* ================= Loading ================= */
  if (loading) {
    return (
      <Box sx={{ p: 3 }}>
        <Card sx={{ p: 3, borderRadius: 3 }}>
          <Typography variant="h6">Loading markdown…</Typography>
          <Typography variant="body2" color="text.secondary">
            /content/{category}/{slug}.md
          </Typography>
        </Card>
      </Box>
    );
  }

  /* ================= Error / Not Found ================= */
  if (error) {
    const expected = `/public/content/${category}/${slug}.md`;

    return (
      <BlogDetailLayout
        title="404 — Article Not Found"
        description="The requested markdown file does not exist."
        author=""
        date=""
        image=""
      >
        <Box sx={{ mt: 2 }}>
          <Card
            sx={{
              p: 3,
              borderRadius: 3,
              bgcolor: "background.paper",
              border: "1px solid",
              borderColor: "rgba(255,255,255,.08)",
            }}
          >
            <Typography variant="h4" sx={{ mb: 1.2 }}>
              Article not found
            </Typography>

            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              The URL you opened does not have a corresponding <b>.md</b> file,
              so the server returned an HTML page instead.
            </Typography>

            <Box
              sx={{
                mb: 2,
                p: 2,
                borderRadius: 2,
                bgcolor: "action.hover",
                border: "1px solid",
                borderColor: "rgba(255,255,255,.08)",
                fontFamily: "monospace",
                fontSize: 13,
                overflowX: "auto",
              }}
            >
              <div>
                <b>Fetched path:</b> /content/{category}/{slug}.md
              </div>
              <div>
                <b>Expected file:</b> {expected}
              </div>
            </Box>

            <Box sx={{ display: "flex", gap: 1.2, flexWrap: "wrap" }}>
              <Button
                variant="contained"
                component={RouterLink}
                to="/categories"
                sx={{
                  color: "#081B22",
                  fontWeight: 700,
                  textTransform: "none",
                }}
              >
                BACK TO ALL TOPICS
              </Button>

              <Button variant="outlined" onClick={() => window.location.reload()}>
                RELOAD PAGE
              </Button>
            </Box>

            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ display: "block", mt: 2 }}
            >
              Debug: {String(error)}
            </Typography>
          </Card>
        </Box>
      </BlogDetailLayout>
    );
  }

  /* ================= Success ================= */
  const title = meta.title || slug;
  const description = meta.description || "";
  const author = meta.author || "Unknown";
  const date = meta.date || "";
  const image = meta.image || "";

  return (
    <BlogDetailLayout
      title={title}
      description={description}
      author={author}
      date={date}
      image={image}
    >
      <MarkdownRenderer content={content} />
    </BlogDetailLayout>
  );
}
