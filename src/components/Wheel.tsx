import { Box, Typography } from '@mui/material';
import { ChartDataset, Colors } from 'chart.js';
import 'chart.js/auto';
import { useContext, useEffect, useRef, useState } from 'react';
import {Pie} from 'react-chartjs-2'
import { StorageContext, StorageDataProps } from '../contexts/StorageContext';

type WheelStateProps = {
  labels: string[],
  datasets: ChartDataset<"pie", number[]>[]
}

type TemporaryData = {
  temporaryLabel: string,
  temporaryData: number,
  temporaryBackgroundColor: string
}

export function Wheel() {

  const {set, storageData} = useContext(StorageContext)!

  const [wheelState, setWheelState] = useState<WheelStateProps>({
    labels: [],
    datasets: []
  })

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.style.margin = 'auto';
      canvasRef.current.style.display = 'block';
    }
  }, []);

  useEffect(() => {
    let _storageData: StorageDataProps = storageData?.filter(p => p.isChecked)
    let toShuffleData: TemporaryData[] = []
    let labels: string[] = []
    let data: number[] = []
    let backgroundColor: string[] = []

    if (_storageData.length > 0) {
      _storageData.forEach((person) => {
        for (let i:number = 0; i < person.counter; i++) {
          toShuffleData.push({
            temporaryLabel: person.name,
            temporaryData: 1,
            temporaryBackgroundColor: person.color
          })
        }
      })
    } else {
      labels.push("Empty")
      data.push(1)
      backgroundColor.push("white")
    }

    let currentIndex = toShuffleData.length,  randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [toShuffleData[currentIndex], toShuffleData[randomIndex]] = [
        toShuffleData[randomIndex], toShuffleData[currentIndex]];
    }

    for (let i:number = 0; i < toShuffleData.length; i++) {
      labels.push(toShuffleData[i].temporaryLabel)
      data.push(toShuffleData[i].temporaryData)
      backgroundColor.push(toShuffleData[i].temporaryBackgroundColor)
    }
    
    setWheelState({
      labels,
      datasets: [{
        data,
        backgroundColor
      }]
    })

  }, [storageData])

  const rotateWheel = (_:any) => {
    //TODO ultima cosa prima dei test
  }

  return (
    <Box
      marginTop="-30px"
      marginLeft="10px"
      marginRight="10px"
    >
      <Box
        margin="auto"
        position="relative"
      >
        <canvas ref={canvasRef} style={{height: "1px"}}/>
        <Pie
          options={{
            borderColor: "#CCB697",
            elements: {
              arc: {
                  borderWidth: 2,
              }
            },
            animation: false,
            plugins: {
              legend: {
                display: false
              }
            }
          }}  
          data={wheelState}
          height="50%"
        ></Pie>
        <div
          onClick={rotateWheel}
          className='playButton'
          style={{
            width: "75px",
            height: "75px",
            borderRadius: "50%",
            backgroundColor: "#846842",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            top: "50%",
            left: "50%",
          }}
        >
          <div
            style={{
              marginLeft: "8px",
              borderTop: "20px solid transparent",
              borderBottom: "20px solid transparent",
              borderLeft: "35px solid #fff",
              transform: "revert",
            }}
          >
          </div>
        </div>
      </Box>
      <Box
        marginTop="-10px"
      >
        <Box
          display= "webkit-flex"
          justify-content= "center"
          webkit-align-items= "center"
          webkit-box-align= "center"
          position="sticky"
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
    </Box>
  );
}