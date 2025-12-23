// src/examples/filePagination.js
import React from "react";
import PropTypes from "prop-types";
import { Stack, Pagination, Typography, Box } from "@mui/material";
import { useTheme, alpha } from "@mui/material/styles";

function SitePagination({
  page = 1,
  count = 1,
  onChange,
  showFirstLast = true,
  center = true,
  compact = false,
  showProgress = true,
  // có thể override 2 màu nhấn nếu muốn
  accentFrom = "#22D3EE",   // cyan-400
  accentTo   = "#3B82F6",   // blue-500
  sx = {},
  size = "large",
}) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  // ===== Tokens theo mode =====
  const baseText       = isDark ? "#E2E8F0" : "#0f172a";
  const chipBorder     = isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.12)";
  const chipBg         = isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)";
  const chipHoverBg    = isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)";
  const chipHoverBd    = isDark ? "rgba(255,255,255,0.24)" : "rgba(0,0,0,0.24)";
  const chipInsetLine  = isDark ? "0 1px 0 rgba(255,255,255,0.04) inset" : "0 1px 0 rgba(0,0,0,0.04) inset";
  const focusRing      = isDark ? "0 0 0 3px rgba(59,130,246,0.35)" : "0 0 0 3px rgba(59,130,246,0.25)";
  const dotsColor      = isDark ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.45)";
  const prevNextBg     = isDark ? `${accentTo}14` : alpha(accentTo, 0.08);
  const prevNextBd     = isDark ? `${accentTo}40` : alpha(accentTo, 0.28);
  const prevNextHover  = isDark ? `${accentTo}24` : alpha(accentTo, 0.14);
  const prevNextBdHv   = isDark ? `${accentTo}60` : alpha(accentTo, 0.36);
  const progressTrack  = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.08)";
  const selectedText   = isDark ? "#0B1220" : "#ffffff"; // chữ trên gradient

  const progressPct =
    count > 1 ? Math.max(0, Math.min(100, ((page - 1) / (count - 1)) * 100)) : 0;

  return (
    <Stack spacing={1.25} sx={{ mt: 2, pt: 0, ...sx }}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent={center ? "center" : "space-between"}
        spacing={2}
      >
        {!compact && (
          <Typography
            variant="caption"
            sx={{
              mr: 1,
              minWidth: 90,
              textAlign: "right",
              color: isDark ? "rgba(255,255,255,0.72)" : "rgba(0,0,0,0.62)",
            }}
          >
            Page <b style={{ color: isDark ? "#F8FAFC" : "#0f172a" }}>{page}</b> / {count}
          </Typography>
        )}

        <Pagination
          page={page}
          count={count}
          onChange={onChange}
          shape="rounded"
          color="standard"
          size={size}
          siblingCount={1}
          boundaryCount={1}
          showFirstButton={showFirstLast}
          showLastButton={showFirstLast}
          sx={{
            "& .MuiPaginationItem-root": {
              color: baseText,
              border: `1px solid ${chipBorder}`,
              backgroundColor: chipBg,
              backdropFilter: "blur(2px)",
              transition:
                "transform .18s ease, background-color .2s ease, border-color .2s ease, box-shadow .2s ease",
              boxShadow: chipInsetLine,
              "&:hover": {
                transform: "translateY(-1px)",
                borderColor: chipHoverBd,
                backgroundColor: chipHoverBg,
              },
              "&:active": { transform: "translateY(0)" },
              "&:focus-visible": {
                outline: "none",
                boxShadow: focusRing,
              },
            },

            // nút trang đang chọn = gradient + glow nhẹ
            "& .Mui-selected": {
              color: selectedText,
              border: "none",
              backgroundImage: `linear-gradient(135deg, ${accentFrom}, ${accentTo}) !important`,
              boxShadow: `0 0 0 2px ${isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.06)"},
                          0 0 16px ${alpha(accentTo, isDark ? 0.25 : 0.3)}`,
            },

            // prev/next & first/last có nền nhấn mờ
            "& .MuiPaginationItem-previousNext, & .MuiPaginationItem-firstLast": {
              backgroundColor: prevNextBg,
              borderColor: prevNextBd,
              "&:hover": { backgroundColor: prevNextHover, borderColor: prevNextBdHv },
            },

            // dấu "…"
            "& .MuiPaginationItem-ellipsis": { color: dotsColor },
          }}
        />
      </Stack>

      {showProgress && (
        <Box sx={{ alignSelf: "center", width: "min(580px, 100%)", mt: 1 }}>
          <Box
            sx={{
              position: "relative",
              height: 4,
              borderRadius: 999,
              background: progressTrack,
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                width: `${progressPct}%`,
                backgroundImage: `linear-gradient(90deg, ${accentFrom}, ${accentTo})`,
              }}
            />
          </Box>
        </Box>
      )}
    </Stack>
  );
}

SitePagination.propTypes = {
  page: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
  onChange: PropTypes.func,
  showFirstLast: PropTypes.bool,
  center: PropTypes.bool,
  compact: PropTypes.bool,
  showProgress: PropTypes.bool,
  accentFrom: PropTypes.string,
  accentTo: PropTypes.string,
  sx: PropTypes.object,
  size: PropTypes.oneOf(["small", "medium", "large"]),
};

export default SitePagination;
