import React from 'react'
import Header from '../components/Layout/Header'
import Footer from '../components/Layout/Footer'
import { Link } from 'react-router-dom'

function HomePage() {
  return (
    <div>
        <Header />
        <div>
        <section className="bg-home-color text-white h-screen flex items-center justify-center">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">DAS - Doctor Appointment System</h1>
        <p className="text-xl leading-relaxed mb-8">
          Schedule appointments with your doctor conveniently online. <br />Avoid long wait times and manage your healthcare efficiently.
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
        <section className="bg-gray-100 py-20" id='about'>
        <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-8">About Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="flex flex-col space-y-4">
        <p className="text-lg leading-loose">
          We are a team dedicated to making healthcare appointments easier and more accessible. Our online appointment system allows you to schedule appointments with your doctor quickly and conveniently, from the comfort of your own home.
        </p>
        <p className="text-lg leading-loose">
          We believe that everyone deserves easy access to quality healthcare. With our platform, you can find qualified doctors in your area and book appointments at a time that works for you.
        </p>
      </div>
      <img src="https://as1.ftcdn.net/v2/jpg/02/60/79/68/1000_F_260796882_QyjDubhDDk0RZXV9z7XBEw9AKnWCizXy.jpg" alt="About Us Image" className="rounded-lg shadow-md" />
    </div>
  </div>
</section>

    </div>
        <div>
       <section className="bg-blue-500 text-white py-20" id='contact'>
  <div className="container mx-auto px-4">
    <h2 className="text-4xl font-bold text-center mb-8">Contact Us</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
      <div className="flex flex-col space-y-4">
        <p className="text-lg leading-loose">
          Have any questions or need assistance scheduling an appointment? Feel free to contact us using the information below. We are happy to help in any way we can.
        </p>
        <ul className="list-disc ml-4">
          <li>Phone: (555) 555-5555</li>
          <li>Email: info@doctorappointments.com</li>
        </ul>
      </div>
      <form className="flex flex-col space-y-4">
        <input type="text" placeholder="Your Name" className="border rounded px-4 py-2 focus:outline-none focus:ring-1 focus:ring-white" />
        <input type="email" placeholder="Your Email" className="border rounded px-4 py-2 focus:outline-none focus:ring-1 focus:ring-white" />
        <textarea placeholder="Message" rows={5} className="border rounded px-4 py-2 focus:outline-none focus:ring-1 focus:ring-white" defaultValue={""} />
        <button type="submit" className="bg-white hover:bg-gray-100 text-blue-500 py-2 px-4 rounded focus:outline-none focus:ring-1 focus:ring-blue-500">Send Message</button>
      </form>
    </div>
  </div>
</section>


    </div>

        <Footer />
    </div>
  )
}

export default HomePage