// src/components/BlogCard.js
import PropTypes from "prop-types";
import { Card } from "@mui/material";
import { useTheme, alpha } from "@mui/material/styles";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";
import { Link } from "react-router-dom";

function BlogCard({ image, title, description, link }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  // Tokens theo mode
  const cardBg        = isDark ? "#0D1B2A" : theme.palette.common.white;
  const bodyText      = isDark ? theme.palette.text?.main || "#E2E8F0" : theme.palette.text?.main || "#273239";
  const descText      = isDark ? "rgba(255,255,255,0.80)" : "rgba(0,0,0,0.72)";
  const borderColor   = isDark ? "rgba(255,255,255,.25)" : "rgba(0,0,0,.12)";
  const hairlineRing  = isDark ? "0 0 0 1px rgba(255,255,255,.08)" : "0 0 0 1px rgba(0,0,0,.06)";
  const hoverRing     = isDark ? `0 0 0 2px ${alpha(theme.palette.info.main, .22)}, 0 0 12px ${alpha(theme.palette.info.main,.85)}`
                               : `0 0 0 2px ${alpha(theme.palette.info.main, .25)}, 0 0 16px ${alpha(theme.palette.info.main,.55)}`;
  const hoverBorder   = isDark ? alpha(theme.palette.info.main,.55) : alpha(theme.palette.info.main,.7);

  return (
    <Card
      sx={{
        position: "relative",
        overflow: "hidden",
        borderRadius: 3,
        bgcolor: cardBg,
        cursor: "pointer",
        border: `1.5px solid ${borderColor}`,
        backdropFilter: "saturate(140%) blur(2px)",
        isolation: "isolate",
        transition: "transform .25s ease, box-shadow .25s ease, border-color .25s ease",
        "&:hover": {
          transform: "translateY(-6px) scale(1.02)",
          boxShadow: hoverRing,
          borderColor: hoverBorder,
        },
        "&::after": {
          content: '""',
          position: "absolute",
          inset: "-2px",
          borderRadius: "inherit",
          boxShadow: hairlineRing,
          pointerEvents: "none",
        },
      }}
    >
      <SoftBox>
        <img
          src={image}
          alt={title}
          style={{
            width: "100%",
            height: "145px",
            objectFit: "cover",
            display: "block",
          }}
        />
      </SoftBox>

      <SoftBox p={1.5} 
        textAlign="center"
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "calc(100% - 145px)", 
        }}
      >
        <SoftTypography
          variant="h4"
          fontWeight="bold"
          gutterBottom
          sx={{
            color: bodyText,
            minHeight: "3rem",
            fontFamily: "Signika, sans-serif",
            fontSize: "1.35rem",
            display: "flex",
            alignItems: "center",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            lineHeight: 1.4,
            minHeight: "3.4rem",
            mb: 1.2,
          }}
        >
          {title}
        </SoftTypography>

        <SoftTypography
          variant="body2"
          mb={3}
          sx={{
            color: descText,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            fontSize: "0.9rem",
            fontFamily: "Heebo, sans-serif",
          }}
        >
          {description}
        </SoftTypography>

        <SoftButton
          component={Link}
          to={link}
          variant="gradient"
          color="info"
          sx={{
            transition: "all 0.2s ease-in-out",
            "&:hover": { transform: "scale(1.05)", fontFamily: "Signika, sans-serif" },
          }}
        >
          Read More
        </SoftButton>
      </SoftBox>
    </Card>
  );
}

BlogCard.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  link: PropTypes.string,
};

export default BlogCard;
