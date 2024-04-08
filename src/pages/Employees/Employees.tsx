import { FormEvent, useContext, useEffect, useState, useRef } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { IoMdAdd } from "react-icons/io";
import Modal from 'react-modal';
import { IoCloseSharp } from "react-icons/io5";
import { LiaCreditCardSolid } from "react-icons/lia";

import { RiDeleteBinLine } from "react-icons/ri";
import { PiPencilLight } from "react-icons/pi";

import { getEmployeesList, createUsers, deleteEmployees } from '../../api/requests/employees'

import { SystemContextAPI } from '../../context/systemProvider'
import ModalWindows from "../../components/Modal";
import { RFIDReaderInput } from "rfid-reader-input";
import CardReader from "../../components/CardReader";




export default function Employees() {
    const { codeCardRFID } = useContext(SystemContextAPI)





    const [operation, setOperation] = useState('create');
    const [serialCard, setSerialcard] = useState('');
    console.log(serialCard)
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    interface Iusers {
        id: string,
        name: string,
        email: string
    }

    const [users, setUsers] = useState<Iusers[]>([])
    const [openCardReaderWindow, setOpenCardReaderWindow] = useState<boolean>(false)

    const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false)
    const [updateFields, setUpdateFields] = useState<Iusers[]>([])
    const [refreshList, setRefreshList] = useState(false)

    function handleOpenNewTransactionModal() {

        setIsNewTransactionModalOpen(true);
    }

    function handleClosenNewTransactionModal() {
        setIsNewTransactionModalOpen(false);
        setRefreshList(!refreshList)
    }
    console.log(updateFields)


    function updateEmployees(id: string, name: string, email: string) {

        let data = [{
            id,
            name,
            email
        }]
        setOperation('update')
        setUpdateFields(data)
        handleOpenNewTransactionModal()
    }


    function createEmployees() {

       
        setOperation('create')
 
        handleOpenNewTransactionModal()
    }

    async function _deleteEmployees(id: string) {
        await deleteEmployees(id)
        setRefreshList(!refreshList)

    }


    useEffect(() => {
        const getEmployeesList2 = async () => {
            try {
                const weatherData = await getEmployeesList();

                setUsers(weatherData)
            } catch (e) {
                console.error(e);
            }


        }
        getEmployeesList2();
    }, [refreshList])



    return (
        <div className="flex">
            <Sidebar />
            <div className='w-full'>
                <Header />
                <div className="flex items-center px-16  min-h-[calc(100vh-86px)] w-full">
                    <div className="w-full h-[calc(100vh-200px)] bg-white">
                        <div className="flex bg-[#2C2E3E]  h-[86px] text-white text-4xl items-center px-16">
                            <h1>Colaboradores</h1>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="flex justify-end  w-[780px] gap-5 pt-20">

                                <button onClick={createEmployees} className="flex  items-center gap-2 bg-[#D53F8C] text-white text-xl font-normal p-1 rounded-md justify-center"><IoMdAdd />Cadastrar</button>
                            </div>

                            <table className="w-[780px] text-start mt-2">
                                <thead >
                                    <tr className="">
                                        <th scope="col">Cod. Operador </th>
                                        <th className="text-start" scope="col">Nome</th>
                                        <th className="text-start" scope="col">Email</th>
                                        <th className="text-start" scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody className="text-start border border-sky-500 ">



                                    {
                                        users?.map((item) => {
                                            return (
                                                <tr key={item.id} className="even:bg-gray-100">
                                                    <th scope="row">{item.id.slice(6, 10)}</th>
                                                    <td>{item.name}</td>
                                                    <td>{item.email}</td>
                                                    <td className="flex gap-5">
                                                        <button onClick={() => _deleteEmployees(item.id)} className="mt-1"><RiDeleteBinLine /></button>
                                                        <button onClick={() => updateEmployees(item.id, item.name, item.email)} className="mt-1"><PiPencilLight /></button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }



                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>




            <ModalWindows isOpen={isNewTransactionModalOpen} onRequestClose={handleClosenNewTransactionModal} operation={operation} updateFields={updateFields}/>
        
        </div>
    )

}