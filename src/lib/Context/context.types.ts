import React from "react";

export type AuthType = {
  userToken: string | null;
  setuserToken: React.Dispatch<React.SetStateAction<string | null>>;
} 