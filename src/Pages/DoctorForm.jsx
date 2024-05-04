import React, { useEffect } from 'react'
import Header from '../components/Layout/Header'
import Footer from '../components/Layout/Footer'
import { Col, Form, Row, message } from 'antd';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ShowLoader } from '../redux/loaderSlice';
import { AddDoctor, CheckIfDoctorAccountIsApplied } from '../apicalls/doctors';

function DoctorForm() {

  const [form] = Form.useForm();
  /* const [form, setForm] = React.useState(); */
  const [alreadyApproved, setAlreadyApproved] = React.useState(false);
  const [days, setDays] = React.useState([]);
  const [alreadyApplied, setAlreadyApplied] = React.useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      dispatch(ShowLoader(true));
      const payload = {
        ...values,
        days,
        userId: JSON.parse(localStorage.getItem("user")).id,
        status: "pending",
        role: "doctor",
      };

      const response = await AddDoctor(payload);
      dispatch(ShowLoader(false));
      if (response.success) {
        message.success(response.message);
        navigate("/profile");
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(ShowLoader(false));
      message.error(error.message);
    }
  };

  const checkIfAlreadyApplied = async () => {
    try {
      dispatch(ShowLoader(true));
      const response = await CheckIfDoctorAccountIsApplied(
        JSON.parse(localStorage.getItem("user")).id
      );
      if (response.success) {
        setAlreadyApplied(true);
        if (response.data.status === "approved") {
          setAlreadyApproved(true);
          form.setFieldValue(response.data);
        }
        else{
          setAlreadyApproved(false);
        }
      }
      else{
        setAlreadyApplied(false)
      }
      dispatch(ShowLoader(false));
    } catch (error) {
      dispatch(ShowLoader(false));
      message.error(error.message);
    }
  };

  useEffect(() => {
    checkIfAlreadyApplied();
  }, []);

  return (
    <div>
      <Header />
      <div className='min-h-[563]'>
      <div className="bg-white rounded-md shadow-md p-4">
      {!alreadyApplied  && (
          <>
            <h3 className="text-lg font-medium text-gray-900 text-center mb-2">{
              alreadyApproved ? "update your information": " Apply as a doctor"
            }</h3>
            <hr />

            <Form
              onFinish={onFinish}
              form={form}
            >       
             <h3 className="flex mt-3 mb-1 text-gray-600 text-bold uppercase">personal Information</h3>
            <hr />
              <div className="grid gap-6 py-5 md:grid-cols-3">

                <div>
                <Form.Item
                    label="First name"
                    name="firstName"
                    className="block mb-2 text-sm font-medium text-gray-900"
                    rules={[
                      {
                        required: true,
                        message: "Required",
                      },
                    ]}
                  >
                  <input type="text"
                   id="firstName" 
                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " 
                   placeholder="John" 
                   required 
                   />
                </Form.Item>
                </div>
                <div>
                <Form.Item
                    label="Last name"
                    name="lastName"
                    className="block mb-2 text-sm font-medium text-gray-900"
                    rules={[
                      {
                        required: true,
                        message: "Required",
                      },
                    ]}
                  >
                  <input type="text" id="lastName" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Doe" required />
                </Form.Item>
                </div>
                <div>
                <Form.Item
                    label="Email"
                    name="email"
                    className="block mb-2 text-sm font-medium text-gray-900"
                    rules={[
                      {
                        required: true,
                        message: "Required",
                      },
                    ]}
                  >
                  <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="John.Doe@company.com" required />
                </Form.Item>
                </div>
                <div>
                <Form.Item
                    label="PhoneNo"
                    name="phoneno"
                    className="block mb-2 text-sm font-medium text-gray-900"
                    rules={[
                      {
                        required: true,
                        message: "Required",
                      },
                    ]}
                  >
                  <input type="number" id="phoneno" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="1234567890" required />
                </Form.Item>
                </div>
                <div>
                <Form.Item
                    label="Website"
                    name="website"
                    className="block mb-2 text-sm font-medium text-gray-900"
                    rules={[
                      {
                        required: true,
                        message: "Required",
                      },
                    ]}
                  >
                  <input type="text" id="website" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="DRJohnDoe.com" required />
                </Form.Item>
                </div>
                <div>
                <Form.Item
                    label="Address"
                    name="address"
                    className="block mb-2 text-sm font-medium text-gray-900"
                    rules={[
                      {
                        required: true,
                        message: "Required",
                      },
                    ]}
                  >
                  <textarea type="text" id="address" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="New York" required />
                </Form.Item>
                </div>
              </div>

              <hr />

              <h3 className="flex mt-3 mb-1 text-gray-600 text-bold uppercase">professional Information</h3>
              <hr />

              <div className="grid gap-6 py-5 md:grid-cols-3">

              <div>
              <Form.Item
                    label="Specialty"
                    name="specialty"
                    className="block mb-2 text-sm font-medium text-gray-900"
                    rules={[
                      {
                        required: true,
                        message: "Required",
                      },
                    ]}
                  >
                  <select className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 '>
                      <option selected>Select Specialty</option>
                      <option value="cardiology">Cardiology</option>
                      <option value="dermatology">Dermatology</option>
                      <option value="neurology">Neurology</option>
                      <option value="oncology">Oncology</option>
                      <option value="ophthalmology">Ophthalmology</option>
                      <option value="pediatrics">Pediatrics</option>
                      <option value="surgeon">Surgeon</option>
                      <option value="urologist">Urologist</option>
                    </select>
                  </Form.Item>
              </div>

              <div>
              <Form.Item
                    label="Experience"
                    name="experience"
                    className="block mb-2 text-sm font-medium text-gray-900"
                    rules={[
                      {
                        required: true,
                        message: "Required",
                      },
                    ]}
                  >
                    <input type="number" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder='3' />
                  </Form.Item>
              </div>

              <div>
              <Form.Item
                    label="Qualification"
                    name="qualification"
                    className="block mb-2 text-sm font-medium text-gray-900"
                    rules={[
                      {
                        required: true,
                        message: "Required",
                      },
                    ]}
                  >
                  <select className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 '>
                      <option selected>Select Qualification</option>
                      <option value="MBBS">MBBS</option>
                      <option value="MD">MD</option>
                      <option value="MS">MS</option>
                      <option value="MDS">MDS</option>
                    </select>
                  </Form.Item>
              </div>
            </div>

            <hr />

              <h3 className="flex mt-3 mb-1 text-gray-600 text-bold uppercase">Work Hour</h3>
              <hr />
            <div className="grid gap-6 py-5 md:grid-cols-3">
            
              <div>
              <Form.Item
                    label="Start Time"
                    name="startTime"
                    className="block mb-2 text-sm font-medium text-gray-900"
                    rules={[
                      {
                        required: true,
                        message: "Required",
                      },
                    ]}
                  >
                    <input type="time" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ' />
                  </Form.Item>
              </div>
              <div>
              <Form.Item
                    label="End Time"
                    name="endTime"
                    className="block mb-2 text-sm font-medium text-gray-900"
                    rules={[
                      {
                        required: true,
                        message: "Required",
                      },
                    ]}
                  >
                    <input type="time" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ' />
                  </Form.Item>
              </div>
              <div>
              <Form.Item
                    label="Fee"
                    name="Fee"
                    className="block mb-2 text-sm font-medium text-gray-900"
                    rules={[
                      {
                        required: true,
                        message: "Required",
                      },
                    ]}
                  >
                    <input type="number" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder='300' />
                  </Form.Item>
              </div>

              <div className="flex grid grid-cols-2 md:grid-cols-7 gap-4 lg:w-400">
                    {[
                      "Monday",
                      "Tuesday",
                      "Wednesday",
                      "Thursday",
                      "Friday",
                      "Saturday",
                      "Sunday",
                    ].map((day, index) => (
                      <div className="flex">
                        <input
                          type="checkbox"
                          key={index}
                          value={day}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 "
                          onChange={(e) => {
                            if (e.target.checked) {
                              setDays([...days, e.target.value]);
                            } else {
                              setDays(
                                days.filter((item) => item !== e.target.value)
                              );
                            }
                          }}
                        />
                        <label className="ms-1 text-sm font-medium text-gray-900">{day}</label>
                      </div>
                    ))}
                  </div>
              </div>
              <hr />
              <div className="grid gap-6 py-5 md:grid-cols-3">
                  <div className="flex gap-2">
                    <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" type="reset">
                      CANCEL
                    </button>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded" type="submit">
                    SUBMIT
                    </button>
                  </div>
                  </div>
            </Form>
          </>
        )}

      {alreadyApplied && !alreadyApproved && (
        <div className="flex m-4 item-center gap-2">
          <h3 className="text-2xl">
            You have already applied for this doctor account , please wait to
            approve your request
          </h3>
        </div>
      )}
    </div>
      </div>
      <Footer />
    </div>
  )
}

export default DoctorForm