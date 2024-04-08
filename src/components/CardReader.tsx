import { useEffect, useRef, useState, Dispatch, useContext } from "react";
import { RiRfidLine } from "react-icons/ri";
import { css } from './styles';
import { getDocs, collection, addDoc, updateDoc, doc, deleteDoc, getDoc } from 'firebase/firestore'
import { IoCloseOutline } from "react-icons/io5";
import { SystemContextAPI } from '../context/systemProvider.tsx'




type CardReaderProps = {
  isOpen: boolean
  onRequestClose: () => void;
  handleCodeCardRFID: (code: string) => void
  textTitle?: string
  textBody?: string
}


export default function CardReader({ isOpen, onRequestClose, handleCodeCardRFID, textTitle = 'Identificação RFID', textBody = 'Aproxime o cartão' }: CardReaderProps) {


  const { _handleCodeCardRFID } = useContext(SystemContextAPI)

  const [validationNumber, setValidationNumber] = useState<string>('');
  const [timer, setTimer] = useState<ReturnType<typeof setTimeout>>();

  console.log(isOpen)

  const inputRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    const teste = () => {
      inputRef.current?.select();
    }

    teste()

  }, [isOpen])


  useEffect(() => {
    console.log('mudando')
    console.log(validationNumber)
    
    if (validationNumber.slice(0, 3) == '000' && validationNumber.length == 10) {
      setValidationNumber(validationNumber)
      handleCodeCardRFID(validationNumber)
      onRequestClose()
    } 
  }, [validationNumber])






  function validationNumberRFIDCard(number: string) {

    console.log(number.length)
    if (number.length == 1) {
      handleCodeCardRFID(number)
      onRequestClose()
    } else {
      console.log('aqui')
      setValidationNumber('2555255')
    }
  }




  return (
    <>
      <style>{css}</style>
      <div className={`${isOpen ? '' : 'invisible'}`}>
        <div className='opacityBg' />
        <div className='card'>

          <div className="titleCard">
            {textTitle} <button onClick={() => { onRequestClose() }} className="z-50" ><IoCloseOutline size={25} /></button>
          </div>
          <div className="bodyCard"> {textBody} <RiRfidLine size={50} /></div>
          <div>
            <input
             
              onChange={(event) => {



                setTimeout(() => {
                  setValidationNumber (event.target.value)
                  
               
                }, 200)


              }} type="number" id='teste' ref={inputRef} className='inputCard' />

          </div>

        </div>
      </div>
    </>



  )
}