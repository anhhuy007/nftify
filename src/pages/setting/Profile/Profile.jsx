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
  userApiEndpoint,
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
      const userData = result[0];

      console.log("User data: ", userData);

      // Update state with user data
      setInitialUser({
        name: userData.name || "",
        shortBio: userData.description || "",
        background: userData.userThumbnail || "https://w0.peakpx.com/wallpaper/743/574/HD-wallpaper-monkey-nft-nft-monkey-crypto-artist-artwork-digital-art-others-artstation.jpg",
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
    setIsImgChanged({ ...isImgChanged, background: true });
  };

  const handleAvatarChange = (file) => {
    setInitialUser({ ...initialUser, avatar: file });
    setIsImgChanged({ ...isImgChanged, avatar: true });
  };

  const saveChanges = async () => {
    console.log("Initial user:", initialUser);

    if (!isAuth) {
      toast.error("Please login before changing details");
      return;
    }
    // try {
    //   if (isImgChanged.avatar) {
    //     if (!initialUser.avatar) {
    //       throw new Error("Avatar is missing");
    //     }

    //     const avatarUpload = await IpfsService.uploadAvatarImage(
    //       initialUser.avatar,
    //       setIsLoading
    //     );
    //     setInitialUser({ ...initialUser, avatar: avatarUpload.url });
    //     console.log("Avatar upload:", avatarUpload);
    //     toast.success("Avatar image uploaded successfully");
    //   }

    //   if (isImgChanged.background) {
    //     if (!initialUser.background) {
    //       throw new Error("Background image is missing");
    //     }

    //     const bgUpload = await IpfsService.uploadBackgroundImage(
    //       initialUser.background,
    //       setIsLoading
    //     );
    //     console.log("Background upload:", bgUpload);
    //     setInitialUser({ ...initialUser, background: bgUpload.url });
    //     toast.success("Background image uploaded successfully");
    //   }
    // } catch (error) {
    //   console.error("Error uploading image:", error);
    //   toast.error(`An error occurred while uploading image: ${error.message}`);
    //   return;
    // }

    console.log(
      "body",
      JSON.stringify({
        name: initialUser.name,
        description: initialUser.shortBio,
        userThumbnail: initialUser.background,
        avatarUrl: initialUser.avatar,
      })
    );

    try {
      const response = await fetchWithAuth(userSettingUploadApiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: initialUser.name,
          description: initialUser.shortBio,
          userThumbnail: initialUser.background,
          avatarUrl: initialUser.avatar,
        }),
      });

      if (response.status === "success") {
        toast.success("User data uploaded successfully");
      } else {
        toast.error(
          "An error occurred while uploading data. Please try again later."
        );
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
