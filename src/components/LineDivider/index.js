import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";

function LineDivider() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Box
      sx={{
        mt: "2rem",
        mb: "2rem",
          borderTop: isDark
            ? "1px solid rgba(255,255,255,0.12)"
            : "1px solid rgba(0,0,0,0.12)",
        width: "100%",
      }}
    />
  );
}

export default LineDivider;