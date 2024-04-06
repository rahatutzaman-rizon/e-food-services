import { yupResolver } from "@hookform/resolvers/yup";
import Header from "../../components/Header";
import DashboardCard from "../../components/cards/DashboardCard";
import totalItemsImg from "../../assets/cardImage/total-items.png";
import popularItemsImg from "../../assets/cardImage/popular-items.png";
import InputField from "../../components/Form/InputField";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import DynamicModal from "../../components/Modal";
import { useEffect, useState } from "react";
import ImageUploadField from "../../components/Form/imageUploadField";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import menu1 from "../../assets/menu/menu1.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Menu() {
  const [isModalOpen, setModalIsOpen] = useState(false);
  const [menus, setMenus] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("menu.json").then((res) => setMenus(res.data));
  }, []);

  // yup schema for validate new menu form
  const formInputSchema = yup.object().shape({
    name: yup.string().required("Menu Name is required"),
    image: yup
      .mixed()
      .test("imageRequired", "Menu image is required", (value) => {
        return value && value.length > 0;
      }),
  });

  const cardInfo = [
    {
      name: "Total Items",
      amount: "120",
      icon: totalItemsImg,
    },
    {
      name: "Popular Items",
      amount: "15",
      icon: popularItemsImg,
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
      height: "340px",
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

  return (
    <div>
      <Header headerTitle="Hello, Patricia" />
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
          Add Menu
        </button>
      </div>

      {/* show menus */}
      <div>
        <div className="mt-6 ml-6 flex flex-wrap gap-5">
          {menus.map((menu, index) => (
            <div
              key={index}
              className="w-full lg:w-[220px] md:w-[180px] sm:w-[130px] bg-white shadow-lg rounded-lg cursor-pointer"
              onClick={() => navigate(`/menu-details/${menu.id}`)}
            >
              <img src={menu1} alt="" className="p-4" />
              <h2 className="text-center font-bold text-2xl pb-4">
                {menu.name}
              </h2>
            </div>
          ))}
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
                New Menu
              </h2>
            </div>
            <div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mt-4 flex justify-center">
                  <InputField
                    label="Name"
                    name="name"
                    register={register}
                    error={errors.name}
                  />
                </div>
                <div className="mt-2 flex justify-center">
                  <ImageUploadField
                    label="Image"
                    name="image"
                    register={register}
                    error={errors.image}
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
