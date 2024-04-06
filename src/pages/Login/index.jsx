import { useForm } from "react-hook-form";
import InputField from "../../components/Form/InputField";
import axios from 'axios';
import { useState } from 'react';
import Cookies from 'js-cookie';


export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('https://api.efood.tailormaster.xyz/api/v1/restaurant-admin/login', {
        email: data.adminEmail,
        password: data.adminPassword
      });



      console.log(response)
    

      // Assuming the API returns a token upon successful authentication
      const token = response.data.data.token;

      const restaurantId=response.data.data.restaurantId;

      const restaurantName=response.data.data.restaurantName;
      
      console.log('Authentication successful. Token:', token,"  id  ",restaurantId,restaurantName);
     
      Cookies.set('token', token);
     
      Cookies.set("restaurantName",restaurantName);

      
      Cookies.set("restaurantId",restaurantId);
      

      // Handle token as per your application's requirements, such as storing it in local storage

      // Reset error message
      setErrorMessage('');
    } catch (error) {
      console.error('Authentication failed:', error.response.data);
      setErrorMessage('Invalid email or password. Please try again.');
    }
  };

  return (
    <div>
      <div className="flex justify-center items-center  h-screen bg-gray-300">
        <div className="bg-white px-48 py-12 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-center">Admin Login</h2>
         

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="ml-6">
              <InputField
                label="Admin Email"
                name="adminEmail"
                register={register}
                error={errors}
              />
            </div>

            <div className="ml-6">
              <InputField
                label="Admin Password"
                name="adminPassword"
                register={register}
                error={errors}
                type="password"
              />
            </div>

            {errorMessage && <p className="text-red-500 text-sm ml-6 mt-1">{errorMessage}</p>}

            <div>
              <button
                type="submit"
                className="mx-[100px] mt-4 w-[180px] h-[48px] bg-[#FFA901] mr-7 rounded-[16px] text-white font-bold"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
