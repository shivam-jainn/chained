import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import MessageBubble from "./MessageBubble";

interface Message {
  id: string;
  content: string;
  isAI: boolean;
  pdfSource?: string;
  pageNumber?: number;
  isStreaming?: boolean;
  isChained?: boolean;
}

interface ChatThreadProps {
  messages?: Message[];
}

const ChatThread = ({
  messages = [
    {
      id: "1",
      content: "Hello! How can I help you analyze your PDFs today?",
      isAI: true,
    },
    {
      id: "2",
      content: "Can you help me understand document1.pdf?",
      isAI: false,
    },
    {
      id: "3",
      content: "I found some relevant information in document1.pdf on page 5.",
      isAI: true,
      pdfSource: "document1.pdf",
      pageNumber: 5,
    },
    {
      id: "4",
      content: "Tell me more about that section",
      isAI: false,
      isChained: true,
    },
    {
      id: "5",
      content: "Loading...",
      isAI: true,
      isStreaming: true,
      pdfSource: "document1.pdf",
      pageNumber: 5,
      isChained: true,
    },
  ],
}: ChatThreadProps) => {
  return (
    <div className="w-full h-full bg-zinc-950 flex flex-col">
      <ScrollArea className="flex-1 p-4">
        <div className="max-w-[800px] mx-auto">
          {messages.map((message) => (
            <MessageBubble
              key={message.id}
              content={message.content}
              isAI={message.isAI}
              pdfSource={message.pdfSource}
              pageNumber={message.pageNumber}
              isStreaming={message.isStreaming}
              isChained={message.isChained}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ChatThread;
