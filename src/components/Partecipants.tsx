import { Box, Grid, Skeleton } from "@mui/material";
import { useContext, useEffect } from "react";
import { StorageContext } from "../contexts/StorageContext";
import {PersonComponent} from "./Person";

const persone = [
    {
        id: 0,
        name: "Lopre",
        color: "white",
        isChecked: true,
        counter: 6,
    },
    {
        id: 1,
        name: "fra",
        color: "red",
        isChecked: true,
        counter: 3,
    },
    {
        id: 2,
        name: "lollo",
        color: "blue",
        isChecked: true,
        counter: 8,
    }
]

export default function Partecipants() {

    const {set, get} = useContext(StorageContext)!

    useEffect(() => {
        set(persone)
      }, [])

    return (
        <Box>
            <Grid
                sx={{
                    height: "calc(100% - 110px)",
                    overflowY: "auto",
                    bottom: "0",
                }}
                container
                gap={2}
                justifyContent="space-between"
                alignContent={"flex-start"}
                >
                {persone.length > 0
                    ? persone.map((person, idx) => {
                        return (
                            <Grid
                                key={idx}
                                sx={{
                                maxWidth: {
                                    xs: " calc(50% - 8px)",
                                    sm: " calc(50% - 8px)",
                                    md: " calc(25% - 16px)",
                                    lg: " calc(25% - 16px)",
                                },
                                width: "100%",
                                }}
                                item
                            >
                                <PersonComponent person = {person}/>
                            </Grid>
                        );
                    })
                    : Array(4)
                        .fill("")
                        .map((_, idx) => (
                    <Grid
                        key={idx}
                        sx={{
                        maxWidth: {
                            xs: " calc(50% - 8px)",
                            sm: " calc(50% - 8px)",
                            md: " calc(25% - 16px)",
                            lg: " calc(25% - 16px)",
                        },
                        width: "100%",
                        }}
                        item
                    >
                        <Skeleton variant="rounded" height={105} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}