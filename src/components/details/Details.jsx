import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../firebase/Firebase";
import { useChatStore } from "../../store/ChatStore";
import { useUserStore } from "../../store/UserStore";
import "./details.css";
const Details = () => {
  const {currentUser}=useUserStore();
  const {chatId,user,isCurrentUserBlocked,isReceiverBlocked,changeBlock}=useChatStore();

  const handleBlock=async()=>{
    if(!user) return;

    const userDocRef=doc(db,'users',currentUser.id);
    try {
      await updateDoc(userDocRef,{
        blocked:isReceiverBlocked ?arrayRemove(user.id):arrayUnion(user.id)
      })
      changeBlock();
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="detail">
      <div className="user">
        <img src={user?.avatar || "./avatar.png"} alt="" />
        <h2>{user?.username}</h2>
        <p>Lorem ipsum dolor sit amet.</p>
      </div>
      <div className="info">
        <div className="option">
          <div className="title">
            <span>Chat Settings</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>

        <div className="option">
          <div className="title">
            <span>Privacy & Settings</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>

        <div className="option">
          <div className="title">
            <span>Shared Photos</span>
            <img src="./arrowDown.png" alt="" />
          </div>
          <div className="photos">
            <div className="photoItem">
              <div className="photoDetail">
                <img
                  src="https://cdn.mos.cms.futurecdn.net/JUEjSHyBweakAYZFLbdjVA-970-80.png.webp"
                  alt=""
                />
                <span>Hero_child.png</span>
              </div>
              <img src="./download.png" alt="" className="icon"/>
            </div>
          </div>


          <div className="photos">
            <div className="photoItem">
              <div className="photoDetail">
                <img
                  src="https://cdn.mos.cms.futurecdn.net/JUEjSHyBweakAYZFLbdjVA-970-80.png.webp"
                  alt=""
                />
                <span>Hero_child.png</span>
              </div>
              <img src="./download.png" alt="" className="icon"/>
            </div>
          </div>

          <div className="photos">
            <div className="photoItem">
              <div className="photoDetail">
                <img
                  src="https://cdn.mos.cms.futurecdn.net/JUEjSHyBweakAYZFLbdjVA-970-80.png.webp"
                  alt=""
                />
                <span>Hero_child.png</span>
              </div>
              <img src="./download.png" alt="" className="icon"/>
            </div>
          </div>
        </div>

        

        <div className="option">
          <div className="title">
            <span>Shared Files</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>

        <button onClick={handleBlock}>{isCurrentUserBlocked ?"You are blocked":isReceiverBlocked?"User blocked":"Block User"}</button>
        <button className="logout" onClick={()=>auth.signOut()}>Logout</button>
      </div>
    </div>
  );
};
export default Details;
