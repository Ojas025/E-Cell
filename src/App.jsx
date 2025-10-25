import { Route, Routes } from 'react-router';
import './globals.css'
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import Event from './pages/Event';


function App() {

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/event/:id' element={<Event />} />
      <Route path='/admin/login' element={<AdminLogin />} />
      <Route path='/admin/dashboard' element={<AdminDashboard />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}

export default App;
