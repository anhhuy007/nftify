import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import toast, { Toaster } from "react-hot-toast";

const initialData = {
  email: "example@domain.com",
  password: "password",
  isConnected: true,
  name: "John Doe",
  address: "0x1234567890aksnfsd ",
};

function Account() {
  const [email, setEmail] = useState(initialData.email);
  const [user, setUser] = useState({
    tempEmail: initialData.email || "",
    currentPassword: "",
    newPassword: "",
  });

  const [isConnected, setIsConnected] = useState(initialData.isConnected);

  const handleEmailChange = () => {
    const isValidEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    if (!isValidEmail(user.tempEmail.trim())) {
      toast.error("Please enter a valid email address.");
      return;
    }

    initialData.email = user.tempEmail;
    setEmail(user.tempEmail);
    toast.success("Email has been successfully changed!");
  };

  const handlePasswordChange = () => {
    if (!user.currentPassword || !user.newPassword) {
      toast.error("Please enter both the current and new password.");
      return;
    }
    if (user.currentPassword !== initialData.password) {
      toast.error("The current password is incorrect.");
      return;
    }
    initialData.password = user.newPassword;
    toast.success("Password has been successfully changed!");
    setUser({ ...user, currentPassword: "", newPassword: "" });
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
      <Toaster position="top-right" reverseOrder={true} />
      <div className="flex flex-col gap-10">
        <span className="text-primary-foreground text-3xl font-bold">
          Account management
        </span>

        {/* Email */}
        <div className="flex flex-col gap-2">
          <span className="text-primary-foreground font-semibold text-xl">
            Your Email
          </span>
          <span className="text-primary-foreground/50">
            Your email for marketplace notifications
          </span>
          <Input
            value={email}
            id="email"
            disabled
            className="pl-5 border-0 py-8 text-4xl text-primary-foreground rounded-xl bg-[hsl(232,40%,35%)]"
          />
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-primary-foreground font-semibold text-xl">
            Change Email
          </span>
          <div className="grid grid-cols-[82%_3%_15%]">
            <Input
              placeholder="Enter your new email"
              value={user.tempEmail}
              id="email"
              onChange={(e) => setUser({ ...user, tempEmail: e.target.value })}
              className="pl-5 border-0 py-8 text-4xl text-primary-foreground rounded-xl bg-[hsl(232,40%,35%)]"
            />
            <div></div>
            <Button
              size="xl"
              className="text-primary-foreground text-xl p-8 bg-[hsl(232,40%,35%)]"
              onClick={handleEmailChange}
            >
              Confirm
            </Button>
          </div>
        </div>

        {/* Change password */}
        <div className="flex flex-col gap-2">
          <span className="text-primary-foreground font-semibold text-xl">
            Change password
          </span>
          <div className="grid grid-cols-[82%]">
            <Input
              placeholder="Enter your new password"
              type="password"
              id="new-password"
              value={user.newPassword}
              onChange={(e) =>
                setUser({ ...user, newPassword: e.target.value })
              }
              className="pl-5 border-0 py-8 text-4xl text-primary-foreground rounded-xl bg-[hsl(232,40%,35%)]"
            />
          </div>
          <div className="grid grid-cols-[82%_3%_15%]">
            <Input
              placeholder="Enter your current password"
              id="current-password"
              type="password"
              value={user.currentPassword}
              onChange={(e) =>
                setUser({ ...user, currentPassword: e.target.value })
              }
              className="pl-5 py-8 border-0 text-4xl text-primary-foreground rounded-xl bg-[hsl(232,40%,35%)]"
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
                    {initialData.address}
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
