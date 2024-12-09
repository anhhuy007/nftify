"use client";

import * as React from "react";
import { useCallback, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { X, Image, Upload } from "lucide-react";

const FileUpload = ({ onFileSelect }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  const accept = ["image/png", "image/jpeg", "image/webp"];
  const maxSize = 20 * 1024 * 1024; // 20MB

  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setFile(URL.createObjectURL(uploadedFile));
      onFileSelect(URL.createObjectURL(uploadedFile));
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    onFileSelect(null);
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const uploadedFile = e.dataTransfer.files[0];
    if (
      uploadedFile &&
      accept.includes(uploadedFile.type) &&
      uploadedFile.size <= maxSize
    ) {
      setFile(URL.createObjectURL(uploadedFile));
      onFileSelect(URL.createObjectURL(uploadedFile));
    } else {
      alert("Invalid file type or size exceeds 20MB");
    }
  };
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
          isDragging && "bg-accent/30 border-accent"
        )}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {file ? (
          <>
            <img
              src={file}
              alt="Preview"
              className="object-contain max-w-[30vw] max-h-[50vh]"
            />
            <Button
              onClick={handleRemoveFile}
              className="absolute top-5 right-5"
              variant="outline"
              size="icon"
            >
              <X className="w-5 h-5 text-primary-foreground hover:text-black" />
            </Button>
          </>
        ) : isDragging ? (
          <span className="text-3xl text-primary-foreground min-h-[20vh] flex items-center justify-center">
            Drop file here
          </span>
        ) : (
          <>
            <div className="text-center flex flex-col gap-5 ">
              <Upload className="w-10 h-10 mx-auto text-muted-foreground" />
              <span className="text-3xl text-primary-foreground">
                Drag and drop or click to upload
              </span>
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
                onChange={handleFileUpload}
              />
            </label>
          </>
        )}
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

export const FileLogoUpload = ({ onFileSelect }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");

  const maxSize = 20 * 1024 * 1024; // 20MB default
  const accept = ["image/png", "image/jpeg", "image/webp"];

  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setFile(URL.createObjectURL(uploadedFile));
      onFileSelect(URL.createObjectURL(uploadedFile));
    }
  };
  const handleRemoveFile = () => {
    setFile(null);
    onFileSelect(null);
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const uploadedFile = e.dataTransfer.files[0];
    if (
      uploadedFile &&
      accept.includes(uploadedFile.type) &&
      uploadedFile.size <= maxSize
    ) {
      setFile(URL.createObjectURL(uploadedFile));
      onFileSelect(URL.createObjectURL(uploadedFile));
    } else {
      alert("Invalid file type or size exceeds 20MB");
    }
  };

  return (
    <>
      <div className="w-full space-y-4">
        <span className="text-primary-foreground text-3xl font-bold">
          Logo Image <span className="text-destructive">*</span>
        </span>

        <div
          className={cn(
            "relative border-2 rounded-lg p-10",
            "flex items-center gap-10",
            "bg-background/50 hover:bg-background/80 transition-colors",
            isDragging && "border-prim  ary bg-primary/10"
          )}
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {file ? (
            <>
              <img
                src={file}
                alt="Preview"
                className="object-fit"
                style={{ width: "150px", height: "150px" }}
              />
            </>
          ) : isDragging ? (
            <>
              <label className="border-2 text-3xl items-center justify-center rounded-md px-6 py-4 font-medium text-primary-foreground shadow hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 cursor-pointer">
                <Upload className="w-10 h-10 m-10 text-primary-foreground" />{" "}
                <input
                  type="file"
                  className="sr-only"
                  accept={accept.join(",")}
                  onChange={handleFileUpload}
                />
              </label>
            </>
          ) : (
            <label className="border-2 text-3xl items-center justify-center rounded-md px-6 py-4 font-medium text-primary-foreground shadow hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 cursor-pointer">
              <Image className="w-10 h-10 m-10 text-primary-foreground" />
              <input
                type="file"
                className="sr-only"
                accept={accept.join(",")}
                onChange={handleFileUpload}
              />
            </label>
          )}

          <div className="flex flex-col gap-5 ">
            <span className="text-3xl text-primary-foreground">
              Drag and drop or click to upload
            </span>
            <span className="text-2xl text-muted-foreground">
              Recommended size: 350 x 350. File types: JPG, PNG, SVG, or GIF
            </span>
          </div>

          {error && (
            <div className="text-sm text-destructive absolute -bottom-6">
              {error}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
