import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Twitter, Instagram, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="pt-16 pb-8 border-2 ">
      {/* Newsletter Section */}
      <div className="container mx-auto px-4 mb-16 text-center">
        <h2 className="text-3xl font-bold mb-2">Get More Updates</h2>
        <p className="text-gray-400 mb-6">
          Join our mailing list to stay in the loop with our newest feature
        </p>
        <div className="max-w-lg mx-auto flex gap-2">
          <Input
            type="email"
            placeholder="Your Email..."
            className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500"
          />
          <Button className="bg-blue-600 hover:bg-blue-700 text-white min-w-[80px]">
            I'm in
          </Button>
        </div>
      </div>

      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-gray-800">
          {/* Marketplace Column */}
          <div className="mx-auto">
            <h3 className="text-lg font-semibold mb-4">Marketplace</h3>
            <ul className="space-y-2">
              {["Explore", "Articles", "How it Works", "Help"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Links Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Links</h3>
            <ul className="space-y-2">
              {["Tokens", "API", "Big Bounty", "Become Partners"].map(
                (item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Brand Column */}
          <div className="text-right">
            <h3 className="text-2xl font-bold mb-4">NFTify</h3>
            <div className="flex justify-end gap-4">
              {/* <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Discord className="w-6 h-6" />
                <span className="sr-only">Discord</span>
              </a> */}
              <a href="#" className="text-gray-400 transition-colors">
                <Twitter className="w-6 h-6" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-gray-400  transition-colors">
                <Instagram className="w-6 h-6" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-gray-400 transition-colors">
                <Youtube className="w-6 h-6" />
                <span className="sr-only">YouTube</span>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 text-center text-gray-400 text-sm">
          © 2024 NFTify. All Right Reserved
        </div>
      </div>
    </footer>
  );
}
