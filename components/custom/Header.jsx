"use client"; // Ensure this is a Client Component

import Image from "next/image";
import React, { useContext } from "react";
import { Button } from "../ui/button";
import { UserDetailContext } from "@/context/UserDetailContext";
import Link from "next/link";
import { ActionContext } from "@/context/ActionContext";
import { LucideDownload, Rocket, Sun, Moon, Menu } from "lucide-react"; // ✅ Added Sun & Moon
import { usePathname } from "next/navigation";
import { useSidebar } from "@/components/ui/sidebar";
import Colors from "@/data/Colors";
import { useTheme } from "next-themes"; // ✅ Added useTheme
import AuthenticationDialog from "./Auth";


function Header() {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const { toggleSidebar } = useSidebar();
  const { action, setAction } = useContext(ActionContext);
  const path = usePathname();
  const { theme, setTheme } = useTheme(); // ✅ Initialize theme control
const [openDialog, setOpenDialog] = React.useState(false); // ✅ Add this
  const onActionBtn = (action) => {
    setAction({
      actionType: action,
      timeStamp: Date.now(),
    });
  };

  return (
  
  <div className="p-4 flex justify-between items-center border-b border-gray-200">
 <div className="flex items-center gap-3">
    {/* Sidebar Toggle */}
    <Button variant="ghost" size="icon" onClick={toggleSidebar} className="">
      <Menu size={22} />
    </Button>

    {/* Logo */}
    <Link href="/">
      <Image src="/logo.svg" alt="logo" width={40} height={40} />
    </Link>
    </div>


  {!userDetail?.name ? (
    // --- Not logged in: show Sign In + Get Started ---
    <div className="flex gap-5">
       <Button
        variant="ghost"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        {theme === "dark" ? <Sun /> : <Moon />}
      </Button>
      <Button variant="ghost" onClick={() => setOpenDialog(true)}>Sign In</Button>
      <Button
        className="text-white"
        style={{
          backgroundColor: Colors.BLUE,
        }}
      >
        Get Started
      </Button>
    </div>
  ) : path?.includes("workspace") ? (
    // --- Logged in & in workspace: show Export / Deploy / Avatar / Toggle ---
    <div className="flex gap-2 items-center">
      <Button
        variant="ghost"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        {theme === "dark" ? <Sun /> : <Moon />}
      </Button>

      <Button variant="ghost" onClick={() => onActionBtn("export")}>
        <LucideDownload /> Export
      </Button>

      <Button
        className="bg-blue-500 text-white hover:bg-blue-600"
        onClick={() => onActionBtn("deploy")}
      >
        <Rocket /> Deploy
      </Button>

      {userDetail && (
        <Image
          src={userDetail?.picture}
          alt="user"
          width={40}
          height={40}
          className="rounded-full w-[30px] cursor-pointer"
          onClick={toggleSidebar}
        />
      )}
    </div>
  ) : (
    // --- Logged in but NOT in workspace: show only Theme Toggle + Avatar ---
    <div className="flex gap-2 items-center">
      <Button
        variant="ghost"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        {theme === "dark" ? <Sun /> : <Moon />}
      </Button>

      {userDetail && (
        <Image
          src={userDetail?.picture}
          alt="user"
          width={40}
          height={40}
          className="rounded-full w-[30px] cursor-pointer"
          onClick={toggleSidebar}
        />
      )}
    </div>
  )}
  <AuthenticationDialog 
       openDialog={openDialog} 
       closeDialog={() => setOpenDialog(false)} 
    />

</div>

  );
}

export default Header;
