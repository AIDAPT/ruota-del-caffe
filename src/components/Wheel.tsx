import { Box, Stack, Typography } from '@mui/material';
import { ChartDataset} from 'chart.js';
import 'chart.js/auto';
import { useContext, useEffect, useRef, useState } from 'react';
import { Pie } from 'react-chartjs-2'
import { animated, useSpring } from 'react-spring';
import { StorageContext, StorageDataProps } from '../contexts/StorageContext';

type WheelStateProps = {
  labels: string[],
  datasets: ChartDataset<"pie", number[]>[]
}

type TemporaryData = {
  temporaryLabel: string,
  temporaryData: number,
  temporaryBackgroundColor: string,
  minDegree: number,
  maxDegree: number,
  temporaryId: number,
}

type WinnerProps = {
  winnerName: string,
  winnerColor: string,
  winnerId: number,
}

export function Wheel() {

  const {set, storageData} = useContext(StorageContext)!

  const [wheelState, setWheelState] = useState<WheelStateProps>({
    labels: [],
    datasets: []
  })

  const [explodedData, setExplodedData] = useState<TemporaryData[]>([])

  const [winner, setWinner] = useState<WinnerProps | null>(null)

  const [animationData, setAnimationData] = useState<StorageDataProps>(storageData)

  const [isOnRotation, setIsOnRotation] = useState<boolean>(false)

  const [spring, setSpring] = useSpring(() => ({
    to: {rotate: 0},
    config: {mass:2, tension:150, friction:50},
  }))

  useEffect(() => {

    let _storageData: StorageDataProps = storageData?.filter(p => p.isChecked)
    let toShuffleData: TemporaryData[] = []
    let labels: string[] = []
    let data: number[] = []
    let backgroundColor: string[] = []
    let totalProbability: number = 0

    if (_storageData.length > 0) {
      _storageData.forEach((person) => {
        for (let i:number = 0; i < person.counter; i++) {
          toShuffleData.push({
            temporaryLabel: person.name,
            temporaryData: 1,
            temporaryBackgroundColor: person.color,
            minDegree: 0,
            maxDegree: 0,
            temporaryId: person.id
          })
          totalProbability ++
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

    const degreeInterval: number = 360 / totalProbability

    for (let i:number = 0; i < toShuffleData.length; i++) {
      labels.push(toShuffleData[i].temporaryLabel);
      data.push(toShuffleData[i].temporaryData);
      backgroundColor.push(toShuffleData[i].temporaryBackgroundColor);
      toShuffleData[i].minDegree = (i*degreeInterval)
      toShuffleData[i].maxDegree = (i*degreeInterval) + degreeInterval
    }
    
    setExplodedData(() => [...toShuffleData])
    
    setWheelState(() => ({
      labels,
      datasets: [{
        data,
        backgroundColor
      }]
    }))

  }, [storageData])

  const delay = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  const rotateWheel = async (_:any) => {

    if (isOnRotation || storageData.length === 0) {
      return
    }

    setIsOnRotation(true)
    setWinner(null)

    let finalDegree: number = Math.random() * 360;
    let realDigree: number = 0

    if (finalDegree < 180) {
      realDigree = 180 - finalDegree
    } else {
      realDigree = 360 - (finalDegree - 180)
    }

    const winnerPerson = explodedData.find(p => realDigree > p.minDegree && realDigree <= p.maxDegree)!

    let temporaryData: StorageDataProps = storageData
    let checkedPartecipants: StorageDataProps = storageData?.filter(p => p.isChecked)

    for (let i:number = 0; i<temporaryData.length; i++) {
      if (winnerPerson.temporaryId === temporaryData[i].id) {
          temporaryData[i].counter = 1
      } else if (winnerPerson.temporaryId !== temporaryData[i].id && temporaryData[i].isChecked) {
        temporaryData[i].counter += (checkedPartecipants.length - 1)
        if (temporaryData[i].counter > 30) {
          temporaryData[i].counter = 30
        }
      }
    }
  
    setSpring({from: {rotate: 0}, to: {rotate: finalDegree + 10800}, onRest: () => {
      setWinner(() => ({
        winnerName: winnerPerson.temporaryLabel,
        winnerColor: winnerPerson.temporaryBackgroundColor,
        winnerId: winnerPerson.temporaryId
      }))
      setAnimationData(temporaryData)
    }})
  }

  const saveData = (_:any) => {
    setWinner(null)
    set(animationData)
    setIsOnRotation(false)
  }

  const discardData = (_:any) => {
    setWinner(null)
    setIsOnRotation(false)
    window.location.reload()
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
        <animated.div
          style={{transform: spring.rotate.to((r:number) => `rotate(${r}deg)`)}}
        >
          <Pie
            options={{
              borderColor: "#CCB697",
              elements: {
                arc: {
                    borderWidth: 1,
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
        </animated.div>
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
            color={winner?.winnerColor || "#846842"}
            fontWeight="bold"
            fontSize="25px"
            margin="5px"
            marginTop="-20px"
          >
            {winner?.winnerName || "Chi verrà estratto?"}
          </Typography>
        </Box>
        {!!winner ? 
          (<Stack
            direction="row"
            justifyContent="space-around"
            color="#846842"
            marginTop="10px"
          >
            <Box
              onClick={discardData}
              border="1px solid #846842"
              borderRadius="50px"
              padding="7px"
            >
              Annulla
            </Box>
            <Box
              onClick={saveData}
              border="1px solid #846842"
              borderRadius="50px"
              padding="7px"
            >
              Aggiorna i Dati
            </Box>
          </Stack>): null
        }
      </Box>
    </Box>
  );
}