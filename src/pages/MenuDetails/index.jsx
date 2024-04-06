import { useParams } from "react-router-dom";
import Header from "../../components/Header";
import menu1 from "../../assets/menu/menu1.png";
import editIcon from "../../assets/menu/menu-details/edit.png";
import deleteIcon from "../../assets/menu/menu-details/delete.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import ImageUploadField from "../../components/Form/imageUploadField";
import InputField from "../../components/Form/InputField";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import DynamicModal from "../../components/Modal";



export default function MenuDetails() {
  const [isModalOpen, setModalIsOpen] = useState(false);
  const [singleMenuDetails, setSingleMenuDetails] = useState({});
  const [isShowModalForAddItem, setIsShowModalForAddItem] = useState(false);
  const [isMenuEditOpen, setIsMenuEditOpen] = useState(false);
  const { id } = useParams();

  // yup schema for validate new menu form
  const formInputSchema = yup.object().shape({
    name: yup.string().required("Menu Name is required"),
    price: yup.string().required("Price is required"),
    image: yup
      .mixed()
      .test("imageRequired", "Menu image is required", (value) => {
        return value && value.length > 0;
      }),
  });

  const data = [
    {
      id: "01",
      name: "Pizza",
      price: 20,
      image: "",
    },
    {
      id: "02",
      name: "Chicken Cheese Burger",
      price: 200,
      image: "",
    },
    {
      id: "03",
      name: "Chicken Cheese Burger",
      price: 200,
      image: "",
    },
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formInputSchema),
  });

  const windowWidth = window.innerWidth;

  // modal style
  const modalCustomStyles = {
    content: {
      width:
        windowWidth < 400
          ? "300px"
          : windowWidth >= 400 && windowWidth < 700
          ? "400px"
          : singleMenuDetails.id
          ? "800px"
          : "450px",
      height: singleMenuDetails.id ? "600px" : "470px",
      margin: "auto",
      // border: "1px solid #ec4f22",
      border: "none",
      borderRadius: "4px",
      padding: "0px",
    },
  };

  // handle form submit for new menu
  const onAddItemSubmit = (data) => {
    console.log(data);
  };

  const onEditItemSubmit = (data) => {
    console.log("edited item", data);
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleDelete = (item) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      console.log("deleted success", item);
    }
  };

  return (
    <div>
      <Header headerTitle="Hello, Patricia" isShowFilter={false} />
      <div className="mt-12 mb-4 flex justify-end mr-6">
        <button
          type="button"
          className="bg-[#ffa901] py-[3px] px-3 text-white rounded-lg shadow-md"
          onClick={() => {
            setSingleMenuDetails({});
            openModal();
            setIsShowModalForAddItem(true);
          }}
        >
          Add Item
        </button>
      </div>
      <div className="ml-6 flex lg:flex-row xs:flex-col gap-2">
        <div className="w-[23%]">
          <div className="lg:w-[190px] md:w-[150px] xs:w-[100px] bg-white shadow-lg rounded-lg">
            <img src={menu1} alt="" className="p-4" />
            <h2 className="text-center font-bold text-2xl pb-4">Burger</h2>
          </div>
        </div>

        {/* menu details table */}
        <div className="lg:w-[77%] xs:w-[650px] mr-6 bg-white rounded-lg p-4 ">
          <div className="py-5">
            <h2 className="text-xl font-bold">
              Burger Item <span className="text-[#ffa901]">(12)</span>
            </h2>
          </div>
          <table className="w-full text-left">
            <thead>
              <tr>
                <th className="w-[15%]">Image</th>
                <th className="w-[40%]">Name</th>
                <th className="w-[15%]">Price</th>
                <th className="w-[30%]">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr
                  key={item.id}
                  className="border-collapse border-l-0 border-r-0 border border-gray-300 h-[80px]"
                >
                  <td className="w-[15%]">
                    <div className="w-[40px] ">
                      <img src={menu1} alt="" className="w=full rounded-xl" />
                    </div>
                  </td>
                  <td className="w-[40%]">{item.name}</td>
                  <td className="w-[15%]">{item.price}</td>
                  <td>
                    <div className="w-[30%] flex gap-4 items-center">
                      <button
                        type="button"
                        className="bg-[#ff9a01] text-white px-4 py-[3px] rounded-lg"
                        onClick={() => {
                          setIsMenuEditOpen(false);
                          setIsShowModalForAddItem(false);
                          setSingleMenuDetails(item);
                          openModal();
                        }}
                      >
                        Details
                      </button>
                      <img
                        src={editIcon}
                        alt=""
                        className="cursor-pointer"
                        onClick={() => {
                          setSingleMenuDetails({});
                          setIsMenuEditOpen(true);
                          openModal();
                        }}
                      />
                      <img
                        src={deleteIcon}
                        alt=""
                        className="cursor-pointer"
                        onClick={() => handleDelete(item)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <DynamicModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        customStyle={modalCustomStyles}
        content={
          isShowModalForAddItem ? (
            <div>
              <div className="bg-[#ffa901]">
                <h2 className="text-center text-white text-2xl py-4 font-bold">
                  New Item
                </h2>
              </div>
              <div>
                <form onSubmit={handleSubmit(onAddItemSubmit)}>
                  <div className="mt-4 flex justify-center">
                    <InputField
                      label="Name"
                      name="name"
                      register={register}
                      error={errors.name}
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
          ) : isMenuEditOpen ? (
            <div>
              <div className="bg-[#ffa901]">
                <h2 className="text-center text-white text-2xl py-4 font-bold">
                  Edit Item
                </h2>
              </div>
              <div>
                <form onSubmit={handleSubmit(onEditItemSubmit)}>
                  <div className="mt-4 flex justify-center">
                    <InputField
                      label="Name"
                      name="name"
                      register={register}
                      error={errors.name}
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
          ) : (
            <div>
              <div className="bg-[#ffa901] flex items-center justify-between px-5">
                <h2 className="ml-[45%] text-white text-2xl py-4 font-bold">
                  Item Details
                </h2>
                <FontAwesomeIcon
                  icon={faXmark}
                  className="cursor-pointer text-xl text-white"
                  onClick={closeModal}
                />
              </div>
              <div className="lg:p-5 xs:p-2 flex gap-4 mt-5 lg:ml-5 xs:ml-0">
                <div className="w-[20%] xs:hidden lg:block">
                  <img src={menu1} alt="" className="rounded-xl" />
                </div>
                <div className="lg:w-[80%] xs:w-full">
                  <table className="text-left">
                    <tr>
                      <th className="w-[30%]">Item Name:</th>
                      <td>{singleMenuDetails.name}</td>
                    </tr>
                    <tr>
                      <th>Item Price:</th>
                      <td>20 tk</td>
                    </tr>
                    <tr>
                      <th className="flex items-start">Item Description :</th>
                      <td>
                        Lorem ipsum dolor sit amet consectetur. Pellentesque
                        pharetra penatibus at tempus quisque lobortis neque. Ut
                        egestas eget dictum ligula amet.
                      </td>
                    </tr>
                    <tr>
                      <th>Item Ingridients :</th>
                      <td>Chicken, Cheese, Sauce, Bun, Tomato, Onion</td>
                    </tr>
                    <tr>
                      <th>Item Spicy Level :</th>
                      <td>Regular, Mild, Spicy, Extreme Spicy</td>
                    </tr>
                    <div className="mt-4"></div>
                    <tr>
                      <th className="flex items-start">Item Sizes :</th>
                      <td>
                        <ul className="list-disc pl-4">
                          <li>6 Inch Price 250TK</li>
                          <li>9 Inch Price 400TK</li>
                          <li>12 Inch Price 600TK</li>
                        </ul>
                      </td>
                    </tr>
                    <div className="mt-4"></div>
                    <tr>
                      <th className="flex items-start">Item Sizes :</th>
                      <td>
                        <ul className="list-disc pl-4">
                          <li>6 Inch Price 250TK</li>
                          <li>9 Inch Price 400TK</li>
                          <li>12 Inch Price 600TK</li>
                        </ul>
                      </td>
                    </tr>
                    <div className="mt-4"></div>
                    <tr>
                      <th className="flex items-start">Item Sizes :</th>
                      <td>
                        <ul className="list-disc pl-4">
                          <li>6 Inch Price 250TK</li>
                          <li>9 Inch Price 400TK</li>
                          <li>12 Inch Price 600TK</li>
                        </ul>
                      </td>
                    </tr>
                  </table>
                </div>
              </div>
            </div>
          )
        }
      />
    </div>
  );
}
