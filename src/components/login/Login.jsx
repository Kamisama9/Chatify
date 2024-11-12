import { useState } from "react";
import "./login.css";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword ,signInWithEmailAndPassword } from "firebase/auth";
import {auth, db} from "../../firebase/Firebase";
import { doc, setDoc } from "firebase/firestore";
import ImageUpload from "../../cloudinary/ImageUpload";

const Login = () => {
  const [signupform, setSignupform] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loginform,setLoginform]=useState({
    email:"",
    password:""
  })

  const [avatar, setAvatar] = useState({
    file: null,
    url: "",
  });

  const [loading,setLoading]=useState(false)


  const handleAvatar = (e) => {
    if (e.target.files[0])
      setAvatar({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true)
    const { email, password } = loginform;
    try {
        await signInWithEmailAndPassword(auth,email,password)
    } catch (err) {
      toast.error(err.message)
    } finally{
      setLoading(false)
    }  
  };
  const handlechange=e=>{
    setLoginform({...loginform,[e.target.name]:e.target.value})
  }
  const handleRegister = (e) => {
    e.preventDefault();
    setSignupform({ ...signupform, [e.target.name]: e.target.value });
  };

  const handleRegistersignup = async (e) => {
    e.preventDefault();
    setLoading(true)
    const {username, email, password } = signupform;

    if (!email || !password) {
      toast.error("Email and password are required.");
      return;
    }
      const imageUrl=await ImageUpload(avatar.file)
      console.log(imageUrl)
      if(!imageUrl)
        return
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      await setDoc(doc(db,"users",res.user.uid),{
        username,
        email,
        avatar:imageUrl,
        id:res.user.uid,
        blocked: [],
      })

      await setDoc(doc(db,"userchats",res.user.uid),{
        chats:[],
      })

      toast.success("Account created successfully!");
    } catch (err) {
      toast.error(err.message);
    }
    finally{
      setLoading(false);
    }
  };

  return (
    <div className="login">
      <div className="item">
        <h2>Welcome Back,</h2>
        <form action="" onSubmit={handleLogin}>
          <input type="text" placeholder="Email" name="email" value={loginform.email} onChange={handlechange}/>
          <input type="password" placeholder="Password" name="password" value={loginform.password} onChange={handlechange}/>
          <button disabled={loading}>{loading ?"Loading":"Sign In"}</button>
        </form>
      </div>
      <div className="separator"></div>
      <div className="item">
        <h2>Create an Account</h2>
        <form action="" onSubmit={handleRegistersignup}>
          <label htmlFor="file">
            <img src={avatar.url || "./avatar.png"} alt="" />
            Upload an image
          </label>
          <input
            type="file"
            name="file"
            id="file"
            style={{ display: "none" }}
            onChange={handleAvatar}
          />
          <input
            type="text"
            placeholder="Username"
            name="username"
            value={signupform.username}
            onChange={handleRegister}
          />
          <input
            type="text"
            placeholder="Email"
            name="email"
            value={signupform.email}
            onChange={handleRegister}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={signupform.password}
            onChange={handleRegister}
          />
          <button disabled={loading}>{loading?"Loading":"Sign Up"}</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
