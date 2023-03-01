import { Box, Grid, Skeleton, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { StorageContext, StorageDataProps } from "../contexts/StorageContext";
import {PersonComponent, PersonProps} from "./Person";

export default function Partecipants() {

    const {set, get} = useContext(StorageContext)!

    //set([
    //    {
    //        id: 1,
    //        name: "Lopre",
    //        color: "white",
    //        isChecked: true,
    //        counter: 6,
    //    },
    //    {
    //        id: 2,
    //        name: "Fra",
    //        color: "red",
    //        isChecked: true,
    //        counter: 3,
    //    },
    //    {
    //        id: 3,
    //        name: "Lollo",
    //        color: "blue",
    //        isChecked: true,
    //        counter: 8,
    //    },
    //    {
    //        id: 4,
    //        name: "Ste",
    //        color: "green",
    //        isChecked: true,
    //        counter: 1,
    //    },
    //    {
    //        id: 5,
    //        name: "KC",
    //        color: "lightblue",
    //        isChecked: true,
    //        counter: 4,
    //    }
    //])

    const createNewPerson = () => void {
        
    }

    const checkPerson = (person: PersonProps) => {

        const updatedCheckState = get().map(object => {
            if (object.id === person.id) {
                return {
                    ...object,
                    isChecked: !person.isChecked
                };
            }
            return object
        })
        set(updatedCheckState)

    }

    const deletePerson = (person: PersonProps) => {
        
        //const updateDeleteState = get()
        //for (let i:number = 0; i<updateDeleteState.length; i++) {
        //    if (updateDeleteState[i].id === person.id) {
        //        updateDeleteState.splice(i, 1)
        //    }
        //}
        //set(updateDeleteState)

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
                    justifyContent="space-between"
                    alignContent={"flex-start"}
                >
                {get().length > 0
                    ? get().map((globalState, idx) => {
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
                                <PersonComponent person={globalState} checkPerson={checkPerson} deletePerson={deletePerson}/>
                            </Grid>
                        );
                    })
                    : Array(0)
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
                    <Grid
                        marginBottom="5px"
                        display= "webkit-flex"
                        justify-content= "center"
                        webkit-align-items= "center"
                        webkit-box-align= "center"
                        sx={{
                        maxWidth: {
                            xs: " calc(50% - 8px)",
                            sm: " calc(50% - 8px)",
                            md: " calc(25% - 16px)",
                            lg: " calc(25% - 16px)",
                        },
                        backgroundColor: "#CCB697",
                        borderRadius: "20px",
                        width: "100%",
                        height: "117px"
                        }}
                        item
                    >
                        <Box
                            onClick={createNewPerson()}
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
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}