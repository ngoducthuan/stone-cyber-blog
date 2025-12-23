import { useState } from "react";
import PropTypes from "prop-types";
import Popper from "@mui/material/Popper";
import Grow from "@mui/material/Grow";
import SoftBox from "components/SoftBox";
import { useTheme, alpha } from "@mui/material/styles";

function DefaultNavbarMenu({ open, close, placement = "bottom-start", children, style = {} }) {
  const [anchor, setAnchor] = useState(false);
  const openMenu  = () => setAnchor(open);
  const closeMenu = () => setAnchor(false);
  const theme = useTheme();

  return (
    <Popper
      anchorEl={anchor || open}
      open={Boolean(anchor) || Boolean(open)}
      placement={placement}
      transition
      modifiers={[{ name: "offset", options: { offset: [0, 2] } }]} //Distance box and header(decrease if error)
      style={{ zIndex: 1300, ...style }}
    >
      {({ TransitionProps }) => (
        <Grow {...TransitionProps} sx={{ transformOrigin: "left top", }}>
            <div
                onMouseEnter={openMenu}
                onMouseLeave={() => { if (typeof close === "function") close(); closeMenu(); }}
                style={{
                  borderRadius: 12,
                  overflow: "hidden",
                  outline: "1px solid rgba(255,255,255,0.14)",
                  outlineOffset: 0,
                  boxShadow: "0 0 0 1px rgba(255,255,255,0.06), 0 12px 32px rgba(0,0,0,.45)",

                  background: "transparent",
                }}
            >
                <SoftBox
                // bgColor="#1d2a35"
                bgColor={theme.palette.background.default}
                shadow="none"              // tránh bóng đen “ăn” vào viền
                borderRadius="inherit"
                p={2}
                >
                {children}
                </SoftBox>
            </div>
        </Grow>
      )}
    </Popper>
  );
}

DefaultNavbarMenu.propTypes = {
  open: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]).isRequired,
  close: PropTypes.oneOfType([PropTypes.func, PropTypes.bool, PropTypes.object]).isRequired,
  placement: PropTypes.string,
  children: PropTypes.node.isRequired,
  style: PropTypes.object,
};

export default DefaultNavbarMenu;
