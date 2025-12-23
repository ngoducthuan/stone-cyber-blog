import SoftTypography from "components/SoftTypography";
import { useTheme } from "@mui/material/styles";
import PropTypes from "prop-types";

function BlogParagraph({ children }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <SoftTypography
      variant="body2"
      paragraph
      sx={{
        // color: "#273239", //Light mode
        // color: "#FEFFFF",
        color: isDark ? "#FEFFFF" : "#273239",
        fontSize: "1rem",
        lineHeight: 1.6,
        fontFamily: "Heebo, sans-serif",
      }}
    >
      {children}
    </SoftTypography>
  );
}
BlogParagraph.propTypes = {
    children: PropTypes.node.isRequired,
};
export default BlogParagraph;
