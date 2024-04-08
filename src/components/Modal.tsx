import { useEffect, useState, useContext, FormEvent } from 'react';
import Modal from 'react-modal';
import { createUsers, getEmployeesList, getSpecificEmployees, updateEmployees } from '../api/requests/employees';
import { SystemContextAPI } from '../context/systemProvider';

import { LiaCreditCardSolid } from "react-icons/lia";
import { update } from 'firebase/database';
import { RFIDReaderInput } from 'rfid-reader-input';
import CardReader from './CardReader';



interface IModal {
    isOpen: boolean;
    onRequestClose: () => void;
    operation: string
    updateFields: Iusers[]
}



interface Iusers {
    id: string,
    name: string,
    email: string
}
 

export default function ModalWindows({ isOpen, onRequestClose, operation,   updateFields }: IModal) {

console.log(updateFields[0])

    const { codeCardRFID ,_handleCodeCardRFID } = useContext(SystemContextAPI)
    console.log(codeCardRFID)
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    function handleOpenRFID() {
      
         setOpenCardReaderWindow(true);
     }
 
     function handleCloseRFID() {
         setOpenCardReaderWindow(false);
     }
 

    const [openCardReaderWindow, setOpenCardReaderWindow] = useState<boolean>(false)
    const [serialCard, setSerialcard] = useState('');
   
    const [users, setUsers] = useState<Iusers>()
  
    useEffect(() => {
  
        if (operation == 'update') {
            setSerialcard(updateFields[0].id)
            setName(updateFields[0].name)
            setEmail(updateFields[0].email)
        }else{
            setSerialcard('')
            setName('')
            setEmail('')
         
        }
    },[operation,updateFields[0],isOpen])



    async function handleCreateNewTransaction(event: FormEvent) {
        event.preventDefault();
        console.log(operation)
        if (operation === 'update') {

            await updateEmployees(serialCard, name, email)
       
            onRequestClose()

        }  
        if (operation === 'create') {
            
            await createUsers(serialCard, name, email)
        
            onRequestClose()

        }
        
   
    }

    return (
        <Modal

            isOpen={isOpen}
            onRequestClose={onRequestClose}
            overlayClassName="fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-[#f0f2f575]"
            className="w-full max-w-[576px] bg-[#ffffff] p-[3rem] relative rounded-md"

        >
            <button className="absolute right-2 top-2" ></button>
            <form className="flex flex-col gap-4" onSubmit={handleCreateNewTransaction} >
                <h2 className="text-2xl mb-4">Cadastrar Colaborador </h2>
                <div className="flex">
                    <input

                        value={serialCard}
                        placeholder='Passe o cartão do novo colaborador'
                        className="w-full bg-[#f3f3f3] p-1"
                        disabled
                    />
                    <button type="button" onClick={ handleOpenRFID } ><LiaCreditCardSolid size={40} /></button>
                </div>
                <div className="">
                    <span className="font-medium">Nome</span>
                    <input


                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder={operation==='update'?'Novo Nome do Colaborador':'Nome do Colaborador'}
                        className="w-full bg-[#f3f3f3] p-1 "

                    />
                </div>
                <div>

                    <span className="font-medium">Email</span>
                    <input
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder='Email'
                        className="w-full bg-[#f3f3f3] p-1 "

                    />
                </div>

                <div className="flex justify-center mt-4">
                    <button className="bg-[#198754] text-white p-4 rounded-lg font-medium" type="submit"> {operation==='update'?'Atualizar':'Cadastrar'}</button>
                </div>
            </form>

            <RFIDReaderInput isOpen={openCardReaderWindow} onRequestClose={handleCloseRFID} handleCodeCardRFID={setSerialcard} />
        </Modal>

    )
}