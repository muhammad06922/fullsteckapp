import { Navigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constant";
import { useEffect, useState } from "react";
import  {jwtDecode}  from "jwt-decode";
import api from "../api";

function ProtectedRoute({ children }) {
  const [IsAuthorized, setIsAuthorized] = useState(null);
  
  const auth = async () => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (!token) {
      setIsAuthorized(false);
      return;
    }
    const decoded = jwtDecode(token);
    const tokenExpiration = decoded.exp;
    const now = Math.floor(Date.now() / 1000);
    if (tokenExpiration < now) {
      await refreshToken();
    } else {
      setIsAuthorized(true);
    }
  };

  const refreshToken = async () => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);
    try {
      const resp = await api.post("/api/token/refresh/", {
        refresh: refreshToken,
      });
      if (resp.status === 200) {
        localStorage.setItem(ACCESS_TOKEN, resp.data.access);
        setIsAuthorized(true);
      } else {
        setIsAuthorized(false);
      }
    } catch (error) {
      console.log(error);
      setIsAuthorized(false);
    }
  };



    useEffect(() => {
    auth().catch(() => setIsAuthorized(false));
  }, []);

  if (IsAuthorized === null) {
    return <div>Loading.....</div>;
  }

  return IsAuthorized ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
