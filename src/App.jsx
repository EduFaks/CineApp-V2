import Header from "./components/Header/Header"
import { Outlet } from "react-router-dom"

const App = () => {
//     const [profile, setProfile ] = useState(null);
//     const [isLogged, setisLogged] = useState(false);
    
//     const responseMessage = (response) => {
//       setisLogged(true);
//       const decoded = jwtDecode(response.credential);
//       setProfile(decoded);
//   };
//   const errorMessage = (error) => {
//       console.log(error);
//   };

//   const logOut = () => {
//     googleLogout();
//     setisLogged(false);
//     setProfile(null);
// };
  
  return (
    <div className="box-border h-screen flex-col justify-start items-center">
    <Header/>
    <Outlet/>    
    </div>
  )
}

export default App
