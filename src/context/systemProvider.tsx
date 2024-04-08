import { createContext, ReactNode, useContext, useState } from 'react'



interface SystemProviderProps {
    children: ReactNode;
}




interface SystemContextData {
    codeCardRFID: string;
    _handleCodeCardRFID: (codeCardRFID:string) => void;
}


export const SystemContextAPI = createContext({} as SystemContextData);


export function SystemProvider({ children }: SystemProviderProps) {


    const [codeCardRFID, setcodeCardRFID] = useState('')


    function _handleCodeCardRFID(codeCardRFID: string) {
        setcodeCardRFID(codeCardRFID)

    }

    

    
    return (

        < SystemContextAPI.Provider
            value={{
             _handleCodeCardRFID,
             codeCardRFID
            }}


        >
            {children}
        </ SystemContextAPI.Provider>

    )
}
