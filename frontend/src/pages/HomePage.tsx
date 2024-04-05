import { BrowserRouter, Route, Routes } from "react-router-dom"
import SideBar from "../components/SideBar"
import "./styles/HomePage.scss"
import MeetingRoom from "./MeetingRoom"
import ReservationsPage from "./ReservationsPage"
import UsersPage from "./UsersPage"
import AboutPage from "./AboutPage"

const HomePage = () => {
  return (
    <main id="HomePage">
      <SideBar></SideBar>
      <BrowserRouter>
          <Routes>
            <Route path="/dashboard" element={<></>} />
            <Route path="/dashboard/meeting_rooms" element={<MeetingRoom/>} />
            <Route path="/dashboard/users" element={<UsersPage/>} />
            <Route path="/dashboard/reservations" element={<ReservationsPage/>} />
            <Route path="/dashboard/about" element={<AboutPage/>} />
          </Routes>
      </BrowserRouter>
      
    </main>
  )
}

export default HomePage