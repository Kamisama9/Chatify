import { useEffect, useState } from "react"
import "./chatlist.css"
import AddUser from "./addeUser/AddUser"
import {useUserStore} from "../../../store/UserStore"
import { doc, onSnapshot } from "firebase/firestore"
import { db } from "../../../firebase/Firebase"
const ChatList = () => {
    const [chats,setChats]=useState([])
    const [addmode,setAddmode]=useState(false)

    const {currentUser}=useUserStore();
    useEffect(()=>{
      const unsub=onSnapshot(doc(db,'userchats',currentUser.id),(doc)=>{
        setChats(doc.data())
      });
      return()=>{
        unsub()
      }
    },[currentUser.id])

    console.log(chats)
  return (
    <div className="chatlist">
      <div className="search">
        <div className="searchBar">
            <img src="./search.png" alt="" />
            <input type="text" placeholder="Search" />
        </div>
        <img src={addmode?"./minus.png":"./plus.png"} alt="" className="add" onClick={()=>setAddmode(prev=>!prev)}/>
      </div>
      <div className="item">
        <img src="./avatar.png" alt="" />
        <div className="texts">
            <span>Kamisama</span>
            <p>hello</p>
        </div>
      </div>
      <div className="item">
        <img src="./avatar.png" alt="" />
        <div className="texts">
            <span>Kamisama</span>
            <p>hello</p>
        </div>
      </div>
      <div className="item">
        <img src="./avatar.png" alt="" />
        <div className="texts">
            <span>Kamisama</span>
            <p>hello</p>
        </div>
      </div>
      {addmode && <AddUser/>}
    </div>
  )
}

export default ChatList
