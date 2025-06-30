import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  AppBar,
  Toolbar,
  Typography,
  Box,
  CssBaseline,
  IconButton,
  useTheme,
  useMediaQuery,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import RateReviewIcon from "@mui/icons-material/RateReview";
import LogoutIcon from "@mui/icons-material/Logout";

const drawerWidth = 240;

const UserLayout = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileOpen, setMobileOpen] = useState(false);

  // Confirmation dialog state
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogoutClick = () => {
    setLogoutDialogOpen(true);
  };
  const handleLogoutCancel = () => {
    setLogoutDialogOpen(false);
  };
  const handleLogoutConfirm = () => {
    // Clear auth (e.g. token)
    localStorage.removeItem("token");
    // Redirect to login
    navigate("/login", { replace: true });
  };

  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/user/dashboard" },
    { text: "Examination", icon: <LibraryBooksIcon />, path: "/user/exams" },
    { text: "Result", icon: <RateReviewIcon />, path: "/user/results" },
    { text: "Logout", icon: <LogoutIcon />, action: handleLogoutClick },
  ];

  const drawer = (
    <div>
      <Toolbar />
      <List>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            onClick={() => {
              if (item.action) {
                item.action();
              } else {
                navigate(item.path);
                if (isMobile) setMobileOpen(false);
              }
            }}
          >
            <ListItemIcon sx={{ color: "inherit" }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          background: "#006a70",
        }}
      >
        <Toolbar>
          {isMobile && (
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" noWrap>
            User Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              background:
                "linear-gradient(to bottom, #006a70, rgb(44, 150, 152))",
              color: "#fff",
            },
          }}
        >
          {drawer}
        </Drawer>

        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              background:
                "linear-gradient(to top, #006a70, rgb(44, 150, 152))",
              color: "#fff",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>

      {/* Logout Confirmation Dialog */}
      <Dialog open={logoutDialogOpen} onClose={handleLogoutCancel}>
        <DialogTitle>Confirm Logout</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to log out?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLogoutCancel}>Cancel</Button>
          <Button onClick={handleLogoutConfirm} autoFocus>
            Yes, Logout
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserLayout;
