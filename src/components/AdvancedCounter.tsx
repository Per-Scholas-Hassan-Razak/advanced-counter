import {
    Alert,
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
  const COUNT_HISTORY_KEY = "countHistory";
  const COUNT_KEY = "count";

  const [count, setCount] = useState<number>(0);
  const [countHistory, setCountHistory] = useState<number[]>([] as number[]);
  const [stepValue, setStepValue] = useState(1);
  const [message, setMessage] = useState("");
  const [hasInitialized, setHasInitialized] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  const handleIncrement = () => {
    setCount((prevCount) => (prevCount !== null ? prevCount + stepValue : 0));
  };

  const handleDecrement = () => {
    setCount((prevCount) => (prevCount !== null ? prevCount - stepValue : 0));
  };

  const handleReset = () => {
    setIsResetting(true);
    setCount(0);
    setCountHistory([]);
    setStepValue(1);
    setMessage('History Cleared')
    localStorage.removeItem(COUNT_KEY);
    localStorage.removeItem(COUNT_HISTORY_KEY);
  };

  useEffect(() => {
    const savedHistory = localStorage.getItem(COUNT_HISTORY_KEY);
    const savedCount = localStorage.getItem(COUNT_KEY);

    if (savedHistory) {
      setCountHistory(JSON.parse(savedHistory));
    }
    if (savedCount) {
      setCount(JSON.parse(savedCount));
    }
  }, []);

  useEffect(() => {
    if (hasInitialized) {
      setCountHistory((prevCountArray) => [count, ...prevCountArray]);
    } else {
      setHasInitialized(true);
    }
  }, [count]);

  useEffect(() => {
    localStorage.setItem(COUNT_KEY, JSON.stringify(count));
  }, [count]);

  useEffect(() => {
    if (!isResetting) {
      localStorage.setItem(COUNT_HISTORY_KEY, JSON.stringify(countHistory));
      setMessage("Count History Saved");
    } else {
      setIsResetting(false);
    }
  }, [countHistory]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp") {
        setCount((prevCount) =>
          prevCount !== null ? prevCount + stepValue : 0
        );
      } else if (e.key === "ArrowDown") {
        setCount((prevCount) =>
          prevCount !== null ? prevCount - stepValue : 0
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [stepValue]);

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
      <Typography variant="h4" fontWeight="bold">
        Advanced Counter
      </Typography>
      <Typography variant="h5" color="primary" sx={{ mb: 2 }}>
        Current Count: {count}
      </Typography>

      <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          gap: 2,
          flexWrap: "wrap",
        }}
      >
        <Button variant="contained" color="primary" onClick={handleDecrement}>
          - Decrement
        </Button>
        <Button variant="contained" color="primary" onClick={handleIncrement}>
          + Increment
        </Button>
        <Button variant="outlined" color="secondary" onClick={handleReset}>
          Reset All
        </Button>
      </Box>
      <Box display="flex" alignItems="center" gap={2}>
        <Typography variant="body1">Step Value:</Typography>
        <TextField
          label="Set Step Value"
          type="number"
          inputProps={{ min: 1, max: 100 }}
          value={stepValue}
          onChange={handleStepValueChange}
          sx={{
            width: "120px",
          }}
        />
      </Box>
      {message && (
        <Alert severity="success" variant="outlined" sx={{ mt: 1 }}>
          {message}
        </Alert>
      )}

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
        <Typography variant="h6">Count History</Typography>
        {countHistory.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            No History Yet
          </Typography>
        ) : (
          <List>
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
