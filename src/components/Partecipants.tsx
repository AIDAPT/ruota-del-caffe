import { Box, Button, Dialog, DialogActions, DialogContent, Grid, Stack, TextField, Typography } from "@mui/material";
import { ChangeEvent, useContext, useState } from "react";
import { StorageContext, StorageDataProps } from "../contexts/StorageContext";
import {PersonComponent, PersonProps} from "./Person";

type NewPersonProps = {
    formName: string,
    formCounter: number | undefined,
}

export function Partecipants() {

    const {set, storageData} = useContext(StorageContext)!

    const [open, setOpen] = useState<boolean>(false)

    const [newPerson, setNewPerson] = useState<NewPersonProps>({
        formName: "",
        formCounter: undefined,
    })

    const handleDialogOpen = (_:any) => {
        setOpen(() => true)
    }

    const handleDialogClose = (_:any) => {
        setOpen(() =>false)
        setNewPerson({
            formName: "",
            formCounter: undefined
        })
    }

    const createNewPerson = (_:any)  => {
        
        if ((newPerson.formCounter) && (newPerson.formName !== "") && (storageData.length < 12)) {

            const updateNewPerson: PersonProps = {
                id: 0,
                name: newPerson.formName,
                color: "",
                isChecked: true,
                counter: newPerson.formCounter,
            }
            let temporaryStorageData: StorageDataProps = storageData
    
            temporaryStorageData.sort((a: PersonProps, b: PersonProps) => a.id - b.id)
            for (let i:number = 0; i< temporaryStorageData.length; i++) {
                if (i !== temporaryStorageData[i].id) {
                    updateNewPerson.id = i
                    break
                } else {
                    updateNewPerson.id = temporaryStorageData.length
                }
            }
    
            temporaryStorageData.push(updateNewPerson)
            const startColor = Math.floor(Math.random() * 12)
            const colors: string[] = [
                "#fff44f",
                "#ff5e00",
                "#b0ff00",
                "#ff1493",
                "#b4009e",
                "#87ceeb",
                "#40e0d0",
                "#ff00ff",
                "#ff4040",
                "#00ff00",
                "#0000ff",
                "#e0115f"
              ]
            for (let i:number = 0; i<temporaryStorageData.length; i++) {
                let indexColor = startColor + i
                indexColor %= 12
                temporaryStorageData[i].color = colors[indexColor]
            }
            
            set(temporaryStorageData)
            setOpen(() =>false)
            setNewPerson({
                formName: "",
                formCounter: undefined
            })
        }

    }

    const handleOnChangeName = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        
        if (event.target.value.length < 6) {
            setNewPerson((prevData) => ({
                ...prevData,
                formName: event.target.value
            }))
        }
    }

    const handleOnChangeCounter = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        if (Number(event.target.value) < 31) {
            setNewPerson((prevData) => ({
                ...prevData,
                formCounter: Number(event.target.value)
            }))
        }
    }

    const checkPerson = (person: PersonProps) => {

        const items = storageData
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
            paddingBottom="15px"
            sx={{
                backgroundColor: "white",
                borderRadius: "20px"
            }}
        >
            <Typography
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
                    {storageData.length < 12 ? (<Grid
                        key={-1}
                        sx={{
                            width: "100%",
                        }}
                        item
                    >
                        <Stack
                            onClick={handleDialogOpen}
                            justifyContent= "center"
                            alignItems="center"
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
                        </Stack>
                    </Grid>): null}
                </Grid>
            </Box>
            <Dialog 
                open={open} 
                onClose={handleDialogClose}
                sx={{
                    width: "100%",
                    maxWidth: "300px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto"
                }}
            > 
                <DialogContent>
                    <TextField
                        required
                        margin="dense"
                        id="filled-required"
                        label="Nome"
                        type="text"
                        fullWidth
                        variant="filled"
                        helperText="Massimo 5 lettere"
                        value={newPerson.formName}
                        onChange={handleOnChangeName}
                    />
                    <TextField
                        required
                        margin="dense"
                        id="filled-required"
                        label="Probabilità"
                        type="number"
                        fullWidth
                        variant="filled"
                        helperText="Max 30"
                        value={newPerson.formCounter}
                        onChange={handleOnChangeCounter}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose}>Annulla</Button>
                    <Button onClick={createNewPerson}>Aggiungi</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}