import { useEffect, useState } from "react";
import "./chatlist.css";
import AddUser from "./addeUser/AddUser";
import { useUserStore } from "../../../store/UserStore";
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase/Firebase";
import { useChatStore } from "../../../store/ChatStore";
const ChatList = () => {
  const [chats, setChats] = useState([]);
  const [addmode, setAddmode] = useState(false);
  const [inputtext, setInputtext] = useState("");

  const { currentUser } = useUserStore();
  const { changeChat } = useChatStore();
  useEffect(() => {
    const unsub = onSnapshot(
      doc(db, "userchats", currentUser.id),
      async (res) => {
        const items = res.data().chats; //from userchats collection in Db getting sneder info from chats array

        const promises = items.map(async (item) => {
          const getuserRef = doc(db, "users", item.receiverId); // referwnce to users collection in db
          const userdoc = await getDoc(getuserRef); // getting user info from reciverId in chats array

          const user = userdoc.data();
          return { ...item, user };
        });
        const chatdata = await Promise.all(promises);
        setChats(chatdata.sort((a, b) => b.updatedAt - a.updatedAt));
      }
    );
    return () => {
      unsub();
    };
  }, [currentUser.id]);

  const handleSelect = async (chat) => {
    const userChats=chats.map((item)=>{
      const {user,...rest}=item
      return rest;
    })
    const chatIndex=userChats.findIndex(
      (item)=>item.chatId===chat.chatId
    )
    userChats[chatIndex].isSeen=true
    const userChatref=doc(db,'userchats',currentUser.id);
    try {
      await updateDoc(userChatref,{
        chats:userChats,
      })
    changeChat(chat.chatId, chat.user);
    } catch (error) {
      console.log(error)
    }
  };

  const filteredChat=chats.filter(c=>c.user.username.toLowerCase().includes(inputtext.toLocaleLowerCase()))
  return (
    <div className="chatlist">
      <div className="search">
        <div className="searchBar">
          <img src="./search.png" alt="" />
          <input type="text" placeholder="Search" onChange={(e)=>setInputtext(e.target.value)}/>
        </div>
        <img
          src={addmode ? "./minus.png" : "./plus.png"}
          alt=""
          className="add"
          onClick={() => setAddmode((prev) => !prev)}
        />
      </div>
      {filteredChat.map((chat) => {
        return (
          <div
            className="item"
            key={chat.chatId}
            onClick={() => handleSelect(chat)}
            style={{
              backgroundColor:chat?.isSeen?"transparent":"bleu"
            }}
          >
            <img src={chat.user.blocked.includes(currentUser.id)?"./avatar.png":chat.user.avatar || "./avatar.png"} alt="" />
            <div className="texts">
              <span>{chat.user.blocked.includes(currentUser.id)?"User":chat.user.username}</span>
              <p>{chat.lastMessage}</p>
            </div>
          </div>
        );
      })}

      {addmode && <AddUser />}
    </div>
  );
};

export default ChatList;
