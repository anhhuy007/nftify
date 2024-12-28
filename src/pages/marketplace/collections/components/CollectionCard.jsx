"use client";

import { useState } from "react";
import { Heart, Pen } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuthHandler } from "@/handlers/AuthHandler";
import { useAuth } from "@/context/AuthProvider";
import { USER_ENDPOINTS } from "@/handlers/Endpoints";

export function DeleteCollectionDialog({ collectionId, children: child }) {
  const navigate = useNavigate();
  const { fetchWithAuth } = useAuthHandler();
  const { user } = useAuth();

  const deleteCollection = async (id) => {
    try {
      const result = await fetchWithAuth(
        USER_ENDPOINTS.DELETE_COLLECTION + `/${id}`,
        {
          method: "DELETE",
        }
      );

      if (result.success !== true) {
        throw new Error("Failed to delete collection");
      } else {
        toast.success("Collection deleted successfully");
        navigate(`/user/${user._id}/collections`);
      }
    } catch (error) {
      console.error("Failed to delete collection:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{child}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px] text-primary-foreground">
        <DialogHeader>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this collection? This action cannot
            be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              variant="destructive"
              type="button"
              onClick={() => deleteCollection(collectionId)}
            >
              Delete
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default function CollectionCard({ collection }) {
  const [isLiked, setIsLiked] = useState(false);

  console.log("Collection: ", collection);

  // Extract values with fallback defaults
  const {
    _id = "unknown",
    thumbUrl = "",
    name = "Unknown Collection",
    ownerDetails = {},
  } = collection;

  const { avatarUrl = "", name: ownerName = "Unknown Owner" } = ownerDetails;

  return (
    <Link to={`/collection/${_id}`}>
      <Card className="group relative overflow-hidden rounded-3xl border-0 w-full max-w-[450px]">
        {/* Collection Image */}
        <div className="overflow-hidden bg-[#C5C6FF]">
          <img
            src={thumbUrl}
            alt={name}
            className="h-[300px] w-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
        </div>

        {/* Like Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-3 top-3 h-8 w-8 rounded-full bg-black/20 backdrop-blur-sm transition-colors hover:bg-black/40"
          onClick={() => setIsLiked(!isLiked)}
        >
          <Heart
            className={`h-5 w-5 ${
              isLiked ? "fill-white text-white" : "text-white"
            }`}
          />
        </Button>

        {/* User Info */}
        <div className="absolute bottom-0 left-0 right-0 flex items-center gap-3 bg-gradient-to-t from-black/60 to-transparent p-4">
          <Avatar className="h-10 w-10 rounded-lg border-2 border-white">
            <AvatarImage src={avatarUrl} alt={ownerName} />
            <AvatarFallback className="rounded-lg bg-blue-500">
              {ownerName.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <span className="font-semibold text-white">{name}</span>
        </div>
      </Card>
    </Link>
  );
}

export function EditCollectionCard({ collection }) {
  const [isEditing, setIsEditing] = useState(false);

  console.log("Collection: ", collection);

  // Extract values with fallback defaults
  const {
    _id = "unknown",
    thumbUrl = "",
    name = "Unknown Collection",
    ownerDetails = {},
  } = collection;

  const { avatarUrl = "", name: ownerName = "Unknown Owner" } = ownerDetails;

  return (
    <div className="relative w-full max-w-[450px]">
      {/* Link wrapper for collection details */}
      <Link to={`/collection/${_id}`}>
        <Card
          className={`group relative overflow-hidden rounded-3xl border-0 ${
            isEditing ? "blur-sm" : ""
          }`}
        >
          {/* Collection Image */}
          <div className="overflow-hidden bg-[#C5C6FF]">
            <img
              src={thumbUrl}
              alt={name}
              className="h-[300px] w-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
          </div>

          {/* User Info */}
          <div className="absolute bottom-0 left-0 right-0 flex items-center gap-3 bg-gradient-to-t from-black/60 to-transparent p-4">
            <Avatar className="h-10 w-10 rounded-lg border-2 border-white">
              <AvatarImage src={avatarUrl} alt={ownerName} />
              <AvatarFallback className="rounded-lg bg-blue-500">
                {ownerName.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <span className="font-semibold text-white">{name}</span>
          </div>
        </Card>
      </Link>

      {/* Edit/Delete Buttons */}
      {isEditing && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-black/60">
          <Link to={`/edit/collection/${_id}`}>
            <Button className=" font-semibold text-base px-5 py-3 mt-3 rounded-md transition-colors duration-200 ">
              Edit <Pencil className="h-10 w-10" />
            </Button>
          </Link>
          <DeleteCollectionDialog collectionId={_id}>
            <Button className="hover:bg-gray-200 text-base  bg-destructive font-semibold px-5 py-3 rounded-md transition-colors duration-200 ">
              Delete <Trash2 className="h-10 w-10" />
            </Button>
          </DeleteCollectionDialog>
        </div>
      )}

      {/* Toggle Edit Mode */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-3 top-3 h-8 w-8 rounded-full bg-black/20 backdrop-blur-sm transition-colors hover:bg-black/40 z-20"
        onClick={() => setIsEditing(!isEditing)}
      >
        <Pencil className="h-5 w-5 text-white" />
      </Button>
    </div>
  );
}
