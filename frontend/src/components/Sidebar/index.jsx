import "./sidebar.css";
import {
  LineStyle,
  Timeline,
  TrendingUp,
  PermIdentity,
  Storefront,
  AttachMoney,
  BarChart,
  MailOutline,
  DynamicFeed,
  ChatBubbleOutline,
  WorkOutline,
  Report,
} from "@material-ui/icons";
import { 
  ShoppingCartOutlined as ShoppingCart,
  DownOutlined, 
  UserOutlined, 
  LogoutOutlined, 
  CommentOutlined, 
  HeartOutlined,
   } from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";

export default function Sidebar() {
  const location = useLocation();

  const [pathname, setPathname] = useState(location.pathname.split("/")[2]);
  useEffect(() => {
    switch (location.pathname.split("/")[2]) {
      case "profile": {
        document.title = "My profile";
        break;
      }
      case "notification": {
        document.title = "Notification";
        break;
      }
      case "address": {
        document.title = "My address";
        break;
      }
      case "order": {
        document.title = "My order";
        break;
      }
      case "wishlist": {
        document.title = "Wishlist";
        break;
      }
      case "review": {
        document.title = "My review";
        break;
      }
      default:
        document.title = "Not found";
        break;
    }
    setPathname(location.pathname.split("/")[2])
  }, [location.pathname])

  console.log(pathname);

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Account</h3>
          <ul className="sidebarList">
            <Link to="/customer/profile" >
              <li 
                className={ pathname === "profile" ? "sidebarListItem active" : "sidebarListItem"}
              >
                <UserOutlined className="sidebarIcon"/>
                My profile
              </li>
            </Link>
            <Link to="/customer/notification" >
              <li 
                className={ pathname === "notification" ? "sidebarListItem active" : "sidebarListItem"}
              >
                <Timeline className="sidebarIcon" />
                Notification
              </li>
            </Link>
            <Link to="/customer/address" >
              <li 
                className={ pathname === "address" ? "sidebarListItem active" : "sidebarListItem"}
              >
                <TrendingUp className="sidebarIcon" />
                My address
              </li>
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Product</h3>
          <ul className="sidebarList">
            <Link to="/customer/order" >
              <li 
                className={ pathname === "order" ? "sidebarListItem active" : "sidebarListItem"}
              >
                <ShoppingCart className="sidebarIcon" />
                My order
              </li>
            </Link>
            <Link to="/customer/wishlist" >
              <li 
                className={ pathname === "wishlist" ? "sidebarListItem active" : "sidebarListItem"}
              >
                <HeartOutlined className="sidebarIcon" />
                Wishlist
              </li>
            </Link>
            {/* <li 
                      achMoney className="sidebarIcon" />
              SsidebarListItem active xem
sidebarListItem            </li> */}
            <Link to="/customer/review" >
              <li 
                className={ pathname === "review" ? "sidebarListItem active" : "sidebarListItem"}
              >
                <CommentOutlined className="sidebarIcon" />
                My review
              </li>
            </Link>
          </ul>
        </div>

        {/* <div className="sidebarMenu">
          <h3 className="sidebarTitle">Thông báo</h3>
          <ul className="sidebarList">
            <li 
              <MailOutline className="sidebarIcon" />
              sidebarListItem active
    sidebarListItem        </li>
            <li 
              <DynamicFeed className="sidebarIcon" />
              Feedback
       sidebarListItem active
    sidebarListItem        {/* <li 
                      tBubbleOutline className="sidebarIcon" />
              Messages
       sidebarListItem active 
   sidebarListItem       </ul>
        </div>  */}

        {/* <div className="sidebarMenu">
          <h3 className="sidebarTitle">Staff</h3>
          <ul className="sidebarList">
            <li 
              <WorkOutline className="sidebarIcon" />
              Manage
       sidebarListItem active
    sidebarListItem        <li 
              <Timeline className="sidebarIcon" />
              Analytics
       sidebarListItem active
    sidebarListItem        <li 
              <Report className="sidebarIcon" />
              Reports
       sidebarListItem active
    sidebarListItem      </ul>
        </div> */}
      </div>
    </div>
  );
}
