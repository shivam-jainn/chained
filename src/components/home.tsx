import React, { useState } from "react";
import PDFSidebar from "./chat/PDFSidebar";
import ChatThread from "./chat/ChatThread";
import MessageInput from "./chat/MessageInput";

interface HomeProps {
  initialMessages?: any[];
  initialPDFs?: any[];
}

const Home = ({ initialMessages = [], initialPDFs = [] }: HomeProps) => {
  const [messages, setMessages] = useState(initialMessages);
  const [isChainMode, setIsChainMode] = useState(false);

  const handleSendMessage = (content: string, isChained: boolean) => {
    const newMessage = {
      id: String(Date.now()),
      content,
      isAI: false,
      isChained,
    };
    setMessages((prev) => [...prev, newMessage]);
    setIsChainMode(isChained);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: String(Date.now() + 1),
        content: "This is a simulated AI response.",
        isAI: true,
        isChained,
        isStreaming: false,
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);
  };

  const handlePDFUpload = (file: File) => {
    // Placeholder for PDF upload handling
    console.log("PDF uploaded:", file.name);
  };

  const handlePDFSelect = (filename: string) => {
    // Placeholder for PDF selection handling
    console.log("PDF selected:", filename);
  };

  return (
    <div className="flex h-screen w-full bg-zinc-950">
      <PDFSidebar onUpload={handlePDFUpload} onSelectPDF={handlePDFSelect} />
      <div className="flex-1 flex flex-col relative">
        <ChatThread messages={messages} />
        <MessageInput
          onSend={handleSendMessage}
          isChainMode={isChainMode}
          placeholder="Ask about your PDFs..."
        />
      </div>
    </div>
  );
};

export default Home;
