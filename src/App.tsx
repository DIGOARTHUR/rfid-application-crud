
import Production from './pages/Production/Production'
import Employees from './pages/Employees/Employees'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import { SystemProvider } from './context/systemProvider'




const router = createBrowserRouter(
  createRoutesFromElements(
    <Route >
      <Route path='/' element={<Production />} />
      <Route path='/employees' element={<Employees />} />
    </Route>
  )
)


function App() {

  /*  const employeesRef = collection(db, "employees");
  
    interface IUser {
      name: string;
      id: string;
    }
  
  
    const [users, setUsers]= useState<IUser[]>([])
  
    useEffect(() => {
      const getEmployeesList = async () => {
        try {
          const data = await getDocs(employeesRef);
          setUsers(data.docs.map((doc)=>({name:doc.data().name, id: doc.id})))
        } catch (err) {
          console.error(err);
        }
  
        
      }
      getEmployeesList();
    }, [])
  
   console.log(users)
  
    return (
      <>
     
      </>
    )*/



  return (
    <SystemProvider>
      <RouterProvider router={router} />
    </SystemProvider>



  )

}

export default App
