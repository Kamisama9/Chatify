import { useEffect, useState } from "react"
import "./chatlist.css"
import AddUser from "./addeUser/AddUser"
import {useUserStore} from "../../../store/UserStore"
import { doc, getDoc, onSnapshot } from "firebase/firestore"
import { db } from "../../../firebase/Firebase"
import { useChatStore } from "../../../store/ChatStore"
const ChatList = () => {
    const [chats,setChats]=useState([])
    const [addmode,setAddmode]=useState(false)

    const {currentUser}=useUserStore();
    const {changeChat}=useChatStore();
    useEffect(()=>{
      const unsub=onSnapshot(doc(db,'userchats',currentUser.id),async (res)=>{
        const items=res.data().chats; //from userchats collection in Db getting sneder info from chats array 

        const promises=items.map(async (item)=>{
          const getuserRef=doc(db,'users',item.receiverId) // referwnce to users collection in db
          const userdoc=await getDoc(getuserRef) // getting user info from reciverId in chats array

          const user=userdoc.data();
          return {...item,user}
        })
        const chatdata=await Promise.all(promises)
        setChats(chatdata.sort((a,b)=>b.updatedAt-a.updatedAt))
      });

      return()=>{
        unsub()
      }
    },[currentUser.id])


    const handleSelect=async chat=>{
        changeChat(chat.chatId,chat.user)
    }
  return (
    <div className="chatlist">
      <div className="search">
        <div className="searchBar">
            <img src="./search.png" alt="" />
            <input type="text" placeholder="Search" />
        </div>
        <img src={addmode?"./minus.png":"./plus.png"} alt="" className="add" onClick={()=>setAddmode(prev=>!prev)}/>
      </div>
      {chats.map((chat)=>{
        return(
          <div className="item" key={chat.chatId} onClick={()=>handleSelect(chat)}>
        <img src={chat.user.avatar || "./avatar.png"} alt="" />
        <div className="texts">
            <span>{chat.user.username}</span>
            <p>{chat.lastMessage}</p>
        </div>
      </div>
        )
      })}

      {addmode && <AddUser/>}
    </div>
  )
}

export default ChatList
