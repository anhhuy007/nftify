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
import { useAuth } from "@/context/AuthProvider"
import { useState } from "react";
import toast from "react-hot-toast";

export default function CreateAccountDialog({ children, isOpen, onClose }) {
  const { registerAction } = useAuth();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = await registerAction({ email, username, password });

    if (result.error) {
      toast.error(result.error);
      return;
    }

    toast.success("Account created successfully");
    if (onClose) onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[500px] p-10 text-primary-foreground">
        <DialogHeader>
          <DialogTitle>
            <div className="flex flex-col items-center justify-center gap-5 my-4 text-primary-foreground">
              <img src={Logo} alt="Logo" className="h-10" />
              <span className="text-3xl font-bold">Create account</span>
            </div>
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-xl">
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter email"
              required
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-14"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="username" className="text-xl">
              Username
            </Label>
            <Input
              id="username"
              placeholder="Enter username"
              required
              onChange={(e) => setUsername(e.target.value)}
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
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full h-14"
            />
          </div>
          <Button
            type="submit"
            className="w-full h-14 bg-blue-400"
            onClick={handleSubmit}
          >
            Create Account
          </Button>
        </form>
        <div className="flex flex-col items-center justify-center text-sm">
          <span className="text-muted-foreground">
            Already have an account?{" "}
          </span>
          <Button variant="link" onClick={onClose} className="hover:underline text-blue-500">
            Login here
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

