import Header from "../../components/Header";
import DashboardCard from "../../components/cards/DashboardCard";
import visitorsImg from "../../assets/cardImage/visitors.png";
import orderImg from "../../assets/cardImage/order.png";
import incomeImg from "../../assets/cardImage/income.png";
import expenseImg from "../../assets/cardImage/expense.png";
import netEarningImg from "../../assets/cardImage/net-earning.png";

export default function Dashboard() {
  const cardInfo = [
    {
      name: "Visitors",
      amount: "280",
      icon: visitorsImg,
    },
    {
      name: "Order Received",
      amount: "620",
      icon: orderImg,
    },
    {
      name: "Total Income",
      amount: "20,000",
      icon: incomeImg,
    },
    {
      name: "Total Expenses",
      amount: "4,000",
      icon: expenseImg,
    },
    {
      name: "Net Earning",
      amount: "16,000",
      icon: netEarningImg,
    },
  ];

  return (
    <div>
      <Header headerTitle="Hello, Patricia" isShowFilter={true} />
      <div className="mt-8 ml-6 flex flex-wrap gap-3 pr-5">
        {cardInfo.map((item) => (
          <DashboardCard key={item.name} cardInfo={item} />
        ))}
      </div>
    </div>
  );
}
