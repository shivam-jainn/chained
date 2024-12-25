import React from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface MessageBubbleProps {
  content: string;
  isAI?: boolean;
  pdfSource?: string;
  pageNumber?: number;
  isStreaming?: boolean;
  isChained?: boolean;
}

const MessageBubble = ({
  content = "Hello! How can I help you today?",
  isAI = true,
  pdfSource,
  pageNumber,
  isStreaming = false,
  isChained = false,
}: MessageBubbleProps) => {
  return (
    <div
      className={cn(
        "w-full max-w-[800px] p-4 rounded-lg mb-4",
        "bg-zinc-900",
        isAI ? "ml-4" : "ml-auto mr-4",
        isChained && "border-l-2 border-blue-500 pl-6",
      )}
    >
      <div
        className={cn("flex flex-col gap-2", isStreaming && "animate-pulse")}
      >
        {/* Message content */}
        <div className={cn("text-sm", isAI ? "text-zinc-200" : "text-white")}>
          {content}
        </div>

        {/* Source badges */}
        <div className="flex gap-2 mt-2">
          {pdfSource && (
            <Badge variant="secondary" className="text-xs">
              #{pdfSource}
            </Badge>
          )}
          {pageNumber && (
            <Badge variant="outline" className="text-xs">
              @{pageNumber}
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
