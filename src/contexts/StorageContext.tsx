import { createContext, useState } from "react"
import { PersonProps } from "../components/Person";

export type StorageDataProps = PersonProps[]

type HookProps = {
    set: (data: StorageDataProps) => void,
    get: () => StorageDataProps
}

export const StorageContext = createContext<HookProps | null>(null);

const useStorageContext = (): HookProps => {
    const [storageData, setStorageData] = useState<StorageDataProps | null>(null)

    const set = (data: StorageDataProps) => {
        localStorage.setItem("localData", JSON.stringify(data))
        setStorageData(data)
    }

    const get = (): StorageDataProps => {

        if (storageData) {return storageData}
        else {
            let item = localStorage.getItem("localData")
            let _i = item?JSON.parse(item): []
            set(_i)
            return _i
        }
    }


    return{
        set, get
    }
} 
type StorageContainerProviderProps = {
    children: JSX.Element[]
}

export const StorageContextProvider = ({children} : StorageContainerProviderProps)  => {

    const storage = useStorageContext()

    return (<StorageContext.Provider value={storage}>{children}</StorageContext.Provider>)
}