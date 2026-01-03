
///Bo khong dung nua

import NetworkDDos         from "layouts/blog/blogDetails/network/DDoS";
import OSconfig            from "layouts/blog/blogDetails/system/OSConfig";

// import StaticDynamicMalware from "layouts/blog/blogDetails/malware/StaticDynamicMalware";

import {
    BlogCategories,
    CategoryDetails,
} from "layouts/blogCategory";

import { components } from "react-select";
import SignInIllustration from "layouts/authentication/sign-in/illustration";
import SignUpIllustration from "layouts/authentication/sign-up/illustration";
import ResetPasswordIllustration from "layouts/authentication/reset-password/illustration";
import Error404 from "layouts/authentication/error/404";
import Error500 from "layouts/authentication/error/500";

const blogRoutes = [
    // Category
    // { key: "cats", route: "/category", component: <BlogCategories /> },

    // { key: "cat-type", route: "/category/:categoryType", component: <CategoryDetails /> },
];


export default blogRoutes;
