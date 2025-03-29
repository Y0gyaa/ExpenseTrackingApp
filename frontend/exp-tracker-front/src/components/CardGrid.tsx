import { Box, Card, CardContent, Typography } from "@mui/material";

const cards = [
  { title: "Profit/Loss", number: "$3,400" },
  { title: "Total Income", number: "$5,711" },
  { title: "Total Expenses", number: "$2,311" },
];

const CardGrid = () => {
  return (
    <Box
      sx={{
        paddingTop:"1%",
        marginLeft: "30%",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 250px))",
        gap: 4,
      }}
    >
      {cards.map((card, index) => (
        <Card key={index} sx={{ textAlign: "center", p: 2, boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h6" color="textSecondary">
              {card.title}
            </Typography>
            <Typography variant="h4" fontWeight="bold">
              {card.number}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default CardGrid;
