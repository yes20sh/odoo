import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx"; // ✅ correct path

export const useAuth = () => {
  return useContext(AuthContext);
};
