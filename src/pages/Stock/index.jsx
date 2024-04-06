import Header from "../../components/Header";
import totalItemsImg from "../../assets/cardImage/total-items.png";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import DashboardCard from "../../components/cards/DashboardCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import editImg from "../../assets/action-button/edit.png";
import deleteImg from "../../assets/action-button/delete.png";
import InputField from "../../components/Form/InputField";
import DynamicModal from "../../components/Modal";

export default function Stock() {
  const [isModalOpen, setModalIsOpen] = useState(false);

  // yup schema for validate new stock form
  const formInputSchema = yup.object().shape({
    name: yup.string().required("Product Name is required"),
    quantity: yup.string().required("Product quantity is required"),
    price: yup.string().required("Price is required"),
  });
  const cardInfo = [
    {
      name: "Total Stock",
      amount: "1",
      icon: totalItemsImg,
    },
  ];

  // stocks data
  const stocks = [
    {
      categoryName: "potato",
      formDate: "20-8-2024",
      toDate: "20-7-2024",
      limit: "30",
      leftOver: "29",
    },
  ];

  const windowWidth = window.innerWidth;

  // modal style
  const modalCustomStyles = {
    content: {
      width:
        windowWidth < 400
          ? "90%"
          : windowWidth >= 400 && windowWidth < 700
          ? "400px"
          : "450px",
      height: "460px",
      margin: "auto",
      border: "none",
      borderRadius: "4px",
      padding: "0px",
    },
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formInputSchema),
  });

  // handle form submit for new menu
  const onSubmit = (data) => {
    console.log(data);
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      console.log("deleted success", id);
    }
  };

  return (
    <div>
      <Header headerTitle="Hello, Patricia" isShowFilter={false} />
      <div className="flex flex-col lg:flex-row items-center justify-between">
        <div className="mt-8 ml-6 flex flex-row gap-3 mr-5">
          {cardInfo.map((item) => (
            <DashboardCard key={item.name} cardInfo={item} />
          ))}
        </div>
        <button
          type="button"
          className="w-full lg:w-[180px] bg-[#FFA901] text-white px-5 py-2 rounded-lg mt-5 lg:mt-0 mr-7 hover:bg-yellow-400"
          onClick={openModal}
        >
          Add New Stock
        </button>
      </div>

      {/* stock details table*/}
      <div className="bg-white ml-6 mt-7 mr-7 p-4 rounded-lg">
        <div className="lg:w-[95%] xs:w-[700px] bg-white p-4 rounded-lg overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr>
                <th>Category Name</th>
                <th>Form Date</th>
                <th>To Date</th>
                <th>Limit</th>
                <th>Left Over</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {stocks.map((stock, index) => (
                <tr key={index} className="h-[80px] text-sm">
                  <td>{stock.categoryName}</td>
                  <td>{stock.formDate}</td>
                  <td>{stock.toDate}</td>
                  <td>{stock.limit}</td>
                  <td>{stock.leftOver}</td>
                  <td>
                    <div className="flex gap-3">
                      <img
                        src={editImg}
                        alt=""
                        className="cursor-pointer"
                        onClick={openModal}
                      />
                      <img
                        src={deleteImg}
                        alt=""
                        className="cursor-pointer"
                        onClick={handleDelete}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for new menu */}
      <DynamicModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        customStyle={modalCustomStyles}
        content={
          <div>
            <div className="bg-[#ffa901]">
              <h2 className="text-center text-white text-2xl py-2 lg:py-4 font-bold">
                New Stock
              </h2>
            </div>
            <div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mt-4 flex justify-center">
                  <InputField
                    label="Product Name"
                    name="name"
                    register={register}
                    error={errors.name}
                  />
                </div>
                <div className="mt-4 flex justify-center">
                  <InputField
                    label="Quantity"
                    name="quantity"
                    register={register}
                    error={errors.quantity}
                  />
                </div>
                <div className="mt-4 flex justify-center">
                  <InputField
                    label="Price"
                    name="price"
                    register={register}
                    error={errors.price}
                  />
                </div>
                <div className="lg:w-[87%] md:w-[78%] sm:w-[74%] mx-auto mt-5 mb-3 flex justify-between">
                  <button
                    type="submit"
                    className="bg-[#ffa910] text-white py-[2px] px-5 font-semibold rounded-xl"
                  >
                    <FontAwesomeIcon icon={faCheck} className="mr-2" />
                    Save
                  </button>
                  <button
                    type="button"
                    className="bg-[#EE1212] text-white py-[2px] px-5 font-semibold rounded-xl"
                    onClick={closeModal}
                  >
                    <FontAwesomeIcon icon={faXmark} className="mr-2" />
                    Close
                  </button>
                </div>
              </form>
            </div>
          </div>
        }
      />
    </div>
  );
}
