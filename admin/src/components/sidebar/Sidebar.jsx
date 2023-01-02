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
} from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

export default function Sidebar() {
  const location = useLocation();

  // console.log(location.pathname.split("/"));
  useEffect(() => {
    switch (location.pathname.split("/")[1]) {
      case "": {
        document.title = "Dashboard - Admin"
        break;
      }
      case "users": {
        document.title = "Users - Admin"
        break;
      }
      case "products": {
        document.title = "Products - Admin"
        break;
      }
      case "orders": {
        document.title = "Orders - Admin"
        break;
      }

      default:
        document.title = "Not Found"
        break;
    }
  }, [location])

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/" className="link">
              <li className={location.pathname.split("/")[1] === "" ? "sidebarListItem active" : "sidebarListItem"}>
                <LineStyle className="sidebarIcon" />
                Home
              </li>
            </Link>
            {/* <li className="sidebarListItem">
              <Timeline className="sidebarIcon" />
              Analytics
            </li>
            <li className="sidebarListItem">
              <TrendingUp className="sidebarIcon" />
              Sales
            </li> */}
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quick Menu</h3>
          <ul className="sidebarList">
            <Link to="/users" className="link">
              <li className={location.pathname.split("/")[1] === "users" ? "sidebarListItem active" : "sidebarListItem"}>
                <PermIdentity className="sidebarIcon" />
                Users
              </li>
            </Link>
            <Link to="/products" className="link">
              <li className={location.pathname.split("/")[1] === "products" ? "sidebarListItem active" : "sidebarListItem"}>
                <Storefront className="sidebarIcon" />
                Products
              </li>
            </Link>
            <Link to="/orders" className="link">
              <li className={location.pathname.split("/")[1] === "orders" ? "sidebarListItem active" : "sidebarListItem"}>
                <AttachMoney className="sidebarIcon" />
                Orders
              </li>
            </Link>
            {/* <li className="sidebarListItem">
              <BarChart className="sidebarIcon" />
              Banners
            </li> */}
          </ul>
        </div>
        {/* <div className="sidebarMenu">
          <h3 className="sidebarTitle">Notifications</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <MailOutline className="sidebarIcon" />
              Mail
            </li>
            <li className="sidebarListItem">
              <DynamicFeed className="sidebarIcon" />
              Feedback
            </li>
            <li className="sidebarListItem">
              <ChatBubbleOutline className="sidebarIcon" />
              Messages
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Staff</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <WorkOutline className="sidebarIcon" />
              Manage
            </li>
            <li className="sidebarListItem">
              <Timeline className="sidebarIcon" />
              Analytics
            </li>
            <li className="sidebarListItem">
              <Report className="sidebarIcon" />
              Reports
            </li>
          </ul>
        </div> */}
      </div>
    </div>
  );
}
