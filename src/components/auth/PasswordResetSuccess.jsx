import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import menuItems from "@/config/Links";

export default function PasswordResetSuccess() {
  // Find the link for the home page
  const homePage = menuItems.find((item) => item.name === "Home");

  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-128px)] py-10 bg-gray-100">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md text-center">
          <h1 className="text-2xl font-bold">
            Your password has been reset!
          </h1>
          <Link to={homePage.link}>
            <Button className="w-full">Back to homepage</Button>
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}