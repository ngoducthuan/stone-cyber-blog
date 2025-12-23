// src/components/ThemeModeSwitcher.jsx
import * as React from "react";
import PropTypes from "prop-types";
import {
  Box,
  ToggleButtonGroup,
  ToggleButton,
  Tooltip,
  IconButton,
} from "@mui/material";
import { useTheme, alpha } from "@mui/material/styles";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import DesktopWindowsRoundedIcon from "@mui/icons-material/DesktopWindowsRounded";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";

/**
 * Floating vertical mode switcher (collapsed -> expand on hover/focus)
 * - Docked at right-center
 * - Collapsed: shows current mode icon
 * - Hover/Focus: shows 3 vertical buttons (Light/System/Dark)
 */
export default function ThemeModeSwitcher({ value, onChange }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const [open, setOpen] = React.useState(false);

  const handleChange = (_, newValue) => {
    if (!newValue) return; // avoid unselect
    onChange?.(newValue);
  };

  // icon theo mode hiện tại (nút thu gọn)
  const currentIcon =
    value === "light" ? (
      <LightModeRoundedIcon fontSize="small" />
    ) : value === "dark" ? (
      <DarkModeRoundedIcon fontSize="small" />
    ) : (
      <DesktopWindowsRoundedIcon fontSize="small" />
    );

  const surface = isDark ? alpha("#fff", 0.06) : alpha("#000", 0.06);
  const borderCol = isDark ? alpha("#fff", 0.18) : alpha("#000", 0.18);
  const hoverBg = isDark ? alpha("#fff", 0.08) : alpha("#000", 0.08);
  const selectedBg = isDark ? alpha("#fff", 0.10) : alpha("#000", 0.10);

  return (
    <Box
      // Dock bên phải, giữa màn hình
      sx={{
        position: "fixed",
        right: { xs: 8, sm: 14 },
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 1500,
      }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {/* Khối chứa: thu gọn -> mở rộng theo hover/focus */}
      <Box
        tabIndex={0}
        onFocus={() => setOpen(true)}
        onBlur={(e) => {
          // nếu blur ra ngoài container thì đóng
          if (!e.currentTarget.contains(e.relatedTarget)) setOpen(false);
        }}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: 0.6,
          //gap: 0.5,
          borderRadius: 2,
          bgcolor: surface,
          border: `1px solid ${borderCol}`,
          boxShadow: isDark
            ? "0 8px 24px rgba(0,0,0,.45)"
            : "0 8px 24px rgba(0,0,0,.18)",
          backdropFilter: "blur(4px) saturate(120%)",
          transition: "box-shadow .2s ease, border-color .2s ease",
        }}
      >
        {/* Nút thu gọn (hiện icon mode hiện tại) */}
        <Tooltip title={`Theme: ${value}`} placement="left">
          <IconButton
            size="small"
            sx={{
              color: isDark ? "common.white" : "text.primary",
              bgcolor: "transparent",
              "&:hover": { bgcolor: hoverBg },
            }}
            aria-label="Current theme"
          >
            {currentIcon}
          </IconButton>
        </Tooltip>

        {/* Panel mở rộng (3 nút dọc). Dùng maxHeight + opacity để transition mượt */}
        <Box
          sx={{
            overflow: "hidden",
            maxHeight: open ? 160 : 0,
            opacity: open ? 1 : 0,
            transition: "max-height .22s ease, opacity .22s ease",
          }}
        >
          <ToggleButtonGroup
            orientation="vertical"
            exclusive
            value={value}
            onChange={handleChange}
            sx={{
              "& .MuiToggleButton-root": {
                p: 0.75,
                border: "none",
                borderRadius: 1.5,
                color: "text.secondary",
                my: 0.4,
                "&.Mui-selected": {
                  color: "text.primary",
                  bgcolor: selectedBg,
                },
                "&:not(.Mui-selected):hover": {
                  bgcolor: hoverBg,
                },
              },
            }}
          >
            <Tooltip title="Light" placement="left">
              <ToggleButton value="light" aria-label="Light mode">
                <LightModeRoundedIcon fontSize="small" />
              </ToggleButton>
            </Tooltip>
            <Tooltip title="System" placement="left">
              <ToggleButton value="system" aria-label="System mode">
                <DesktopWindowsRoundedIcon fontSize="small" />
              </ToggleButton>
            </Tooltip>
            <Tooltip title="Dark" placement="left">
              <ToggleButton value="dark" aria-label="Dark mode">
                <DarkModeRoundedIcon fontSize="small" />
              </ToggleButton>
            </Tooltip>
          </ToggleButtonGroup>
        </Box>
      </Box>
    </Box>
  );
}

ThemeModeSwitcher.propTypes = {
  value: PropTypes.oneOf(["light", "dark", "system"]).isRequired,
  onChange: PropTypes.func.isRequired,
};
