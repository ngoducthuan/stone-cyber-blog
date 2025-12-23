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

import { useState, useEffect } from "react";

// react-router components
import { Link } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import Container from "@mui/material/Container";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";

// Soft UI Dashboard PRO React example components
import DefaultNavbarLink from "examples/Navbars/DefaultNavbar/DefaultNavbarLink";
import DefaultNavbarMobile from "examples/Navbars/DefaultNavbar/DefaultNavbarMobile";

// Soft UI Dashboard PRO React base styles
import breakpoints from "assets/theme/base/breakpoints";

// DefaultNavbar dropdown menus
import PagesMenu from "examples/Navbars/DefaultNavbar/Menus/PagesMenu";
import AuthenticationMenu from "examples/Navbars/DefaultNavbar/Menus/AuthenticationMenu";
import EcommerceMenu from "examples/Navbars/DefaultNavbar/Menus/EcommerceMenu";
import ApplicationsMenu from "examples/Navbars/DefaultNavbar/Menus/ApplicationsMenu";
import DocsMenu from "examples/Navbars/DefaultNavbar/Menus/DocsMenu";
import BlogMenu from "examples/Navbars/DefaultNavbar/Menus/BlogMenu";
import { useSoftUIController } from "context"; //Shadow for sidebar
import zIndex from "@mui/material/styles/zIndex";

function DefaultNavbar({ routes, transparent = false, light = false, action = false }) {
    const [pagesMenu, setPagesMenu] = useState(false);
    const [blogMenu, setBlogMenu] = useState(false);
    const [authenticationMenu, setAuthenticationMenu] = useState(false);
    const [ecommerceMenu, setEcommerceMenu] = useState(false);
    const [applicationsMenu, setApplicationsMenu] = useState(false);
    const [docsMenu, setDocsMenu] = useState(false);
    const [mobileNavbar, setMobileNavbar] = useState(false);
    const [mobileView, setMobileView] = useState(false);
    const [controller] = useSoftUIController(); //SHadow for sidebar
    const { miniSidenav } = controller;

    const openPagesMenu = ({ currentTarget }) => setPagesMenu(currentTarget);
    const closePagesMenu = () => setPagesMenu(false);
    const openBlogMenu = ({ currentTarget }) => setBlogMenu(currentTarget);
    const closeBlogMenu = () => setBlogMenu(false);
    const openAuthenticationMenu = ({ currentTarget }) => setAuthenticationMenu(currentTarget);
    const closeAuthenticationMenu = () => setAuthenticationMenu(false);
    const openEcommerceMenu = ({ currentTarget }) => setEcommerceMenu(currentTarget);
    const closeEcommerceMenu = () => setEcommerceMenu(false);
    const openApplicationsMenu = ({ currentTarget }) => setApplicationsMenu(currentTarget);
    const closeApplicationsMenu = () => setApplicationsMenu(false);
    const openDocsMenu = ({ currentTarget }) => setDocsMenu(currentTarget);
    const closeDocsMenu = () => setDocsMenu(false);
    const openMobileNavbar = ({ currentTarget }) => setMobileNavbar(currentTarget.parentNode);
    const closeMobileNavbar = () => setMobileNavbar(false);

    useEffect(() => {
        // A function that sets the display state for the DefaultNavbarMobile.
            function displayMobileNavbar() {
            if (window.innerWidth < breakpoints.values.lg) {
                setMobileView(true);
                setMobileNavbar(false);
            } else {
                setMobileView(false);
                setMobileNavbar(false);
            }
        }

        /** 
         The event listener that's calling the displayMobileNavbar function when 
        resizing the window.
        */
        window.addEventListener("resize", displayMobileNavbar);

        // Call the displayMobileNavbar function to set the state with the initial value.
        displayMobileNavbar();

        // Remove event listener on cleanup
        return () => window.removeEventListener("resize", displayMobileNavbar);
    }, []);

    return (
        <Container maxWidth={false} disableGutters>
            <SoftBox
                py={2}
                px={{ xs: transparent ? 4 : 5, sm: transparent ? 2 : 5, lg: transparent ? 0 : 8 }}
                // my={2}
                // mx={3}
                // width="calc(100% - 48px)"
                width="calc(100%)"
                // borderRadius="section"
                // shadow={transparent ? "none" : "md"} //Shadow color navbar light
                color={light ? "white" : "dark"}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                position="fixed"
                left={0}
                zIndex={3}
                sx={({ 
                    palette: { transparent: transparentColor, white }, functions: { rgba } }) => ({
                    // backgroundColor: transparent ? transparentColor.main : rgba(white.main, 0.8),
                    backgroundColor: transparent ? transparentColor.main : rgba(white.main),
                    backdropFilter: transparent ? "none" : `saturate(200%) blur(30px)`,
                    boxShadow: "inset 0 -1px 0 rgba(255,255,255,.4), 0 4px 28px rgba(0,0,0,.2)", //shadow dark mode
                    // boxShadow: "inset 0 -1px 0 #1c1f22ff, 0 10px 28px rgba(0,0,0,.4)", //shadow dark mode
                })}
            >
                <SoftBox component={Link} to="/" py={transparent ? 1.5 : 0.75} lineHeight={1}>
                    <SoftTypography variant="button" fontWeight="bold" color={light ? "white" : "dark"}>
                        Stone v0.1 - Build In Progress
                    </SoftTypography>
                </SoftBox>
                <SoftBox color="inherit" display={{ xs: "none", lg: "flex"}} m={0} p={0}>
                    <DefaultNavbarLink name="home" to="/" light={light} />
                    <DefaultNavbarLink name="about me" to="/about-me" light={light} />
                    <DefaultNavbarLink name="timeline" to="/timeline" light={light} />
                    {/* <DefaultNavbarLink
                        name="pages"
                        openHandler={openPagesMenu}
                        closeHandler={closePagesMenu}
                        light={light}
                    /> */}
                    
                    <DefaultNavbarLink
                        name="blog"
                        openHandler={openBlogMenu}
                        closeHandler={closeBlogMenu}
                        light={light}
                    />

                    {/* <DefaultNavbarLink
                        name="application"
                        openHandler={openApplicationsMenu}
                        closeHandler={closeApplicationsMenu}
                        light={light}
                    /> */}

                    <DefaultNavbarLink
                        name="authentication"
                        openHandler={openAuthenticationMenu}
                        closeHandler={closeAuthenticationMenu}
                        light={light}
                    />

                    {/* <DefaultNavbarLink
                        name="ecommerce"
                        openHandler={openEcommerceMenu}
                        closeHandler={closeEcommerceMenu}
                        light={light}
                    />
                    <DefaultNavbarLink
                        name="docs"
                        openHandler={openDocsMenu}
                        closeHandler={closeDocsMenu}
                        light={light}
                    /> */}
                </SoftBox>
                
                {action &&
                (action.type === "internal" ? (
                    <SoftBox display={{ xs: "none", lg: "inline-block" }}>
                        <SoftButton
                            component={Link}
                            to={action.route}
                            variant="gradient"
                            color={action.color ? action.color : "info"}
                            size="small"
                            circular
                        >
                            {action.label}
                        </SoftButton>
                    </SoftBox>
                ) : (
                    <SoftBox display={{ xs: "none", lg: "inline-block" }}>
                        <SoftButton
                            component="a"
                            href={action.route}
                            target="_blank"
                            rel="noreferrer"
                            variant="gradient"
                            color={action.color ? action.color : "info"}
                            size="small"
                            circular
                        >
                            {action.label}
                        </SoftButton>
                    </SoftBox>
                ))}

                <SoftBox
                    display={{ xs: "inline-block", lg: "none" }}
                    lineHeight={0}
                    py={1.5}
                    pl={1.5}
                    color="inherit"
                    sx={{ cursor: "pointer" }}
                    onClick={openMobileNavbar}
                    >
                    <Icon fontSize="default">{mobileNavbar ? "close" : "menu"}</Icon>
                </SoftBox>
            </SoftBox>
            <PagesMenu routes={routes} open={pagesMenu} close={closePagesMenu} />
            <BlogMenu routes={routes} open={blogMenu} close={closeBlogMenu} />
            <AuthenticationMenu
                routes={routes}
                open={authenticationMenu}
                close={closeAuthenticationMenu}
            />
            <EcommerceMenu routes={routes} open={ecommerceMenu} close={closeEcommerceMenu} />
            <ApplicationsMenu routes={routes} open={applicationsMenu} close={closeApplicationsMenu} />
            <DocsMenu routes={routes} open={docsMenu} close={closeDocsMenu} />
            {mobileView && (
                <DefaultNavbarMobile routes={routes} open={mobileNavbar} close={closeMobileNavbar} />
            )}
        </Container>
    );
}


// Typechecking props for the DefaultNavbar
DefaultNavbar.propTypes = {
    routes: PropTypes.arrayOf(PropTypes.object).isRequired,
    transparent: PropTypes.bool,
    light: PropTypes.bool,
    action: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.shape({
        type: PropTypes.oneOf(["external", "internal"]).isRequired,
        route: PropTypes.string.isRequired,
        color: PropTypes.oneOf([
            "primary",
            "secondary",
            "info",
            "success",
            "warning",
            "error",
            "dark",
            "light",
        ]),
        label: PropTypes.string.isRequired,
        }),
    ]),
};

export default DefaultNavbar;
