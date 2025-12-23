// SearchOverlay.jsx
import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Box, InputBase, Typography, IconButton, Paper, Divider } from "@mui/material";
import { useTheme, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";

function SearchOverlay({ open, onClose, searchTerm, setSearchTerm, results }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  // tokens theo mode
  const bgScrim      = alpha("#000", isDark ? 0.6 : 0.35);
  const panelBg = isDark ? theme.palette.background.paper || "#0f1115" : theme.palette.common.white;
  const panelText = isDark ? theme.palette.text.primary : theme.palette.text.primary;
  const subText      = isDark ? "rgba(255,255,255,0.72)" : "rgba(0,0,0,0.62)";
  const faintText    = isDark ? "rgba(255,255,255,0.56)" : "rgba(0,0,0,0.48)";
  const titleText    = isDark ? "#F1F5F9" : "#0f172a";
  const placeholder  = isDark ? "rgba(255,255,255,0.56)" : "rgba(0,0,0,0.42)";
  const itemBg       = isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.02)";
  const itemHoverBg  = isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.05)";
  const borderCol    = isDark ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.10)";
  const dividerCol   = isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.12)";
  const iconCol      = isDark ? "rgba(255,255,255,0.72)" : "rgba(0,0,0,0.65)";
  const inputBorder  = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.10)";
  const inputShadow  = isDark ? "0 4px 30px rgba(0,0,0,0.2)" : "0 6px 20px rgba(0,0,0,0.10)";

  const kbdStyle = {
    padding: "2px 6px",
    borderRadius: 4,
    fontFamily: "monospace",
    color: panelText,
    background: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",
    border: `1px solid ${isDark ? "rgba(255,255,255,0.18)" : "rgba(0,0,0,0.18)"}`
  };

  const emptyPanelSx = {
    px: 3,
    py: 0,
    borderRadius: 1,
    width: "100%",
    minHeight: 150,
    display: "grid",
    placeItems: "center",
    textAlign: "center",
    color: isDark ? "rgba(255,255,255,0.85)" : "rgba(0,0,0,0.75)",
    bgcolor: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)",
    border: `1px solid ${isDark ? "rgba(121,85,72,0.25)" : "rgba(0,0,0,0.08)"}`,
    boxShadow: `inset 0 0 0 1px ${isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)"}`
  };

  const wrapperRef = useRef();

  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) onClose();
    }
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      width="100vw"
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="flex-start"
      pt={20}
      zIndex={1300}
      sx={{ bgcolor: bgScrim }}
    >
      <Paper
        ref={wrapperRef}
        elevation={3}
        sx={{
          width: "100%",
          maxWidth: 600,
          borderRadius: 2,
          bgcolor: panelBg,
          color: panelText,
          border: `1px solid ${borderCol}`,
          maxHeight: "65vh",
          overflowY: "auto",
          // Scrollbar
          "&::-webkit-scrollbar": { width: 6 },
          "&::-webkit-scrollbar-track": { backgroundColor: "transparent" },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: isDark ? "#2b303b" : "#cbd5e1",
            borderRadius: 8
          },
          "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: isDark ? "#3a4050" : "#94a3b8"
          },
          scrollbarWidth: "thin",
          msOverflowStyle: "none"
        }}
      >
        {/* Search input */}
        <Box
          display="flex"
          className="BoxTest"
          alignItems="center"
          borderRadius={2}
          mx={2}
          my={3}
          px={2}
          py={1}
          sx={{
            border: `1px solid ${inputBorder}`,
            boxShadow: inputShadow,
            "& svg": { color: iconCol }
          }}
        >
          <SearchIcon sx={{ mr: 1, fontSize: "1.3rem" }} />
          <InputBase
            fullWidth
            placeholder="Search Post..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoFocus
            sx={{
                    fontSize: 16,
                    border: "none",
                    color: panelText,
                    backgroundColor: 'transparent', 
                    "& input::placeholder": { color: placeholder, opacity: 1 }
                }}
          />
          <IconButton onClick={onClose} size="small" sx={{ color: iconCol }}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>

        <Box sx={{ minHeight: 160, width: "100%" }}>
          {searchTerm === "" ? (
            <Box sx={{ ...emptyPanelSx, flex: 1, minHeight: "inherit" }}>
              <Typography sx={{ color: subText, fontSize: 16 }}>
                Type something to search...
              </Typography>
            </Box>
          ) : results.length === 0 ? (
            <Box sx={{ ...emptyPanelSx, flex: 1, minHeight: "inherit" }}>
              <Typography sx={{ color: subText, fontSize: 16 }}>
                No results found.
              </Typography>
            </Box>
          ) : (
            results.map((item, idx) => (
              <Box
                key={idx}
                display="flex"
                mx={2}
                p={2}
                mb={1.2}
                borderRadius={2}
                sx={{
                  bgcolor: itemBg,
                  transition: "background 0.25s",
                  "&:hover": { backgroundColor: itemHoverBg, cursor: "pointer" }
                }}
              >
                <Box
                  component="img"
                  src={item.image}
                  alt={item.title}
                  width={80}
                  height={80}
                  mr={2}
                  sx={{ objectFit: "cover", borderRadius: 1, flexShrink: 0 }}
                />

                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography variant="subtitle1" fontWeight="bold" sx={{ color: titleText }}>
                    {item.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: subText,
                      fontSize: 14,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis"
                    }}
                  >
                    {item.description}
                  </Typography>
                  <Box
                    mt={1}
                    display="flex"
                    gap={2}
                    flexWrap="wrap"
                    fontSize="11px"
                    sx={{ color: faintText }}
                  >
                    <Box>📁 {item.category}</Box>
                    <Box>🏷 {item.icon}</Box>
                    <Box>🕒 {item.date}</Box>
                  </Box>
                </Box>
              </Box>
            ))
          )}
        </Box>

        {/* Shortcut bar */}
        <Divider sx={{ mt: 3, mb: 1, borderColor: dividerCol }} />
        <Box display="flex" justifyContent="space-between" sx={{ mx: 2, mb: 3, color: faintText }}>
          <Typography variant="caption">
            <kbd style={kbdStyle}>↓</kbd> to navigate
          </Typography>
          <Typography variant="caption">
            <kbd style={kbdStyle}>↵</kbd> to select
          </Typography>
          <Typography variant="caption">
            <kbd style={kbdStyle}>ESC</kbd> to close
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}

SearchOverlay.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  searchTerm: PropTypes.string.isRequired,
  setSearchTerm: PropTypes.func.isRequired,
  results: PropTypes.array.isRequired
};

export default SearchOverlay;
