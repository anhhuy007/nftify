// filepath: /d:/Project/NFTify/nftify/src/pages/user/UserDetail.jsx
import React, { useEffect, useState } from "react";
import {
  Outlet,
  Link,
  useNavigate,
  useParams,
  useLocation,
} from "react-router-dom";
import menuItems from "@/config/Links";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Copy } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import toast from "react-hot-toast";
import { useQuery } from "react-query";
import { userDetailApiEndpoint } from "@/api/Endpoints";
import { useAuthHandler } from "@/api/AuthHandler";
import LoadingAnimation from "@/components/ui/loading";
import ErrorAnimation from "@/components/ui/error";
import { useAuth } from "@/context/AuthProvider";

function UserDetail() {
  const navigate = useNavigate();
  const location = useLocation();
  const { userId: paramUserId } = useParams();
  const { isAuth, user } = useAuth();
  const [id, setId] = useState(
    paramUserId || (location.pathname.includes("/profile") ? user?._id : null)
  );

  useEffect(() => {
    if (location.pathname.includes("/profile") && !isAuth) {
      navigate("/");
      toast.error("Please login to view your profile");
      return;
    }
  }, [isAuth, location.pathname, navigate]);

  const userDetailItem = menuItems.find((item) => item.group === "userDetail");
  const [copied, setCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const { fetcher } = useAuthHandler();

  const {
    data,
    error: userDetailError,
    isLoading: userDetailLoading,
  } = useQuery(
    ["user-detail", id],
    () => fetcher(userDetailApiEndpoint.replace(":userId", id)),
    { enabled: !!id }
  );

  useEffect(() => {
    if (!location.pathname.includes("/owned")) {
      navigate(`/user/${id}/owned`, { replace: true });
    }
  }, []);

  if (userDetailLoading) return <LoadingAnimation />;
  if (userDetailError) return <ErrorAnimation />;

  const copyAddress = () => {
    toast.success("Address copied to clipboard", {});
    navigator.clipboard.writeText(userDetail.wallet_address).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const userDetail = data.data;
  return (
    <>
      <div className="flex flex-col px-20 pt-10">
        <div className="w-full rounded-xl overflow-hidden">
          <div className="relative h-[350px] w-full">
            <img
              src={userDetail.bgUrl}
              alt="Profile background"
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
          <div className="-mt-20">
            <div className="relative">
              <img
                src={userDetail.avatarUrl}
                alt="Profile avatar"
                width={200}
                height={200}
                className="ml-6 rounded-xl object-cover aspect-square border-4 border-[#1a1b2e]"
              />
            </div>
            <div className="flex gap-60 mt-6 space-y-4 justify-between">
              <div className="">
                <h1 className="text-5xl font-bold text-primary-foreground mb-6">
                  {userDetail.name}
                </h1>
                <p className={`text-gray-400 ${!isExpanded && "line-clamp-2"}`}>
                  {userDetail.description}
                </p>
                <Button
                  variant="link"
                  className="text-gray-400 hover:text-primary-foreground p-0"
                  onClick={() => setIsExpanded(!isExpanded)}
                >
                  {isExpanded ? "Show less" : "Show more"}
                </Button>
              </div>

              <Card className="p-4 space-y-4 bg-card text-primary-foreground border-none max-h-fit">
                <div className="flex justify-between gap-20">
                  <span className="text-gray-400">Status</span>
                  <span className="whitespace-nowrap">{userDetail.status}</span>
                </div>
                <div className="flex justify-between gap-20">
                  <span className="text-gray-400">Created NFTs</span>
                  <span className="whitespace-nowrap">
                    {user.followers} NFTs
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Owned NFTs</span>
                  <span className="whitespace-nowrap">
                    {user.following} NFTs
                  </span>
                </div>
                <Separator orientation="horizontal" className="w-full my-2" />
                <div className="flex gap-10">
                  <span className="text-gray-400">Address</span>
                  <div className="flex items-center gap-2">
                    <span className="truncate max-w-[200px]">
                      {userDetail.wallet_address}
                    </span>
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
              <Link to={`/user/${id}/${child.link}`} key={`${child.link}`}>
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
          <Outlet context={{ userName: userDetail.name, userId: id }} />
        </div>
      </div>
    </>
  );
}

export default UserDetail;
