import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function IsNotLoggedIn({ jwt, currentUserId }) {
  const navigate = useNavigate();
  useEffect(() => {
    if (jwt === null && currentUserId !== "0") {
      navigate("/signIn");
    }

    if (jwt !== null) {
      axios
        .get("/validatetoken", { headers: { Authorization: jwt } })
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
