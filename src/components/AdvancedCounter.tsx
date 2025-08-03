import {
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  Paper,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";

const AdvancedCounter: React.FC = () => {
  const theme = useTheme();
  const COUNT_HISTORY_KEY = 'countHistory'

  const [count, setCount] = useState<number | null>(null);
  const [countHistory, setCountHistory] = useState<number[]>([] as number[]);
  const [stepValue, setStepValue] = useState(1);

  const handleIncrement = () => {
    setCount((prevCount) => (prevCount !== null ? prevCount + stepValue : 0));
  };

  const handleDecrement = () => {
    setCount((prevCount) => (prevCount !== null ? prevCount - stepValue : 0));
  };

  const handleReset = () => {
    setCount(null);
    setCountHistory([]);
    setStepValue(1);
  };

  useEffect(() => {
    const savedHistory = localStorage.getItem(COUNT_HISTORY_KEY);
    if (savedHistory) {
      setCountHistory(JSON.parse(savedHistory));
    }
  }, []);

  useEffect(() => {
    if (count !== null) {
      setCountHistory((prevCountArray) => [count, ...prevCountArray]);
    }
  }, [count]);

  useEffect(() => {
    localStorage.setItem(COUNT_HISTORY_KEY, JSON.stringify(countHistory));
  }, [countHistory]);

  const handleStepValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStepValue(Number(e.target.value));
  };

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
        justifyContent: "flex-start",
        alignItems: "center",
        height: "700px",
      }}
    >
      <Typography variant="h6">Advanced Counter</Typography>
      <Typography variant="h4">Current Count: {count}</Typography>

      <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          gap: 2,
        }}
      >
        <Button variant="contained" onClick={handleDecrement}>
          Decrement
        </Button>
        <Button variant="contained" onClick={handleIncrement}>
          Increment
        </Button>
        <Button variant="outlined" color="secondary" onClick={handleReset}>
          Reset
        </Button>
      </Box>

      <TextField
        label="Set Step Value"
        type="number"
        inputProps={{ min: 0, max: 100 }}
        value={stepValue}
        onChange={handleStepValueChange}
        sx={{
          width: "120px",
        }}
      />
      <Typography variant="h6">Display Message: N/A</Typography>

      <Typography variant="h6">Count History</Typography>

      <Box
        sx={{
          width: "100%",
          maxHeight: "200px",
          overflowY: "auto",
          border: `1px solid ${theme.palette.background.paper}`,
          padding: 2,
          backgroundColor: theme.palette.background.paper,
        }}
      >
        {countHistory.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            No History Yet
          </Typography>
        ) : (
          <List dense>
            {countHistory.map((prevCount, index) => (
              <ListItem key={index} disablePadding>
                <ListItemText primary={prevCount}></ListItemText>
              </ListItem>
            ))}
          </List>
        )}
      </Box>
    </Paper>
  );
};

export default AdvancedCounter;
