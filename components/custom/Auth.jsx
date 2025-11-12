"use client";

import React, { useContext, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Lookup from "@/data/Lookup";
import { useGoogleLogin } from "@react-oauth/google";
import { UserDetailContext } from "@/context/UserDetailContext";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

function AuthenticationDialog({ openDialog, closeDialog }) {
  const { setUserDetail } = useContext(UserDetailContext);
  const [isLoading, setIsLoading] = useState(false);
  const createUser = useMutation(api.users.CreateUser);

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setIsLoading(true);
      try {
        const { data } = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          { headers: { Authorization: `Bearer ${tokenResponse.access_token}` } }
        );

       const created = await createUser({
  name: data.name,
  email: data.email,
  picture: data.picture,
  uid: uuidv4(),
});

       localStorage.setItem("user", JSON.stringify(created));
setUserDetail(created);
        closeDialog();
      } catch (error) {
        console.error("Google Login Error:", error);
      } finally {
        setIsLoading(false);
      }
    },
    onError: () => setIsLoading(false),
  });

  return (
    <Dialog open={openDialog} onOpenChange={closeDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold text-white">
            {Lookup.SIGNIN_HEADING}
          </DialogTitle>
          <div className="flex flex-col items-center gap-3 pt-4">
            <p className="text-center text-muted-foreground">
              {Lookup.SIGNIN_SUBHEADING}
            </p>

            <button
              className="bg-primary text-primary-foreground hover:bg-primary/90 mt-4 w-full py-2 rounded-md transition-all"
              onClick={login}
              disabled={isLoading}
            >
              {isLoading ? "Signing In..." : "Sign In With Google"}
            </button>

            <p className="text-center text-sm text-muted-foreground px-4">
              {Lookup.SIGNIN_AGREEMENT_TEXT}
            </p>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default AuthenticationDialog;

/* ✅ Centralized Auth Actions */
export function useAuthActions() {
  const { setUserDetail } = useContext(UserDetailContext);

  const logout = () => {
    localStorage.removeItem("user");
    setUserDetail({});
  };

  return { logout };
}
