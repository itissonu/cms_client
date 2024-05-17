import { useState } from "react";
import {
  Box,
  Button,
  Typography,
  CircularProgress,
  Alert,
} from "@mui/material";
import { executeCode } from "../utils/Api";


const Output = ({ editorRef, language }) => {
  const [output, setOutput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const runCode = async () => {
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;
    try {
      setIsLoading(true);
      const { run: result } = await executeCode(language, sourceCode);
      setOutput(result.output.split("\n"));
      result.stderr ? setIsError(true) : setIsError(false);
    } catch (error) {
      console.log(error);
      alert("An error occurred: " + (error.message || "Unable to run code"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box width="100%">
      <Typography mb={2} variant="h6">
        Output
      </Typography>
      <Button
        variant="outlined"
        color="success"
        sx={{ mb: 2 }}
        onClick={runCode}
        disabled={isLoading}
      >
        {isLoading ? <CircularProgress size={24} /> : "Run Code"}
      </Button>
      <Box
        height="75vh"
        p={2}
        sx={{
          color: isError ? "red" : "inherit",
          border: "1px solid",
          borderRadius: 1,
          borderColor: isError ? "red" : "#333",
        }}
      >
        {output ? (
          output.map((line, i) => (
            <Typography key={i} variant="body2">
              {line}
            </Typography>
          ))
        ) : (
          <Typography variant="body2">
            Click "Run Code" to see the output here
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default Output;
