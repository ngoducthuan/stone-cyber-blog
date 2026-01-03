// hidden.routes.js
// Các route KHÔNG HIỂN THỊ SIDE BAR MENU – chỉ để router match URL

import {
    BlogCategories,
    CategoryDetails,
} from "layouts/blogCategory";

import BlogIndex from "layouts/blog"

const hiddenRoutes = [
  // { key: "cats", route: "/category", component: <BlogCategories /> },

  {
    type: "collapse",
    key: "category-dynamic",
    route: "/category/:categoryType",
    component: <CategoryDetails />,
    noCollapse: true,
  },

  {
    type: "collapse",
    key: "blog-detail",
    route: "/blog/:category/:slug",
    component: <BlogIndex />,
    noCollapse: true,
  }

  // {
  //   key: "assignment-detail",
  //   route: "/assignment/:slug",
  //   component: <AssignmentDetail />,
  // },

  // {
  //   key: "blog-detail",
  //   route: "/blog/:category/:slug",
  //   component: <BlogDetail />,
  // },
];

export default hiddenRoutes;
