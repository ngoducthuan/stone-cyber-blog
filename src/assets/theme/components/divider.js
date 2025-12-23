// Soft UI Dashboard PRO React base styles
import colors from "assets/theme/base/colors";

// Soft UI Dashboard PRO React helper functions
import rgba from "assets/theme/functions/rgba";
import pxToRem from "assets/theme/functions/pxToRem";

const divider = {
  styleOverrides: {
    root: ({ theme }) => {
      const { mode } = theme.palette;
      const { dark, white, transparent } = colors;

      const baseColor = mode === "dark" ? dark.main : white.main;

      return {
        backgroundColor: transparent.main,
        backgroundImage: `linear-gradient(to right, ${rgba(baseColor, 0)}, ${rgba(
          baseColor,
          0.5
        )}, ${rgba(baseColor, 0)}) !important`,
        height: pxToRem(1),
        margin: `${pxToRem(16)} 0`,
        borderBottom: "none",
        opacity: 0.25,
      };
    },

    vertical: ({ theme }) => {
      const { mode } = theme.palette;
      const { dark, white, transparent } = colors;

      const baseColor = mode === "dark" ? dark.main : white.main;

      return {
        backgroundColor: transparent.main,
        backgroundImage: `linear-gradient(to bottom, ${rgba(baseColor, 0)}, ${rgba(
          baseColor,
          0.5
        )}, ${rgba(baseColor, 0)}) !important`,
        width: pxToRem(1),
        height: "100%",
        margin: `0 ${pxToRem(16)}`,
        borderRight: "none",
      };
    },
  },
};

export default divider;
