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

const inputBase = {
  styleOverrides: {
    root: ({ theme }) => ({
      display: "grid",
      placeItems: "center",
      width: "100%",
      height: "auto",
      padding: `${theme.functions.pxToRem(8)} ${theme.functions.pxToRem(12)}`,
      fontSize: theme.typography.size.sm,
      fontWeight: theme.typography.fontWeightRegular,
      lineHeight: 1.4,
      color: theme.palette.text.primary,
      backgroundColor:
        theme.palette.mode === "dark" ? "transparent" : theme.palette.common.white,
      backgroundClip: "padding-box",
      border: `1px solid ${theme.palette.divider}`,
      appearance: "none",
      borderRadius: theme.borders.borderRadius.md,
      transition: "box-shadow 150ms ease, border-color 150ms ease, padding 150ms ease",
    }),

    input: ({ theme }) => ({
      width: "100%",
      height: theme.functions.pxToRem(22),
      padding: 0,
      backgroundColor: "transparent",
      "&::placeholder": {
        color:
          theme.palette.mode === "dark"
            ? "rgba(255,255,255,0.56)"
            : "rgba(0,0,0,0.42)",
        opacity: 1,
      },
      // WebKit autofill (nếu dùng type="search" hay có lưu form)
      "&:-webkit-autofill": {
        WebkitBoxShadow:
          theme.palette.mode === "dark"
            ? "0 0 0 1000px transparent inset"
            : `0 0 0 1000px ${theme.palette.common.white} inset`,
        WebkitTextFillColor: theme.palette.text.primary,
        transition: "background-color 9999s ease-out 0s",
      },
    }),
  },
};

export default inputBase;
