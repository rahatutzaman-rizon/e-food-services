import Header from "../../components/Header";
import totalItemsImg from "../../assets/cardImage/total-items.png";
import popularItemsImg from "../../assets/cardImage/popular-items.png";
import incomeItemsImg from "../../assets/cardImage/income.png";
import DashboardCard from "../../components/cards/DashboardCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import ImageUploadField from "../../components/Form/imageUploadField";
import InputField from "../../components/Form/InputField";
import DynamicModal from "../../components/Modal";
import * as yup from "yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import RadioField from "../../components/Form/RadioField";
import DateField from "../../components/Form/DateField";
import { useNavigate } from "react-router-dom";

export default function Offer() {
  const [isModalOpen, setModalIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);
  const [isCategoryChecked, setIsCategoryChecked] = useState(false);
  const navigate = useNavigate();

  // yup schema for validate new offer form
  const formInputSchema = yup.object().shape({
    name: yup.string().required("Menu Name is required"),
    image: yup
      .mixed()
      .test("imageRequired", "Menu image is required", (value) => {
        return value && value.length > 0;
      }),
    amount: yup.number().required("Discount amount is required"),
    type: yup.string().required("Offer Type is required"),
    startDate: yup.date().required("Start Date is required"),
    endDate: yup.date().required("End Date is required"),
  });

  const cardInfo = [
    {
      name: "Total Offers",
      amount: "5",
      icon: totalItemsImg,
    },
    {
      name: "Today’s Offers",
      amount: "3",
      icon: popularItemsImg,
    },
    {
      name: "Popular Offers",
      amount: "2",
      icon: incomeItemsImg,
    },
  ];

  // offer data
  const offers = [
    {
      offerNo: "01",
      offerName: "Buy 1 Get 1 Pizza",
      startDate: "08-09-23",
      endDate: "08-10-23",
    },
    {
      offerNo: "02",
      offerName: "Buy 1 Get 1 Pizza",
      startDate: "08-09-23",
      endDate: "08-10-23",
    },
    {
      offerNo: "03",
      offerName: "Buy 1 Get 1 Pizza",
      startDate: "08-09-23",
      endDate: "08-10-23",
    },
    {
      offerNo: "04",
      offerName: "Buy 1 Get 1 Pizza",
      startDate: "08-09-23",
      endDate: "08-10-23",
    },
    {
      offerNo: "06",
      offerName: "Buy 1 Get 1 Pizza",
      startDate: "08-09-23",
      endDate: "08-10-23",
    },
    {
      offerNo: "07",
      offerName: "Buy 1 Get 1 Pizza",
      startDate: "08-09-23",
      endDate: "08-10-23",
    },
  ];

  const categories = [
    {
      name: "Sandwich",
      subcategories: ["Chicken sandwich", "Egg sandwich"],
    },
    {
      name: "Potato",
      subcategories: ["Red potato"],
    },
    {
      name: "Burger",
      subcategories: ["Chicken burger", "Egg burger"],
    },
  ];

  // modal style
  const modalCustomStyles = {
    content: {
      width: "850px",
      height: "630px",
      margin: "auto",
      border: "1px solid #ff9a01",
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

  const handleCategoryChange = (item) => {
    setSelectedCategory(item);
    setSelectedSubcategories(item.subcategories);
    setIsCategoryChecked(!isCategoryChecked);
  };

  useEffect(() => {
    if (isCategoryChecked) {
      setSelectedSubcategories(selectedCategory.subcategories);
    } else {
      setSelectedSubcategories([]);
    }
  }, [selectedCategory, isCategoryChecked]);

  const handleSubcategoryChange = (subcategory) => {
    if (selectedSubcategories.includes(subcategory)) {
      setSelectedSubcategories((prevSubcategories) =>
        prevSubcategories.filter((sub) => sub !== subcategory)
      );
    } else {
      setSelectedSubcategories((prevSubcategories) => [
        ...prevSubcategories,
        subcategory,
      ]);
    }
  };

  return (
    <div>
      <Header headerTitle="Hello, Patricia" />
      <div className="flex lg:flex-row xs:flex-col items-center">
        <div className="w-[90%] mt-8 ml-6 flex flex-row gap-3 mr-5">
          {cardInfo.map((item) => (
            <DashboardCard key={item.name} cardInfo={item} />
          ))}
        </div>
        <div>
          <button
            type="button"
            className="xs:w-[180px] bg-[#FFA901] text-white px-5 py-2 rounded-lg mt-5 mr-7 hover:bg-yellow-400"
            onClick={openModal}
          >
            Add Offer
          </button>
        </div>
      </div>
      <div className="lg:w-[95%] xs:w-[700px] bg-white ml-6 mt-8 p-4 rounded-lg overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr>
              <th>Offer No</th>
              <th>Offer Name</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {offers.map((offer, index) => (
              <tr key={index} className="h-[40px] text-xs">
                <td>{offer.offerNo}</td>
                <td>{offer.offerName}</td>
                <td>{offer.startDate}</td>
                <td>{offer.endDate}</td>
                <td>
                  <button
                    type="button"
                    className="bg-[#ff9a01] text-white px-4 py-[3px] rounded-lg"
                    onClick={() => navigate(`/offer-details/${offer.offerNo}`)}
                  >
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for new offer */}
      <DynamicModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        customStyle={modalCustomStyles}
        content={
          <div>
            <div className="bg-[#ffa901]">
              <h2 className="text-center text-white text-2xl py-4 font-bold">
                New Offer
              </h2>
            </div>
            <div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex">
                  <div className="w-[50%] ml-4">
                    <div className="mt-4">
                      <InputField
                        label="Offer Name"
                        name="name"
                        register={register}
                        error={errors.name}
                      />
                    </div>

                    <ImageUploadField
                      label="Offer Image"
                      name="image"
                      register={register}
                      error={errors.image}
                    />

                    <RadioField
                      label="Offer Type"
                      name="type"
                      options={["Percentage", "Amount"]}
                      register={register}
                      error={errors.type}
                    />

                    <InputField
                      label="Discount Amount"
                      name="amount"
                      register={register}
                      error={errors.amount}
                    />

                    <DateField
                      label="Offer Start"
                      name="startDate"
                      register={register}
                      error={errors.startDate}
                    />

                    <DateField
                      label="Offer End"
                      name="endDate"
                      register={register}
                      error={errors.endDate}
                    />

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
                        <FontAwesomeIcon icon={faTimes} className="mr-2" />
                        Close
                      </button>
                    </div>
                  </div>
                  <div className="w-[50%]">
                    <h2 className="mt-5 font-bold text-lg">
                      Select Foods for Offer
                    </h2>
                    <div>
                      <ul>
                        {categories.map((item, index) => (
                          <li key={index} className="cursor-pointer mt-5">
                            <div className="flex justify-between pr-4">
                              <label
                                htmlFor={item.name}
                                className="text-[#ffa901] font-bold text-lg"
                              >
                                {" "}
                                {item.name}{" "}
                              </label>
                              <input
                                type="checkbox"
                                name=""
                                id={item.name}
                                value={item.name}
                                onClick={() => handleCategoryChange(item)}
                              />
                            </div>
                            <ul className="px-6">
                              {item.subcategories.map((elem, index) => (
                                <li
                                  key={index}
                                  className="py-[3px] font-semibold"
                                >
                                  <div className="flex justify-between pr-4">
                                    <label htmlFor={elem}> {elem} </label>
                                    <input
                                      type="checkbox"
                                      name=""
                                      id={elem}
                                      value={elem}
                                      checked={selectedSubcategories.includes(
                                        elem
                                      )}
                                      onChange={() =>
                                        handleSubcategoryChange(elem)
                                      }
                                    />
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        }
      />
    </div>
  );
}
