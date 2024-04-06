/* eslint-disable react/prop-types */
import { useState } from "react";
import filterImg1 from "../../../src/assets/filtericon/filter1.png";
import placeholderLogo from "../../../src/assets/logo/placeholderLogo.png";

export default function Header({ headerTitle, isShowFilter }) {
  const [isFilterOptionOpen, setIsFilterOptionOpen] = useState(false);
  const filterItems = [
    "Today",
    "Yesterday",
    "This week",
    "This month",
    "This year",
  ];

  return (
    <div className="flex items-center justify-between">
      <h2 className="inline-block text-2xl lg:mt-8 xs:mt-2 xs:ml-14 lg:ml-6 font-bold">
        {headerTitle}
      </h2>
      <div>
        <div className="flex gap-5 mt-4 px-3 text-xl items-center relative">
          <div className="">
            <img src={placeholderLogo} alt="" className="w-[50px]" />
          </div>
          <div>
            {isShowFilter === true && (
              <img
                src={filterImg1}
                alt=""
                title="filter"
                className="w-6 cursor-pointer lg:mr-3"
                onClick={() => setIsFilterOptionOpen(!isFilterOptionOpen)}
              />
            )}

            {isFilterOptionOpen && (
              <div className="bg-white absolute right-6 mt-4 z-10">
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

            {/* Overlay for close filter card */}
            {isFilterOptionOpen && (
              <div
                className="fixed inset-0 z-0"
                onClick={() => setIsFilterOptionOpen(false)}
              ></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
