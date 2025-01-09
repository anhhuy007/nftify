// import React, { useEffect } from "react";
// import { useState } from "react";
// import { Card } from "@/components/ui/Card";
// import { Label } from "@/components/ui/label";
// import { Switch } from "@/components/ui/switch";
// // import { Button } from "@/components/ui/button";

// function Notification() {
//   const [settings, setSettings] = useState([
//     {
//       id: "sales",
//       title: "Sales",
//       description: "When one of your NFTs sells",
//       enabled: true,
//     },
//     {
//       id: "listings",
//       title: "Listings",
//       description: "When an item is successfully listed on the marketplace",
//       enabled: true,
//     },
//     {
//       id: "bids",
//       title: "Bids & Outbids",
//       description:
//         "When someone bids on one of your items or outbids yours bids",
//       enabled: true,
//     },
//     {
//       id: "purchases",
//       title: "Purchases",
//       description:
//         "When a purchase is successful and you have received the NFT in your wallet",
//       enabled: true,
//     },
//   ]);

//   useEffect(() => {
//     console.log(settings);
//   }, [settings]);

//   const toggleSetting = (id) => {
//     setSettings((prevSettings) =>
//       prevSettings.map((setting) =>
//         setting.id === id ? { ...setting, enabled: !setting.enabled } : setting
//       )
//     );
//   };

//   return (
//     <div className="min-h-screen text-primary-foreground p-10">
//       <h1 className="text-4xl font-bold mb-2">Notifications</h1>
//       <p className="text-gray-400 text-lg mb-8">
//         Select the kinds of notifications you'd like receive to your email and
//         in-app notifications center
//       </p>

//       <Card className="bg-background border-2 rounded-3xl p-6 space-y-6">
//         {settings.map((setting) => (
//           <div
//             key={setting.id}
//             className="flex items-center justify-between py-2"
//           >
//             <div className="space-y-1">
//               <Label className="text-xl font-medium">{setting.title}</Label>
//               <p className="text-gray-400">{setting.description}</p>
//             </div>
//             <Switch
//               checked={setting.enabled}
//               onCheckedChange={() => toggleSetting(setting.id)}
//               // className="data-[state=checked]:bg-white data-[state=unchecked]:bg-gray-600"
//             />
//           </div>
//         ))}
//       </Card>
//     </div>
//   );
// }

// export default Notification;
