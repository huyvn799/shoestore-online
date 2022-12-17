import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import { useMemo, useState } from "react";
import { useEffect } from "react";
import { userRequest } from "../../requestMethod";

export default function FeaturedInfo() {
  const [income, setIncome] = useState([]);
  const [percent, setPercent] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalUser, setTotalUser] = useState(0);

  const MONTHS = useMemo(() => [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ], []
  )

  useEffect(() => {
    const getTotalIncome = async () => {
      try {
        const res = await userRequest.get("/orders");

        const result = res.data.reduce((total, order) => total + order.total, 0);

        setTotalRevenue((result / 100).toFixed(2));

      } catch (err) {
        console.log(err);
      }
    }

    getTotalIncome();

    const getLatestIncome = async() => {
      try {
        const res = await userRequest.get("/orders/income/latest");

        let amounts = [];

        const latestIncome = res.data.map(item => {
          
          amounts.push(item.total)
          return {
              month: MONTHS[item._id[1] - 1],
              total: (item.total/100).toFixed(2)
            }
        })
        setIncome(latestIncome);
        setPercent(latestIncome[1].total * 100 / latestIncome[0].total - 100)
      } catch (err) {
        console.log(err);
      }
    }

    getLatestIncome();

    const getAllUsers = async () => {
      try {
        const res = await userRequest.get("/users");

        const realUsers = res.data.filter(user => user.isAdmin === false);

        setTotalUser(realUsers.length);

      } catch (err) {
        console.log(err);
      }
    }

    getAllUsers();
  }, [])

  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Current Revenue</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">$ {income[1]?.total}</span>
          <span className="featuredMoneyRate">
            {Math.round(percent)}%
            {Math.round(percent) > 0 
              ? (<ArrowUpward className="featuredIcon" />)
              : Math.round(percent) < 0 
                ? (<ArrowDownward className="featuredIcon negative" />)
                : ("")
            }
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Total Revenue</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">$ {totalRevenue}</span>
          {/* <span className="featuredMoneyRate">
            14M <ArrowDownward className="featuredIcon negative" />
          </span> */}
        </div>
        {/* <span className="featuredSub">Compared to last month</span> */}
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Total User</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{totalUser}</span>
          {/* <span className="featuredMoneyRate">
            24M <ArrowUpward className="featuredIcon" />
          </span> */}
        </div>
        {/* <span className="featuredSub">Compared to last month</span> */}
      </div>
    </div>
  );
}
