import "./widgetSm.css";
import { Visibility } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { userRequest } from "../../requestMethod";

const WidgetSmListitem = ({user}) => {
  return (
    <>
      <li className="widgetSmListItem">
        <img
          src={user.img || "https://i.pinimg.com/736x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg"}
          alt=""
          className="widgetSmImg"
        />
        <div className="widgetSmUser">
          <span className="widgetSmUsername">{user.username}</span>
          {/* <span className="widgetSmUserTitle">Software Engineer</span> */}
        </div>
        <button className="widgetSmButton">
          <Visibility className="widgetSmIcon" />
          Display
        </button>
      </li>
    </>
  );
};

export default function WidgetSm() {
  const [users, setUsers ] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await userRequest.get("/users?new=true");
        setUsers(res.data);
      } catch (err) {
        console.log(err);
      }
    }

    getUsers();
  }, [])

  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        {
          users.map(user => (
            <WidgetSmListitem key={user._id} user={user}/>
          ))
        }
      </ul>
    </div>
  );
}
