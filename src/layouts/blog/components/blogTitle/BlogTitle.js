import SoftTypography from "components/SoftTypography";
import { useTheme, alpha } from "@mui/material/styles";
import CalendarTodayIcon from "@mui/icons-material/CalendarMonth";
import PersonIcon from "@mui/icons-material/AccountCircle";
import PropTypes from "prop-types";
import { Box } from "@mui/material";

function BlogHeader({ title, date, author }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  // Màu cho tiêu đề
  const titleColor = isDark ? "#FEFFFF" : "#273239";

  // Màu “subtle” cho meta (ngày/author + icon)
  const metaColor = isDark
    ? alpha(theme.palette.common.white, 0.75)   // trắng mờ trên nền tối
    : alpha(theme.palette.common.black, 0.65);  // đen mờ trên nền sáng

  return (
    <>
      <SoftTypography
        variant="h2"
        fontWeight="bold"
        mb={2}
        sx={{
          color: titleColor,
          fontSize: "2.4rem",
          fontFamily: "Signika, sans-serif",
          lineHeight: 1.3,
          textShadow: "0 1px 1px rgba(0,0,0,0.05)",
        }}
      >
        {title}
      </SoftTypography>

      <SoftTypography
        variant="body2"
        sx={{
          display: "flex",
          alignItems: "center",
          fontSize: "1rem",
          color: metaColor,           // <-- đổi theo mode
          gap: 1.5,
        }}
      >
        <Box component="span" sx={{ display: "flex", alignItems: "center", mr: 0.5 }}>
          <CalendarTodayIcon sx={{ fontSize: "1.4rem !important", color: metaColor }} />
        </Box>
        {date}
        <Box component="span" sx={{ display: "flex", alignItems: "center", mr: 0.5 }}>
          <PersonIcon sx={{ fontSize: "1.4rem !important", color: metaColor }} />
        </Box>
        {author}
      </SoftTypography>
    </>
  );
}

BlogHeader.propTypes = {
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
};

export default BlogHeader;
