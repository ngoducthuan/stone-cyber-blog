/**
=========================================================
* Soft UI Dashboard PRO React - v4.0.3
=========================================================

* Biểu tượng malware: BUG (con bọ) dùng MUI Icon dạng Rounded
*/

import PropTypes from "prop-types";
import AssignmentIcon from '@mui/icons-material/Draw';
import colors from "assets/theme/base/colors";

function Assignment({ color = "dark", size = "16px"}) {
  return (
    <AssignmentIcon
      sx={{
        fontSize: size,
        color: colors[color] ? colors[color].main : colors.dark.main,
        opacity: 0.95,
        verticalAlign: "middle",
        transform: "translateY(1px)",
      }}
    />
  );
}

Assignment.propTypes = {
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

export default Assignment;
