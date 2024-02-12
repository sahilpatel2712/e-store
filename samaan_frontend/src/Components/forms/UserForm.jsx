import React from "react";
import SignInForm from "./Signin";
import SignUpForm from "./Signup";
const UserForm = () => {
  const [logInForm, setLogInForm] = React.useState(false);

  return (
    <div className="w-[100vw] h-[100vh] flex flex-row justify-center items-center">
      <div
        className="w-[100%] h-[100%] max-w-screen-2xl max-h-[800px] flex justify-center items-center  "
        style={{ marginBottom: "10%" }}
      >
        <div className=" hidden md:flex md:w-[50%] h-[100%]   justify-center items-center ">
          <img
            className=" h-[80%] w-[80%] object-contain "
            src="./login_left.svg"
            alt=""
            srcset=""
          />
        </div>
        <div className=" w-[100%] md:w-[50%] h-[100%] flex justify-center items-center flex-col">
          <div className="w-[100%] h-[100%] flex flex-col rounded-2xl justify-around items-center">
            <div className=" w-[100%] md:w-[50%] h-[100%] flex justify-center items-center flex-col">
              <div className="w-[100%] h-[100%] flex flex-col rounded-2xl justify-around items-center">
                <div className="w-[100%] h-[4rem]  flex justify-center items-center transition-all duration-700 ">
                  <div
                    className={`w-[50%] h-[4rem] flex justify-center items-center transition-all duration-700 cursor-pointer  ${
                      logInForm ? "bg-black text-white" : "text-black"
                    } rounded-xl   `}
                    onClick={() => {
                      setLogInForm(true);
                    }}
                  >
                    <h1 className="text-xl font-bold">Login</h1>
                  </div>
                  <div
                    className={`w-[50%] h-[4rem] flex justify-center items-center transition-all duration-700 cursor-pointer ${
                      logInForm ? " text-black" : "bg-black text-white "
                    }  rounded-xl  `}
                    onClick={() => {
                      setLogInForm(false);
                    }}
                  >
                    <h1 className="text-xl font-bold">Create Account</h1>
                  </div>
                </div>
              </div>
            </div>
            {logInForm ? (
              <SignInForm setLogInForm={setLogInForm} />
            ) : (
              <SignUpForm setLogInForm={setLogInForm} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserForm;
