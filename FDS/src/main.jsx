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
import TeacherDashboard from './components/Pages/Dashboards/Teacher/TeacherDashboard'
import StudentDashboard from './components/Pages/Dashboards/Student/StudentDashboard'
import DashboardHome from './components/Pages/Dashboards/DashboardHome'
import DashboardCalendar from './components/Pages/Dashboards/DashboardCalendar'
import TeacherClass from './components/Pages/Dashboards/Teacher/TeacherClass'
import ClassParticipants from './components/Pages/Dashboards/Teacher/ClassParticipants'
import Flux from './components/Pages/Dashboards/Teacher/Flux'
import NoteCards from './components/Pages/Dashboards/Teacher/NoteCards'
import ClassBoard from './components/Pages/Dashboards/ClassBoard'
import StudentList from './components/Pages/Dashboards/Teacher/StudentList'
import NoteCardList from './components/Pages/Dashboards/Teacher/NoteCardList'
import NoteCardTable from './components/Pages/Dashboards/Teacher/NoteCardTable'
import NoteCardTableView from './components/NoteCardTable/NoteCardTableView'
import NoteCardTableCreate from './components/NoteCardTable/NoteCardTableCreate'
import NoteCardTableEdit from './components/NoteCardTable/NoteCardTableEdit'
import CoordinatorDashbord from './components/Pages/Dashboards/Coordinator/CoordinatorDashbord'
import CoordinatorDashboardHome from './components/Pages/Dashboards/Coordinator/CoordinatorDashboardHome'
import ProgramManagement from './components/Pages/Dashboards/Coordinator/ProgramManagement'
import LevelClasses from './components/Pages/Dashboards/Coordinator/LevelClasses'
import LevelClassesHome from './components/Pages/Dashboards/Coordinator/LevelClassesHome'
import TranscriptList from './components/Pages/Dashboards/Coordinator/TranscriptList'



ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>   {/*Tell in which store to get the data*/}
    <React.StrictMode >
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route element={<RequireAuth />}>
            <Route path='/coordinatorDashboard' element={<CoordinatorDashbord />}>
              <Route index element={<CoordinatorDashboardHome />} />
              <Route path='calendar' element={<DashboardCalendar />} />
              <Route path=':programId' element={<ProgramManagement />} >
                <Route path=':levelID' element={<LevelClasses />}>
                  <Route index element={<LevelClassesHome />} />
                  <Route path=':classID' element={<ClassBoard />}>
                    <Route path='transcriptList' element={<TranscriptList />}>
                      <Route path='noteCardTable' element={<NoteCardTable />}>
                        <Route path='view' element={<NoteCardTableView />} />
                        <Route path='create' element={<NoteCardTableCreate />} />
                        <Route path='update' element={<NoteCardTableEdit />} />
                      </Route>
                    </Route>
                  </Route>
                </Route>
              </Route>
            </Route>
            <Route path='/teacherDashboard' element={<TeacherDashboard />} exact >
              <Route index element={<DashboardHome />} />
              <Route path='calendar' element={<DashboardCalendar />} />
              <Route path=':classID' element={<ClassBoard />}>
                <Route path='teacherClass' element={<TeacherClass />} >
                  <Route path='noteCards' element={<NoteCards />} >
                    <Route path=':levelID' element={<NoteCardList />} >
                      <Route path='noteCardTable' element={<NoteCardTable />}>
                        <Route path='view' element={<NoteCardTableView />} />
                        <Route path='create' element={<NoteCardTableCreate />} />
                        <Route path='update' element={<NoteCardTableEdit />} />
                      </Route>
                    </Route>
                  </Route>
                  <Route path='classParticipants' element={<ClassParticipants />} >
                    <Route path=':levelID' element={<StudentList />}></Route>
                  </Route>
                  <Route index element={<Flux />}></Route>
                </Route>
              </Route>
            </Route>
          </Route>
          <Route element={<RequireAuth />}>
            <Route path='/studentdashboard' element={<StudentDashboard />} exact >
              <Route index element={<DashboardHome />} />
              <Route path='calendar' element={<DashboardCalendar />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  </Provider>

)
