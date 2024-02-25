import { useState } from "react";
import {useNavigate} from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

const URL = "http://localhost:5000/api/auth/login";

  export const Login = () => {
    const [user, setUser] = useState({
      email:'',
      password:'',
    });

    const navigate = useNavigate();
    const {storeTokenInLs} = useAuth();

    const handleInput = (e) => {
      let name = e.target.name;
      let value = e.target.value;

      setUser({
        ...user,
        [name]: value,
      });
    };

    
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(user);
    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      console.log("login form", response);
      
      const res_data = await response.json();

      if (response.ok) {
        alert("Login SuccesFull");
        storeTokenInLs( res_data.token);

        setUser( {email:'',password:''});
        toast.success("Login Successful");
        navigate("/");
      }else{
        toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);
        console.log('invalid credintials');
      }

      // console.log(response);

    }catch (error) {
      console.log("register", error); 
  }
  };
  

    return <>
     <section> 
      <main>
        <div className="section-registration">
          <div className="container grid grid-two-cols"></div>
          <div className="registration-image">
            <img src="/images/login.png" alt="Login Form" width="500" height="500" />
          </div>

          {/* Registration form */}
          <div className="registration-form">
            <h1 className="main-heading mb-3">Login form</h1>
            <br/>

            <form onSubmit={handleSubmit}>
           
              <div>
                <label htmlFor="email">email</label>
                <input type="text" name="email" 
                placeholder="Enter Your Email" 
                id="email"
                required
                autoComplete="off"
                value={user.email}
                onChange={handleInput}
                />
                
              </div>
             
              <div>
                <label htmlFor="password">password</label>
                <input type="number" name="password" 
                placeholder="password" 
                id="password"
                required
                autoComplete="off"
                value={user.password}
                onChange={handleInput}
                /> 
              </div>
              <br/>
              <button type="submit" className="btn btn-submit"> Login </button>
            </form>
          </div>
        </div>
      </main>
    </section>
    </>
  };
  
