import { Box, Checkbox, Stack, Typography } from "@mui/material";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

export type PersonProps = {
    name: string,
    color: string,
    isChecked: boolean,
    counter: number,
}

type PersonComponentProps = {
    person: PersonProps
}

export function PersonComponent({person}: PersonComponentProps) {

    const checkPerson = () => void {
         
    };

    const deletePerson = () => void {
        
    };

    return (
        <Box>
            <Stack direction={"row"} justifyContent={"flex-end"}>
                <Typography
                    color={person.color}
                    component="div"
                    fontWeight="bold"
                    fontSize="25px"
                    width="100%"
                    textAlign="center"
                >
                    {person.name} 
                </Typography>
                <Checkbox
                    checked={person.isChecked}
                    onChange={checkPerson()}
                    sx={{
                        color: "#846842",
                        '& .MuiSvgIcon-root': { fontSize: 35 },
                        '&.Mui-checked': {color: "white"},
                    }}
                />
            </Stack>
            <Stack direction={"row"} justifyContent={"space-between"}>
                <Typography
                    color="#846842"
                    component="div"
                    fontWeight="bold"
                    fontSize="30px"
                    width="100%"
                    textAlign="center"
                    sx={{
                        backgroundColor: "white",
                        borderRadius: "50px"
                    }}
                >
                    {person.counter} 
                </Typography>
                <DeleteOutlineOutlinedIcon
                    onClick={deletePerson()}
                />
            </Stack>
        </Box>
    );
}

//TODO funzione deselectPerson
//TODO props e style mui components