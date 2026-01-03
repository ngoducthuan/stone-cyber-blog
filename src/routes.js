// Soft UI Dashboard PRO React layouts
import SignInIllustration from "layouts/authentication/sign-in/illustration";
import SignUpIllustration from "layouts/authentication/sign-up/illustration";
import ResetPasswordIllustration from "layouts/authentication/reset-password/illustration";
import Error404 from "layouts/authentication/error/404";
import Error500 from "layouts/authentication/error/500";
import BlogIndex from "layouts/blog"

import StaticDynamicMalware from "layouts/blog/blogDetails/malware/StaticDynamicMalware";
import GhidraIntroduction   from "layouts/blog/blogDetails/malware/GhidraIntroduction";
import { Assignment1, Assignment2, Assignment3 } from "layouts/blog/blogDetails/assignment";

import { blogMap } from "routes/blogMap";
import { buildSidenavRoutesFromBlogMap } from "routes/blog.builders";

// Soft UI Dashboard PRO React icons
import Document from "examples/Icons/Document";
import Shop from "examples/Icons/Shop";
import Malware from "examples/Icons/Malware";
import System from "examples/Icons/System";
import Network from "examples/Icons/Network";
import SettingsIcon from "examples/Icons/Settings";
import MalwareDev from "examples/Icons/MalwareDev";
import ListTopics from "examples/Icons/List";
import Search from "examples/Icons/Search";
import LogAnalysis from "examples/Icons/LogAnalysis";
import Assignment from "examples/Icons/Assignment";
// Using for Admin Dashboard

import { CategoryDetails, BlogCategories } from "layouts/blogCategory";
import { components } from "react-select";
import { Assessment } from "@mui/icons-material";

//Map content from routes/blogMap.js
const blogRoutes = buildSidenavRoutesFromBlogMap(blogMap);

//Routes
const routes = [
    { type: "title", title: "Tools", key: "title-pages" },
    {
        type: "collapse",
        name: "Search",
        key: "search",
        icon: <Search size="12px"/>,
        noCollapse: true,
    },
    
    { type: "title", title: "Topics", key: "title-pages" },

    {
        type: "collapse",
        name: "All Topics",
        key: "categories",
        icon: <ListTopics size="12px"/>,
        route: "/categories",
        component: <BlogCategories/>,
        noCollapse: true,
    },
    {
        type: "collapse",
        name: "Network",
        key: "network",
        icon: <Network size="12px"/>,
        route: "/category/network",
        component: <CategoryDetails/>,
        noCollapse: true,
    },
    {
        type: "collapse",
        name: "System",
        key: "system",
        icon: <System size="12px"/>,
        route: "/category/system",
        component: <CategoryDetails/>,
        noCollapse: true,
    },
    {
        type: "collapse",
        name: "Malware Analyis",
        key: "malware-analysis",
        icon: <Malware size="12px"/>,
        route: "/category/malware-analysis",
        component: <CategoryDetails/>,
        collapse: [
            {
                name: "Static & Dynamic Malware Analysis",
                key: "1",
                route: "/malware-analysis/1",
                component: <StaticDynamicMalware/>,
            },
            {
                name: "Dynamic malware analysis",
                key: "2",
                route: "/malware-analysis/2",
                component: <StaticDynamicMalware/>,
            },
        ],
        // noCollapse: true,
    },

    {
        type: "collapse",
        name: "Malware Dev",
        key: "malware-development",
        icon: <MalwareDev size="12px"/>,
        route: "/category/malware-development",
        component: <CategoryDetails/>,
        noCollapse: true,
    },
    {
        type: "collapse",
        name: "Assigment",
        key: "assignment",
        icon: <Assignment size="12px"/>,
        route: "/category/assignment",
        component: <CategoryDetails/>,
        collapse: [
            {
                name: "Assignment 1",
                key: "1",
                route: "/assignment/1",
                component: <Assignment1/>,
            },
            {
                name: "Assignment 2",
                key: "2",
                route: "/assignment/2",
                component: <Assignment2/>,
            },
            {
                name: "Assignment 3",
                key: "3",
                route: "/assignment/3",
                component: <Assignment3/>,
            },
        ],
        // noCollapse: true,
    },

    ...blogRoutes,
]

export default routes;