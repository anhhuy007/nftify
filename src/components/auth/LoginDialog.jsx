import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Logo from "../../assets/logo.svg";
import { Link } from "react-router-dom"
import { useAuth } from "@/context/AuthProvider"
import { useState } from "react";

export default function LoginDialog({ children }) {
  const { loginAction } = useAuth();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = await loginAction({ userName, password });

    if (result.error) {
      // console.log("Message: ", result.error);
      alert("Error logging in: " + result.error);
      return;
    }

    // console.log("Login successful: ", result);
    alert("Login successful");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
          {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] text-primary-foreground">
        <DialogHeader>
          <DialogTitle>
            <div className="flex flex-col items-center justify-center gap-10 my-4 text-primary-foreground">
                <img src={Logo} alt="Logo" className="h-10" />
                <span className="text-3xl font-bold">Connect to NFTify</span>
            </div>
          </DialogTitle>
          <DialogDescription>
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="username" className="text-xl">
              Username or Email
            </Label>
            <Input
              id="username"
              placeholder="Enter your username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
              className="w-full h-14"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-xl">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="w-full h-14"
            />
          </div>
          <Button type="submit" className="w-full h-14 bg-blue-400">
            Login
          </Button>
        </form>
        <div className="flex flex-col items-center justify-center text-sm">
          <span className="text-muted-foreground">Don't have an account? </span>
          <Link to="/auth/sign-up" className="hover:underline">
            Register here
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  )
}
