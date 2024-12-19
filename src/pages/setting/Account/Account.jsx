"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { PasswordInput } from "@/components/ui/password-input";
import { useAuth } from "@/context/AuthProvider";
import { useAuthHandler } from "@/api/AuthHandler";
import {
  userApiEndpoint,
  userSettingApiEndpoint,
  userCheckPasswordApiEndpoint,
  userChangePasswordApiEndpoint,
  userSettingUploadApiEndpoint,
  userChangeEmailApiEndpoint,
} from "@/api/Endpoints";
import { useNavigate } from "react-router-dom";

function Account() {
  const { isAuth } = useAuth();
  if (!isAuth) {
    const navigate = useNavigate();

    toast("Please login to see your account settings");
    navigate("/");
    return;
  }

  const [user, setUser] = useState({
    currentPassword: "",
    newPassword: "",
    email: "",
    name: "",
    username: "",
    address: "",
  });

  const { fetchWithAuth } = useAuthHandler();

  useEffect(() => {
    if (!isAuth) {
      toast("Please login to create NFTs");
      return;
    }
    fetchData();
  }, []);

  const fetchData = async () => {
    // Fetch user data
    try {
      const result = await fetchWithAuth(userApiEndpoint);
      const userData = result.data[0];

      console.log("User data: ", userData);

      setUser({
        ...user,
        name: userData.name || "",
        username: userData.username || "",
        address: userData.userId || "",
        email: userData.email || "",
      });
    } catch (error) {
      console.error("Failed to fetch user data:", error);
      toast.error("Failed to fetch user data. Please try again.");
    }
  };

  const [isConnected, setIsConnected] = useState(true);

  const handlePasswordChange = async () => {
    // Check if both current and new password are entered
    if (!user.currentPassword || !user.newPassword) {
      toast.error("Please enter both the current and new password.");
      return;
    }

    // Check if the current password is correct
    try {
      const response = await fetchWithAuth(userCheckPasswordApiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: user.currentPassword,
        }),
      });

      console.log(response);

      if (response.status === "fail") {
        toast.error("Incorrect password. Please try again.");
        return;
      }

      // If password is correct, proceed to update the password
      const updateResponse = await fetchWithAuth(
        userChangePasswordApiEndpoint,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            password: user.newPassword,
          }),
        }
      );

      console.log(updateResponse);

      if (!updateResponse.status === "success") {
        toast.error("Failed to update password. Please try again.");
        return;
      } else {
        // Success - Password changed
        toast.success("Password has been successfully changed!");

        // Clear password fields
        setUser({ ...user, currentPassword: "", newPassword: "" });
      }
    } catch (error) {
      console.error("Error checking or updating password:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  const handleWalletChange = () => {
    setIsConnected(!isConnected);
    toast.success(isConnected ? "Wallet disconnected" : "Wallet connected");
  };

  const handleDeleteAccount = () => {
    toast.success("Account has been successfully deleted!");
  };

  return (
    <>
      <div className="flex flex-col gap-10">
        <span className="text-primary-foreground text-3xl font-bold">
          Account management
        </span>

        {/* Name */}
        <div className="flex flex-col gap-2">
          <span className="text-primary-foreground font-semibold text-xl">
            Your username
          </span>
          <span className="text-primary-foreground/50">
            This is your username for signing in
          </span>
          <Input
            value={user.username}
            id="username"
            disabled
            className="pl-5 border-0 py-8 text-4xl text-primary-foreground rounded-xl bg-[hsl(232,40%,35%)]"
          />
        </div>

        {/* Email */}
        <div className="flex flex-col gap-2">
          <span className="text-primary-foreground font-semibold text-xl">
            Your Email
          </span>
          <span className="text-primary-foreground/50">
            Your email for marketplace notifications
          </span>
          <Input
            value={user.email}
            id="email"
            disabled
            className="pl-5 border-0 py-8 text-4xl text-primary-foreground rounded-xl bg-[hsl(232,40%,35%)]"
          />
        </div>

        {/* Change password */}
        <div className="flex flex-col gap-2">
          <span className="text-primary-foreground font-semibold text-xl">
            Change password
          </span>
          <div className="grid grid-cols-[82%]">
            <PasswordInput
              placeholder="Enter your current password"
              id="current-password"
              value={user.currentPassword}
              onChange={(e) =>
                setUser({ ...user, currentPassword: e.target.value })
              }
              className="pl-5 py-8 border-0 text-4xl text-primary-foreground rounded-xl bg-[hsl(232,40%,35%)]"
            />
          </div>
          <div className="grid grid-cols-[82%_3%_15%]">
            <PasswordInput
              placeholder="Enter your new password"
              id="new-password"
              value={user.newPassword}
              onChange={(e) =>
                setUser({ ...user, newPassword: e.target.value })
              }
              className="pl-5 border-0 py-8 text-4xl text-primary-foreground rounded-xl bg-[hsl(232,40%,35%)]"
            />

            <div></div>
            <Button
              size="xl"
              className="text-primary-foreground text-xl p-8 bg-[hsl(232,40%,35%)]"
              onClick={handlePasswordChange}
            >
              Confirm
            </Button>
          </div>
        </div>

        {/* Wallet */}
        <div className="flex flex-col gap-2">
          <span className="text-primary-foreground font-semibold text-xl">
            Wallet
          </span>
          <div className="bg-card w-fit p-5 rounded-xl border-2">
            <div className="flex items-center flex-col md:flex-row justify-between gap-32">
              <div className="flex gap-10 items-center">
                <img
                  src="/EthereumIcon.svg"
                  alt="Ethereum Icon"
                  className="w-14 h-14"
                />
                <div className="flex flex-col">
                  <span className="text-primary-foreground text-xl font-bold">
                    {user.address}
                  </span>
                  <span className="text-muted-foreground text-xl font-bold">
                    Ethereum
                  </span>
                </div>
              </div>
              <div>
                {isConnected ? (
                  <div className="bg-green-500 text-white px-4 py-2 rounded ">
                    Connected
                  </div>
                ) : (
                  <div className="bg-red-500 text-white px-4 py-2 rounded ">
                    Not Connected
                  </div>
                )}
              </div>
            </div>
          </div>
          <Button
            size="xl"
            className="text-primary-foreground text-xl w-fit p-8 bg-[hsl(232,40%,35%)]"
            onClick={handlePasswordChange}
          >
            Change Wallet
          </Button>
        </div>

        {/* Delete account */}
        <div className="flex flex-col gap-2">
          <span className="text-primary-foreground font-semibold text-xl">
            Danger zone
          </span>
          <span className="text-primary-foreground/50">
            Once you delete your account, there is no going back. Please be
            certain.
          </span>
          <Button
            size="xl"
            variant="destructive"
            className="p-8 w-fit text-xl"
            onClick={handleDeleteAccount}
          >
            Delete account
          </Button>
        </div>
      </div>
    </>
  );
}

export default Account;
