/**
=========================================================
* Soft UI Dashboard PRO React - v4.0.3
=========================================================

* Biểu tượng malware: BUG (con bọ) dùng MUI Icon dạng Rounded
*/

import PropTypes from "prop-types";
import BugReportRoundedIcon from '@mui/icons-material/ListAlt';
import colors from "assets/theme/base/colors";

function ListTopics({ color = "dark", size = "16px"}) {
  return (
    <BugReportRoundedIcon
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

ListTopics.propTypes = {
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

export default ListTopics;
