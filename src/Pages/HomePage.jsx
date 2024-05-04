import React from 'react'
import Header from '../components/Layout/Header'
import Footer from '../components/Layout/Footer'
import { Link } from 'react-router-dom'

function HomePage() {
  return (
    <div>
        <Header />
        <div>
        <section className="bg-gradient-to-r from-blue-500 to-blue-700 text-white h-screen flex items-center justify-center">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">DAS - Doctor Appointment System</h1>
        <p className="text-xl leading-relaxed mb-8">
          Schedule appointments with your doctor conveniently online. Avoid long wait times and manage your healthcare efficiently.
        </p>
        <div className='flex lg:m-10'>
        <Link to={"/apply-doctor"} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded inline-flex items-center">
          Add Doctor
          <svg className="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" ></path></svg>
        </Link>
        <Link to={"/ScheduleAppointment"} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded inline-flex items-center mx-6">
          Schedule Appointment
          <svg className="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" ></path></svg>
        </Link>
        </div>
      </div>
    </section>
        </div>
        <div>
      <section id='about' style={{minHeight: "800px" , margin:"40px" , padding:" 40px"}}>
        <h3>About</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere, consequatur cumque. Quaerat dolor debitis modi assumenda necessitatibus id laudantium a. Vitae dolorum harum aliquam, esse quisquam sit iusto deleniti ab?
        </p>
      </section>
    </div>
        <div>
      <section id='contact'>
        <h3>Contact</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere, consequatur cumque. Quaerat dolor debitis modi assumenda necessitatibus id laudantium a. Vitae dolorum harum aliquam, esse quisquam sit iusto deleniti ab?
        </p>
      </section>
    </div>

        <Footer />
    </div>
  )
}

export default HomePage