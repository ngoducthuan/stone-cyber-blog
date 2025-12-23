import SoftTypography from "components/SoftTypography";
import { useTheme } from "@mui/material/styles";
import PropTypes from "prop-types";

function BlogHeading({ children, level = 4 }) {
    const theme = useTheme();
    const isDark = theme.palette.mode === "dark";

    const variant = `h${level}`; 
    const fontSizeMap = {
        1: "2.5rem",
        2: "2rem",
        3: "1.75rem",
        4: "1.5rem",
        5: "1.25rem",
        6: "1rem",
    };

    return (
        <SoftTypography
        variant={variant}
        fontWeight="bold"
        sx={{
            // color: "#273239", //Light mode
            // color: "#FEFFFF",
            color: isDark ? "#FEFFFF" : "#273239",
            fontSize: fontSizeMap[level] || "1.5rem",
            lineHeight: 1.4,
            fontFamily: "Signika, sans-serif",
            mt: 4,
            mb: 2,
        }}
        >
        {children}
        </SoftTypography>
    );
}

BlogHeading.propTypes = {
  children: PropTypes.node.isRequired,
  level: PropTypes.oneOf([1, 2, 3, 4, 5, 6]),
};

export default BlogHeading;
