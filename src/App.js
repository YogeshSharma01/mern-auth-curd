import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import NoteState from "./context/notes/NoteState";
// import { Alert } from "./components/Alert";
import Login from "./components/Login";
import Signup from "./components/Signup";


function App() {
  return (
    <>
    <NoteState>
    <Router>
    <Navbar/>
    {/* <Alert message="This is React App"/> */}
    <div className="container">
    <Routes>
    <Route exact element={<Home/>} path="/"></Route>
    <Route exact element={<About/>} path="/about"></Route>
    <Route exact element={<Login/>} path="/login"></Route>
    <Route exact element={<Signup/>} path="/signup"></Route>  
    </Routes>
    </div>
    </Router>
    </NoteState>
    </>
  );
}

export default App;
