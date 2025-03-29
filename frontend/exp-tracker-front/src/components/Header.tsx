import { AppBar, Toolbar, IconButton, Avatar, Menu, MenuItem, Badge, Box, Typography } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import LogoutIcon from '@mui/icons-material/Logout';


const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  
  // Mock data (replace with real user data)
  const user = { name: "John Doe", avatar: "https://i.pravatar.cc/150" };
  
  // Profile menu handlers
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  // toDo: move to another file
  const handleLogout = async () => {
    const token = localStorage.getItem("token");
    try {
      await axios.post("http://127.0.0.1:8000/logout/", {}, {
        headers: { "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": "true",
            "Authorization": `Token ${token}` }});
    } catch (error) {
      console.error("Logout failed", error);
    }
    dispatch(logout());
    navigate("/signin");
  };

  return (
    <AppBar position="fixed"
    sx={{
      backgroundColor: "#1976d2",
      zIndex: 1201, // Ensure header stacks above sidebar
    }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Logo */}
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>Expense Trackr</Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {/* Notification Bell */}
          <IconButton color="inherit">
            <Badge badgeContent={1} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          {/* Profile Avatar */}
          <IconButton onClick={handleMenuOpen}>
            <Avatar src={user.avatar} alt={user.name} />
          </IconButton>

          {/* Dropdown Menu */}
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
            <MenuItem onClick={handleMenuClose}><PersonOutlineIcon/>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}><ManageAccountsIcon/>Settings</MenuItem>
            <MenuItem onClick={handleLogout}><LogoutIcon/>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
