// Expenses.js
import edit from "../../assets/expenses/edit.png";
import delet from "../../assets/expenses/delete.png";
import filt from "../../assets/expenses/filter.png";
import check from "../../assets/expenses/sav.png";
import close from "../../assets/expenses/cls.png";

import { useState } from "react";

import Header from "../../components/Header";
import DashboardCard from "../../components/cards/DashboardCard";
import expenseImg from "../../assets/expenses/money.png";
import InputField from "../../components/Form/InputField";
import { useForm } from "react-hook-form";
import DynamicModal from "../../components/Modal";

export default function Expenses() {
  const [isModalOpen, setModalIsOpen] = useState(false);
  const [isFilterOptionOpen, setIsFilterOptionOpen] = useState(false);
  const cardInfo = [
    {
      name: "Total Expanses",
      amount: "7120",
      icon: expenseImg,
    },
  ];

  const filterItems = [
    "All Expenses",
    "Today",
    "Yesterday",
    "This week",
    "This month",
    "This year",
  ];

  const [expenses, setExpenses] = useState([
    {
      id: 1,
      serialNo: "A001",
      productName: "Item 1",
      quantity: 5,
      price: 20.0,
    },
    {
      id: 2,
      serialNo: "A002",
      productName: "Item 2",
      quantity: 3,
      price: 15.0,
    },
    {
      id: 3,
      serialNo: "A003",
      productName: "Item 3",
      quantity: 2,
      price: 10.0,
    },
    // Add more fake data as needed
  ]);

  const {
    register,

    formState: { errors },
  } = useForm();

  const handleEdit = (id) => {
    console.log(`Edit expense with ID: ${id}`);
  };

  const handleDelete = (id) => {
    console.log(`Delete expense with ID: ${id}`);
  };

  const modalCustomStyles = {
    content: {
      width: "450px",
      height: "470px",
      margin: "auto",
      border: "none",
      borderRadius: "4px",
      padding: "0px",
    },
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div>
      <Header headerTitle="Hello, Patricia" isShowFilter={false} />
      <div className="mt-6 ml-6 flex flex-wrap gap-3 pr-5">
        {cardInfo.map((item) => (
          <DashboardCard key={item.name} cardInfo={item} />
        ))}
      </div>

      <div>
        <div className="mt-12 flex justify-between ">
          <div>
            <h1 className="font-bold text-2xl ml-6 mt-4 ">Expenses</h1>
          </div>

          <div className="flex gap-2 ">
            <div>
              <img
                onClick={() => setIsFilterOptionOpen(!isFilterOptionOpen)}
                className="w-6 mt-2 mr-6"
                src={filt}
                alt=""
              />

              <div className="relative">
                {isFilterOptionOpen && (
                  <div className="bg-white absolute right-5  py-1 p-2 mt-2 w-36 text-center z-10 shadow-xl">
                    <ul>
                      {filterItems.map((item, index) => (
                        <li
                          key={index}
                          className={`  text-sm  p-2 hover:text-[#FFA901] cursor-pointer ${
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
                {isFilterOptionOpen && (
                  <div
                    className="fixed inset-0 z-0"
                    onClick={() => setIsFilterOptionOpen(false)}
                  ></div>
                )}
              </div>
            </div>
            <div>
              <button
                onClick={openModal}
                className="w-[180px] h-[48px] bg-[#FFA901] mr-7 rounded-[16px] text-white font-bold"
              >
                Add Product
              </button>

              {isModalOpen && (
                <div className="fixed inset-0 bg-white bg-opacity-75 flex items-center justify-center  ">
                  <div className="p-6 rounded-md bg-white w-96">
                    <div className="space-y-3 bg-white flex justify-between items-center pb-3 w-full ">
                      <div>
                        <DynamicModal
                          isOpen={isModalOpen}
                          onRequestClose={closeModal}
                          customStyle={modalCustomStyles}
                          content={
                            <div className="lg:ml-2 lg:mr-2 sm:ml-8 sm:mr-12">
                              <div className="bg-[#ffa901] mt-8">
                                <h2 className="text-center text-white text-2xl py-4 font-bold">
                                  PRODUCT EXPENSES
                                </h2>
                              </div>
                              <div className="ml-6 ">
                                <InputField
                                  label="PRODUCT NAME"
                                  name="productName"
                                  register={register}
                                  error={errors}
                                />
                              </div>

                              <div className=" ml-6">
                                <div className="">
                                  <InputField
                                    label="QUANTITY TYPE"
                                    name="quantityType"
                                    register={register}
                                    type="select"
                                    options={[
                                      { label: "Items", value: "ITEMS" },
                                      { label: "Kg", value: "KG" },
                                    ]}
                                    error={errors.quantityType}
                                  />
                                </div>

                                <div className="">
                                  <InputField
                                    label="QUALITY"
                                    name="quality"
                                    register={register}
                                    error={errors.quality}
                                  />
                                </div>
                              </div>

                              <div className="ml-6">
                                <InputField
                                  label="PRICE"
                                  name="PRICE"
                                  register={register}
                                  error={errors}
                                />
                              </div>

                              <div className="flex justify-between mt-4">
                                <div className="flex bg-[#FFA901] rounded-[16px] ml-6">
                                  <button
                                    onClick={closeModal}
                                    className="py-1 px-2  sm:w-16 lg:w-24 rounded-l"
                                  >
                                    <img src={check} className="" alt="" />
                                  </button>
                                </div>

                                <div className="flex bg-[#EE1212] rounded-[16px] mr-8">
                                  <button
                                    onClick={closeModal}
                                    className="px-2 sm:w-16 lg:w-24 rounded-l"
                                  >
                                    <img src={close} alt="" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div>
          <div className="xs:w-[700px] lg:w-[95%] mt-8">
            <table className="w-full ml-6 mr-7 mt-8 bg-white rounded-lg">
              <thead>
                <tr>
                  <th className="py-2 ">Serial NO</th>
                  <th className="py-2  ">Product Name</th>
                  <th className="py-2">Quantity</th>
                  <th className="py-2  ">Price</th>
                  <th className="py-2 ">Action</th>
                </tr>
              </thead>
              <tbody>
                {expenses.slice(0, 10).map((expense) => (
                  <tr className="text-center" key={expense.id}>
                    <td className="py-2 px-10 ">{expense.serialNo}</td>
                    <td className="py-2 px-12 ">{expense.productName}</td>
                    <td className="py-2 px-12 ">{expense.quantity}</td>
                    <td className="py-2 px-2">{expense.price.toFixed(2)}</td>
                    <td className="p-3   ">
                      <div className="flex gap-2 ml-12 sm:ml-2 justify-center">
                        <button
                          className="  py-4   rounded "
                          onClick={() => handleEdit(expense.id)}
                        >
                          <img src={edit} alt="" />
                        </button>
                        <button
                          className="  py-2  rounded"
                          onClick={() => handleDelete(expense.id)}
                        >
                          <img className="" src={delet} alt="" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
