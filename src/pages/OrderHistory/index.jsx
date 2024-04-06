import Header from "../../components/Header";
import Table from "../../components/Table";
import visitorsImg from "../../assets/cardImage/visitors.png";
import orderImg from "../../assets/cardImage/order.png";
import incomeImg from "../../assets/cardImage/income.png";
import DashboardCard from "../../components/cards/DashboardCard";
import burger from "../../assets/food/burger.png";
import filterIcon from "../../assets/filtericon/filter1.png";
import { useState } from "react";

export default function OrderHistory() {
  const [isFilterOptionOpen, setIsFilterOptionOpen] = useState(false);

  const cardInfo = [
    {
      name: "Visitors",
      amount: "620",
      icon: visitorsImg,
    },
    {
      name: "Order Received",
      amount: "440",
      icon: orderImg,
    },
    {
      name: "Total Income",
      amount: "180",
      icon: incomeImg,
    },
  ];

  const foodData = [
    {
      id: 1,
      image: burger,
      foodName: "Burger",
      totalItems: 5,
    },
    {
      id: 1,
      image: burger,
      foodName: "Burger",
      totalItems: 5,
    },
    {
      id: 1,
      image: burger,
      foodName: "Burger",
      totalItems: 5,
    },

    {
      id: 2,
      image: burger,
      foodName: "Pizza",
      totalItems: 3,
    },
    {
      id: 3,
      image: burger,
      foodName: "Pasta",
      totalItems: 8,
    },

    {
      id: 4,
      image: burger,
      foodName: " Fry",
      totalItems: 8,
    },
    // Add more items as needed
  ];

  const filterItems = [
    "Today",
    "Yesterday",
    "This week",
    "This month",
    "This year",
  ];
  return (
    <div>
      <Header headerTitle="Hello, Patricia" isShowFilter={false} />
      <div className="flex lg:flex-row xs:flex-col gap-8 ">
        <div className="w-[70%]">
          <div className="mt-8 ml-6 flex flex-wrap gap-3 pr-5">
            {cardInfo.map((item) => (
              <DashboardCard key={item.name} cardInfo={item} />
            ))}
          </div>
          <div className="mt-12 ml-6">
            <Table />
          </div>
        </div>

        <div className="bg-white mt-9 lg:w-[30%] xs:w-[70%] xs:ml-6 lg:ml-0 mr-5 rounded-lg shadow-lg">
          <div className="flex mt-6 justify-between items-center">
            <h1 className="w-[90%] font-bold text-lg ml-4">Detail Order</h1>
            <img
              src={filterIcon}
              alt=""
              title="filter"
              className="w-[8%] cursor-pointer mr-5"
              onClick={() => setIsFilterOptionOpen(!isFilterOptionOpen)}
            />

            <div className="relative">
              {isFilterOptionOpen && (
                <div className="bg-white absolute right-5 top-6 z-10 shadow-xl">
                  <ul className="w-[150px] p-2 text-sm font bold text-center font-bold">
                    {filterItems.map((item, index) => (
                      <li
                        key={index}
                        className={`py-2 hover:text-[#FFA901] cursor-pointer ${
                          index !== filterItems.length - 1
                            ? "border-b-[1px] border-[#aaa]"
                            : ""
                        }`}
                      >
                        {item}
                      </li> 
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Overlay for close filter card */}
            {isFilterOptionOpen && (
              <div
                className="fixed inset-0 z-0"
                onClick={() => setIsFilterOptionOpen(false)}
              ></div>
            )}
          </div>

          <h1 className="text-center mt-4 font-bold text-sm">ITEMS</h1>

          <h1 className="relative text-center mt-4 ">
            {/* THE LINE */}
            <span className="underscore"></span>
          </h1>

          {/* items */}
          <div className="">
            {foodData.map((food) => (
              <div
                key={food.id}
                className="flex items-center justify-between mt-4"
              >
                <div className="w-[75%] flex gap-2 items-center mx-4">
                  <img
                    src={food.image}
                    alt={food.foodName}
                    className="w-[50px] rounded "
                  />
                  <div className="w-[70%]">
                    <h2 className="text-xm font-bold">
                      {food.foodName} ({food.totalItems})
                    </h2>
                  </div>
                </div>
                <div className="w-[25%]">
                  <p className="text-xs text-gray-400">
                    {food.totalItems} items
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
