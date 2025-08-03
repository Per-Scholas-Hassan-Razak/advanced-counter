import { Box, Button, Paper, Typography } from "@mui/material";

const AdvancedCounter: React.FC = () => {
  return (
    <Paper
      elevation={23}
      sx={{
        padding: 4,
        borderRadius: 2,
        width: "100%",
        maxWidth: "500px",
        display: "flex",
        flexDirection: "column",
        gap: 5,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="h6" >Advanced Counter</Typography>
      <Typography variant="h4">Current Count: 0</Typography>

      <Box>
        <Button>Decrement</Button>
        <Button>Increment</Button>
        <Button>Reset</Button>
      </Box>

      <Typography variant="h6">Display Message: N/A</Typography>

      <Typography variant="h6">Count History</Typography>

      <Box>
        {/* need to display a history of count changes as they happen */}
      </Box>
    </Paper>
  );
};

export default AdvancedCounter;
