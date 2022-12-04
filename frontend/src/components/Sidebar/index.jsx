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
import { Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { changePage } from "~/redux/customerRedux";

export default function Sidebar() {
  const dispatch = useDispatch();
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Tài khoản</h3>
          <ul className="sidebarList">
            {/* <Link to="/account" className="link"> */}
            <li
              onClick={() => dispatch(changePage("account"))}
              className="sidebarListItem active"
            >
              <LineStyle className="sidebarIcon" />
              Thông tin tài khoản
            </li>
            {/* </Link> */}
            <li
              onClick={() => dispatch(changePage("notify"))}
              className="sidebarListItem"
            >
              <Timeline className="sidebarIcon" />
              Thông báo của tôi
            </li>
            <li
              onClick={() => dispatch(changePage("address"))}
              className="sidebarListItem"
            >
              <TrendingUp className="sidebarIcon" />
              Sổ địa chỉ
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Sản phẩm</h3>
          <ul className="sidebarList">
            {/* <Link to="/users" className="link"> */}
            <li
              onClick={() => dispatch(changePage("history"))}
              className="sidebarListItem"
            >
              <PermIdentity className="sidebarIcon" />
              Quản lý đơn hàng
            </li>
            {/* </Link> */}
            {/* <Link to="/products" className="link"> */}
            <li
              onClick={() => dispatch(changePage("wishlist"))}
              className="sidebarListItem"
            >
              <Storefront className="sidebarIcon" />
              Sản phẩm yêu thích
            </li>
            {/* </Link> */}
            <li className="sidebarListItem">
              <AttachMoney className="sidebarIcon" />
              Sản phẩm đã xem
            </li>
            <li
              onClick={() => dispatch(changePage("review"))}
              className="sidebarListItem"
            >
              <BarChart className="sidebarIcon" />
              Nhận xét của tôi
            </li>
          </ul>
        </div>

        {/* <div className="sidebarMenu">
          <h3 className="sidebarTitle">Thông báo</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <MailOutline className="sidebarIcon" />
              Mail đã gửi
            </li>
            <li className="sidebarListItem">
              <DynamicFeed className="sidebarIcon" />
              Feedback
            </li>
            {/* <li className="sidebarListItem">
              <ChatBubbleOutline className="sidebarIcon" />
              Messages
            </li> 
          </ul>
        </div>  */}

        {/* <div className="sidebarMenu">
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
