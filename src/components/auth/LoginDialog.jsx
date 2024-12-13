import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Logo from "../../assets/logo.svg";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthProvider";
import { useState } from "react";
import toast from "react-hot-toast";
import { PasswordInput } from "@/components/ui/password-input";

export default function LoginDialog({ children }) {
  const { loginAction, isAuth } = useAuth();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = await loginAction({ username, password });

    if (result.error) {
      toast.error(result.error);
      return;
    }

    toast.success("Login successful");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[500px] p-10 text-primary-foreground">
        {
          // Show success message if login is successful
          isAuth ? (
            <>
              <DialogHeader>
                <DialogTitle>
                  <div className="flex flex-col items-center justify-center gap-5 my-4 text-primary-foreground">
                    <span className="text-3xl font-bold">
                      You are alomost there!
                    </span>
                    <span className="text-lg text-muted-foreground text-center">
                      Choose a display name and enter your email address to
                      receive updates when your NFTs sell or receive offers.
                    </span>
                  </div>
                </DialogTitle>
                <DialogDescription></DialogDescription>
              </DialogHeader>
              <form className="space-y-6" onSubmit={handleSignUp}>
                <div className="space-y-2">
                  <Label htmlFor="displayName" className="text-xl">
                    Display Name
                  </Label>
                  <Input
                    id="displayName"
                    placeholder="Enter your display name"
                    required
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="w-full h-14"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-xl">
                    Email
                  </Label>
                  <Input
                    id="email"
                    placeholder="Enter your email"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-14"
                  />
                </div>
                <div className="space-x-2 flex  gap-2 items-center">
                  <Input
                    id="accept"
                    type="checkbox"
                    required
                    onChange={(e) => setIsAccepted(e.target.checked)}
                    className="w-12 h-12"
                  />
                  <Label htmlFor="accept" className="text-lg">
                    I have read and accept the Terms of Service and the Terms of
                    Creator.
                  </Label>
                </div>
                <Button
                  type="submit"
                  className="w-full h-14 bg-blue-400"
                  onClick={handleSignUp}
                >
                  Finish Sign Up
                </Button>
              </form>
              <Button
                className="w-full h-14 bg-background border-2"
                onClick={() => setIsLogin(false)}
              >
                Disconnect
              </Button>
            </>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle>
                  <div className="flex flex-col items-center justify-center gap-5 my-4 text-primary-foreground">
                    <img src={Logo} alt="Logo" className="h-10" />
                    <span className="text-3xl font-bold">
                      Connect to NFTify
                    </span>
                    <Button className="  h-16  bg-card">
                      <div className="flex items-center justify-center gap-5 p-5">
                        <img
                          src={"/Metamask.svg"}
                          alt="Logo"
                          className="w-8 h-8"
                        />
                        <span className="text-2xl">Metamask</span>
                      </div>
                    </Button>
                  </div>
                </DialogTitle>
                <DialogDescription></DialogDescription>
              </DialogHeader>
              <div class="flex items-center justify-center">
                <div class="flex-1 border-t border-gray-500"></div>
                <span class="px-4 text-gray-500 text-xl">OR</span>
                <div class="flex-1 border-t border-gray-500"></div>
              </div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-xl">
                    Username or Email
                  </Label>
                  <Input
                    id="username"
                    placeholder="Enter your username or email"
                    required
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full h-14"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-xl">
                    Password
                  </Label>
                  <PasswordInput
                    id="password"
                    value={password}
                    placeholder="Enter your password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-14"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full h-14 bg-blue-400"
                  onClick={handleSubmit}
                >
                  Login
                </Button>
              </form>
              <div className="flex flex-col items-center justify-center text-sm">
                <span className="text-muted-foreground">
                  Don't have an account?{" "}
                </span>
                <Link to="/auth/sign-up" className="hover:underline">
                  Register here
                </Link>
              </div>
            </>
          )
        }
      </DialogContent>
    </Dialog>
  );
}
