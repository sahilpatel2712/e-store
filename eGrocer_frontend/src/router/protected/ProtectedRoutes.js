import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoutes = () => {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (token==='null') {
      navigate("/login",{replace:true});
    }
  }, [navigate, token]);

  return <Outlet />;
};

export default ProtectedRoutes;
