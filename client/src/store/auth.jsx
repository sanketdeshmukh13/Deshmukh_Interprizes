import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null); // ..... UPDATED
  const [services, setServices] = useState("");
  const authorizationToken = `Bearer ${token}`;

  const storeTokenInLs = (serverToken) => {
    setToken(serverToken);
    console.log(serverToken);
    localStorage.setItem("token", serverToken);
  };

  const isLoggedIn = !!token;

  // Tackling the logOut functionality
  const LogoutUser = () => {
    setToken("");
    localStorage.removeItem("token");
  };

  // JWT Authentication - to get the currently loggedIn user data
  const userAuthentication = async () => {
    console.log(authorizationToken);
    try {

      const response = await fetch("http://localhost:5000/api/auth/user", {
        method: "GET",
        headers: {
          Authorization: authorizationToken, // Fix typo here
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("user data ", data.userData);
        setUser(data.userData);
      } else {
        // Handle error response
        setUser(null);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      setUser(null);
    }
  };

  // to fetch the services data from the database
  const getServices = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/data/service", {
        method: "GET",
      });

      if (response.ok) {
        const data = await response.json([]);
        console.log(data.msg);
        setServices(data.msg);
      } else {
        // Handle error response
      }
    } catch (error) {
      console.log(`services frontend error: ${error}`);
    }
  };

  useEffect(() => {
    getServices();
    userAuthentication();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, storeTokenInLs, logoutUser: LogoutUser, user, services, authorizationToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth used outside of the Provider");
  }
  return authContextValue;
};
