import { useEffect, useRef, useState } from "react";
import "./chat.css";
import EmojiPicker from "emoji-picker-react";
import { arrayUnion, doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/Firebase";
import { useChatStore } from "../../store/ChatStore";
import { useUserStore } from "../../store/UserStore";
import ImageUpload from "../../cloudinary/ImageUpload";
const Chat = () => {
  const [openEmoji, setOpenEmoji] = useState(false);
  const [text, setText] = useState("");
  const [chat,setChat]=useState();
  const [img,setImg]=useState({
    file:null,
    url:""
  })
  const endref=useRef(null)


  const {currentUser}=useUserStore();
  const {chatId,user,isCurrentUserBlocked,isReceiverBlocked}=useChatStore();


  useEffect(()=>{
    endref.current?.scrollIntoView({behavior:"smooth"})
  })

  useEffect(()=>{
    const unsub=onSnapshot(doc(db,'chats',chatId),(res)=>{
        setChat(res.data());
    });
    return ()=>{
      unsub()
    }
  },[chatId])


  

  const handleImage = (e) => {
    if (e.target.files[0])
      setImg({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
  };


  const handleEmoji = (e) => {
    setText((prev) => prev + e.emoji);
    setOpenEmoji(false);
  };

  const handlesend =async()=>{
    if(text==='') return
    let imgUrl=null

    try {
      if(img.file)
      {
        imgUrl=await ImageUpload(img.file)
      }
      await updateDoc(doc(db,'chats',chatId),{
        messages:arrayUnion({
          senderId:currentUser.id,
          text,
          createdAt:new Date(),
          ...(imgUrl && {img:imgUrl})
        })
      })

      const userIDs=[currentUser.id,user.id]
      userIDs.forEach(async(id)=>{
        const userChatref=doc(db,"userchats",currentUser.id)
        const chatSnapshot=await getDoc(userChatref)
  
        if(chatSnapshot.exists())
        {
          const chatsData=chatSnapshot.data()
          const chatIndex=chatsData.chats.findIndex(c=>c.chatId===chatId)
  
          chatsData.chats[chatIndex].lastMessage=text;
          chatsData.chats[chatIndex].isSeen=id===currentUser.id ?true:false
          chatsData.chats[chatIndex].upadateAt=Date.now();
  
          await updateDoc(userChatref,{
            chats:chatsData.chats
          })
        }
      })
      
    } catch (error) {
      console.log(error)
    }
    setImg({
      file:null,
      url:""
    })
    setText("")
  }

  return (
    <div className="chat">
      <div className="top">
        <div className="user">
          <img src="./avatar.png" alt="" />
          <div className="texts">
            <span>kamisama</span>
            <p>Lorem ipsum dolor sit amet.</p>
          </div>
        </div>
        <div className="icons">
          <img src="./phone.png" alt="" />
          <img src="./video.png" alt="" />
          <img src="./info.png" alt="" />
        </div>
      </div>

      <div className="center">
      {chat?.messages.map((message)=>(
        <div className={message.senderId===currentUser?.id ? "message own": "message"} key={message?.createdAt}>
          <div className="texts">
              {console.log(message.senderId)}
            {message.img && <img src={message.img} alt="" />}
            <p>{message.text}</p>
            <span>1 min ago</span>
          </div>
        </div>
      ))}
        {img.url && <div className="message own">
          <div className="texts">
            <img src={img.url} alt="" />
          </div>
        </div>}
        <div ref={endref}></div>
      </div>

      <div className="bottom">
        <div className="icons">
        <label htmlFor="file">
          <img src="./img.png" alt="" />
          </label>
          <input type="file" id="file" style={{display:"none"}} onChange={handleImage} />
          <img src="./camera.png" alt="" />
          <img src="./mic.png" alt="" />
        </div>
        <input
          type="text"
          placeholder={(isCurrentUserBlocked||isReceiverBlocked)?"You cannot send a message":"Type a message ...."}
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={isCurrentUserBlocked||isReceiverBlocked}
        />
        <div className="emoji">
          <img
            src="./emoji.png"
            alt=""
            onClick={() => setOpenEmoji((prev) => !prev)}
          />
          <div className="picker">
            <EmojiPicker open={openEmoji} onEmojiClick={handleEmoji} />
          </div>
        </div>
        <button className="sendButton" onClick={handlesend} disabled={isCurrentUserBlocked||isReceiverBlocked}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
