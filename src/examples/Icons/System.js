import PropTypes from "prop-types";
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import colors from "assets/theme/base/colors";

function SystemSettings({ color = "dark", size = "16px" }) {
  return (
    <SettingsRoundedIcon
      style={{
        fontSize: size,
        color: colors[color] ? colors[color].main : colors.dark.main,
        opacity: 0.95,
        verticalAlign: "middle",
        transform: "translateY(1px)",
        transition: "opacity 0.2s ease-in-out",
      }}
    />
  );
}

SystemSettings.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "dark",
    "light",
    "white",
  ]),
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default SystemSettings;
