import { Box, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import { Partecipants } from "../components/Partecipants";
import { Wheel } from "../components/Wheel";
import { StorageContextProvider } from "../contexts/StorageContext";

export const MainPage = () => {
    return (
        <Stack
            justifyContent= "center"
            alignItems="center"
        >
            <Box
            alignItems="center"
            marginX="5px"
            maxWidth="900px"
            >
                <Typography
                    variant="h2"
                >
                    La ruota del
                </Typography>
                <Typography
                    variant="h1"
                    marginTop="-20px"
                    marginBottom="20px"
                >
                    Caffè
                </Typography>
                <StorageContextProvider>
                    <Wheel/>
                    <Partecipants/>
                </StorageContextProvider>
            </Box>
        </Stack>
    );
}