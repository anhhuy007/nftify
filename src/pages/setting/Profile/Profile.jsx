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

const data = {
  background:
    "https://asset.gecdesigns.com/img/wallpapers/fantasy-forest-wallpaper-inspired-by-avatar-pandora-planet-with-dark-mountains-and-glowing-creatures-background-sr03072407-cover.webp",
  avatar: "https://avatars.githubusercontent.com/u/67442564",
  name: "John Doe",
  shortBio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  socialLink: [
    { name: "Twitter", link: "https://twitter.com" },
    { name: "Facebook", link: "https://facebook.com" },
    { name: "Instagram", link: "https://instagram.com" },
  ],
};

function Profile() {
  const [user, setUser] = useState({
    name: data?.name || "",
    shortBio: data?.shortBio || "",
    socialLink: data?.socialLink || "",
    background: data?.background || "",
    avatar: data?.avatar || "",
  });

  const handleNameChange = (e) => {
    setUser({ ...user, name: e.target.value });
  };

  const handleShortBioChange = (e) => {
    setUser({ ...user, shortBio: e.target.value });
  };

  const handleBackgroundChange = (file) => {
    setUser({ ...user, background: file });
  };

  const handleAvatarChange = (file) => {
    setUser({ ...user, avatar: file });
  };

  const saveChanges = () => {
    // Save user data to the database
    console.log(user);
  };

  return (
    <>
      <div className="flex flex-col gap-11">
        {/* Avatar and background images */}
        <div className="w-full rounded-xl overflow-hidden">
          <div className="relative  w-full">
            <FileBackgroundUpload
              initialBackground={user.background}
              onBackgroundChange={handleBackgroundChange}
            />

            <div className="-mt-14">
              <FileAvaUpload
                initialAvatar={user.avatar}
                onAvatarChange={handleAvatarChange}
              />
            </div>
          </div>
        </div>
        {/* User generational information */}
        {/* Display name */}
        <div className="flex flex-col gap-4">
          <span className="text-primary-foreground text-3xl font-bold">
            Display Name
          </span>
          <Input
            placeholder="Enter token symbol"
            value={user.name}
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
            placeholder={`${user.name}'s bio`}
            id="description"
            onChange={handleShortBioChange}
            value={user.shortBio}
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
        <div className="flex flex-col gap-4">
          <span className="text-primary-foreground text-3xl font-bold">
            Website URL
          </span>
          <Input
            placeholder="http://example.com"
            id="url"
            className={`pl-5 border-0 py-8 text-4xl text-primary-foreground rounded-xl bg-[hsl(232,40%,35%)]`}
          />
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
