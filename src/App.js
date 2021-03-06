import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import SignIn from './Pages/SignIn';
import Home from './Pages/Homepage'
import SignUp from './Pages/SignUp';
import ForgetPassword from './Pages/ForgetPassword';
import CourseStream from './Components/CourseStream'


function App() {
  return (
    <>
    <Router>
          <Routes>
            <Route exact path="/" element={<SignIn />}></Route>
          </Routes>        
          <Routes>
            <Route exact path="/home" element={<Home />}></Route>
          </Routes> 
          <Routes>
            <Route exact path="/signup" element={<SignUp />}></Route>
          </Routes> 
          <Routes>
            <Route exact path="/forgetpass" element={<ForgetPassword />}></Route>
          </Routes>
          <Routes>
            <Route exact path="/coursestream" element={<CourseStream />}></Route>
          </Routes>
        </Router>

    </>
  );
}

export default App;
