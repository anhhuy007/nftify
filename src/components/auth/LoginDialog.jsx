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
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { PasswordInput } from "@/components/ui/password-input";
import CreateAccountDialog from "@/components/auth/CreateAccountDialog";
import RecoverPasswordDialog from "./RecoverPassworDialog";

export default function LoginDialog({ children }) {
  const { loginAction, isAuth, logoutAction } = useAuth();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isCreateAccountDialogOpen, setIsCreateAccountDialogOpen] = useState(false);
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false); 
  const [isRecoverPasswordDialogOpen, setIsRecoverPasswordDialogOpen] = useState(false);

  // State for newly connected users
  const [isFirstTimeConnect, setIsFirstTimeConnect] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [isAccepted, setIsAccepted] = useState(false);

  // Function to check if the user has connected for the first time
  const checkFirstTimeConnect = async () => {
    // Replace this with your actual logic to determine if it's the first-time connection
    // For example, you might check if the user has a profile or some other data
    // associated with their account in your database or storage.
    const isFirstConnect = localStorage.getItem("isFirstTimeConnect");
    if (isFirstConnect === "true") {
      setIsFirstTimeConnect(true);
    } else {
      setIsFirstTimeConnect(false);
    }
  };

  useEffect(() => {
    checkFirstTimeConnect();
  }, [isAuth]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = await loginAction({ username, password });

    if (result.error) {
      toast.error(result.error);
      return;
    }

    toast.success("Login successful");
  };

  const openCreateAccount = () => {
    setIsLoginDialogOpen(false);
    setIsCreateAccountDialogOpen(true);
  };

  const closeCreateAccount = () => {
    setIsCreateAccountDialogOpen(false);
    setIsLoginDialogOpen(true);
  };

  const openRecoverPassword = () => {
    setIsLoginDialogOpen(false);
    setIsRecoverPasswordDialogOpen(true);
  };

  const closeRecoverPassword = () => {
    setIsRecoverPasswordDialogOpen(false);
    setIsLoginDialogOpen(true);
  }

  const handleSignUp = (event) => {
    event.preventDefault();
    // Your sign-up logic here (e.g., send data to your backend)
    // After successful sign-up, you'd typically:
    // 1. Set isFirstTimeConnect to false
    // 2. Update the user's profile or store relevant data
    // 3. Potentially close the dialog or perform other actions
    console.log("Sign up data:", { displayName, email, isAccepted });

    // Assuming successful sign-up:
    setIsFirstTimeConnect(false);
    localStorage.setItem("isFirstTimeConnect", "false"); // Update the flag in local storage
    toast.success("Sign up successful!");
  };

  const handleDisconnect = () => {
    // Your disconnect logic here
    // This will typically involve:
    // 1. Clearing user session data (e.g., removing tokens, clearing context)
    // 2. Disconnecting from MetaMask (if applicable)
    // 3. Resetting state variables
    console.log("Disconnecting...");
    setIsFirstTimeConnect(false);
    localStorage.removeItem("isFirstTimeConnect"); // Clear the flag from local storage
    logoutAction(); // Call the logout action from your AuthProvider
  };

  // Function to simulate connecting with MetaMask
  const handleConnectMetaMask = () => {
    // Check if it's the first-time connection
    const isFirstConnect = localStorage.getItem("isFirstTimeConnect");

    if (!isFirstConnect || isFirstConnect === "false") {
      // Set isFirstTimeConnect to true in local storage
      localStorage.setItem("isFirstTimeConnect", "true");
      setIsFirstTimeConnect(true);
    }

    // Rest of the MetaMask connection logic...
  };

  return (
    <>
      <Dialog open={isLoginDialogOpen} onOpenChange={setIsLoginDialogOpen}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="sm:max-w-[500px] p-10 text-primary-foreground">
          {isFirstTimeConnect ? (
            // Content for newly connected users
            <>
              <DialogHeader>
                <DialogTitle>
                  <div className="flex flex-col items-center justify-center gap-5 my-4 text-primary-foreground">
                    <span className="text-3xl font-bold">
                      You are almost there!
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
                onClick={handleDisconnect}
              >
                Disconnect
              </Button>
            </>
          ) : (
            // Content for unauthenticated users (Login form)
            <>
              <DialogHeader>
                <DialogTitle>
                  <div className="flex flex-col items-center justify-center gap-5 my-4 text-primary-foreground">
                    <img src={Logo} alt="Logo" className="h-10" />
                    <span className="text-3xl font-bold">
                      Connect to NFTify
                    </span>
                    <Button className="h-16 bg-card" onClick={handleConnectMetaMask}>
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
              <div className="flex items-center justify-center">
                <div className="flex-1 border-t border-gray-500"></div>
                <span className="px-4 text-gray-500 text-xl">OR</span>
                <div className="flex-1 border-t border-gray-500"></div>
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
                <Button
                  variant="link"
                  onClick={openCreateAccount}
                  className="hover:underline text-blue-500"
                >
                  Register here
                </Button>
                <Button
                  variant="link"
                  onClick={openRecoverPassword}
                  className="hover:underline text-blue-500"
                >
                  Forgot Password?
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Create Account Dialog */}
      <CreateAccountDialog
        isOpen={isCreateAccountDialogOpen}
        onClose={closeCreateAccount}
      />

      {/* Recover Password Dialog */}
      <RecoverPasswordDialog
        isOpen={isRecoverPasswordDialogOpen}
        onClose={closeRecoverPassword}
      />
    </>
  );
}