import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { ShowLoader } from '../redux/loaderSlice';
import { GetDoctorById } from '../apicalls/doctors';
import { message } from 'antd';

function UserData() {

    const [isUser, setIsUser] = React.useState(true);
    const [doctor, setDoctor] = React.useState(null);
    const [user, setUser] = React.useState(null);
    const [showDetails, setShowDetails] = React.useState(false);

    const toggleDetails = () => setShowDetails(!showDetails)

    const dispatch = useDispatch();

    const getdoctordata = async (id) => {
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

      const getuserdata = () => {
            const user = JSON.parse(localStorage.getItem("user"));
            console.log(user);
            setUser(user);
      }

    useEffect(() =>{
        const user = JSON.parse(localStorage.getItem("user"));
        if(user.role === 'doctor' ){
            setIsUser(false);
            getdoctordata(user.id);
        }
        else{
            setIsUser(true);
            getuserdata();
        }
      
    }, []);

  return (
    <div>
        {(isUser && user) && (
            <div>
                <div className="flex justify-center bg-gray-100">
                    <div className="doctor-profile bg-white rounded-lg shadow-md px-8 py-6 max-w-md">
                        <div className="flex items-center">
                            <div>
                            <h2 className="text-xl font-medium text-gray-800">Mr. {user.name}</h2>
                            </div>
                        </div>
                        <div className="mt-4 border-t border-gray-200 pt-4">
                            <ul className="list-none space-y-2">
                                <li className="flex items-center">
                                    <span className="text-gray-500 mr-2">Email Address:  {user.email}</span>
                                </li>
                                <li className="flex items-center">
                                    <span className="text-gray-500 mr-2">Role:  {user.role}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )}

        {(!isUser && doctor) && (
            <div className="flex justify-center bg-gray-100">
            <div className="doctor-profile bg-white rounded-lg shadow-md px-8 py-6 max-w-md">
              <div className="flex items-center">
                <div>
                  <h2 className="text-xl font-medium text-gray-800">Dr. {doctor.firstName} {doctor.lastName}</h2>
                  <p className="text-gray-600">
                    {doctor.qualification} in {doctor.specialty} - {doctor.experience} Years Experience
                  </p>
                </div>
              </div>
              <div className="mt-4 border-t border-gray-200 pt-4">
                <ul className="list-none space-y-2">
                  <li className="flex items-center">
                    <span className="text-gray-500 mr-2">Fee: ₹{doctor.Fee}</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-gray-500 mr-2">Available Days: {doctor.days.join(', ')}</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-gray-500 mr-2">
                      Consultation Hours: {doctor.startTime} - {doctor.endTime}
                    </span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-gray-500 mr-2">Phone Number: {doctor.phoneno}</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-gray-500 mr-2">Email Address: {doctor.email}</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-gray-500 mr-2">Website: </span>
                    <a href={doctor.website} className="text-blue-500 underline">
                      {doctor.website}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
    </div>
  )
}

export default UserData