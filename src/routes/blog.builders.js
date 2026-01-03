// src/routes/blog.builders.js
import React from "react";
import BlogIndex from "layouts/blog";
import { CategoryDetails } from "layouts/blogCategory";

/** chuẩn hoá URL ảnh cho GitHub Pages + public path */
function resolvePublicPath(path) {
  if (!path) return "";
  if (typeof path !== "string") return path; // asset import / module
  const base = (process.env.PUBLIC_URL || "").replace(/\/$/, "");
  return path.startsWith("/") ? base + path : path;
}

/** A) Sidebar + Router (format theo routes.js của Creative Tim) */
export function buildSidenavRoutesFromBlogMap(map) {
  return Object.entries(map).map(([category, cfg]) => ({
    type: "collapse",
    name: cfg.title,
    key: `cat-${category}`,
    icon: cfg.icon,
    route: `/category/${category}`,
    component: <CategoryDetails />,
    collapse: (cfg.posts || []).map((p) => {
      const slug = typeof p === "string" ? p : p.slug;
      const title =
        typeof p === "string" ? p.replace(/-/g, " ") : (p.title || p.slug);

      return {
        type: "collapse",
        name: title,
        key: `post-${category}-${slug}`,
        route: `/blog/${category}/${slug}`,
        component: <BlogIndex />,
        noCollapse: true,
      };
    }),
  }));
}

/** B) All Topics page: card category */
export function buildCategoryCardsFromBlogMap(map) {
  return Object.entries(map).map(([key, cfg]) => ({
    id: key,
    title: cfg.title,
    description: cfg.description || "",
    image: resolvePublicPath(cfg.image || ""),
    link: `/category/${key}`,
  }));
}

/** C) Blog list data: Newest / Related / CategoryDetails list */
export function buildPostsFromBlogMap(map) {
  const out = [];
  let id = 1;

  Object.entries(map).forEach(([category, cfg]) => {
    (cfg.posts || []).forEach((p) => {
      const slug = typeof p === "string" ? p : p.slug;
      const title =
        typeof p === "string" ? p.replace(/-/g, " ") : (p.title || p.slug);

      out.push({
        id: `${category}-${id++}`,     
        category,
        slug,
        title,
        description: (typeof p === "object" && p.description) ? p.description : "",
        image: resolvePublicPath(cfg.image || ""),
        date: (typeof p === "object" && p.date) ? p.date : "",
        author: (typeof p === "object" && p.author) ? p.author : "",
        link: `/blog/${category}/${slug}`,
      });
    });
  });

  return out;
}
