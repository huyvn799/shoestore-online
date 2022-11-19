import "./widgetSm.css";
import { Visibility } from "@material-ui/icons";

const WidgetSmListitem = () => {
  return (
    <>
      <li className="widgetSmListItem">
        <img
          src="https://images.pexels.com/photos/3992656/pexels-photo-3992656.png?auto=compress&cs=tinysrgb&dpr=2&w=500"
          alt=""
          className="widgetSmImg"
        />
        <div className="widgetSmUser">
          <span className="widgetSmUsername">Tuan Nguyen</span>
          <span className="widgetSmUserTitle">Software Engineer</span>
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
  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        <WidgetSmListitem />
        <WidgetSmListitem />
        <WidgetSmListitem />
        <WidgetSmListitem />
        <WidgetSmListitem />
        <WidgetSmListitem />
        <WidgetSmListitem />
        <WidgetSmListitem />
        <WidgetSmListitem />
        <WidgetSmListitem />
        <WidgetSmListitem />
        <WidgetSmListitem />
      </ul>
    </div>
  );
}
