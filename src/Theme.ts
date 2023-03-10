import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  components: {
  },
  typography: {
    h1: {
      color: "#846842",
      fontWeight: "bold",
      fontSize: "150px"
    },
    h2: {
      color: "white",
      fontWeight: "bold",
      fontSize: "65px"
    },
    h3: {
      color:"#846842",
      fontWeight:"bold",
      fontSize:"40px"
    },
    h4: {
      fontWeight:"bold",
      fontSize:"25px"
    },
    h5: {
      fontWeight:"bold",
      fontSize:"25px"
    },
    body1: {
      color:"#846842",
      fontWeight:"bold",
      fontSize:"30px"
    }
  },
  palette: {
    background: {},
    primary: {
      main: "#ccb697",
    },
    error: {
      main: "#FF1616",
    },
    secondary: {
      main: "#846842",
    },
    common: {
      white: "#ffffff"
    }
  },
});
