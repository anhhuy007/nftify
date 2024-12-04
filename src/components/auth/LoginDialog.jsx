import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User } from "lucide-react"
import Logo from "../../assets/logo.svg";
import { Link } from "react-router-dom"

export default function LoginDialog({ children }) {
  const handleSubmit = (event) => {
    event.preventDefault()
    // Handle login logic here
    console.log("Login submitted")
  }

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
              placeholder="Enter your username or email"
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
