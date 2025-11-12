"use client"
import React, { useEffect, useRef, useState, createContext, useContext } from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import {
  ArrowUp,
  Paperclip,
  Square,
  X,
  StopCircle,
  Mic,
  Globe,
  BrainCog,
  FolderCode,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// className merge helper
const cn = (...classes) => classes.filter(Boolean).join(" ");

// Inject Scrollbar + Focus Styling (SSR safe)
const useInjectedStyles = () => {
  useEffect(() => {
    const styles = `
      *:focus-visible { outline-offset: 0 !important; --ring-offset: 0 !important; }
      textarea::-webkit-scrollbar { width: 6px; }
      textarea::-webkit-scrollbar-track { background: transparent; }
      textarea::-webkit-scrollbar-thumb { background-color: #444; border-radius: 3px; }
      textarea::-webkit-scrollbar-thumb:hover { background-color: #555; }
    `;
    const styleSheet = document.createElement("style");
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);
    return () => document.head.removeChild(styleSheet);
  }, []);
};

// Textarea
const Textarea = React.forwardRef(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    rows={1}
    className={cn(
      "flex w-full rounded-md border-none bg-transparent px-3 py-2.5 text-base text-gray-100 placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50 min-h-[44px] resize-none",
      className
    )}
    {...props}
  />
));
Textarea.displayName = "Textarea";

// Tooltip
const TooltipProvider = TooltipPrimitive.Provider;
const Tooltip = TooltipPrimitive.Root;
const TooltipTrigger = TooltipPrimitive.Trigger;
const TooltipContent = React.forwardRef(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      "z-50 overflow-hidden rounded-md border border-[#333] bg-[#1F2023] px-3 py-1.5 text-sm text-white shadow-md",
      className
    )}
    {...props}
  />
));
TooltipContent.displayName = "TooltipContent";

// Dialog
const Dialog = DialogPrimitive.Root;
const DialogPortal = DialogPrimitive.Portal;
const DialogOverlay = React.forwardRef(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn("fixed inset-0 z-50 bg-black/60 backdrop-blur-sm", className)}
    {...props}
  />
));
const DialogContent = React.forwardRef(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-[#333] bg-[#1F2023] shadow-xl max-w-[90vw] md:max-w-[800px]",
        className
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="absolute right-4 top-4 bg-[#2E3033]/80 p-2 rounded-full">
        <X className="h-5 w-5 text-gray-200" />
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
));

// Shared Context
const PromptInputContext = createContext(null);

export const PromptInput = React.forwardRef(
  ({ value, onValueChange, children, className, isLoading, onSubmit, disabled, ...props }, ref) => {
    const [internalValue, setInternalValue] = useState(value || "");
    const setValue = onValueChange || setInternalValue;

    return (
      <TooltipProvider>
        <PromptInputContext.Provider
          value={{
            value: value ?? internalValue,
            setValue,
            onSubmit,
            disabled,
          }}
        >
          <div
            ref={ref}
            className={cn("rounded-3xl border border-[#444] bg-[#1F2023] p-2 shadow-xl", className)}
            {...props}
          >
            {children}
          </div>
        </PromptInputContext.Provider>
      </TooltipProvider>
    );
  }
);

// Textarea inside prompt
export const PromptInputTextarea = ({ placeholder, className }) => {
  const { value, setValue, onSubmit, disabled } = useContext(PromptInputContext);
  const textareaRef = useRef(null);

  useEffect(() => {
    if (!textareaRef.current) return;
    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
  }, [value]);

  return (
    <Textarea
      ref={textareaRef}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          onSubmit?.();
        }
      }}
      placeholder={placeholder}
      disabled={disabled}
      className={cn("text-base", className)}
    />
  );
};

// Send Button + Actions
export const PromptInputActions = ({ children }) => (
  <div className="flex items-center justify-between gap-2 pt-2">{children}</div>
);

export const PromptInputAction = ({ tooltip, children }) => (
  <Tooltip>
    <TooltipTrigger asChild>{children}</TooltipTrigger>
    <TooltipContent>{tooltip}</TooltipContent>
  </Tooltip>
);

// ** MAIN COMPONENT **
export const PromptInputBox = React.forwardRef(({ onSend, placeholder = "Type here..." }, ref) => {
  useInjectedStyles();
  const [input, setInput] = useState("");

  const handleSubmit = () => {
    if (!input.trim()) return;
    onSend?.(input);
    setInput("");
  };

  return (
    <PromptInput onValueChange={setInput} onSubmit={handleSubmit} className="w-full" ref={ref}>
      <PromptInputTextarea placeholder={placeholder} />

      <PromptInputActions>
        <PromptInputAction tooltip="Upload Image">
          <button className="text-gray-300 hover:text-white">
            <Paperclip className="h-5 w-5" />
          </button>
        </PromptInputAction>

        <PromptInputAction tooltip="Send">
          <button onClick={handleSubmit} className="bg-white text-black rounded-full h-8 w-8 flex items-center justify-center">
            <ArrowUp className="h-4 w-4" />
          </button>
        </PromptInputAction>
      </PromptInputActions>
    </PromptInput>
  );
});
PromptInputBox.displayName = "PromptInputBox";
