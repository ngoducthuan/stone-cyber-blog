/**
=========================================================
* Soft UI Dashboard PRO React - v4.0.3
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-pro-react
* Copyright 2024 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState, useEffect, useMemo } from "react";

// react-router components
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard PRO React components
import useMediaQuery from "@mui/material/useMediaQuery";
import SoftBox from "components/SoftBox";
import ThemeModeSwitcher from "components/ThemeModeSwitcher";

// Soft UI Dashboard PRO React example components
import Sidenav from "examples/Sidenav";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";

import Configurator from "examples/Configurator";

// Soft UI Dashboard PRO React themes
// import theme from "assets/theme";
import { buildTheme } from "assets/theme";

import themeRTL from "assets/theme/theme-rtl";

// RTL plugins
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

// Soft UI Dashboard PRO React routes
import routes from "routes";
import hiddenRoutes from "hidden.routes";

import pageRoutes from "page.routes";

// Soft UI Dashboard PRO React contexts
import { useSoftUIController, setMiniSidenav, setOpenConfigurator } from "context";

// Images
// import brand from "assets/images/logo-ct.png";
import brand from "assets/images/logo-ct.png";
import brandDark from "assets/images/logo-dark.png";
import brandLight from "assets/images/logo-light.png";

import BlogFooter from "examples/BlogFooter";

//Front
import "@fontsource/heebo/400.css";
import "@fontsource/heebo/500.css";
import "@fontsource/heebo/700.css";

import "@fontsource/signika/400.css"; // Regular
import "@fontsource/signika/600.css"; // Semi-bold
import "@fontsource/signika/700.css"; // Bold

//Routing
import NotFoundRedirect from "components/Routing";

export default function App() {
    const [controller, dispatch] = useSoftUIController();
    const { miniSidenav, direction, layout, openConfigurator, sidenavColor } = controller;
    const [onMouseEnter, setOnMouseEnter] = useState(false);
    const [rtlCache, setRtlCache] = useState(null);
    const { pathname } = useLocation();

    //Set Dak-Light Mode
    const prefersDark = useMediaQuery("(prefers-color-scheme: dark)");
    const [mode, setMode] = useState(localStorage.getItem("mode") || "system");
    const effectiveMode = mode === "system" ? (prefersDark ? "dark" : "light") : mode;
    // Chọn logo theo mode
    const brandSrc = effectiveMode === "dark" ? brandDark : brandLight;
    useEffect(() => {
        localStorage.setItem("mode", mode);
    }, [mode]);
    const theme = useMemo(() => buildTheme(effectiveMode), [effectiveMode]);
    
    // Cache for the rtl
    useMemo(() => {
        const cacheRtl = createCache({
        key: "rtl",
        stylisPlugins: [rtlPlugin],
        });

        setRtlCache(cacheRtl);
    }, []);

    // Open sidenav when mouse enter on mini sidenav
    const handleOnMouseEnter = () => {
        if (miniSidenav && !onMouseEnter) {
            setMiniSidenav(dispatch, false);
            setOnMouseEnter(true);
        }
    };

    // Close sidenav when mouse leave mini sidenav
    const handleOnMouseLeave = () => {
        if (onMouseEnter) {
            setMiniSidenav(dispatch, true);
            setOnMouseEnter(false);
        }
    };

    // Change the openConfigurator state
    const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);

    // Setting the dir attribute for the body element
    useEffect(() => {
        document.body.setAttribute("dir", direction);
    }, [direction]);

    // Setting page scroll to 0 when changing the 
    useEffect(() => {
        document.documentElement.scrollTop = 0;
        document.scrollingElement.scrollTop = 0;
    }, [pathname]);
    //Set Mini Side Nav Default
    // useEffect(() => {
    //   setMiniSidenav(dispatch, true); // Đảm bảo thu gọn lúc load
    // }, []);

    const getRoutes = (allRoutes) =>
    allRoutes.flatMap((route) => {
        if (route.collapse) {
            return getRoutes(route.collapse);
        }

        if (route.route) {
        return [
            <Route
            path={route.route}
            element={route.component}
            key={route.key}
            />,
        ];
        }

        return [];
    });


    const configsButton = (
        <SoftBox
            display="flex"
            justifyContent="center"
            alignItems="center"
            width="3.5rem"
            height="3.5rem"
            bgColor="white"
            shadow="sm"
            borderRadius="50%"
            position="fixed"
            right="2rem"
            bottom="2rem"
            zIndex={99}
            color="dark"
            sx={{
            cursor: "pointer",
            color: "white",
            border: "1.5px solid #00eaff",          // viền chính
            boxShadow: `
                0 0 0 3px rgba(0,234,255,.18),      /* vòng halo mờ */
                0 0 18px rgba(0,234,255,.65)        /* phát sáng */
            `,
            backdropFilter: "saturate(140%) blur(2px)", // tách khỏi nền phía sau
            isolation: "isolate",                  // để glow không bị cắt
            transition: "transform .15s ease, box-shadow .15s ease, border-color .15s",
            "&:hover": {
            transform: "scale(1.06)",
            boxShadow: `
                0 0 0 4px rgba(0,234,255,.22),
                0 0 26px rgba(0,234,255,.85)
            `,
            borderColor: "#6ff7ff"
            },
            // Vòng sáng thứ hai mỏng sát mép (ring mịn)
            "&::after": {
            content: '""',
            position: "absolute",
            inset: "-2px",
            borderRadius: "50%",
            boxShadow: "0 0 0 1px rgba(255,255,255,.08)"
            }
        }}
            onClick={handleConfiguratorOpen}
        >
            <Icon fontSize="default" color="inherit">
                settings
            </Icon>
        </SoftBox>
    );

    return direction === "rtl" ? (
        <CacheProvider value={rtlCache}>
            <ThemeProvider theme={themeRTL}>
                <CssBaseline />
                {layout === "dashboard" && (
                <>
                    <Sidenav
                    color={sidenavColor}
                    brand={brandSrc}
                    brandName="Stone v0.1 Blog"
                    routes={routes}
                    onMouseEnter={handleOnMouseEnter}
                    onMouseLeave={handleOnMouseLeave}
                    />

                    <Configurator />
                    {configsButton}
                </>
                )}
                {layout === "vr" && <Configurator />}
                <Routes>
                    {getRoutes(routes)}
                    <Route path="*" element={<Navigate to="category" />} />
                </Routes>
                
            </ThemeProvider>
        </CacheProvider>
    ) : (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {layout === "dashboard" && (
                <>
                    <DefaultNavbar
                        routes={pageRoutes}
                        action={{
                            type: "internal",
                            route: "/authentication/sign-in/illustration",
                            label: "sign in",
                            color: "info",
                        }}
                    />
                    <Sidenav
                        color={sidenavColor}
                        brand={brandSrc}
                        brandName="Stone v0.2"
                        routes={routes}
                        onMouseEnter={handleOnMouseEnter}
                        onMouseLeave={handleOnMouseLeave}
                    />
                    
                    {/* <Configurator /> {configsButton} */}

                    <ThemeModeSwitcher value={mode} onChange={setMode} />
                </>
            )}
            {/* {layout === "vr" && <Configurator />} */}
            <Routes>
                {getRoutes(routes)} 
                {getRoutes(hiddenRoutes)}
                {/* <Route path="*" element={<Navigate to="/categories" />} /> */}
                <Route path="*" element={<NotFoundRedirect />} />
            </Routes>
            {/* Footer */}
            {/* <SoftBox width="100%">
                <BlogFooter />
            </SoftBox> */}
            
        </ThemeProvider>
    );
}
