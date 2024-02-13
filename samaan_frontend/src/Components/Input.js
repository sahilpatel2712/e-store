import React from "react";
import OpenEye from "../aseets/icons/OpenEye";
import CloseEye from "../aseets/icons/CloseEye";

import { Field } from "formik";

const Input = ({ name, height, inputHeight, placeholder }) => {
  const [seePassword, setSeePassword] = React.useState(false);

  const handleClick = () => {
    setSeePassword((pre) => !pre);
  };

  return (
    <div
      className={`w-[100%] h-[${
        height ? height : "4rem"
      }] flex justify-center items-center `}
    >
      <div
        className={`w-[100%] h-[${
          inputHeight ? inputHeight : "3rem"
        }] flex items-center border border-black rounded-lg `}
      >
        <Field
          name={name}
          className={"w-[100%] h-[100%] rounded-xl outline-none pl-2"}
          type={seePassword ? "text" : "password"}
          placeholder={placeholder ? placeholder : "Enter Your Password"}
          required={true}
        />
        {seePassword ? (
          <OpenEye handleClick={handleClick} />
        ) : (
          <CloseEye handleClick={handleClick} />
        )}
      </div>
    </div>
  );
};

export default Input;
