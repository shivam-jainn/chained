import React from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Upload, FileText, ChevronRight } from "lucide-react";

interface PDFFile {
  name: string;
  pageCount: number;
  selected?: boolean;
}

interface PDFSidebarProps {
  pdfs?: PDFFile[];
  onUpload?: (file: File) => void;
  onSelectPDF?: (filename: string) => void;
}

const PDFSidebar = ({
  pdfs = [
    { name: "document1.pdf", pageCount: 10 },
    { name: "sample.pdf", pageCount: 5 },
    { name: "research-paper.pdf", pageCount: 15 },
  ],
  onUpload = () => {},
  onSelectPDF = () => {},
}: PDFSidebarProps) => {
  return (
    <div className="h-full w-[320px] bg-zinc-900 border-r border-zinc-800 flex flex-col">
      {/* Header with upload button */}
      <div className="p-4 border-b border-zinc-800">
        <Button
          variant="outline"
          className="w-full flex items-center gap-2"
          onClick={() => {
            const input = document.createElement("input");
            input.type = "file";
            input.accept = ".pdf";
            input.onchange = (e) => {
              const file = (e.target as HTMLInputElement).files?.[0];
              if (file) onUpload(file);
            };
            input.click();
          }}
        >
          <Upload size={16} />
          Upload PDF
        </Button>
      </div>

      {/* PDF List */}
      <ScrollArea className="flex-1">
        <div className="p-2">
          {pdfs.map((pdf, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg mb-2 hover:bg-zinc-800 cursor-pointer flex items-center gap-3 ${
                pdf.selected ? "bg-zinc-800" : "bg-zinc-900"
              }`}
              onClick={() => onSelectPDF(pdf.name)}
            >
              <FileText size={20} className="text-zinc-400" />
              <div className="flex-1 min-w-0">
                <div className="text-sm text-zinc-200 truncate">{pdf.name}</div>
                <div className="text-xs text-zinc-500">
                  {pdf.pageCount} pages
                </div>
              </div>
              <ChevronRight size={16} className="text-zinc-500" />
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default PDFSidebar;
