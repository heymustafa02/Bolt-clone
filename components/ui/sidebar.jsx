"use client"
import React, { createContext, useContext, useState } from "react";

const SidebarContext = createContext(undefined);

export function SidebarProvider({ children, defaultOpen = true }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const toggleSidebar = () => setIsOpen((v) => !v);
  const openSidebar = () => setIsOpen(true);
  const closeSidebar = () => setIsOpen(false);

  return (
    <SidebarContext.Provider value={{ isOpen, toggleSidebar, openSidebar, closeSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const ctx = useContext(SidebarContext);
  if (!ctx) {
    // Provide safe no-op defaults when used outside provider
    return {
      isOpen: true,
      toggleSidebar: () => {},
      openSidebar: () => {},
      closeSidebar: () => {},
    };
  }
  return ctx;
}

// Basic sidebar structural components used by AppSideBar
export function Sidebar({ children, className = "" }) {
  const { isOpen } = useSidebar();
  // Slide in/out using translate and simple Tailwind transitions
  return (
    <aside
      className={`fixed left-0 top-0 w-72 bg-sidebar text-sidebar-foreground shadow-lg transform transition-transform duration-200 z-40 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } ${className} flex flex-col h-screen`}
    >
      {children}
    </aside>
  );
}


export function SidebarHeader({ children, className = "" }) {
  return <div className={`border-b px-4 py-4 ${className}`}>{children}</div>;
}

export function SidebarContent({ children, className = "" }) {
  // Allow the content area to grow and scroll while footer stays pinned
  return <div className={`flex-1 overflow-y-auto px-4 py-4 ${className}`}>{children}</div>;
}

export function SidebarFooter({ children, className = "" }) {
  return <div className={`border-t px-4 py-4 ${className}`}>{children}</div>;
}

export function SidebarGroup({ children, className = "" }) {
  return <div className={`mb-4 ${className}`}>{children}</div>;
}

export default Sidebar;
 