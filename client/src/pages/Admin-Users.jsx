import { useEffect, useState } from "react";
// import { getAllUsers } from "../../../server/controllers/admin-controller";

 import { useAuth } from "../store/auth";   // -- context Api


export const AdminUsers = () => {
    const[users, setUsers] = useState([]);

    const {authorizationToken} = useAuth();

    const getAllUsersData = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/admin/users", {
                method: "GET",
                headers: {
                    Authorization:authorizationToken,
                },
            });
            const data = await response.json();
            console.log(`users ${data}`);
            setUsers(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllUsersData();
    }, [authorizationToken]);
    return <>{users.map((curUser, index) => {
        return <h2 key={index}> {curUser.username} </h2>

    })}</>;
}







































// import { useEffect, useState } from "react";
// import { useAuth } from "../store/auth";

// export const AdminUsers = () => {
//     const [token, setToken] = useState(localStorage.getItem("token"));
//     const authorizationToken = `Bearer ${token}`;
//     const [users, setUsers] = useState([{curUser:"sanket"}]);
    
//    const { authorizationToken } = useAuth();

//    const getAllUsersData = async () => {
//     console.log(authorizationToken);
//     try {
//         const response = await fetch("http://localhost:5000/api/admin/users",{
//             method: "GET",

//             headers: {
//                 Authorization: authorizationToken,
                
//             },
//         });
//         const data = await response.json();
//         console.log(`users ${data}`);
//         setUsers(data);
//     } catch (error) {
//         console.log(error);
//     }
// //    }
// } ;

// useEffect(() => {
//     getAllUsersData();
// }, []);

// return (<>  {users.map((curUser, index) => {
//     <h2 key={index}> { curUser.username}</h2>;

// })} </>
// );
// };