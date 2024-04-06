import { useState } from "react";
import Header from "../../components/Header";
import DynamicModal from "../../components/Modal";
import InputField from "../../components/Form/InputField";
import { useForm } from "react-hook-form";
import check from "../../assets/expenses/sav.png";
import close from "../../assets/expenses/cls.png";
import qr from "../../assets/qrCode/qr.png";
export default function QrCode() {

  const [isModalOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const {
    register,
   
    formState: { errors },
  } = useForm();

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


  return (
    <div>
      <Header headerTitle="Hello, Patricia" />
     

      <div>
      <div>
              <button
                onClick={openModal}
                className=" bg-[#FFA901] p-2 flex justify-center  lg:mx-[310px] sm:mx-[120px] md:mx-[220px] rounded-[16px] text-white font-bold mt-12"
              >
                Generate New  Qr code
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
                                  Qr code generator
                                </h2>
                              </div>
                              <div className="ml-6 ">
                                <InputField
                                  label="Restaurant Menu Url"
                                  name="restaurantMenu"
                                  register={register}
                                  error={errors}
                                />
                              </div>

                              <div className=" ml-6">
                                <div className="">
                                  <InputField
                                    label="Restaurant Id"
                                    name="restaurantId"
                                    register={register}
                                    error={errors}
                                  />
                                </div>
                              
                               
                              </div>

                              <div className="ml-6">
                                <InputField
                                  label="Table Number"
                                  name="tableNumber"
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
                                    className=" px-2 sm:w-16 lg:w-24 rounded-l"
                                  >
                                   <img src={close} className="" alt="" />
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

<div className="lg:mx-[300px] sm:mx-[100px] md:mx-[200px] mt-6">
  <img className="border-4 " src={qr} alt="" />
</div>

<div>
  <button className="bg-[#FFA901] p-2 flex justify-center lg:mx-[350px] sm:mx-[160px] md:mx-[250px]  rounded-[16px] text-white font-bold mt-4">Download </button>
</div>

            </div>
      </div>
    </div>
  );
}
