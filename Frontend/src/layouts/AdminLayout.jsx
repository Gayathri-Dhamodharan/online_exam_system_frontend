// // import React from 'react'

// // const AdminLayout = () => {
// //   return (
// //     <div>
// //       fcbhcgfbcg
// //     </div>
// //   )
// // }

// // export default AdminLayout
// import React from 'react';
// import { Outlet } from 'react-router-dom';
// import {
//   Drawer,
//   List,
//   ListItem,
//   ListItemIcon,
//   ListItemText,
//   AppBar,
//   Toolbar,
//   Typography,
//   Box,
//   CssBaseline,
// } from '@mui/material';
// import DashboardIcon from '@mui/icons-material/Dashboard';
// import LibraryBooksIcon from '@mui/icons-material/LibraryBooks'; // for Question Bank
// import DescriptionIcon from '@mui/icons-material/Description';  // for Question Paper
// import RateReviewIcon from '@mui/icons-material/RateReview';    // for Review

// import { useNavigate } from 'react-router-dom';

// const drawerWidth = 240;

// const AdminLayout = () => {
//   const navigate = useNavigate();

//   const menuItems = [
//     { text: "Dashboard", icon: <DashboardIcon />, path: "/admin/dashboard" },
//     {
//       text: "Question Bank",
//       icon: <LibraryBooksIcon />,
//       path: "/admin/questions",
//     },
//     {
//       text: "Question Paper",
//       icon: <DescriptionIcon />,
//       path: "/admin/papers",
//     },
//     { text: "Review", icon: <RateReviewIcon />, path: "/admin/results" },
//   ];


//   return (
//     <Box sx={{ display: "flex" }}>
//       <CssBaseline />

//       {/* AppBar */}
//       <AppBar
//         position="fixed"
//         sx={{
//           zIndex: (theme) => theme.zIndex.drawer + 1,
//           background: "#006a70",
//         }}
//       >
//         <Toolbar>
//           <Typography variant="h6" noWrap component="div">
//             Admin Dashboard
//           </Typography>
//         </Toolbar>
//       </AppBar>

//       {/* Drawer */}
//       <Drawer
//         variant="permanent"
//         sx={{
//           width: drawerWidth,
//           flexShrink: 0,
//           [`& .MuiDrawer-paper`]: {
//             width: drawerWidth,
//             boxSizing: "border-box",
//             background: "linear-gradient(to bottom, #b2dde1, #48a7a9, #006a70)",
//             color: "#fff",
//           },
//         }}
//       >
//         <Toolbar />
//         <List>
//           {menuItems.map((item) => (
//             <ListItem
//               button
//               key={item.text}
//               onClick={() => navigate(item.path)}
//             >
//               <ListItemIcon sx={{ color: "inherit" }}>{item.icon}</ListItemIcon>
//               <ListItemText primary={item.text} />
//             </ListItem>
//           ))}
//         </List>
//       </Drawer>

//       {/* Main Content */}
//       <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
//         <Toolbar />
//         <Outlet />
//       </Box>
//     </Box>
//   );
// };

// export default AdminLayout;
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
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import DescriptionIcon from "@mui/icons-material/Description";
import RateReviewIcon from "@mui/icons-material/RateReview";
import LogoutIcon from "@mui/icons-material/Logout";


const drawerWidth = 240;

const AdminLayout = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/admin/dashboard" },
    {
      text: "Question Bank",
      icon: <LibraryBooksIcon />,
      path: "/admin/questions",
    },
    {
      text: "Question Paper",
      icon: <DescriptionIcon />,
      path: "/admin/papers",
    },
    { text: "Review", icon: <RateReviewIcon />, path: "/admin/results" },
    { text: "Logout", icon: <LogoutIcon />, path: "/" },
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
              navigate(item.path);
              if (isMobile) setMobileOpen(false);
            }}
          >
            <ListItemIcon sx={{ color: "inherit" }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* AppBar */}
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
            Admin Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Drawer */}
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
        aria-label="admin menu"
      >
        {/* Mobile drawer */}
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
                "linear-gradient(to bottom, #b2dde1, #48a7a9, #006a70)",
              color: "#fff",
            },
          }}
        >
          {drawer}
        </Drawer>

        {/* Desktop drawer */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              background:
                "linear-gradient(to bottom, #b2dde1, #48a7a9, #006a70)",
              color: "#fff",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Main content */}
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
    </Box>
  );
};

export default AdminLayout;
