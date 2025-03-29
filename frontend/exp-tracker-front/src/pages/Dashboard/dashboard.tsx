import { Box, Toolbar } from "@mui/material";
import Header from "../../components/Header";
import Sidebar from "../../components/SideBar";
import CardGrid from "../../components/CardGrid";
import ChartGrid from "../../components/ChartsGrid";

const Dashboard = () => { 
  return (
    <Box >
      <Header />
        <Sidebar />   
        <Toolbar />
        <CardGrid />   
        <ChartGrid/>
    </Box>
  );
};

export default Dashboard;
