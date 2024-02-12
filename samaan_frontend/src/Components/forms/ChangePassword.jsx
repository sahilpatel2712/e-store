import React, { useState } from "react";
import AuthContext from "../../context/Auth";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const { authTokens } = React.useContext(AuthContext);
  const navigate = useNavigate();
  const [loginUser, setloginUser] = useState();
  const [seepass, setseepass] = useState(false);
  const [seepass1, setseepass1] = useState(false);
  const handlesubmit = async (e) => {
    e.preventDefault();
    const old_password = e.target.old_password.value;
    const new_password = e.target.new_password.value;
    try {
      const response = await fetch(
        "https://api-krudra9125-gmailcom.vercel.app/api/changepassword/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authTokens["access"]}`,
          },
          body: JSON.stringify({
            old_password: old_password,
            new_password: new_password,
          }),
        }
      );
      const data = await response.json();
      if (data["error"]) {
        alert(data["error"]);
      } else {
        navigate("/");
        window.location.reload();
        alert("Password Changed Successfully");
      }
    } catch (error) {}
  };

  return (
    <div className="w-[100vw] h-[100vh] flex flex-row justify-center items-center  ">
      <div className="w-[100%] h-[100%] max-w-screen-2xl max-h-[800px] flex justify-center items-center  ">
        <div className=" hidden md:flex md:w-[50%] h-[100%]   justify-center items-center ">
          <img
            className=" h-[80%] w-[80%] object-contain "
            src="./login_left.svg"
            alt=""
            srcset=""
          />
        </div>
        <div className=" w-[100%] md:w-[50%] h-[100%] flex justify-center items-center flex-col">
          <div className="w-[90%] md:w-[60%] h-[100%] flex flex-col rounded-2xl justify-center items-center">
            <div className="w-[100%] ">
              <div className="flex flex-col my-5">
                <h1 className="flex text-3xl font-bold flex-nowrap">
                  Enter Password
                </h1>
              </div>
            </div>
            <form onSubmit={handlesubmit} className="w-[100%]">
              <div className="w-[100%] h-[4rem] flex justify-center items-center ">
                <div className="w-[100%] h-[3rem] flex items-center border border-black rounded-xl ">
                  <input
                    className="w-[100%] h-[100%] rounded-xl outline-none pl-2"
                    type={seepass ? "text" : "password"}
                    placeholder="Enter Old Password"
                    name="old_password"
                    required={true}
                  />
                  {seepass ? (
                    <svg
                      height="30px"
                      width="30px"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      onClick={() => setseepass(!seepass)}
                      className="pr-1 cursor-pointer"
                    >
                      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        {" "}
                        <path
                          d="M9.60997 9.60714C8.05503 10.4549 7 12.1043 7 14C7 16.7614 9.23858 19 12 19C13.8966 19 15.5466 17.944 16.3941 16.3878M21 14C21 9.02944 16.9706 5 12 5C11.5582 5 11.1238 5.03184 10.699 5.09334M3 14C3 11.0069 4.46104 8.35513 6.70883 6.71886M3 3L21 21"
                          stroke="black"
                          stroke-width="0.4"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>{" "}
                      </g>
                    </svg>
                  ) : (
                    <svg
                      height="30px"
                      width="30px"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      onClick={() => setseepass(!seepass)}
                      className="cursor-pointer"
                    >
                      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        {" "}
                        <path
                          d="M3 14C3 9.02944 7.02944 5 12 5C16.9706 5 21 9.02944 21 14M17 14C17 16.7614 14.7614 19 12 19C9.23858 19 7 16.7614 7 14C7 11.2386 9.23858 9 12 9C14.7614 9 17 11.2386 17 14Z"
                          stroke="black"
                          stroke-width="0.4"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>{" "}
                      </g>
                    </svg>
                  )}
                </div>
              </div>
              <div className="w-[100%] h-[4rem] flex justify-center items-center ">
                <div className="w-[100%] h-[3rem] flex items-center border border-black rounded-xl ">
                  <input
                    className="w-[100%] h-[100%] rounded-xl outline-none pl-2"
                    type={seepass1 ? "text" : "password"}
                    placeholder="Enter New Password"
                    name="new_password"
                    required={true}
                  />
                  {seepass1 ? (
                    <svg
                      height="30px"
                      width="30px"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      onClick={() => setseepass1(!seepass1)}
                      className="pr-1 cursor-pointer"
                    >
                      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        {" "}
                        <path
                          d="M9.60997 9.60714C8.05503 10.4549 7 12.1043 7 14C7 16.7614 9.23858 19 12 19C13.8966 19 15.5466 17.944 16.3941 16.3878M21 14C21 9.02944 16.9706 5 12 5C11.5582 5 11.1238 5.03184 10.699 5.09334M3 14C3 11.0069 4.46104 8.35513 6.70883 6.71886M3 3L21 21"
                          stroke="black"
                          stroke-width="0.4"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>{" "}
                      </g>
                    </svg>
                  ) : (
                    <svg
                      height="30px"
                      width="30px"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      onClick={() => setseepass1(!seepass1)}
                      className="cursor-pointer"
                    >
                      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        {" "}
                        <path
                          d="M3 14C3 9.02944 7.02944 5 12 5C16.9706 5 21 9.02944 21 14M17 14C17 16.7614 14.7614 19 12 19C9.23858 19 7 16.7614 7 14C7 11.2386 9.23858 9 12 9C14.7614 9 17 11.2386 17 14Z"
                          stroke="black"
                          stroke-width="0.4"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>{" "}
                      </g>
                    </svg>
                  )}
                </div>
              </div>
              <div className="w-[100%] h-[4rem] flex justify-center items-center ">
                <button className="w-[100%] h-[3rem] border border-black rounded-lg pl-2 bg-black text-white">
                  Change Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
