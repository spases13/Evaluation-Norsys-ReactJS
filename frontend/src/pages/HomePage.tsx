import { BrowserRouter, Route, Routes } from "react-router-dom"
import SideBar from "../components/SideBar"
import "./styles/HomePage.scss"
import ReservationsPage from "./LoansPage"
import UsersPage from "./UsersPage"
import AboutPage from "./AboutPage"
import BooksPage from "./BooksPage"

const HomePage = () => {
  return (
    <main id="HomePage">
      <SideBar></SideBar>
      <BrowserRouter>
          <Routes>
            <Route path="/dashboard" element={<></>} />
            <Route path="/dashboard/books" element={<BooksPage/>} />
            <Route path="/dashboard/users" element={<UsersPage/>} />
            <Route path="/dashboard/reservations" element={<ReservationsPage/>} />
            <Route path="/dashboard/about" element={<AboutPage/>} />
          </Routes>
      </BrowserRouter>
      
    </main>
  )
}

export default HomePage