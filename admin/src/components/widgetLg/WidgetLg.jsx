import "./widgetLg.css";
import { useEffect, useState } from "react";
import { userRequest } from "../../requestMethod";
import { format } from "timeago.js";

const StatusBadge = ({type}) => {
  return <button className={"widgetLgButton " + type}>{type}</button>;
};

const WidgetLgTr = ({ order, user }) => {
  return (
    <tr className="widgetLgTr">
      <td className="widgetLgUser">
        <img
          src={user?.img || "https://i.pinimg.com/736x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg"}
          alt=""
          className="widgetLgImg"
        />
        <span className="widgetLgName">{user?.username}</span>
      </td>
      <td className="widgetLgDate">{format(order?.createdAt)}</td>
      <td className="widgetLgAmount">$ {(order?.total/100).toFixed(2)}</td>
      <td className="widgetLgStatus">
        <StatusBadge type={order?.delivery_status} />
      </td>
    </tr>
  );
};

export default function WidgetLg() {
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await userRequest.get("/orders?new=true");
        setOrders(res.data);
      } catch (err) {
        console.log(err);
      }
    }

    getOrders();

    const getUsers = async () => {
      try {
        const res = await userRequest.get("/users");
        setUsers(res.data);
      } catch (err) {
        console.log(err);
      }
    }

    getUsers();
  }, [])

  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Latest transactions</h3>
      <table className="widgetLgTable">
        <thead>
          <tr className="widgetLgTr">
            <th className="widgetLgTh">Customer</th>
            <th className="widgetLgTh">Date</th>
            <th className="widgetLgTh">Amount</th>
            <th className="widgetLgTh">Status</th>
          </tr>
        </thead>
        <tbody>
        {
          orders.map(order => {
            const user = users.find(user => user._id === order.userId);
            return (
              <WidgetLgTr order={order} key={order._id} user={user} />
            )
          }) 
        }
        </tbody>
      </table>
    </div>
  );
}
