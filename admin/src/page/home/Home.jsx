 
import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featureInfo/FeatureInfo";
import "./home.css";
import { userData } from "../../dummyData";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import { useState } from "react";
import { useMemo } from "react";
import { useEffect } from "react";
import { userRequest } from "../../requestMethod";

export default function Home() {
  const [userStats, setUserStats] = useState([]);
  const [orderStats, setOrderStats] = useState([]);
  const [domainUser, setDomainUser] = useState([]);
  const [domainOrder, setDomainOrder] = useState([]);

  const MONTHS = useMemo(() => [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ], []
  )

  useEffect(() => {
    const getUserStats = async() => {
      try {
        const res = await userRequest.get("/users/stats");
        console.log(res.data);
        const stats = res.data.map(item => (
            {
              name: MONTHS[item._id[1] - 1],
              "Active User": item.total
            }
        ))
        setUserStats(stats);

      } catch (err) {
        console.log(err);
      }
    }

    getUserStats();

    const getOrderStats = async() => {
      try {
        const res = await userRequest.get("/orders/income/year");
        console.log(res.data);  

        let amounts = [];

        const stats = res.data.map(item => {
          
          amounts.push(item.total)
          return {
              name: MONTHS[item._id[1] - 1],
              "Sale Amount": (item.total/100).toFixed(2)
            }
        })
        setOrderStats(stats);

        setDomainOrder([Math.min(...amounts)/100, Math.max(...amounts)/100]);
      } catch (err) {
        console.log(err);
      }
    }

    getOrderStats();
  }, [MONTHS]);

// console.log(orderStats);
  return (
    <div className="home">
      <FeaturedInfo />
      <Chart
        data={userStats}
        title="User Analytics"
        grid
        domain={[0, "auto"]}
        dataKey="Active User"
      />
      <Chart
        data={orderStats}
        title="Income Analytics"
        grid
        domain={domainOrder}
        dataKey="Sale Amount"
      />
      <div className="homeWidgets">
        <WidgetSm />
        <WidgetLg />
      </div>
    </div>
  );
}
