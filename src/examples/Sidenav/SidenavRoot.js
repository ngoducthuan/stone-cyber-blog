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

// @mui material components
import Drawer from "@mui/material/Drawer";
import { styled } from "@mui/material/styles";

export default styled(Drawer)(({ theme, ownerState }) => {
  const { palette, boxShadows, transitions, breakpoints, functions } = theme;
  const { transparentSidenav, miniSidenav } = ownerState;

  const sidebarWidth = 300;
  const { white, transparent } = palette;
  const { xxl } = boxShadows;
  const { pxToRem } = functions;

  // styles for the sidenav when miniSidenav={false}
  const drawerOpenStyles = () => ({
    transform: "translateX(0)",
    transition: transitions.create("transform", {
      easing: transitions.easing.sharp,
      duration: transitions.duration.shorter,
    }),

    [breakpoints.up("xl")]: {
      backgroundColor: transparentSidenav ? transparent.main : white.main,
      boxShadow: transparentSidenav ? "none" : xxl,
      // boxShadow: "2px 0 8px rgba(0, 0, 0, 0.08)", //Boxshadow when open
      // borderRight: "1px solid rgba(0, 0, 0, 0.08)", //light mode
      // boxShadow: "8px 0 24px rgba(0,0,0,.25)",
      // borderRight: "1px solid rgba(255,255,255,0.22)",
      marginBottom: transparentSidenav ? 0 : "inherit",
      left: "0",
      width: sidebarWidth,
      transform: "translateX(0)",
      transition: transitions.create(["width", "background-color"], {
        easing: transitions.easing.sharp,
        duration: transitions.duration.enteringScreen,
      }),
    },
  });

  // styles for the sidenav when miniSidenav={true}
  const drawerCloseStyles = () => ({
    transform: `translateX(${pxToRem(-320)})`,
    transition: transitions.create("transform", {
      easing: transitions.easing.sharp,
      duration: transitions.duration.shorter,
    }),

    [breakpoints.up("xl")]: {
      backgroundColor: transparentSidenav ? transparent.main : white.main,
      boxShadow: transparentSidenav ? "none" : xxl,
      // boxShadow: transparentSidenav ? "none" : "2px 0 8px rgba(0, 0, 0, 0.08)",
      // boxShadow: "2px 0 12px rgba(0, 0, 0, 0.1)",
      // borderRight: "1px solid rgba(0, 0, 0, 0.08)", //light mode
      // boxShadow: "8px 0 24px rgba(0,0,0,.55)",
      // borderRight: "1px solid rgba(255,255,255,0.22)",
      // borderRight: "1px solid #1c1f22ff",
      marginBottom: transparentSidenav ? 0 : "inherit",
      left: "0",
      width: pxToRem(96),
      overflowX: "hidden",
      transform: "translateX(0)",
      transition: transitions.create(["width", "background-color"], {
        easing: transitions.easing.sharp,
        duration: transitions.duration.shorter,
      }),
    },
  });

  return {
    "& .MuiDrawer-paper": {
      marginLeft: 0,
      borderRadius: 0,
      zIndex: 0,
      boxShadow: xxl,
      border: "none",
      //Down height 64px
      overflowY: "scroll", // Cho phép cuộn
      scrollbarWidth: "none", // Firefox
      "&::-webkit-scrollbar": {
        display: "none", // Chrome, Safari
      },
      top: "55px",
      height: "calc(100vh - 65px)",
      ...(miniSidenav ? drawerCloseStyles() : drawerOpenStyles()),
    },
  };
});
