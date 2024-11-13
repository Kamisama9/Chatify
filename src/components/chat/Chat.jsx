import { useEffect, useRef, useState } from "react";
import "./chat.css";
import EmojiPicker from "emoji-picker-react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/Firebase";
import { useChatStore } from "../../store/ChatStore";
const Chat = () => {
  const [openEmoji, setOpenEmoji] = useState(false);
  const [text, setText] = useState("");
  const [chat,setChat]=useState();
  const endref=useRef(null)
  const {chatId}=useChatStore();


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
  },[chatId]);

  console.log(chat) 

  const handleEmoji = (e) => {
    setText((prev) => prev + e.emoji);
    setOpenEmoji(false);
  };

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
      {chat?.messages.map((message)=>{
        <div className="message own" key={message.createdAt}>
          <div className="texts">
          {message.img && <img src={message.img} alt="" />}
            <p>{message.text}</p>
            <span>1 min ago</span>
          </div>
        </div>
      })}

        <div ref={endref}></div>
      </div>

      <div className="bottom">
        <div className="icons">
          <img src="./img.png" alt="" />
          <img src="./camera.png" alt="" />
          <img src="./mic.png" alt="" />
        </div>
        <input
          type="text"
          placeholder="Type a message ...."
          value={text}
          onChange={(e) => setText(e.target.value)}
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
        <button className="sendButton">Send</button>
      </div>
    </div>
  );
};

export default Chat;
