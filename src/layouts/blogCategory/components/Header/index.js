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

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftAvatar from "components/SoftAvatar";

// Soft UI Dashboard PRO React example components
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// Soft UI Dashboard PRO React icons
import Cube from "examples/Icons/Cube";
import Document from "examples/Icons/Document";
import Settings from "examples/Icons/Settings";

// Soft UI Dashboard PRO React base styles
import breakpoints from "assets/theme/base/breakpoints";

// Images
import burceMars from "assets/images/bruce-mars.jpg";
import curved0 from "assets/images/curved-images/curved0.jpg";
import category from "assets/images/blog/category.jpg"
import { Description } from "@mui/icons-material";

import PropTypes from "prop-types";
import { useTheme } from "@emotion/react";

function Header({ title, image, description }) {
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const [tabValue, setTabValue] = useState(0);
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  useEffect(() => {
    // A function that sets the orientation state of the tabs.
    function handleTabsOrientation() {
      return window.innerWidth < breakpoints.values.sm
        ? setTabsOrientation("vertical")
        : setTabsOrientation("horizontal");
    }

    /** 
     The event listener that's calling the handleTabsOrientation function when resizing the window.
    */
    window.addEventListener("resize", handleTabsOrientation);

    // Call the handleTabsOrientation function to set the state with the initial value.
    handleTabsOrientation();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleTabsOrientation);
  }, [tabsOrientation]);

  const handleSetTabValue = (event, newValue) => setTabValue(newValue);

  return (
    <SoftBox position="relative" >
        {/* Light mode */}
        {/* <DashboardNavbar absolute light /> */}
        {/* Dark mode */}
        <DashboardNavbar absolute {...(isDark ? {dark: true} : {light: true})} /> 

        <SoftBox
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            minHeight="20rem"
            mt={2}
            pt={{ xs: 10, md: 2 }}
            borderRadius="xl"
            // overflow="hidden"
            sx={{
            // Nâng lớp + hairline giống card
                // boxShadow:
                // "inset 0 0 0 1px rgba(255,255,255,.12), 0 12px 32px rgba(0,0,0,.35)",
                 backgroundImage: `
                    linear-gradient(180deg, rgba(0,0,0,.40) 0%, rgba(0,0,0,.45) 60%, rgba(0,0,0,.75) 95%),
                    url(${image})
                `,
                
                backgroundSize: "cover",
                backgroundPosition: "center",
                filter: "drop-shadow(0 12px 28px rgba(0,0,0,.5))",   // bóng ngoài
                
                // Overlay tách chữ khỏi ảnh (đặt bằng pseudo thay vì lồng vào background)
                // "&::after": {
                // content: '""',
                // position: "absolute",
                // inset: 0,
                // // background: "linear-gradient(180deg, rgba(0,0,0,.20) 0%, rgba(0,0,0,.45) 60%, rgba(0,0,0,.75) 95%)", 
                // },
            }}
        >
            <SoftTypography 
                variant="h2" 
                zIndex={1}
                // color="dark"
                color={isDark ? "dark" : "white"}
                fontWeight="bold" 
                mb={1}
                sx={{ 
                    textShadow: "2px 2px 6px rgba(0,0,0,0.6)",
                    fontFamily: "Signika, sans-serif",
                }}
            >
                {/* All Categories */}
                {title}
            </SoftTypography>
            <SoftTypography 
                variant="h6" 
                // color="white" //light mode
                color={isDark ? "dark" : "white"}
                fontWeight="regular"
                zIndex={1}
                sx={{
                    px: { xs: 2, sm: 3, md: 4 },  
                    py: 1,                           
                    maxWidth: { xs: "100%", sm: "90%", md: "80%" }, 
                    textAlign: "center", 
                    textShadow: "2px 2px 6px rgba(0,0,0,0.6)",
                    fontFamily: "Heebo, sans-serif",
                }}
            >
                {/* Explore all categories and discover content tailored to your interests. */}
                {description}
            </SoftTypography>
        </SoftBox>
    </SoftBox>
  );
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
    image: PropTypes.string,
    description: PropTypes.string,
}
export default Header;
