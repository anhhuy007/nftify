import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Logo from "../../assets/logo.svg";
import { useState } from "react";
import toast from "react-hot-toast";

export default function RecoverPasswordDialog({ isOpen, onClose }) {
  const [email, setEmail] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Add your password recovery logic here
    try {
      // Example (replace with your actual API call):
      // const response = await sendPasswordResetEmail(email);

      console.log("Recovery email sent to:", email);
      toast.success(
        "If an account exists with this email, you will receive a recovery link."
      );
      onClose();
    } catch (error) {
      console.error("Error sending recovery email:", error);
      toast.error("Error sending recovery email. Please try again.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] p-10 text-primary-foreground bg-[#1a1b3b]">
        <DialogHeader>
          <DialogTitle>
            <div className="flex flex-col items-center justify-center gap-5 my-4 text-primary-foreground">
              <img src={Logo} alt="Logo" className="h-10" />
              <span className="text-3xl font-bold">
                Recover password
              </span>
              <span className="text-lg text-muted-foreground text-center">
                Enter your email address to receive
                <br /> a link to create new password
              </span>
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-14 bg-transparent border-primary-foreground/20"
            />
          </div>
          <Button
            type="submit"
            className="w-full h-14 bg-blue-500 hover:bg-blue-600"
          >
            Send
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

