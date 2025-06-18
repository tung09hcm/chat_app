import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import LogoutPage from "./pages/LogoutPage";
import SeetingPage from "./pages/SeetingPage";
import ProfilePage from "./pages/ProfilePage";

import {Routes, Route} from "react-router-dom";

const App = () => {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path="/" element = { <HomePage/> }/>
        <Route path="/signup" element = { <SignUpPage/> }/>
        <Route path="/login" element = { <LoginPage/> }/>
        <Route path="/logout" element = { <LogoutPage/> }/>
        <Route path="seeting" element = {<SeetingPage/>}/>
        <Route path="/profile" element = { <ProfilePage/> }/>
      </Routes>
    </div>
  )
}
export default App;