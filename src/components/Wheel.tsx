import { Box, Typography } from '@mui/material';
import { ChartDataset } from 'chart.js';
import 'chart.js/auto';
import { useContext, useEffect, useState } from 'react';
import {Pie} from 'react-chartjs-2'
import { StorageContext } from '../contexts/StorageContext';

type WheelStateProps = {
  labels: string[],
  datasets: ChartDataset<"pie", number[]>[]
}

export function Wheel() {

  const {set, get} = useContext(StorageContext)!
  const [wheelState, setWheelState] = useState<WheelStateProps>({
    labels: [],
    datasets: []
  })

  useEffect(() => {
    let storageData = get();
    let labels: string[] = []
    let data: number[] = []
    let backgroundColor: string[] = []
    
    storageData.forEach((person, index) => {
      if (person.isChecked) {
        labels.push(person.name)
        data.push(person.counter)
        backgroundColor.push(person.color)
      }
    })

    setWheelState({
      labels,
      datasets: [{
        data,
        backgroundColor
      }]
    })

  }, [get()])

  return (
    <Box
      marginTop="-30px"
      marginLeft="10px"
      marginRight="10px"
    >
      <Box
        marginBottom="-10px"
      >
        <Pie
          options={{
            animation: {duration: 0},
            plugins: {
              legend: {
                display: false
              }
            }
          }}  
          data={wheelState}
          height="50%"
        ></Pie>
      </Box>
      <Box
        display= "webkit-flex"
        justify-content= "center"
        webkit-align-items= "center"
        webkit-box-align= "center"
      >
        <Box
            sx={{
              width: 0,
              height: 0,
              borderLeft: "20px solid transparent",
              borderRight: "20px solid transparent",
              borderBottom: "20px solid white"
            }}
        ></Box>
      </Box>
      <Box
        sx={{
          backgroundColor: "white"
        }}
        marginLeft="30px"
        marginRight="30px"
        color="white"
        marginTop="15px"
        borderRadius="50px"
      >
        <Typography
          component="div"
          color="black"
          fontWeight="bold"
          fontSize="25px"
          margin="5px"
          marginTop="-20px"
        >
          Ciao
        </Typography>
      </Box>
    </Box>
  );
}