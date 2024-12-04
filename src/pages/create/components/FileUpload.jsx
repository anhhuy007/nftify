"use client";

import * as React from "react";
import { useCallback, useState } from "react";
import { cn } from "@/lib/utils";
import { Upload } from "lucide-react";

const FileUpload = ({
  maxSize = 20 * 1024 * 1024, // 20MB default
  accept = ["image/png", "image/jpeg", "image/webp"],
  onFileSelect,
  className,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState("");

  const validateFile = (file) => {
    if (!accept.includes(file.type)) {
      setError("Please upload a PNG, JPG or WEBP file");
      return false;
    }
    if (file.size > maxSize) {
      setError("File size must be less than 20MB");
      return false;
    }
    return true;
  };

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragging(true);
    } else if (e.type === "dragleave") {
      setIsDragging(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
      setError("");

      const file = e.dataTransfer.files?.[0];
      if (file && validateFile(file)) {
        onFileSelect?.(file);
      }
    },
    [onFileSelect]
  );

  const handleFileSelect = useCallback(
    (e) => {
      setError("");
      const file = e.target.files?.[0];
      if (file && validateFile(file)) {
        onFileSelect?.(file);
      }
    },
    [onFileSelect]
  );

  return (
    <div className="w-full space-y-4">
      <span className="text-primary-foreground text-3xl font-bold">
        Upload file <span className="text-destructive">*</span>
      </span>

      <div
        className={cn(
          "relative border-2 border-dashed rounded-lg p-8",
          "flex flex-col items-center justify-center gap-4",
          "bg-background/50 hover:bg-background/80 transition-colors",
          isDragging && "border-primary bg-primary/10",
          error && "border-destructive",
          className
        )}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
      >
        <div className="text-center flex flex-col gap-5 ">
          <Upload className="w-10 h-10 mx-auto text-muted-foreground" />
          <span className="text-2xl text-muted-foreground">
            PNG, JPG or WEBP. Max 20mb.
          </span>
        </div>

        <label className="text-3xl bg-card items-center justify-center rounded-md px-6 py-4 font-medium text-primary-foreground shadow hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 cursor-pointer">
          Choose File
          <input
            type="file"
            className="sr-only"
            accept={accept.join(",")}
            onChange={handleFileSelect}
          />
        </label>

        {error && (
          <div className="text-sm text-destructive absolute -bottom-6">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
