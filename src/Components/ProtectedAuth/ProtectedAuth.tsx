import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedAuth({ children }: { children: ReactNode }) {
  const userToken = localStorage.getItem('userToken');
  if (!userToken) {
    return children;
  }
  return <Navigate to='/' />;
}
