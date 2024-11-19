import { Wallet, Upload, Tag } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function Banner() {
  const steps = [
    {
      icon: Wallet,
      title: "Set up your wallet",
      description:
        "Once you've set up your wallet of choice, connect it to NFTify by clicking the wallet icon in the top right corner. Learn about the wallets we support.",
    },
    {
      icon: Upload,
      title: "Upload & Create Collection",
      description:
        "Upload your work then Click My Collections and set up your collection. Add social links, a description, profile & banner images, and set a secondary sales fee.",
    },
    {
      icon: Tag,
      title: "List them for sale",
      description:
        "Choose between auctions, fixed-price listings, and declining-price listings. You choose how you want to sell your NFTs, and we help you sell them",
    },
  ];

  return (
    <div className="py-16 px-4">
      <Card className="max-w-6xl border-gray-800">
        <CardContent className="p-14">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            <span className="text-gradient">
              Create And Sell Your NFTs
            </span>
          </h2>

          <div className="grid md:grid-cols-3 gap-32 text-center">
            {steps.map((step, index) => (
              <div key={index} className="space-y-4">
                <div className="w-16 h-16 mx-auto bg-gray-800/50 rounded-full flex items-center justify-center">
                  <step.icon className="w-8 h-8 " />
                </div>
                <h3 className="text-xl font-semibold">{step.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
