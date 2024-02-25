import { NavLink, Outlet } from "react-router-dom";
import { FaUserSecret, FaHome, FaRegListAlt } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";

export const AdminLayout = () => {
  return (
    <>
      <header>
        <div className="container">
          <nav>
            <ul>
              <li>
                <NavLink to="/admin/users"><FaUserSecret /> Users</NavLink>
              </li>
              <li>  
                <NavLink to="/admin/contacts"> <FaMessage /> Contacts</NavLink>
              </li>
              <li>
                <NavLink to="/service">   <FaRegListAlt/> Services</NavLink> {/* Fixed path */}
              </li>
              <li>
                <NavLink to="/"> <FaHome/> Home</NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <Outlet />
    </>
  );
};























// import { NavLink, Outlet } from "react-router-dom";
// import { FaUserSecret, FaHome, FaRegListAlt } from "react-icons/fa";
// import { FaMessage } from "react-icons/fa6";

// export const AdminLayout = () => {
//   return (
//     <>
//       <header>
//         <div className="container">
//           <nav>
//             <ul>
//               <li>
//                 <NavLink to="/admin/users"><FaUserSecret /> Users</NavLink>
//               </li>
//               <li>  
//                 <NavLink to="/admin/contacts"> <FaMessage /> Contacts</NavLink>
//               </li>
//               <li>
//                 <NavLink to="/service">   <FaRegListAlt/> Services</NavLink> {/* Fixed path */}
//               </li>
//               <li>
//                 <NavLink to="/"> <FaHome/> Home</NavLink>
//               </li>
//             </ul>
//           </nav>
//         </div>
//       </header>
//       <Outlet />
//     </>
//   );
// };
