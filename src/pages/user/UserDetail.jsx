import React, { useEffect, useState } from "react";
import {
  Outlet,
  Link,
  useNavigate,
  useParams,
  useOutletContext,
} from "react-router-dom";
import menuItems from "@/config/Links";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Copy } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import toast from "react-hot-toast";

const user = {
  id: 1,
  name: "John Doe",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur consequat cursus justo, at bibendum lectus aliquam eget. Suspendisse eros augue, ornare sed nisl id, malesuada viverra purus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur consequat cursus justo, at bibendum lectus aliquam eget. Suspendisse eros augue, ornare sed nisl id, malesuada viverra purus.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur consequat cursus justo, at bibendum lectus aliquam eget. Suspendisse eros augue, ornare sed nisl id, malesuada viverra purus.",
  avatar:
    "https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:quality(100)/avatar_dep_cho_nam_0_d82ba08b05.jpg",
  background:
    "https://asset.gecdesigns.com/img/wallpapers/fantasy-forest-wallpaper-inspired-by-avatar-pandora-planet-with-dark-mountains-and-glowing-creatures-background-sr03072407-cover.webp",
  followers: 0.05,
  following: 12.6,
  address: "0x1234567890",
};

function UserDetail() {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [isExpanded, setIsExpanded] = useState(false);

  const userDetailItem = menuItems.find((item) => item.group === "userDetail");

  if (!userDetailItem || !userDetailItem.children) {
    return null;
  }

  const copyAddress = () => {
    toast.success("Address copied to clipboard", {});
    navigator.clipboard.writeText(user.address).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  useEffect(() => {
    if (!window.location.pathname.includes("/owned")) {
      navigate(`/user/${userId}/owned`, { replace: true });
    }
  }, [userId, navigate]);

  return (
    <>
      <div className="flex flex-col px-20 pt-10">
        <div className="w-full rounded-xl overflow-hidden">
          <div className="relative h-[350px] w-full">
            <img
              src={user.background}
              alt="Profile background"
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
          <div className="-mt-20">
            <div className="relative">
              <img
                src={user.avatar}
                alt="Profile avatar"
                width={200}
                height={200}
                className="ml-6 rounded-xl object-cover aspect-square border-4 border-[#1a1b2e]"
              />
            </div>
            <div className="flex gap-80 mt-6 space-y-4">
              <div className="">
                <h1 className="text-5xl font-bold text-primary-foreground mb-6">
                  {user.name}
                </h1>
                <p className={`text-gray-400 ${!isExpanded && "line-clamp-2"}`}>
                  {user.description}
                </p>
                <Button
                  variant="link"
                  className="text-gray-400 hover:text-primary-foreground p-0"
                  onClick={() => setIsExpanded(!isExpanded)}
                >
                  {isExpanded ? "Show less" : "Show more"}
                </Button>
              </div>

              <Card className="flex-1 p-4 space-y-4 bg-card text-primary-foreground border-none max-h-fit">
                <div className="flex gap-28">
                  <span className="text-gray-400">Followers</span>
                  <span className="whitespace-nowrap">
                    {user.followers} ETH
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Following</span>
                  <span className="whitespace-nowrap">
                    {user.following} ETH
                  </span>
                </div>
                <Separator orientation="horizontal" className="w-full my-2" />
                <div className="flex justify-between">
                  <span className="text-gray-400">Address</span>
                  <div className="flex items-center gap-2">
                    <span>{user.address}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-4 w-4"
                      onClick={copyAddress}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
        <Tabs defaultValue="owned" className="w-full">
          <TabsList className="w-full justify-start gap-2 h-14 bg-transparent border-b border-foreground mb-6 rounded-none">
            {userDetailItem.children.map((child) => (
              <Link to={`/user/${userId}/${child.link}`} key={`${child.link}`}>
                <TabsTrigger
                  key={child.link}
                  value={child.link}
                  className="text-lg data-[state=active]:border-b-[6px] data-[state=active]:border-foreground data-[state=active]:p-[11px] data-[state=active]:shadow-none rounded-none"
                >
                  {child.name}
                </TabsTrigger>
              </Link>
            ))}
          </TabsList>
        </Tabs>
        <div className="mb-20">
          <Outlet context={{ userName: user.name, userId: user.id }} />
        </div>
      </div>
    </>
  );
}

export default UserDetail;
