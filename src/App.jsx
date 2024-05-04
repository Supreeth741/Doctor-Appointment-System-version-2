import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import ProtectedRoute from './components/ProtectedRoute'
import HomePage from './Pages/HomePage'
import SignIn from './Pages/SignIn'
import Signup from './Pages/Signup'
import Profiles from './Pages/profiles'
import Admin from './Pages/Admin/Admin'
import ShAppointment from './Pages/ShAppointment'
import Bookslot from './Pages/Bookslot'
import DoctorForm from './Pages/DoctorForm'
import { useSelector } from 'react-redux'
import Spinner from './components/Spinner'


function App() {
  const { loading } = useSelector(state => state.loader)

  return (
    <div>
      {loading && <Spinner/>}
      <BrowserRouter>
        <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/admin' element={<ProtectedRoute> <Admin /> </ProtectedRoute>} />
        <Route path='/profile' element={<ProtectedRoute> <Profiles /> </ProtectedRoute>} />
        <Route path='/ScheduleAppointment' element={<ProtectedRoute> <ShAppointment /> </ProtectedRoute>} />
        <Route path='/BookSlot/:id' element={<ProtectedRoute> <Bookslot /> </ProtectedRoute>} />
        <Route path='/apply-doctor' element={ <ProtectedRoute> <DoctorForm /> </ProtectedRoute> } />
        <Route path='*' element={<div>Page Not Found 404 Error</div>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
