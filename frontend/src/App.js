import 'antd/dist/antd.css'; 
import { Button } from 'antd';
import Login from './components/Login';
import Register from './components/Register';
import Info from './components/Info';
import Home from './components/Home';
import Newlyadmit from './components/Newlyadmit';
import Congo from './components/Congo';
import { Route, Routes } from 'react-router-dom';

function App() {
 
  return (
    < >

    <Routes>
        <Route path="/" element={<Register/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home/>} />
        <Route path="/account" element={<Info />} />
        <Route path="/newlyadmit" element={<Newlyadmit/>} />
        <Route path="/congo" element={<Congo />} />
      </Routes>
     
   
       
    </>
  );
}

export default App;
