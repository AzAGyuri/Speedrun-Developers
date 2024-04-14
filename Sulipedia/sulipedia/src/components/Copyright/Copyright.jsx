import { Tooltip, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import SpeedrunLogo from "../../resources/logo-no-background.png";

export function Copyright() {
  return (
    <Typography
      className="fontSize"
      style={{ fontSize: 20 }}
      variant="body2"
      color="text.secondary"
      align="center"
    >
      {"Copyright © "}
      <Tooltip title="Főoldal">
        <Link color="inherit" to="/kezdo">
          Sulipedia <img style={{ width: 20 }} src={SpeedrunLogo} alt="Logo" />
        </Link>{" "}
      </Tooltip>
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
