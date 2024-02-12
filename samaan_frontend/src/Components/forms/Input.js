import { ErrorMessage, Field } from "formik";
import React, { useState } from "react";
import TextError from "../TextError";

function Input() {
  const [seePassword, setSeePassword] = useState(false);

  return (
    <div className="w-[100%] h-[4rem] flex justify-center items-center ">
      <div className="w-[100%] h-[3rem] flex items-center border border-black rounded-xl ">
        <Field
          name="password"
          className="w-[100%] h-[100%] rounded-xl outline-none pl-2"
          type={seePassword ? "text" : "password"}
          placeholder="Password"
          required={true}
        />
        {seePassword ? (
          <svg
            height="30px"
            width="30px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => setSeePassword(!seePassword)}
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
            onClick={() => setSeePassword(!seePassword)}
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
  );
}

export default Input;
