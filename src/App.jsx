import Chat from "./components/chat/Chat"
import Details from "./components/details/Details"
import Lists from "./components/lists/Lists"

const App = () => {
  return (
    <div className='container'>
      <Lists/>
      <Chat/>
      <Details/>
    </div>
  )
}

export default App