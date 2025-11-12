"use client";

import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  
} from "@/components/ui/sidebar";
import Image from "next/image";
import {  Menu,  } from "lucide-react"; // ✅ Icons
import { Button } from "../ui/button";
import WorkspaceHistory from "./WorkspaceHistory";
import SideBarFooter from "./SideBarFooter";
 import { useSidebar } from "@/components/ui/sidebar"; // ✅ get hook

function AppSideBar() {
  const { toggleSidebar, open } = useSidebar(); // ✅ detect state

  return (
    <Sidebar>
      <SidebarHeader className="p-5 flex items-center justify-between">
        
        {/* Logo */}
        <div style={{ position: "relative", width: "30%", height: "30px" }}>
          <Image
            src="/logo.svg"
            alt="logo"
            fill
            priority
            style={{ objectFit: "contain" }}
          />
        </div>

        {/* ✅ Toggle Button */}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleSidebar}
          className="ml-auto"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </Button>

      </SidebarHeader>

      <SidebarContent className="p-5">
        <SidebarGroup>
          <WorkspaceHistory />
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SideBarFooter />
      </SidebarFooter>
    </Sidebar>
  );
}

export default AppSideBar;
