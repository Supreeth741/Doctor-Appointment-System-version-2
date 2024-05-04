import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ShowLoader } from "../redux/loaderSlice";
import { message } from "antd";
import { GetDoctorById } from "../apicalls/doctors";
import moment from "moment";
import {
  GetDoctorAppointmentOnDate,
  storeBookAppointment,
} from "../apicalls/appiontment";
import Header from '../components/Layout/Header'
import Footer from '../components/Layout/Footer'

function Bookslot() {
  const [problem = "", setProblem] = React.useState("");
  const navigate = useNavigate();
  const [date = "", setDate] = React.useState("");
  const [selectSlot = "", setSelectSlot] = React.useState("");
  const [doctor, setDoctor] = React.useState(null);
  const [bookedSlots = [], setBookedSlots] = React.useState([]);


  const { id } = useParams();
  const dispatch = useDispatch();

  const getdata = async () => {
    try {
      dispatch(ShowLoader(true));
      const response = await GetDoctorById(id);
      console.log(response.data)
      dispatch(ShowLoader(false));
      if (response.success) {
        console.log("response.success");
        setDoctor(response.data);
        message.success("Data Fetch Successfully");
      } else {
        throw new Error("data unable to fetch");
      }
    } catch (error) {
      dispatch(ShowLoader(false));
      message.error(error.message);
    }
  };

  const onBookAppointment = async () => {
    try {
      dispatch(ShowLoader(true));
      const payload = {
        doctorId: doctor.id,
        userId: JSON.parse(localStorage.getItem("user")).id,
        date,
        slot: selectSlot,
        doctorName: `${doctor.firstName} ${doctor.lastName}`,
        userName: JSON.parse(localStorage.getItem("user")).name,
        bookedOn: moment().format("DD-MM-YYYY HH:mm A"),
        problem,
        status: "pending",
      };

      const response = await storeBookAppointment(payload);
      dispatch(ShowLoader(false));
      if (response.success) {
        message.success(response.message);
        navigate("/profile");
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(ShowLoader(true));
      message.error(error.message);
    }
  };

  const getBookedSlots = async () => {
    try {
      dispatch(ShowLoader(true));
      const response = await GetDoctorAppointmentOnDate(id, date);
      dispatch(ShowLoader(false));
      if (response.success) {
        console.log(response.data);
        setBookedSlots(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(ShowLoader(false));
      message.error(error.message);
    }
  };

  const getSlotsData = () => {
    const day = moment(date).format("dddd");
    if (!doctor.days.includes(day)) {
      return (
        <h4>Doctor is not Available on {moment(date).format("DD-MM-YYYY")}</h4>
      );
    }

    let startTime = moment(doctor.startTime, "HH:mm");
    let endTime = moment(doctor.endTime, "HH:mm");
    let slotDuration = 60;
    let slots = [];
    while (startTime < endTime) {
      /* if(!bookedSlots?.find((slot) => slot.slot === startTime.format("HH:mm"))){
            
        } */
      slots.push(startTime.format("HH:mm"));
      startTime.add(slotDuration, "minutes");
    }
    return slots.map((slot) => {
      const isBooked = bookedSlots?.find(
        (bookedSlot) =>
          bookedSlot.slot === slot && bookedSlot.status !== "canceled"
      );
      return (
        <div
          className="flex chat-notification cursor-pointer"
          onClick={() => setSelectSlot(slot)}
          style={{
            border: selectSlot === slot ? "2px solid green" : "1px solid gray",
            backgroundColor: isBooked ? "gray" : "white",
            color: isBooked ? "white" : "black",
            pointerEvents: isBooked ? "none" : "auto",
            cursor: isBooked ? "not-allowed" : "pointer",
          }}
        >
          <span className="space-x-2 place-content-center">
            {moment(slot, "HH:mm").format("HH:mm")} -{" "}
            {moment(slot, "HH:mm").add(slotDuration, "minutes").format("HH:mm")}
          </span>
        </div>
      );
    });
  };


useEffect(() => {
    getdata();
  }, [id]);

useEffect(() => {
    if (date) {
      getBookedSlots();
    }
  }, [date]);



 


  return (
    <div>
      <Header />
      <div className='min-h-[563]'>  
        {doctor && (
          <div className="bg-white rounded-md shadow-md p-4">
            {/*       <img
               src="https://via.placeholder.com/200" // Replace with doctor image URL (optional)
               alt={`${firstName} ${lastName}`}
               className="w-48 h-48 rounded-full mx-auto mb-4"
             /> */}
            <h2 className="text-lg font-medium text-gray-900 text-center mb-2">
               {doctor?.firstName} {doctor?.lastName}
            </h2>
            <p className="text-gray-600 text-center mb-4">
               {doctor.qualification} - {doctor.specialty} ({doctor.experience} Years Experience)
             </p>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
               <div>
                 <p className="text-gray-600 mb-1"><b>Phone:</b></p>
                 <a href={`tel:${doctor.phoneno}`} className="text-blue-500 hover:underline">
                   {doctor.phoneno}
                 </a>
               </div>
               <div>
                 <p className="text-gray-600 mb-1"><b>Email:</b></p>
                 <a href={`mailto:${doctor.email}`} className="text-blue-500 hover:underline">
                   {doctor.email}
                 </a>
               </div>
               <div>
               <p className="text-gray-600 mb-1"><b>Website:</b></p>
               <a href={doctor.website} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline">
               {doctor.website}
               </a>
               </div>
               <div>
               <p className="text-gray-600 mb-1"><b>Address:</b></p>
               <p className="text-gray-600 break-words">{doctor.address}</p>
               </div>
               <div>
               <div className="text-gray-600 mb-2">
               <b>Available Days:</b>
               <div className="flex items-center space-x-2 mt-1">
                 {Object.entries(doctor.days).map(([key, value]) => (
                   <button
                     key={key}
                     className={`px-2 py-1 text-xs font-medium rounded-full bg-gray-200 hover:bg-gray-300 `}
                   >
                     {value}
                   </button>
                 ))}
               </div>
             </div>
               </div>
               <div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div>
                 <p className="text-gray-600 mb-1"><b>Start Time:</b></p>
                 <p className="text-gray-600">{doctor.startTime}</p>
               </div>
               <div>
                 <p className="text-gray-600 mb-1"><b>End Time:</b></p>
                 <p className="text-gray-600">{doctor.endTime}</p>
               </div>
             </div>
               </div>
               <div>
               <p className="text-gray-600 mb-2"><b>Consultation Fee:</b></p>
               <p className="text-gray-600">&#8377; {doctor.Fee}</p>
               </div>
             </div>
             <p className="block text-gray-600 text-sm text-center mt-4 mb-4">
               Status: {doctor.status === 'approved' ? <span style={{color: "green"}}>Approved</span> : <span style={{color: "red"}}>Pending Approval</span>}
             </p>
             <div>
             </div>
             <hr />
                                    {/* Slots booking */}
              <div className="flex flex-col space-y-4 ">
                <div className="flex items-center place-content-center mt-5">
                  <p className="font-bold mr-2">Select Date:</p>
                  <input
                    type="date"
                    className="border rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    min={moment().format("YYYY-MM-DD")}
                  />
                </div>
                <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-10 gap-2 ">{date && getSlotsData()}</div>

                {selectSlot && (
                  <div className="flex flex-col space-y-2">
                    <textarea
                      placeholder="Enter your Problem Here"
                      className="border rounded px-2 py-1 h-24 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
                      value={problem}
                      onChange={(e) => setProblem(e.target.value)}
                      rows="10"
                    />
                    <div className="flex justify-end">
                      <button
                        className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        onClick={() => navigate("/")}
                      >
                        Cancel
                      </button>
                      <button
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-1 focus:ring-white"
                        onClick={onBookAppointment}
                      >
                        Book Appointment
                      </button>
                    </div>
                  </div>
                )}
              </div>
           </div>
     )}
      </div>
      <Footer />
    </div>
  )
}

export default Bookslot