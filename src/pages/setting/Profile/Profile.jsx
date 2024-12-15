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
import {
  userSettingApiEndpoint,
  userSettingUploadApiEndpoint,
} from "@/api/Endpoints";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

// Pinata SDK
import IpfsService from "@/services/IpfsService";
import LoadingAnimation from "@/components/ui/loading";

function Profile() {
  const { isAuth } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  if (!isAuth) {
    const navigate = useNavigate();
    toast.error("Please login to create NFTs");
    navigate("/");
    return;
  }
  const { fetchWithAuth } = useAuthHandler();

  const [initialUser, setInitialUser] = useState({
    name: "",
    shortBio: "",
    background: "",
    avatar: "",
    avatarUrl: "",
    backgroundUrl: "",
  });
  const [isImgChanged, setIsImgChanged] = useState({
    background: false,
    avatar: false,
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
        background: userData.userThumnail || "",
        avatar: userData.avatarUrl || "",
        avatarUrl: userData.avatarUrl || "",
        backgroundUrl: userData.userThumbnail || "",
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

  useEffect(() => {
    console.log("Initial user data: ", initialUser);
  }, [initialUser]);

  const handleNameChange = (e) => {
    setInitialUser((prev) => ({ ...prev, name: e.target.value }));
  };

  const handleShortBioChange = (e) => {
    setInitialUser((prev) => ({ ...prev, shortBio: e.target.value }));
  };

  const handleBackgroundChange = (file) => {
    setInitialUser((prev) => ({ ...prev, background: file }));
    setIsImgChanged((prev) => ({ ...prev, background: true }));
  };

  const handleAvatarChange = (file) => {
    setInitialUser((prev) => ({ ...prev, avatar: file }));
    setIsImgChanged((prev) => ({ ...prev, avatar: true }));
  };

  const saveChanges = async () => {
    if (!isAuth) {
      toast.error("Please login before changing details");
      return;
    }

    try {
      const updates = {};

      const uploadTasks = [];

      if (isImgChanged.avatar) {
        if (!initialUser.avatar) {
          throw new Error("Avatar is missing");
        }

        // Create a promise for uploading the avatar
        const avatarUploadTask = IpfsService.uploadAvatarImage(
          initialUser.avatar,
          setIsLoading
        ).then((avatarUpload) => {
          if (avatarUpload) {
            toast.success("Avatar uploaded on Pinata successfully");
            updates.avatarUrl = avatarUpload.url; // Add the uploaded URL to updates
          } else {
            throw new Error("Failed to upload avatar");
          }
        });

        uploadTasks.push(avatarUploadTask); // Add the promise to the array
      }

      if (isImgChanged.background) {
        if (!initialUser.background) {
          throw new Error("Background image is missing");
        }

        // Create a promise for uploading the background image
        const bgUploadTask = IpfsService.uploadBackgroundImage(
          initialUser.background,
          setIsLoading
        ).then((bgUpload) => {
          if (bgUpload) {
            toast.success("Background uploaded on Pinata successfully");
            updates.backgroundUrl = bgUpload.url; // Add the uploaded URL to updates
          } else {
            throw new Error("Failed to upload background image");
          }
        });

        uploadTasks.push(bgUploadTask); // Add the promise to the array
      }

      // Wait for all upload tasks to complete
      await Promise.all(uploadTasks);

      // Add additional fields (e.g., name and description) to the updates object
      updates.name = initialUser.name;
      updates.description = initialUser.shortBio;

      // Send all updated data to the backend
      const response = await fetchWithAuth(userSettingUploadApiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updates),
      });

      if (response.status === "success") {
        toast.success("User data uploaded successfully");
        // Update the local state with the new data
        setInitialUser((prev) => ({ ...prev, ...updates }));
      } else {
        throw new Error(
          "An error occurred while uploading data. Please try again later."
        );
      }
    } catch (error) {
      // Handle and display any errors that occur during the process
      console.error("Error uploading image:", error);
      toast.error(`An error occurred: ${error.message}`);
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

            <div className="-mt-28">
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
              disabled={isLoading}
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

        {isLoading && <LoadingAnimation />}
        {isLoading && (
          <>
            <h1 className="text-3xl text-primary-foreground">Uploading...</h1>
          </>
        )}
      </div>
    </>
  );
}

export default Profile;
