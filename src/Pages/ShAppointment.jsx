import React, { useEffect, useState } from 'react'
import Header from '../components/Layout/Header'
import Footer from '../components/Layout/Footer'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { GetAllDoctors } from '../apicalls/doctors';
import { ShowLoader } from '../redux/loaderSlice';



function ShAppointment() {
  const [doctors = [], setDoctors] = React.useState([]);
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const getdata = async () => {
    try {
      dispatch(ShowLoader(true));
      const response = await GetAllDoctors();
      dispatch(ShowLoader(false));
      if (response.success) {
        setDoctors(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(ShowLoader(false));
      message.error(error.message);
    }
  };

  useEffect(() => {
    getdata();
  }, []);


  return (
    <div>
      <Header />
        <div className='min-h-[563px] py-2'>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {doctors.map((doctor) => (
        <div key={doctor.id} className="flex flex-col bg-white rounded-md shadow-md hover:shadow-lg cursor-pointer" onClick={()=>{
          navigate(`/BookSlot/${doctor.id}`);
        }}>
         {/*  <img
            src={doctor.imageUrl}
            alt={doctor.firstName + " " + doctor.lastName}
            className="w-full h-48 object-cover rounded-t-md"
          /> */}
          <div className="flex-grow p-4">
            <h3 className="text-lg font-medium text-gray-900">
              {doctor.firstName} {doctor.lastName}
            </h3>
            <p className="text-gray-600 mb-2">
              <b>Specialty:</b> {doctor.specialty}
            </p>
            <div className="flex items-center mb-2">
              <p className="text-gray-600 ml-2">{doctor.experience} Years Experience</p>
            </div>
            <p className="text-gray-600 mb-2">
              <b>Fee:</b> &#8377; {doctor.Fee} (Consultation)
            </p>
            <div className="flex items-center space-x-2">
              <p className="text-blue-500 hover:underline">
                 {`tel:${doctor.phoneno}`}  
              
              </p>
              {/* ... other doctor information and icons (if needed) */}
            </div>
          </div>
        </div>
      ))}
    </div>
        </div>
      
      <Footer />
    </div>
  )
}

export default ShAppointment