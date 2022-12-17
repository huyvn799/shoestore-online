 
import "./topbar.css";
import { NotificationsNone, Language, Settings } from "@mui/icons-material";
import logo from "../../img/logo.png";
import { Dropdown } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { 
  DownOutlined, 
  UserOutlined, 
  LogoutOutlined, 
} from "@ant-design/icons";
import { logoutUser } from "../../redux/apiCalls";
import { useEffect } from "react";


export default function Topbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.login.currentUser);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user])

  const handleLogout = () => {

    // console.log(user);
    logoutUser(user?.accessToken, user?._id, dispatch, navigate);
  };

  const items = [
    {
      label: <Link to="/customer/profile">My Profile</Link>,
      key: "1",
      icon: <UserOutlined />,
    },
    {
      type: "divider",
    },
    {
      label: <div onClick={handleLogout}>Logout</div>,
      key: "5",
      icon: <LogoutOutlined />,
    },
  ];

  const menuProps = {
    items,
    // onClick: handleMenuClick,
  };

  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <Link to="/" className="logo">SPORTY SHOES.</Link>
        </div>
        <div className="topRight">
          {/* <div className="topbarIconContainer">
            <NotificationsNone />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Language />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Settings />
          </div> */}
          <Dropdown.Button
            menu={menuProps}
            // placement="bottom"
            icon={<DownOutlined />}
          >
            Hi, {user?.username}
          </Dropdown.Button>
          {/* <img src={logo} alt="" className="topAvatar" /> */}
        </div>
      </div>
    </div>
  );
}
