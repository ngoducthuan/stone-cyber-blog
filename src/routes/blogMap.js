// // src/routes/blogMap.js
// import Document from "examples/Icons/Document";
// import Network from "examples/Icons/Network";
// import Assignment from "examples/Icons/Assignment";

// export const blogMap = {
//   test: {
//     title: "Test",
//     icon: <Document size="12px" />,
//     posts: [
//       { slug: "hello", title: "Hello" },
//       { slug: "test1", title: "Test 1" },
//     ],
//   },
// };

import Document from "examples/Icons/Document";
import imageIRAssigmnet from "assets/images/blog/category/ir-assignment-category.png";
const base = (process.env.PUBLIC_URL || "").replace(/\/$/, "");

export const blogMap = {
  test: {
    title: "Test",
    description: "Test playground posts",
    image: "/images/re-assignment.png",          // Image card category
    icon: <Document size="12px" />,
    posts: [
      {
        slug: "hello",
        title: "Hello",
        description: "Demo post",
        image: "/images/re-assignment.png", // Blog image (public)
        date: "2026-01-01",
        author: "Stone",
      },
      {
        slug: "test1",
        title: "Test 1",
        description: "Demo post 2",
        image: "/images/re-assignment.png",
        date: "2026-01-01",
        author: "Stone",
      },
      {
        slug: "test2",
        title: "Test 2",
        description: "Demo post 2",
        image: "/images/re-assignment.png",
        date: "2026-01-01",
        author: "Stone",
      },
    ],
  },
};
