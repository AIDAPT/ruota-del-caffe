import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const ErrorPage = () => {
    const navigate = useNavigate();
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          minHeight: "100vh",
          backgroundColor: "#CCB697",
        }}
      >
        <Typography variant="h3" style={{ color: "white" }}>
          404
        </Typography>
        <Typography variant="h6" style={{ color: "white" }}>
          Questa pagina non esiste
        </Typography>
        <Button
          sx={{
            border: "3px solid #846842",
            color: "#846842",
            textDecoration: "none",
            padding: "5px",
            borderRadius: "5px",
            marginTop: "10px",
          }}
          onClick={() => navigate("/")}
        >
          Back Home
        </Button>
      </Box>
    );
  };
  