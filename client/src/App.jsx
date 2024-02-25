import { BrowserRouter, Routes, Route } from "react-router-dom";
import {Navbar } from "./components/Navbar";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { Service } from "./pages/Service";
import { Register } from "./pages/Register";
import { Login} from "./pages/Login";
import { Logout} from "./pages/Logout";
import {Error} from "./pages/Error";
import "./components/Navbar.css";
import { Footer } from "./components/Footer/Footer";
import { AdminLayout } from "./components/layouts/Admin-Layout";
import { AdminUsers } from "./pages/Admin-Users";
import { AdminContacts } from "./pages/Admin-Contacts";


const App = () => {
  return (
    <>
    <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element= {<Home />} />
      <Route path="/About" element= {<About />} />
      <Route path="/Contact" element= {<Contact />} />
      <Route path="/Service" element= {<Service />} />
      <Route path="/Register" element= {<Register />} />
      <Route path="/Login" element= {<Login />} />
      <Route path="/Logout" element= {<Logout />} />
      <Route path="*" element= {<Error />} />

      <Route path="/admin" element= {<AdminLayout />} >
         <Route path="users" element= {<AdminUsers />} />
         <Route path="contacts" element= {<AdminContacts />} />
         <Route path="services" element= {<Service />} />  
       </Route>
    </Routes>
    <Footer/>
    </BrowserRouter>
    </>
  );
};

export default App;