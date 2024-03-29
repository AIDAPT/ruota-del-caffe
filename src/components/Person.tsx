import { Box, Checkbox, Stack, Typography } from "@mui/material";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

export type PersonProps = {
    id: number,
    name: string,
    color: string,
    isChecked: boolean,
    counter: number,
}

type PersonComponentProps = {
    person: PersonProps,
    checkPerson: (person: PersonProps) => void
    deletePerson: (person: PersonProps) => void
}

export function PersonComponent({person, checkPerson, deletePerson}: PersonComponentProps) {

    const handleCheckboxOnChange = (_:any) => {
        checkPerson(person)
    }

    const handleDeleteOnClick = (_:any) => {
        deletePerson(person)
    }
    
    return (
        <Box
            marginBottom="5px"
            paddingY="6px"
            sx={{
                backgroundColor: "#CCB697",
                borderRadius: "20px",
                width: "100%"
            }}
        >
            <Stack direction={"row"} justifyContent={"flex-end"} >
                <Box
                    width="100%"
                    alignItems="center"
                    justifyContent="center"
                    display="flex"
                    marginLeft="10px"
                >
                    <Typography
                        color={person.color}
                        variant="h5"
                        textAlign="center"
                        marginTop="3px"
                        marginX="0px"
                    >
                        {person.name}
                    </Typography>
                </Box>
                <Checkbox
                    checked={person.isChecked}
                    onChange={handleCheckboxOnChange}
                    sx={{
                        color: "#846842",
                        '& .MuiSvgIcon-root': { fontSize: 35 },
                        '&.Mui-checked': {color: "white"},
                    }}
                />
            </Stack>
            <Stack direction={"row"} justifyContent={"space-between"} >
                <Box
                    width="100%"
                    alignItems="center"
                    justifyContent="center"
                    display="flex"
                    marginLeft="10px"
                >
                    <Typography
                        variant="body1"
                        width="45px"
                        textAlign="center"
                        marginBottom="5px"
                        sx={{
                            backgroundColor: "white",
                            borderRadius: "50px"
                        }}
                    >
                        {person.counter} 
                    </Typography>
                </Box>
                <Box
                    onClick={handleDeleteOnClick}
                >
                    <DeleteOutlineOutlinedIcon
                        sx={{
                            color: "#846842",
                            fontSize: "48px",
                            marginRight: "3px"
                        }}
                    />
                </Box>
            </Stack>
        </Box>
    );
}