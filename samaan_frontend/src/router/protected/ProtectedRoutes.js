import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoutes = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!true) {
      navigate("/login");
    }
  }, [navigate, isAuthenticated]);

  return <Outlet />;
};

export default ProtectedRoutes;
