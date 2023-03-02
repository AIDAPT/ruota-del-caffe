import { Box, Grid, Skeleton, Typography } from "@mui/material";
import { useContext, useEffect, useRef, useState } from "react";
import { StorageContext, StorageDataProps } from "../contexts/StorageContext";
import {PersonComponent, PersonProps} from "./Person";

export default function Partecipants() {

    const {set, storageData} = useContext(StorageContext)!

    const hasInizialized = useRef(false)
    useEffect(() => {
        if(!hasInizialized.current) {
            hasInizialized.current = true
            set([
                {
                    id: 1,
                    name: "Lopre",
                    color: "white",
                    isChecked: true,
                    counter: 6,
                },
                {
                    id: 2,
                    name: "Fra",
                    color: "red",
                    isChecked: true,
                    counter: 3,
                },
                {
                    id: 3,
                    name: "Lollo",
                    color: "blue",
                    isChecked: true,
                    counter: 8,
                },
                {
                    id: 4,
                    name: "Ste",
                    color: "green",
                    isChecked: true,
                    counter: 1,
                },
                {
                    id: 5,
                    name: "KC",
                    color: "lightblue",
                    isChecked: true,
                    counter: 4,
                }
            ])
        }
    }, [hasInizialized.current])

    const createNewPerson = (event: React.MouseEvent<HTMLElement>) => {
        //TODO vedere modal fantacalcio CoachButton
    }

    const checkPerson = (person: PersonProps) => {

        const items = storageData
        console.log(items)
        const idx = items.findIndex(p => p.id === person.id)
        items[idx]!.isChecked = !person.isChecked
        set(items)

    }

    const deletePerson = (person: PersonProps) => {
        
        const updateDeleteState = storageData.filter(p => p.id !== person.id)
        set(updateDeleteState)

    }

    return (
        <Box
            margin="15px"
            marginY="20px"
            marginBottom="20px"
            paddingBottom="15px"
            sx={{
                backgroundColor: "white",
                borderRadius: "20px"
            }}
        >
            <Typography
                component="div"
                color="#846842"
                fontWeight="bold"
                fontSize="40px"
                marginBottom="5px"
            >
                Partecipanti
            </Typography>
            <Box
                marginX="17px"
            >
                <Grid
                    sx={{
                        height: "calc(100% - 110px)",
                        overflowY: "auto",
                        bottom: "0",
                    }}
                    container
                    gap={2}
                    display="grid"
                    gridTemplateColumns= {{
                        md:"repeat(4, 1fr)",
                        sm:"repeat(3, 1fr)",
                        xs:"repeat(2, 1fr)"
                    }}
                    alignContent={"flex-start"}
                >
                    {storageData.map((globalState, idx) => {
                        return (
                            <Grid
                                key={idx}
                                sx={{
                                width: "100%",
                                }}
                                item
                            >
                                <PersonComponent person={globalState} checkPerson={checkPerson} deletePerson={deletePerson}/>
                            </Grid>
                        );
                    })}
                    <Grid
                        key={-1}
                        sx={{
                            width: "100%",
                        }}
                        item
                    >
                        <Box
                            onClick={createNewPerson}
                            display= "webkit-flex"
                            justify-content= "center"
                            webkit-align-items= "center"
                            webkit-box-align= "center"
                            sx={{
                                backgroundColor: "#CCB697",
                                borderRadius: "20px",
                                height: "117px",
                                width: "100%",
                                minWidth: "145px"
                            }}
                        >
                            <Box
                            sx={{
                                height: "90px",
                                margin: "auto",
                                width: "90px",
                                fontSize: "65px",
                                borderRadius: "50%",
                                backgroundColor: "white",
                                color: "#846842",
                                textAlign: "center",
                                }}
                            >
                                +
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}