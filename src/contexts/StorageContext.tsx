import { createContext, useEffect, useRef, useState } from "react"
import { PersonProps } from "../components/Person";

export type StorageDataProps = PersonProps[]

type HookProps = {
    set: (data: StorageDataProps) => void,
    storageData: StorageDataProps
}

export const StorageContext = createContext<HookProps | null>(null);

const useStorageContext = (): HookProps => {

    const hasInizialized = useRef(false)

    const [storageData, setStorageData] = useState<StorageDataProps>([])
    useEffect(() => {
        if(!hasInizialized.current) {
            hasInizialized.current = true
            _initialize()
        }
    }, [hasInizialized])
    const set = (data: StorageDataProps) => {
        localStorage.setItem("localData", JSON.stringify(data))
        setStorageData((_) => [...data])
    }

    const _initialize = () => {

        let item = localStorage.getItem("localData")
        let _i = item?JSON.parse(item): []
        setStorageData((_) => [..._i])
    }


    return{
        set, storageData
    }
} 
type StorageContainerProviderProps = {
    children: JSX.Element[]
}

export const StorageContextProvider = ({children} : StorageContainerProviderProps)  => {

    const storage = useStorageContext()

    return (<StorageContext.Provider value={storage}>{children}</StorageContext.Provider>)
}