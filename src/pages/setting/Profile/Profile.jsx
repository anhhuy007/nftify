import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import {
  FileAvaUpload,
  FileBackgroundUpload,
} from "@/pages/create/components/FileUpload";
import { useAuth } from "@/context/AuthProvider";
import { useAuthHandler } from "@/api/AuthHandler";
import { userSettingApiEndpoint } from "@/utils/endpoints";
import toast from "react-hot-toast";
import { redirect } from "react-router-dom";

// Pinata SDK

function Profile() {
  const { isAuth } = useAuth();
  if (!isAuth) {
    toast.error("Please login to create NFTs");
    redirect("/");
    return;
  }
  const { fetchWithAuth } = useAuthHandler();

  const [initialUser, setInitialUser] = useState({
    name: "",
    shortBio: "",
    socialLink: "",
    background: "",
    avatar: "",
  });

  const fetchData = async () => {
    if (!isAuth) {
      toast("Please login to create NFTs");
      return;
    }

    try {
      const result = await fetchWithAuth(userSettingApiEndpoint);
      const userData = result[0];

      console.log("User data: ", userData);

      // Update state with user data
      setInitialUser({
        name: userData.name || "",
        shortBio: userData.description || "",
        background: userData.userThumbnail || "",
        avatar: userData.avatarUrl || "",
      });
    } catch (error) {
      console.error("Failed to fetch user data:", error);
      toast.error("Failed to fetch user data. Please try again.");
    }
  };

  useEffect(() => {
    if (!isAuth) {
      toast.error("Please login to create NFTs");
      return;
    }
    fetchData();
  }, []);

  const handleNameChange = (e) => {
    setInitialUser({ ...initialUser, name: e.target.value });
  };

  const handleShortBioChange = (e) => {
    setInitialUser({ ...initialUser, shortBio: e.target.value });
  };

  const handleBackgroundChange = (file) => {
    setInitialUser({ ...initialUser, background: file });
  };

  const handleAvatarChange = (file) => {
    setInitialUser({ ...initialUser, avatar: file });
  };

  const saveChanges = async () => {
    console.log(initialUser); // Log the initial user data before saving

    if (!isAuth) {
      toast.error("Please login before changing details");
      return;
    }

    try {
      const response = await fetch("/api/v1/user/setting/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authentication: `Bearer ${userToken}`,
        },
        body: JSON.stringify({
          name: initialUser.name,
          description: initialUser.shortBio,
          userThumbnail: initialUser.background,
          avatarUrl: initialUser.avatar,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Save successfully");
      } else {
        toast.error(data.message || "Failed to upload data");
      }
    } catch (error) {
      console.error("Error uploading user data:", error);
      toast.error("An error occurred while uploading data.");
    }
  };

  return (
    <>
      <div className="flex flex-col gap-11">
        {/* Avatar and background images */}
        <div className="w-full rounded-xl overflow-hidden">
          <div className="relative  w-full">
            <FileBackgroundUpload
              initialBackground={initialUser.background}
              onBackgroundChange={handleBackgroundChange}
            />

            <div className="-mt-14">
              <FileAvaUpload
                initialAvatar={initialUser.avatar}
                onAvatarChange={handleAvatarChange}
              />
            </div>
          </div>
        </div>
        {/* initialUser generational information */}
        {/* Display name */}
        <div className="flex flex-col gap-4">
          <span className="text-primary-foreground text-3xl font-bold">
            Display Name
          </span>
          <Input
            placeholder="Enter token symbol"
            value={initialUser.name}
            onChange={handleNameChange}
            id="token"
            className={`pl-5 border-0 py-8 text-4xl text-primary-foreground rounded-xl bg-[hsl(232,40%,35%)]`}
          />
        </div>
        {/* Short Bio */}
        <div className="space-y-4">
          <span className="text-primary-foreground  text-3xl font-bold">
            Short Bio
          </span>
          <Input
            placeholder={`${initialUser.name}'s bio`}
            id="description"
            onChange={handleShortBioChange}
            value={initialUser.shortBio}
            className={`pl-5 py-8 border-0 text-4xl text-primary-foreground rounded-xl bg-[hsl(232,40%,35%)]`}
          />
        </div>
        {/* Social Links */}
        <div className="flex flex-col">
          <span className="text-primary-foreground text-3xl font-bold">
            Social Links
          </span>
          <span className="text-primary-foreground/50  text-lg">
            Add your existing social links to build a stronger reputation
          </span>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button
              size="xl"
              className="text-black bg-primary-foreground w-fit text-xl p-8"
            >
              Save Changes
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle className="text-2xl text-primary-foreground">
              Save Changes
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to save the changes? This action cannot be
              undone.
            </DialogDescription>
            <DialogFooter>
              <DialogClose asChild>
                <Button
                  size=""
                  className=" w-fit text-xl "
                  onClick={saveChanges}
                >
                  Confirm
                </Button>
              </DialogClose>
              <DialogClose asChild>
                <Button
                  variant="outline"
                  className="w-fit text-primary-foreground text-xl "
                  onClick={saveChanges}
                >
                  Cancel
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}

export default Profile;
