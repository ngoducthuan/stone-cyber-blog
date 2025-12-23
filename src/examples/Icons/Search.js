/**
=========================================================
* Soft UI Dashboard PRO React - v4.0.3
=========================================================

* Biểu tượng Network: sử dụng LanguageRoundedIcon từ MUI
*/

import PropTypes from "prop-types";
import LanguageRoundedIcon from "@mui/icons-material/ManageSearch";

// Soft UI Dashboard PRO React base styles
import colors from "assets/theme/base/colors";

function Search({ color = "dark", size = "16px" }) {
  return (
    <LanguageRoundedIcon
      style={{
        fontSize: size,
        color: colors[color] ? colors[color].main : colors.dark.main,
        opacity: 0.95,
        verticalAlign: "middle",
        transform: "translateY(1px)",
      }}
    />
  );
}

Search.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "dark",
    "light",
    "white",
  ]),
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default Search;
