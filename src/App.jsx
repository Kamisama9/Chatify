import { useEffect } from "react";
import Chat from "./components/chat/Chat";
import Details from "./components/details/Details";
import Lists from "./components/lists/Lists";
import Login from "./components/login/Login";
import Notification from "./components/notifications/Notification";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/Firebase";
import { useUserStore } from "./store/UserStore";
import ClipLoader from "react-spinners/ClipLoader";
import { useChatStore } from "./store/ChatStore";

const App = () => {
  const { currentUser, isLoading, fetchUserInfo } = useUserStore();
  const {chatId}=useChatStore()

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchUserInfo(user.uid);
      } else {
        fetchUserInfo(null);
      }
    });

    return () => {
      unSub();
    };
  }, [fetchUserInfo]);

  console.log(currentUser);

  if (isLoading)
    return (
      <ClipLoader
        color={'#1f8ef1'}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      /> 
    );

  return (
    <div className="container">
      {currentUser ? (
        <>
          <Lists />
          {chatId && <Chat />}
          {chatId && <Details />}
        </>
      ) : (
        <Login />
      )}
      <Notification />
    </div>
  );
};

export default App;
