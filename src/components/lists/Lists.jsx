import ChatList from "./chatlist/ChatList"
import "./lists.css"
import UserInfo from "./userinfo/UserInfo"
const Lists = () => {
  return (
    <div className="list">
      <UserInfo/>
      <ChatList/>
    </div>
  )
}

export default Lists
