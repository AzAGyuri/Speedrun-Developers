import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function IsNotLoggedIn() {
  const navigate = useNavigate();
  useEffect(() => {
    if (
      localStorage.getItem("jwt") === null &&
      localStorage.getItem("currentUserId") !== "0"
    ) {
      navigate("/signIn");
    }

    if (localStorage.getItem("jwt") !== null) {
      axios
        .get("/validatetoken", {
          headers: { Authorization: localStorage.getItem("jwt") },
        })
        .then((response) => {
          if (!response) navigate("/signIn");
        })
        .catch((error) => {
          console.error("JWT Validáció sikertelen", error);
          localStorage.removeItem("jwt");
          navigate("/signIn");
        });
    }
  }, [navigate]);
  return <></>;
}
