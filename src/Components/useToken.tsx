import { useState } from "react";

export default function useToken(): {
  setToken: (userToken: any) => void;
  token: any;
} {
  const getToken = (): any => {
    const userToken = JSON.parse(sessionStorage.getItem("user") || "{}");
    return userToken?.token;
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (userToken: any) => {
    sessionStorage.setItem("token", JSON.stringify(userToken));
    setToken(userToken.token);
  };

  return {
    setToken: saveToken,
    token,
  };
}
