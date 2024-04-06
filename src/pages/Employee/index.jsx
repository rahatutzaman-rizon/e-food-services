import Header from "../../components/Header";
import popularItemsImg from "../../assets/cardImage/popular-items.png";
import totalItemsImg from "../../assets/cardImage/total-items.png";
import DashboardCard from "../../components/cards/DashboardCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import ImageUploadField from "../../components/Form/imageUploadField";
import InputField from "../../components/Form/InputField";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import DynamicModal from "../../components/Modal";
import * as yup from "yup";
import employeeImg from "../../assets/employee/employee.png";
import editImg from "../../assets/action-button/edit.png";
import deleteImg from "../../assets/action-button/delete.png";

export default function Employee() {
  const [isModalOpen, setModalIsOpen] = useState(false);

  // yup schema for validate new menu form
  const formInputSchema = yup.object().shape({
    name: yup.string().required("Employee Name is required"),
    address: yup.string().required("Employee address is required"),
    jobTitle: yup.string().required("Job title is required"),
    workHour: yup.string().required("Work hour is required"),
    image: yup
      .mixed()
      .test("imageRequired", "Employee image is required", (value) => {
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

  // Employee data
  const employees = [
    {
      id: "01",
      name: "Ratul Sinha",
      address: "D/36 Zakir Hossain Road, Lalmatia Mohammadpur, Dhaka",
      mobile: "0155424251",
      jobTitle: "Master Chief Chef",
      workHours: "40 hr/week",
    },
    {
      id: "02",
      name: "Ratul Sinha",
      address: "D/36 Zakir Hossain Road, Lalmatia Mohammadpur, Dhaka",
      mobile: "0155424251",
      jobTitle: "Master Chief Chef",
      workHours: "40 hr/week",
    },
    {
      id: "03",
      name: "Ratul Sinha",
      address: "D/36 Zakir Hossain Road, Lalmatia Mohammadpur, Dhaka",
      mobile: "0155424251",
      jobTitle: "Master Chief Chef",
      workHours: "40 hr/week",
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
      height: "600px",
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
      <Header headerTitle="Hello, Patricia" />
      <div className="flex flex-col lg:flex-row items-center justify-between">
        <div className="lg:w-[70%] xs:w-[95%] mt-8 ml-6 flex flex-row gap-3 mr-5">
          {cardInfo.map((item) => (
            <DashboardCard key={item.name} cardInfo={item} />
          ))}
        </div>
        <button
          type="button"
          className="w-[150px] lg:w-[180px] bg-[#FFA901] text-white px-5 py-2 rounded-lg mt-5 lg:mt-8 mr-7 hover:bg-yellow-400"
          onClick={openModal}
        >
          Add Employee
        </button>
      </div>

      {/* emplyees details table*/}
      <div className="bg-white ml-6 mt-7 mr-7 p-4 rounded-lg">
        <h2 className="font-bold">Employees</h2>
        <div className="lg:w-[95%] xs:w-[700px] bg-white p-4 rounded-lg overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr>
                <th className="w-[18%]">Name</th>
                <th className="w-[27%]">Address</th>
                <th className="w-[12%]">Mobile</th>
                <th className="w-[18%]">Job Title</th>
                <th className="w-[15%]">Work Hours</th>
                <th className="w-[10%]">Action</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee, index) => (
                <tr key={index} className="h-[80px] text-sm">
                  <td>
                    <div className="flex items-center gap-2">
                      <img src={employeeImg} alt="" className="w-[40px]" />
                      <span>{employee.name}</span>
                    </div>
                  </td>
                  <td>{employee.address}</td>
                  <td>{employee.mobile}</td>
                  <td>{employee.jobTitle}</td>
                  <td>{employee.workHours}</td>
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

      {/* Modal for new employee */}
      <DynamicModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        customStyle={modalCustomStyles}
        content={
          <div>
            <div className="bg-[#ffa901]">
              <h2 className="text-center text-white text-2xl py-2 lg:py-4 font-bold">
                New Employee
              </h2>
            </div>
            <div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex justify-center">
                  <InputField
                    label="Name"
                    name="name"
                    register={register}
                    error={errors.name}
                  />
                </div>
                <div className="flex justify-center">
                  <InputField
                    label="Address"
                    name="address"
                    register={register}
                    error={errors.address}
                  />
                </div>
                <div className="flex justify-center">
                  <InputField
                    label="Job Title"
                    name="jobTitle"
                    register={register}
                    error={errors.jobTitle}
                  />
                </div>
                <div className="flex justify-center">
                  <InputField
                    label="Work Hours"
                    name="workHour"
                    register={register}
                    error={errors.workHour}
                  />
                </div>
                <div className="flex justify-center">
                  <ImageUploadField
                    label="Image"
                    name="image"
                    register={register}
                    error={errors.image}
                  />
                </div>
                <div className="lg:w-[87%] md:w-[78%] sm:w-[74%] mx-auto mt-2 mb-3 flex justify-between">
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
