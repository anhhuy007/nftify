"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { PasswordInput } from "@/components/ui/password-input";
import { useAuthHandler } from "@/api/AuthHandler";
import { userChangePasswordApiEndpoint } from "@/api/Endpoints";
import { useNavigate, useLocation } from "react-router-dom";
import menuItems from "@/links"; // Import menuItems

function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const { fetchWithAuth } = useAuthHandler();
  const navigate = useNavigate();
  const location = useLocation();

  const handlePasswordChange = async (event) => {
    event.preventDefault();

    // Get the token from the URL query parameters
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get("token");

    // Check if both current and new password are entered
    if (!newPassword) {
      toast.error("Please enter your new password.");
      return;
    }

    // If a token is present, it's a password reset
    if (token) {
      try {
        // Use the token for password reset
        const updateResponse = await fetchWithAuth(
          userChangePasswordApiEndpoint,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              token: token,
              password: newPassword,
            }),
          }
        );

        if (!updateResponse.status === "success") {
          toast.error("Failed to reset password. Please try again.");
          return;
        }

        // Success - Password reset
        toast.success("Password has been successfully reset!");

        // Find the link for the Password Reset Success page
        const successPage = menuItems.find(
          (item) => item.name === "Password Reset Success"
        );

        // Navigate to the success page
        navigate(successPage.link);
      } catch (error) {
        console.error("Error resetting password:", error);
        toast.error("An error occurred. Please try again.");
      }
    } else {
      // If no token, it's a regular password change
      // Check if the current password is correct
      try {
        // If password is correct, proceed to update the password
        const updateResponse = await fetchWithAuth(
          userChangePasswordApiEndpoint,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              currentPassword: currentPassword,
              password: newPassword,
            }),
          }
        );

        if (!updateResponse.status === "success") {
          toast.error("Failed to update password. Please try again.");
          return;
        }

        // Success - Password changed
        toast.success("Password has been successfully changed!");
        // Clear password fields
        setCurrentPassword("");
        setNewPassword("");
      } catch (error) {
        console.error("Error checking or updating password:", error);
        toast.error("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="flex flex-col gap-10">
      <span className="text-primary-foreground text-3xl font-bold">
        Change password
      </span>
      <form onSubmit={handlePasswordChange} className="space-y-4">
        {!location.search.includes("token") && (
          <div className="grid grid-cols-[82%]">
            <PasswordInput
              placeholder="Enter your current password"
              id="current-password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="pl-5 py-8 border-0 text-4xl text-primary-foreground rounded-xl bg-[hsl(232,40%,35%)]"
            />
          </div>
        )}
        <div className="grid grid-cols-[82%_3%_15%]">
          <PasswordInput
            placeholder="Enter your new password"
            id="new-password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="pl-5 border-0 py-8 text-4xl text-primary-foreground rounded-xl bg-[hsl(232,40%,35%)]"
          />
          <div></div>
          <Button
            type="submit"
            size="xl"
            className="text-primary-foreground text-xl p-8 bg-[hsl(232,40%,35%)]"
          >
            Confirm
          </Button>
        </div>
      </form>
    </div>
  );
}

export default ChangePassword;