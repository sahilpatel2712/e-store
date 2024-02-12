import { createContext, useState, useEffect, useCallback } from "react";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import "../loader.css";
import Loader from "../Components/loader/Loader";
const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  let [user, setUser] = useState(() =>
    localStorage.getItem("userAuthToken")
      ? jwtDecode(JSON.parse(localStorage.getItem("userAuthToken"))["access"])
      : null
  );
  let [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("userAuthToken")
      ? JSON.parse(localStorage.getItem("userAuthToken"))
      : null
  );
  let [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  let loginUser = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    const response = await fetch(
      "https://api-krudra9125-gmailcom.vercel.app/api/login/",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, password: password }),
      }
    );

    let data = await response.json();
    console.log(data);
    if (data["message"]) {
      console.log("from 201 status", data["token"]);
      localStorage.setItem("userAuthToken", JSON.stringify(data["token"]));
      setAuthTokens(data["token"]);
      console.log("from 201 status", jwtDecode(data["token"]["access"]));
      setUser(jwtDecode(data["token"]["access"]));
      setIsAuthenticated(true);
      navigate("/", { replace: true });
    } else {
      alert("invalid credentials");
    }
  };
  let signupuser = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const name = e.target[3].value;
    const address = e.target[4].value;
    const password = e.target[1].value;
    const password2 = e.target[2].value;
    if (password === password2) {
      fetch("https://api-krudra9125-gmailcom.vercel.app/api/register/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          password: password,
          password2: password,
          tc: "True",
          name: name,
          address: address,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data["message"]) {
            console.log("from 201 status", data["token"]);
            localStorage.setItem(
              "userAuthToken",
              JSON.stringify(data["token"])
            );
            setAuthTokens(data["token"]);
            console.log("from 201 status", jwtDecode(data["token"]["access"]));
            setUser(jwtDecode(data["token"]["access"]));
            setIsAuthenticated(true);
            navigate("/", { replace: true });
          } else {
            alert("EMAIL aleready exist");
          }
        });
    } else {
      alert("PASSWORD DOES NOT MATCH");
    }
  };

  let logoutUser = () => {
    // e.preventDefault()
    localStorage.removeItem("userAuthToken");
    setAuthTokens(null);
    setUser(null);
    setIsAuthenticated(false);
    // navigate('/',{replace:true})
  };

  const updateToken = useCallback(async () => {
    // console.log(authTokens)
    try {
      if (authTokens) {
        const response = await fetch(
          "https://api-krudra9125-gmailcom.vercel.app/api/refreshtoken/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ refresh: authTokens?.refresh }),
          }
        );

        const data = await response.json();
        if (response.status === 200) {
          console.log("update token ", data);
          setAuthTokens(data);
          setUser(jwtDecode(data.access));
          setIsAuthenticated(true);
          localStorage.setItem("userAuthToken", JSON.stringify(data));
        } else {
          // logoutUser()
        }
      }
    } catch (error) {
      console.log(error);
    }

    if (loading) {
      setLoading(false);
    }
  }, [authTokens, loading, logoutUser]);

  let contextData = {
    user: user,
    authTokens: authTokens,
    loginUser: loginUser,
    logoutUser: logoutUser,
    isAuthenticated: isAuthenticated,
    signupuser: signupuser,
    updateToken: updateToken,
    // vendor: vendor
  };

  useEffect(() => {
    if (loading) {
      updateToken();
    } else {
      const REFRESH_INTERVAL = 1000 * 60 * 4; // 15 minutes
      let interval = setInterval(() => {
        if (authTokens) {
          updateToken();
        }
      }, REFRESH_INTERVAL);
      return () => clearInterval(interval);
    }
  }, [authTokens, loading, updateToken]);

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? (
        <div className="w-[100vw] h-[100vh] flex justify-center items-center ">
          {" "}
          <Loader />
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};
