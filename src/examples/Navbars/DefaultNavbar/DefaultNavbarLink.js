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

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Collapse from "@mui/material/Collapse";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import { Link } from "react-router-dom"; 
import zIndex from "@mui/material/styles/zIndex";

function DefaultNavbarLink({
    name,
    to = null,
    openHandler = false,
    closeHandler = false,
    children = false,
    collapseStatus = false,
    light = false,
    }) {

    const isDropdown = Boolean(openHandler && closeHandler);
    const Wrapper = to ? Link : "div";

    return (
        <>
            <SoftBox
                component={Wrapper}
                to={to || undefined}
                mx={1}
                p={1}
                // component={children ? "div" : Link}
                // to={children ? undefined : rest.to}
                onMouseEnter={typeof openHandler === "function" ? openHandler : undefined}
                onMouseLeave={typeof closeHandler === "function" ? closeHandler : undefined}
                display="flex"
                alignItems="center"
                color={light ? "white" : "dark"}
                sx={{ cursor: "pointer", userSelect: "none"}}
            >
                <SoftTypography
                    variant="button"
                    fontWeight="regular"
                    textTransform="capitalize"
                    color="inherit"
                    sx={{ fontWeight: "100%"}}
                >
                    {name}
                </SoftTypography>
                
                {isDropdown && (
                    <SoftTypography variant="body2" color={light ? "white" : "dark"}>
                        <Icon sx={{ fontWeight: "bold", verticalAlign: "middle" }}>keyboard_arrow_down</Icon>
                    </SoftTypography>
                )}
            </SoftBox>

            {children && (
                <Collapse in={Boolean(collapseStatus)} timeout="auto" unmountOnExit>
                    {children}
                </Collapse>
            )}
        </>
    );
}


// Typechecking props for the DefaultNavbarLink
DefaultNavbarLink.propTypes = {
  name: PropTypes.string.isRequired,
  to: PropTypes.string,
  openHandler: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  closeHandler: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  children: PropTypes.node,
  collapseStatus: PropTypes.bool,
  light: PropTypes.bool,
};

export default DefaultNavbarLink;
