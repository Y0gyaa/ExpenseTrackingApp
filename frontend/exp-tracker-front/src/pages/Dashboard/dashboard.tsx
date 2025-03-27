
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    <div>
      <h1>Dashboard</h1>
      <Button variant="contained" color="secondary" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
};

export default Dashboard;
