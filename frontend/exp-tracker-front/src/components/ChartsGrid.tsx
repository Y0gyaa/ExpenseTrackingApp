import { Box, Card, CardContent, Typography } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell } from "recharts";

const barData = [
  { name: "Jan", sales: 400, profit: 200 },
  { name: "Feb", sales: 300, profit: 150 },
  { name: "Mar", sales: 500, profit: 250 },
  { name: "Apr", sales: 700, profit: 300 },
];

const pieData = [
  { name: "Product A", value: 600 },
  { name: "Product B", value: 400 },
  { name: "Product C", value: 300 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

const ChartGrid = () => {
  return (
    <Box
      sx={{
        paddingTop:"1%",
        marginLeft: "19%",
        height:"450px",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: 3,
      }}
    >
      {/* Multi-Bar Chart Card */}
      <Card sx={{ textAlign: "center", p: 2, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h6" color="textSecondary">
            Sales & Profit Over Time
          </Typography>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={barData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="sales" fill="#1976d2" name="Sales" />
              <Bar dataKey="profit" fill="#ff9800" name="Profit" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Donut Pie Chart Card */}
      <Card sx={{ textAlign: "center", p: 2, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h6" color="textSecondary">
            Product Distribution
          </Typography>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                cx="50%"
                cy="50%"
                innerRadius={50} // Makes it a donut chart
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
              >
                {pieData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ChartGrid;
