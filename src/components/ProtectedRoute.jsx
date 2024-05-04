import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      navigate("/signin");
    }
  }, [navigate]);

  return (
    <div>
      {children}
    </div>
  );
}

export default ProtectedRoute;
