import Chat from "./components/chat/Chat"
import Details from "./components/details/Details"
import Lists from "./components/lists/Lists"
import Login from "./components/login/Login";
import Notification from "./components/notifications/Notification";

const App = () => {
  const user=true;
  return (
    <div className='container'>
    {
      user?(
        <>
       <Lists/>
      <Chat/>
      <Details/>
      </>
      ):(<Login/>)
      
    }
    <Notification/>
     
    </div>
  )
}

export default App