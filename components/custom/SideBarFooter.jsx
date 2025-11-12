'use client';
import { HelpCircle, LogOut, Settings, Wallet } from 'lucide-react';
import React from 'react';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import { useAuthActions } from './Auth';

function SideBarFooter() {
  const router = useRouter();
  const { logout } = useAuthActions();

  const options = [
    { name: 'Setting', icon: Settings, path: '/settings' },
    { name: 'Help Center', icon: HelpCircle, path: '/help' },
    { name: 'My Subscription', icon: Wallet, path: '/pricing' },
    { name: 'Sign Out', icon: LogOut },
  ];

  const onOptionClick = (option) => {
    if (option.name === "Sign Out") {
      logout();
      router.push("/");
      return;
    }
    router.push(option.path);
  };

  return (
    <div className="p-2 mb-10">
      {options.map((option, index) => (
        <Button
          key={index}
          variant="ghost"
          onClick={() => onOptionClick(option)}
          className="w-full flex justify-start my-3"
        >
          <option.icon className="mr-2" />
          {option.name}
        </Button>
      ))}
    </div>
  );
}

export default SideBarFooter;
