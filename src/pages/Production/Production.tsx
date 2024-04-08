import { useContext, useEffect, useState } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { MdOutlineLogin } from "react-icons/md";
import { MdOutlineLogout } from "react-icons/md";
import { RFIDReaderInput } from "rfid-reader-input";
import { SystemContextAPI } from "../../context/systemProvider";
import { getSpecificEmployees } from "../../api/requests/employees";
export default function Production() {

    const { codeCardRFID, _handleCodeCardRFID } = useContext(SystemContextAPI)
    const [serialCard, setSerialcard] = useState('');
    const [openCardReaderWindow, setOpenCardReaderWindow] = useState<boolean>(false)

    function handleOpenRFID() {

        setOpenCardReaderWindow(true);
    }

    function handleCloseRFID() {
        setOpenCardReaderWindow(false);
    }
    const [refreshList, setRefreshList] = useState(false)

    interface Iusers {
        id: string,
        name: string,
        email: string
        error: string
    }


    function getOutManchine() {
        setUsers([])
        _handleCodeCardRFID('')
    }

    const [users, setUsers] = useState<Iusers[]>([])

    useEffect(() => {
        const getEmployeesList2 = async () => {
            try {
                const weatherData = await getSpecificEmployees(codeCardRFID)
                console.log(weatherData)
                setUsers(weatherData)
            } catch (e) {
                console.error(e);
            }


        }
        getEmployeesList2();
    }, [codeCardRFID])


    return (
        <div className="flex">
            <Sidebar />
            <div className='w-full'>
                <Header />
                <div className="flex items-center px-16  min-h-[calc(100vh-86px)] w-full">
                    <div className="w-full h-[calc(100vh-200px)] bg-white">
                        <div className="flex bg-[#2C2E3E]  h-[86px] text-white text-4xl items-center px-16">
                            <h1>Máquinas</h1>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="flex justify-center gap-5 pt-20">
                                <button className="bg-[#00C689] text-white text-2xl font-semibold p-10 w-60">M120</button>
                                <button className="bg-[#3DA5F4] text-white text-2xl font-semibold p-10 w-60">M113</button>
                                <button className="bg-[#FDA006] text-white text-2xl font-semibold p-10 w-60">M114</button>
                            </div>
                            <div className="flex justify-end gap-5 pt-10 w-[780px]">
                                <button onClick={handleOpenRFID} className="flex items-center gap-2 font-medium text-2xl">
                                    <MdOutlineLogin size={30} />Entrar</button>
                            </div>
                            <table className="w-[780px] text-start mt-2">
                                <thead >
                                    <tr className="">
                                        <th scope="col">Cod. Operador </th>
                                        <th className="text-start" scope="col">Nome</th>
                                        <th className="text-start" scope="col">Status</th>
                                        <th className="text-start" scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody className="text-start border border-sky-500">

                                    {

                                        users?.map((item) => {
                                            return (
                                                item.error ? (
                                                    <tr key={item.id} className="even:bg-gray-100">
                                                        <th scope="row">{}</th>
                                                        <td>{item.error}</td>
                                                       
                                                    </tr>)
                                                    :
                                                    (
                                                        <tr key={item.id} className="even:bg-gray-100">
                                                            <th scope="row">{item.id.slice(6, 10)}</th>
                                                            <td>{item.name}</td>
                                                            <td className="bg-[#00FF66] font-bold h-2 rounded-md text-center">Ativo</td>
                                                            <td className="flex items-center justify-center" ><button onClick={getOutManchine}><MdOutlineLogout size={20} /></button></td>
                                                        </tr>)

                                            )
                                        })




                                    }









                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <RFIDReaderInput isOpen={openCardReaderWindow} onRequestClose={handleCloseRFID} handleCodeCardRFID={_handleCodeCardRFID} />
        </div>
    )

}