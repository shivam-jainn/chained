import React, { useState, KeyboardEvent } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { cn } from "@/lib/utils";

interface MessageInputProps {
  onSend?: (message: string, isChained: boolean) => void;
  isChainMode?: boolean;
  disabled?: boolean;
  placeholder?: string;
}

const MessageInput = ({
  onSend = () => {},
  isChainMode = false,
  disabled = false,
  placeholder = "Type your message here...",
}: MessageInputProps) => {
  const [message, setMessage] = useState("");

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (message.trim()) {
        onSend(message, false);
        setMessage("");
      }
    } else if (e.key === "Enter" && e.shiftKey) {
      e.preventDefault();
      if (message.trim()) {
        onSend(message, true);
        setMessage("");
      }
    }
  };

  const handleSendClick = () => {
    if (message.trim()) {
      onSend(message, false);
      setMessage("");
    }
  };

  return (
    <div className="fixed bottom-0 w-full max-w-[1192px] bg-zinc-900 p-4 border-t border-zinc-800">
      <div
        className={cn(
          "flex flex-col gap-2",
          isChainMode && "border-l-2 border-blue-500 pl-4",
        )}
      >
        <div className="flex gap-2">
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled}
            className="min-h-[60px] max-h-[200px] bg-zinc-800 border-zinc-700 text-white"
            rows={1}
          />
          <Button
            onClick={handleSendClick}
            disabled={disabled || !message.trim()}
            className="h-[60px] w-[60px] bg-blue-600 hover:bg-blue-700"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
        <div className="text-xs text-zinc-400">
          Press Enter to send, Shift+Enter for chain prompts
        </div>
      </div>
    </div>
  );
};

export default MessageInput;
