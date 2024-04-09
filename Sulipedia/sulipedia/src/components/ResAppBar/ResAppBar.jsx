import "./ResAppBar.css";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Drawer from "@mui/material/Drawer";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import SulipediaLogo from "../../resources/logo.png";
import FormatListBulletedTwoToneIcon from "@mui/icons-material/FormatListBulletedTwoTone";
import SupervisedUserCircleTwoToneIcon from "@mui/icons-material/SupervisedUserCircleTwoTone";

import PersonIcon from "@mui/icons-material/Person";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import EngineeringIcon from "@mui/icons-material/Engineering";
import LogoutIcon from "@mui/icons-material/Logout";

export function ResAppBar({ setIsLoading }) {
  const isSmallScreen = useMediaQuery("(max-width:950px)");
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogOut = () => {
    localStorage.removeItem("currentUserId");
    localStorage.removeItem("jwt");
    handleCloseUserMenu();
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const beforeNavigate = () => {
    setIsLoading(true);
  };

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {isSmallScreen ? (
              <>
                <Tooltip title="Főoldal, Tananyagok, Tesztek, Csoportjaim">
                  <IconButton onClick={toggleDrawer} sx={{ p: 0, mr: 1 }}>
                    <Avatar>
                      <FormatListBulletedTwoToneIcon />
                    </Avatar>
                  </IconButton>
                </Tooltip>
                <Drawer
                  anchor="right"
                  open={drawerOpen}
                  onClose={toggleDrawer}
                  sx={{ "& .MuiDrawer-paper": { backgroundColor: "#87a19f", height: '40vh' } }}
                >
                  <Box
                    sx={{ width: 250, height: '100vh' }}
                    role="presentation"
                    onClick={toggleDrawer}
                    onKeyDown={toggleDrawer}
                  >
                    <Tooltip title="Főoldal">
                      <Link
                        to="/kezdo"
                        rel="noreferrer"
                        style={{ textDecoration: "none", color: "black" }}
                        onClick={beforeNavigate}
                      >
                        <MenuItem
                          sx={{
                            my: 1,
                            color: "white",
                            display: "block",
                            backgroundColor: "#33FFBE",
                            border: "1px solid black",
                            height: '22%'
                          }}
                        >
                          <Typography textAlign="center">Sulipedia</Typography>
                        </MenuItem>
                      </Link>
                    </Tooltip>
                    <Link
                      to="/Curriculums"
                      style={{ textDecoration: "none", color: "black" }}
                      onClick={beforeNavigate}
                    >
                      <MenuItem
                        sx={{
                          my: 1,
                          color: "white",
                          display: "block",
                          backgroundColor: "#FFF033",
                          border: "1px solid black",
                          height: '22%'
                        }}
                      >
                        <Typography textAlign="center">Tananyagok</Typography>
                      </MenuItem>
                    </Link>
                    <Link
                      to="/Tests"
                      style={{ textDecoration: "none", color: "black" }}
                      onClick={beforeNavigate}
                    >
                      <MenuItem
                        sx={{
                          my: 1,
                          color: "white",
                          display: "block",
                          backgroundColor: "#FF5733",
                          border: "1px solid black",
                          height: '22%'
                        }}
                      >
                        <Typography textAlign="center">Tesztek</Typography>
                      </MenuItem>
                    </Link>
                    <Link
                      to="/MyGroups"
                      style={{ textDecoration: "none", color: "black" }}
                      onClick={beforeNavigate}
                    >
                      <MenuItem
                        sx={{
                          my: 1,
                          color: "white",
                          display: "block",
                          backgroundColor: "#7AFF33",
                          border: "1px solid black",
                          height: '22%',
                        }}
                      >
                        <Typography textAlign="center">Csoportjaim</Typography>
                      </MenuItem>
                    </Link>
                  </Box>
                </Drawer>
              </>
            ) : (
              <>
                <div>
                  <Tooltip title="Főoldal">
                    <Link to="/kezdo" rel="noreferrer" onClick={beforeNavigate}>
                      <img
                        alt="Sulipedia logója"
                        id="suliLogo"
                        sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
                        src={SulipediaLogo}
                      />
                    </Link>
                  </Tooltip>
                </div>

                <Typography
                  variant="h6"
                  noWrap
                  component="a"
                  href="#app-bar-with-responsive-menu"
                  sx={{
                    mr: 2,
                    display: { xs: "none", md: "flex" },
                    fontFamily: "monospace",
                    fontWeight: 700,
                    letterSpacing: ".3rem",
                    color: "inherit",
                    textDecoration: "none",
                  }}
                >
                  <Tooltip title="Főoldal">
                    <Link
                      to="/kezdo"
                      rel="noreferrer"
                      style={{ textDecoration: "none", color: "white" }}
                      underline="none"
                      onClick={beforeNavigate}
                    >
                      Sulipedia
                    </Link>
                  </Tooltip>
                </Typography>

                <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                  <Link
                    style={{ textDecoration: "none", color: "white" }}
                    to="/Curriculums"
                    underline="none"
                    rel="noreferrer"
                    color="inherit"
                    onClick={beforeNavigate}
                  >
                    <Button
                      className="menuk"
                      sx={{
                        my: 2,
                        color: "white",
                        display: "block",
                        backgroundColor: "#FFF033",
                        border: "1px solid black",
                      }}
                    >
                      Tananyagok
                    </Button>
                  </Link>

                  <Link
                    style={{ textDecoration: "none", color: "white" }}
                    to="/Tests"
                    underline="none"
                    rel="noreferrer"
                    color="inherit"
                    onClick={beforeNavigate}
                  >
                    <Button
                      className="menuk"
                      sx={{
                        my: 2,
                        color: "white",
                        display: "block",
                        marginLeft: "20px",
                        backgroundColor: "#FF5733",
                        border: "1px solid black",
                      }}
                    >
                      Tesztek
                    </Button>
                  </Link>
                  <Link
                    style={{ textDecoration: "none", color: "white" }}
                    to="/MyGroups"
                    underline="none"
                    rel="noreferrer"
                    color="inherit"
                    onClick={beforeNavigate}
                  >
                    <Button
                      className="menuk"
                      sx={{
                        my: 2,
                        color: "white",
                        display: "block",
                        marginLeft: "20px",
                        backgroundColor: "#7AFF33",
                        border: "1px solid black",
                      }}
                    >
                      Csoportjaim
                    </Button>
                  </Link>
                </Box>
              </>
            )}

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Beállítások, Profilom, Kijelentkezés, stb">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar>
                    {" "}
                    <SupervisedUserCircleTwoToneIcon />
                  </Avatar>
                </IconButton>
              </Tooltip>

              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <Link
                  style={{ textDecoration: "none", color: "black" }}
                  to="/MyProfile"
                  underline="none"
                  rel="noreferrer"
                  color="inherit"
                  onClick={beforeNavigate}
                >
                  <MenuItem
                    onClick={handleCloseUserMenu}
                    sx={{
                      my: -1,
                      color: "black",
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "0.1px",
                      borderTop: "10px solid rgba(0, 0, 0, 0.5)",
                      borderBottom: "6px solid rgba(0, 0, 0, 0.5)",
                      backgroundColor: "rgba(25, 118, 210, 0.8)",
                      transition: "background-color 0.3s ease",
                      "&:hover": {
                        backgroundColor: "rgba(25, 118, 210)",
                      },
                    }}
                  >
                    <PersonIcon />
                    <Typography textAlign="center" sx={{ marginLeft: 1 }}>
                      Profilom
                    </Typography>
                  </MenuItem>
                </Link>

                <Link
                  style={{ textDecoration: "none", color: "black" }}
                  to="/Settings"
                  underline="none"
                  rel="noreferrer"
                  color="inherit"
                  onClick={beforeNavigate}
                >
                  <MenuItem
                    onClick={handleCloseUserMenu}
                    sx={{
                      my: 0,
                      color: "black",
                      display: "flex",
                      alignItems: "center",

                      borderBottom: "6px solid rgba(0, 0, 0, 0.5)",
                      backgroundColor: "rgba(25, 118, 210, 0.8)",
                      transition: "background-color 0.3s ease",
                      "&:hover": {
                        backgroundColor: "rgba(25, 118, 210)",
                      },
                    }}
                  >
                    <ManageAccountsIcon />
                    <Typography textAlign="center" sx={{ marginLeft: 1 }}>
                      Beállítások
                    </Typography>
                  </MenuItem>
                </Link>

                <Link
                  style={{ textDecoration: "none", color: "black" }}
                  to="/AboutUs"
                  underline="none"
                  rel="noreferrer"
                  color="inherit"
                >
                  <MenuItem
                    onClick={handleCloseUserMenu}
                    sx={{
                      my: 0,
                      color: "black",
                      display: "flex",
                      alignItems: "center",

                      borderBottom: "6px solid rgba(0, 0, 0, 0.5)",
                      backgroundColor: "rgba(25, 118, 210, 0.8)",
                      transition: "background-color 0.3s ease",
                      "&:hover": {
                        backgroundColor: "rgba(25, 118, 210)",
                      },
                    }}
                  >
                    <EngineeringIcon />
                    <Typography textAlign="center" sx={{ marginLeft: 1 }}>
                      Rólunk, a készítőkről
                    </Typography>
                  </MenuItem>
                </Link>

                <Link
                  style={{ textDecoration: "none", color: "black" }}
                  to="/SignIn"
                  underline="none"
                  rel="noreferrer"
                  color="inherit"
                  onClick={beforeNavigate}
                >
                  <MenuItem
                    onClick={handleLogOut}
                    sx={{
                      my: -1,
                      color: "black",
                      display: "flex",
                      alignItems: "center",
                      marginTop: "0.01px",
                      borderBottom: "10px solid rgba(0, 0, 0, 0.5)",
                      backgroundColor: "rgba(25, 118, 210, 0.8)",
                      transition: "background-color 0.3s ease",
                      "&:hover": {
                        backgroundColor: "rgba(25, 118, 210)",
                      },
                    }}
                  >
                    <LogoutIcon />
                    <Typography textAlign="center" sx={{ marginLeft: 1 }}>
                      Kilépés
                    </Typography>
                  </MenuItem>
                </Link>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}
