import { auth } from "../../firebase/Firebase";
import "./details.css";
const Details = () => {
  return (
    <div className="detail">
      <div className="user">
        <img src="./avatar.png" alt="" />
        <h2>Kami sama</h2>
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

        <button>Block User</button>
        <button className="logout" onClick={()=>auth.signOut()}>Logout</button>
      </div>
    </div>
  );
};
export default Details;
