import { Form, message } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { ShowLoader } from '../redux/loaderSlice';
import { LoginUser } from '../apicalls/users';

function SignIn() {

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleSubmit = async (values) => {
    try {
      dispatch(ShowLoader(true));
      const response = await LoginUser(values);
      dispatch(ShowLoader(false));
      if(response.success){
        message.success(response.message);
        localStorage.setItem("user",JSON.stringify({
          ...response.data,
          password : '',
        }));
        navigate("/");
      }
      else{
        throw new Error(response.message);
      }

    } catch (error) {
      dispatch(ShowLoader(false));
      message.error(error.message);
    }
};

useEffect(() =>{
  const user = JSON.parse(localStorage.getItem("user"));
  if(user) navigate("/");
}, [navigate]);

  return (
    <div>
      <div className="flex min-h-screen items-center justify-center bg-gray-300">
      <div className="w-full max-w-md p-4 rounded-md shadow-sm bg-gray-100">
        <h1 className="text-2xl font-bold text-center mb-3">Sign In</h1>
        <hr className='mb-5' style={{border:"1px black solid"}}/>
        <Form layout="vertical" onFinish={handleSubmit}>
          <div className="mb-6">
          <Form.Item label="Email" name="email" className="block text-sm font-medium text-gray-700 mb-1">
            <input type="email"className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-600"  />
        </Form.Item>
          </div>
          <div className="mb-6">
          <Form.Item label="Password" name="password" className="block text-sm font-medium text-gray-700 mb-1">
            <input type="password" className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-600" />
        </Form.Item>
          </div>
          <button
            type="submit"
            className="w-full px-3 py-2 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            Sign In
          </button>
          <div>
            <Link to={"/signup"} className='flex my-5 place-content-center cursor-pointer hover:text-gray-500 '>Don't have a account? <span>SignUp</span> </Link>
          </div>
        </Form>
      </div>
    </div>
    </div>
  )
}

export default SignIn