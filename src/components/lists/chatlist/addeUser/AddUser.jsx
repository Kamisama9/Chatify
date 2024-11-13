import { useState } from "react";
import "./adduser.css";
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../../../firebase/Firebase";
import { useUserStore } from "../../../../store/UserStore";
const AddUser = () => {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const { currentUser } = useUserStore();
  console.log(user)
  const handleSearch = async (e) => {
    e.preventDefault();
    const userRef = collection(db, "users");
    const q = query(userRef, where("username", "==", username));
    try {
      const userInfo = await getDocs(q);
      if (!userInfo.empty) setUser(userInfo.docs[0].data());
    } catch (error) {
      console.log(error);
    }
  };

  const handleAdd = async () => {
    const chatRef = collection(db, "chats");
    const userChatsRef = collection(db, "userchats");
    try {
      const newchatRef = doc(chatRef);
      await setDoc(newchatRef, {
        createdAt: serverTimestamp(),
        messages: [],
      });
      await updateDoc(doc(userChatsRef, user.id), {
        chats: arrayUnion({
          chatId: newchatRef.id,
          lastMessage: "",
          receiverId: currentUser.id,  
          updatedAt: Date.now(),
        }),
      });
      await updateDoc(doc(userChatsRef, currentUser.id), {
        chats: arrayUnion({
          chatId: newchatRef.id,
          lastMessage: "",
          receiverId: user.id,  
          updatedAt: Date.now(),
        }),
      });

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="adduser">
      <form action="" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button>search</button>
      </form>
      {user && (
        <div className="user">
          <div className="detail">
            <img src={user.avatar && "./avatar.png"} alt="" />
            <span>{user.username}</span>
          </div>
          <button onClick={handleAdd}>Add User</button>
        </div>
      )}
    </div>
  );
};

export default AddUser;
