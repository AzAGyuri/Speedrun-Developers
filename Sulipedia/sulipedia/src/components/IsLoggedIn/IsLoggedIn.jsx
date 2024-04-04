import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function IsLoggedIn() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!!localStorage.getItem("loginAuth")) {
      navigate("/signIn");
    }
  }, [navigate]);
  return <></>;
}
