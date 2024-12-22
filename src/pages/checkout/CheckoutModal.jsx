import { useState } from "react"
import { X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"

export default function CheckoutModal({ cart }) {
  const [open, setOpen] = useState(false)

  // Safely calculate totals with null checks
  const subtotal = cart?.items?.reduce((sum, item) => sum + parseFloat(item?.price || 0), 0) || 0
  const protocolFee = 0.1 // 0.1 ETH fixed fee
  const total = subtotal + protocolFee

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          className="w-full" 
          disabled={!cart?.items?.length}
        >
          Checkout
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-[#0D0F1D] border-none text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white">Check out</DialogTitle>
          <Button
            variant="ghost"
            className="absolute right-4 top-4 text-white hover:text-white/80 hover:bg-white/10"
            onClick={() => setOpen(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>

        <div className="mt-4 space-y-4">
          {cart?.items?.map((item) => (
            <div key={item?._id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={item?.imgUrl}
                  alt={item?.title}
                  className="h-10 w-10 rounded-md object-cover"
                />
                <p className="text-sm font-medium">{item?.title}</p>
              </div>
              <p className="text-sm font-medium">{item?.price} ETH</p>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-2">
              <img
                src="https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/eth.png"
                alt="Ethereum"
                className="h-6 w-6"
              />
              <span>Ethereum</span>
            </div>
            <span className="text-green-500">Connected</span>
          </div>

          <Separator className="my-4 bg-white/20" />

          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Price</span>
              <span>{subtotal.toFixed(2)} ETH</span>
            </div>
            <div className="flex justify-between">
              <span>Protocol fee</span>
              <span>{protocolFee.toFixed(2)} ETH</span>
            </div>
            <Separator className="my-2 bg-white/20" />
            <div className="flex justify-between font-medium">
              <span>You will pay</span>
              <span>{total.toFixed(2)} ETH</span>
            </div>
          </div>

          <Button 
            className="mt-6 w-full bg-white text-black hover:bg-white/90" 
            onClick={() => {
              // Handle purchase logic here
              console.log("Processing purchase...")
            }}
          >
            Purchase
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}