import React from "react";
import PropTypes from "prop-types";
import { Box, Stack, Typography, Link } from "@mui/material";

export default function FooterBar({ brand = "Stone Blog" }) {
  const year = new Date().getFullYear();

  return (
    <Box component="footer" sx={{ mt: 6, pb: 3 }}>
      <Box
        sx={{
        //   maxWidth: 100%,
          mx: "auto",
          px: 4,
          pt: 2,
          borderTop: "1px solid rgba(255,255,255,0.08)", // đường kẻ mảnh phía trên
        }}
      >
        <Stack
          direction={{ xs: "column", sm: "row" }}
          alignItems={{ xs: "flex-start", sm: "center" }}
          justifyContent="space-between"
          spacing={1.25}
        >
          <Typography variant="caption" sx={{
                color: "rgba(255,255,255,0.8)",
                fontSize: { xs: 14, sm: 15, md: 16 },   // mobile 14px, tablet 15px, desktop 16px
            }}>
            © {year} {brand}. All rights reserved.
          </Typography>

          <Stack direction="row" spacing={2}>
            <Link href="/privacy" underline="hover" sx={{ color: "rgba(255,255,255,0.78)" }}>
              Privacy
            </Link>
            <Link href="/terms" underline="hover" sx={{ color: "rgba(255,255,255,0.78)" }}>
              Terms
            </Link>
            <Link href="/contact" underline="hover" sx={{ color: "rgba(255,255,255,0.78)" }}>
              Contact
            </Link>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}

FooterBar.propTypes = {
  brand: PropTypes.string,
};
