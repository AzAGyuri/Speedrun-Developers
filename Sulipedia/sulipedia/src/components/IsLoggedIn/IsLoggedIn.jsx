import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function IsLoggedIn() {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("jwt") === null) {
      navigate("/signIn");
    }
  }, [navigate]);
  return <></>;
}
