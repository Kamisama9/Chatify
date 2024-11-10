import "./adduser.css"
const AddUser = () => {
  return (
    <div className="adduser">
      <form action="">
        <input type="text" placeholder="Username" name="username" />
        <button>search</button>
      </form>
      <div className="user">
        <div className="detail">
            <img src="./avatar.png" alt="" />
            <span>John cena</span>
        </div>
        <button>Add User</button>
      </div>
    </div>
  )
}

export default AddUser
