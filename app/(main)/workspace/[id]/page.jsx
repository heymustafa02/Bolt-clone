"use client"
import ChatView from '@/components/custom/ChatView'
import CodeView from '@/components/custom/CodeView'
import React from 'react'
import AppSideBar from '@/components/custom/AppSideBar'
import { SidebarProvider, useSidebar } from '@/components/ui/sidebar'
import { ChevronLeft, ChevronRight } from 'lucide-react'




function WorkspaceContent() {
  const { isOpen } = useSidebar();
  return (
    <div className={`p-3 pr-5 mt-3 transition-all duration-200 ${isOpen ? 'md:ml-72' : 'md:ml-0'}`}>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-10'>
        <ChatView />
        <div className='col-span-2'>
          <CodeView />
        </div>

      </div>
    </div>
  );
}

function Workspace() {
  return (
    <SidebarProvider>
      <div className="relative min-h-screen">
      
        <AppSideBar />
        <WorkspaceContent />
      </div>
    </SidebarProvider>
  )
}

export default Workspace
