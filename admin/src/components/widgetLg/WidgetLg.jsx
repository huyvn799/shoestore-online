import "./widgetLg.css";

const WidgetLgTr = ({ type }) => {
  const Button = () => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };
  return (
    <>
      <tr className="widgetLgTr">
        <td className="widgetLgUser">
          <img
            src="https://images.pexels.com/photos/4172933/pexels-photo-4172933.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
            alt=""
            className="widgetLgImg"
          />
          <span className="widgetLgName">Tuan Nguyen</span>
        </td>
        <td className="widgetLgDate">2 Jun 2021</td>
        <td className="widgetLgAmount">2.000.000 VNĐ</td>
        <td className="widgetLgStatus">
          <Button type="Approved" />
        </td>
      </tr>
    </>
  );
};

export default function WidgetLg() {
  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Latest transactions</h3>
      <table className="widgetLgTable">
        <tr className="widgetLgTr">
          <th className="widgetLgTh">Customer</th>
          <th className="widgetLgTh">Date</th>
          <th className="widgetLgTh">Amount</th>
          <th className="widgetLgTh">Status</th>
        </tr>
        <WidgetLgTr type={"Approved"} />
        <WidgetLgTr type={"Declined"} />
        <WidgetLgTr type={"Pending"} />
        <WidgetLgTr type={"Approved"} />
        <WidgetLgTr type={"Declined"} />
        <WidgetLgTr type={"Approved"} />
        <WidgetLgTr type={"Declined"} />
      </table>
    </div>
  );
}
