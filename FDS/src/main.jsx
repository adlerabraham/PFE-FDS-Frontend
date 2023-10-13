import React from 'react'
import ReactDOM from 'react-dom/client'
import Login from './components/Pages/Login/Login'
import { Provider } from 'react-redux'
import { store } from './stores/store'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Home from './components/Pages/Home/Home'
import RequireAuth from './components/Route/ProtectedRoute/RequireAuth'
import TeacherHome from './components/Pages/Home/TeacherHome'
import StudentHome from './components/Pages/Home/StudentHome'


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>   {/*Tell in which store to get the data*/}
    <React.StrictMode >
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          {/* <Route element={<RequireAuth />}>
            <Route path='/teacherHome' element={<TeacherHome />} exact />
          </Route> */}
          <Route path='/teacherHome' element={<TeacherHome />} />
          <Route path='/studentHome' element={<StudentHome />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  </Provider>

)
