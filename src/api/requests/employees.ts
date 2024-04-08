import { db } from '../services/config/firebase'
import { getDocs, collection, addDoc, updateDoc, doc, deleteDoc, getDoc, setDoc } from 'firebase/firestore'

const employeesRef = collection(db, "employees");





export async function getEmployeesList() {
    try {
        const data = await getDocs(employeesRef);
        const list = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))

        return list;
    } catch (err) {
        console.error(err);
    }
}



export async function getSpecificEmployees(id: string) {
    try {
        const userDoc = doc(db, "employees", id)
        const docSnap = await getDoc(userDoc);

        if(docSnap.data()){
            return [{...docSnap.data(),id: docSnap.id}]
        }else{
            return [{error:'Cartão não cadastrado'}]
        }
        
    } catch (err) {
        console.error(err);
    }
}


export async function deleteEmployees (id: string) {
    const userDoc = doc(db, "employees", id)
    await deleteDoc(userDoc)
  }


  export async function createUsers (id:string,newName:string,newEmail:string) {
    await setDoc(doc(employeesRef,id), {name:newName,email:newEmail});
  }

  export async function updateEmployees (id:string, name:string,email:string)  {
    const userDoc = doc(db, "employees", id)
    const newFields = { name: name, email:email }
    await updateDoc(userDoc, newFields)
  
  }
