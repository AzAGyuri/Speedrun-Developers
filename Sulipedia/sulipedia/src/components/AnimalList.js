import axios from 'axios'
import { useEffect, useState } from 'react';
import './AnimalList.css';
import Button from '@mui/material/Button';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import * as React from 'react';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export function AnimalList() {
    let [tomb, setTomb] = useState([]);
    useEffect(() => {
        axios.get(`/animal`).then((response) => {
            setTomb(response.data);
        });
    }, []);

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    let [name, setName] = useState("");
    let [amount, setAmount] = useState(0);
    let [avgHeight, setAvgHeight] = useState(0);
    let [avgWeight, setAvgWeight] = useState(0);
    let [avgLength, setAvgLength] = useState(0);
    let [animalType, setAnimalType] = useState("");
    return (
        <>

            <table>

                <TableRow>
                    <th>id </th>
                    <th>name </th>
                    <th>  amount   </th>
                    <th>avgWeight </th>
                    <th>avgHeight </th>
                    <th>avgLength </th>
                    <th>animalType </th>
                </TableRow>
                {
                    tomb.map((row) => {
                        return (
                            <>
                                <TableRow>
                                    <TableCell>{row.id}</TableCell>
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell> <Button variant="contained" onClick={() => {

                                        if (row.amount > 0) {
                                            axios.put(`/animal/${row.id}`, {
                                                "amount": -1
                                            }).then((response) => {
                                                row.amount--;
                                                setTomb(tomb.concat([]));
                                            });
                                        }

                                        else if (row.amount <= 0) {
                                            axios.put(`/animal/${row.id}`, {
                                                "amount": -0
                                            }).then((response) => {
                                                row.amount = 0;
                                                setTomb(tomb.concat([]));
                                            });
                                        }

                                        console.log(row.amount);


                                    }}> - </Button> {row.amount}

                                        <Button variant="contained" onClick={() => {

                                            {
                                                let mennyiseg = row.amount;
                                                axios.put(`/animal/${row.id}`, {
                                                    "amount": + 1

                                                }).then((response) => {
                                                    row.amount++;
                                                    setTomb(tomb.concat([]));
                                                });
                                            }

                                        }}> + </Button> </TableCell>
                                    <TableCell>{row.avg_weight}</TableCell>
                                    <TableCell>{row.avg_height}</TableCell>
                                    <TableCell>{row.avg_lenght}</TableCell>
                                    <TableCell>{row.type}</TableCell>
                                    <TableCell onClick={() => {
                                        axios.delete(`/animal/${row.id}`).then((response) => {
                                            setTomb(tomb.filter((element) => {
                                                return element.id != row.id;
                                            }))
                                        });
                                    }

                                    }> <Button>X </Button></TableCell>

                                    <Box>
                                        <Button onClick={handleOpen}>Elem hozzáadása</Button>
                                        <Modal
                                            open={open}
                                            onClose={handleClose}
                                            aria-labelledby="modal-modal-title"
                                            aria-describedby="modal-modal-description"
                                        >
                                            <Box sx={style}>
                                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                                    Adj hozzá új állatot
                                                </Typography>
                                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                                    {name =(<TextField id="outlined-basic" label="Name" variant="outlined" />)}
                                                    {amount=(<TextField id="outlined-basic" label="Amount" variant="outlined" />)}
                                                    {avgHeight=(<TextField id="outlined-basic" label="Average Height" variant="outlined" />)}
                                                    {avgWeight=(<TextField id="outlined-basic" label="Average Weight" variant="outlined" />)}
                                                    {avgLength=(<TextField id="outlined-basic" label="Average Length" variant="outlined" />)}
                                                    {animalType=(<TextField id="outlined-basic" label="Animal Type" variant="outlined" />)}

                                                    {console.log({name, amount, avgHeight, avgWeight,animalType})}
                                                </Typography>
                                            </Box>
                                        </Modal>
                                    </Box>
                                </TableRow>

                            </>

                        )
                    })
                }
            </table>
        </>
    )


}