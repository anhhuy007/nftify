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
import { useAuthHandler } from "@/handlers/AuthHandler";
import {
  userApiEndpoint,
  userSettingUploadApiEndpoint,
} from "@/handlers/Endpoints";
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
      const result = await fetchWithAuth(userApiEndpoint);
      const userData = result.data[0];
      console.log("User data:", userData);

      // Update state with user data
      setInitialUser({
        name: userData.name || "",
        shortBio: userData.description || "",
        background: userData.bgUrl,
        avatar: userData.avatarUrl || "",
        avatarUrl: userData.avatarUrl || "",
        backgroundUrl: userData.bgUrl || "",
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
    console.log("Initial user data:", initialUser);
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
    setIsLoading(true);
    try {
      const updates = {};

      const uploadTasks = [];

      if (isImgChanged.avatar && initialUser.avatar) {
        // Create a promise for uploading the avatar
        const avatarUploadTask = IpfsService.uploadAvatarImage(
          initialUser.avatar
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

      if (isImgChanged.background && initialUser.background) {
        // Create a promise for uploading the background image
        const bgUploadTask = IpfsService.uploadBackgroundImage(
          initialUser.background
        ).then((bgUpload) => {
          if (bgUpload) {
            toast.success("Background uploaded on Pinata successfully");
            updates.bgUrl = bgUpload.url; // Add the uploaded URL to updates
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

      if (response.success === true) {
        console.log("updates: ", updates);
        toast.success("User data uploaded successfully");
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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-11">
        {/* Avatar and background images */}
        <div className="w-full rounded-xl overflow-hidden">
          <div className="relative  w-full">
            <FileBackgroundUpload
              initialBackground={initialUser.backgroundUrl}
              onBackgroundChange={handleBackgroundChange}
            />

            <div className="-mt-28">
              <FileAvaUpload
                initialAvatar={initialUser.avatarUrl}
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
          <textarea
            placeholder="Enter token symbol"
            value={initialUser.name}
            onChange={handleNameChange}
            id="token"
            className={`w-full pl-5 py-2 border-0 text-lg text-primary-foreground rounded-xl bg-[hsl(232,40%,35%)] resize-none overflow-hidden`}
          />
        </div>
        {/* Short Bio */}
        <div className="space-y-4">
          <span className="text-primary-foreground text-3xl font-bold">
            Short Bio
          </span>
          <textarea
            placeholder={`${initialUser.name}'s bio`}
            id="description"
            onChange={(e) => {
              handleShortBioChange(e);
              e.target.style.height = "inherit";
              e.target.style.height = `${e.target.scrollHeight}px`;
            }}
            value={initialUser.shortBio}
            className={`w-full pl-5 py-2 border-0 text-lg text-primary-foreground rounded-xl bg-[hsl(232,40%,35%)] resize-none overflow-hidden`}
          />
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
