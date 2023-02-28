import { Box, Typography } from "@mui/material";
import Partecipants from "../components/Partecipants";
import {Wheel} from "../components/Wheel";
import { StorageContextProvider } from "../contexts/StorageContext";

export const MainPage = () => {
    return (
        <Box
            alignItems="center"
        >
            <Typography
                component="div"
                color="white"
                fontWeight="bold"
                fontSize="65px"
            >
                La ruota del
            </Typography>
            <Typography
                component="div"
                color="#846842"
                fontWeight="bold"
                fontSize="150px"
                marginTop="-60px"
            >
                Caffè
            </Typography>
            <StorageContextProvider>
                <Wheel/>
                <Partecipants/>
            </StorageContextProvider>
        </Box>
    );
}