
import { createContext, ReactNode, useState } from "react";
import { AuthType } from "./context.types";

export const authContext = createContext<AuthType | null>(null);
export default function AuthContextProvider({ children }: { children: ReactNode }) {
  const [userToken, setuserToken] = useState<string | null>(localStorage.getItem("userToken"))
  return (
    <authContext.Provider value={{
      userToken,
      setuserToken,
    }}>
      {children}
    </authContext.Provider>
  )
}


