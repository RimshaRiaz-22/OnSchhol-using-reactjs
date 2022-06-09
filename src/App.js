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
import CourseStream from './Components/CourseStream';
import CourseStreamJoin from './Components/CourseStreamJoin'
import ReactPdfViewer from './Components/ReactPdfViewer';
import PerformanceData from './Components/PerformanceData';


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
          <Routes>
            <Route exact path="/coursestreamjoin" element={<CourseStreamJoin />}></Route>
          </Routes>
          <Routes>
            <Route exact path="/pdf" element={<ReactPdfViewer />}></Route>
          </Routes>
          <Routes>
            <Route exact path="/performance" element={<PerformanceData />}></Route>
          </Routes>
          
        </Router>

    </>
  );
}

export default App;
