
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
    // { key: "mal-1", route: "/malware-analysis/1", component: <StaticDynamicMalware /> },
    // { key: "mal-2", route: "/malware-analysis/2", component: <GhidraIntroduction /> },

    // System
    { key: "sys-100", route: "/system/100", component: <OSconfig /> },

    // Network
    { key: "net-200", route: "/network/200", component: <NetworkDDos /> },

    // Category
    { key: "cats", route: "/category", component: <BlogCategories /> },
    { key: "cat-type", route: "/category/:categoryType", component: <CategoryDetails /> },
    
    {
        type: "collapse",
        name: "Authentication",
        key: "authentication",
        // icon: <Document size="12px" />,
        collapse: [
            {
                name: "Sign In",
                key: "sign-in",
                collapse: [
                    {
                        name: "Illustration",
                        key: "illustration",
                        route: "/authentication/sign-in/illustration",
                        component: <SignInIllustration />,
                    },
                ],
            },
            {
                name: "Sign Up",
                key: "sign-up",
                collapse: [
                    {
                        name: "Illustration",
                        key: "illustration",
                        route: "/authentication/sign-up/illustration",
                        component: <SignUpIllustration />,
                    }
                ]
            },
            {
                name: "Reset Password",
                key: "reset-password",
                collapse: [
                    {
                        name: "Illustration",
                        key: "illustration",
                        route: "/authentication/reset-password/illustration",
                        component: <ResetPasswordIllustration />,
                    }
                ]
            },
            {
                name: "Error",
                key: "error",
                collapse: [
                    {
                        name: "Error 404",
                        key: "error-404",
                        route: "/authentication/error/404",
                        component: <Error404 />,
                    },
                    {
                        name: "Error 500",
                        key: "error-500",
                        route: "/authentication/error/500",
                        component: <Error500 />,
                    },
                ],
            },
        ],
    },
];


export default blogRoutes;
