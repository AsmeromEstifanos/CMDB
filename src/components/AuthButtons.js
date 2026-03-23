import React from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../auth/msal";

const AuthButtons = () => {
  const { instance, accounts } = useMsal();
  const isAuthed = accounts && accounts.length > 0;

  const handleLogin = async () => {
    try {
      await instance.loginPopup(loginRequest);
    } catch (e) {
      console.error("MSAL login error", e);
    }
  };

  const handleLogout = async () => {
    try {
      await instance.logoutPopup();
    } catch (e) {
      console.error("MSAL logout error", e);
    }
  };

  return (
    <div>
      {isAuthed ? (
        <div className="flex items-center justify-between text-slate-300">
          <span className="text-xs truncate whitespace-nowrap">
            {accounts[0]?.username}
          </span>
          <button
            className="text-xs px-2 py-1 rounded bg-white/10 hover:bg-white/20 whitespace-nowrap"
            onClick={handleLogout}
          >
            Sign out
          </button>
        </div>
      ) : (
        <button
          className="w-full text-sm px-3 py-2 rounded bg-blue-500 hover:bg-blue-600 text-white whitespace-nowrap overflow-hidden text-ellipsis"
          onClick={handleLogin}
        >
          Sign in with Microsoft
        </button>
      )}
    </div>
  );
};

export default AuthButtons;
