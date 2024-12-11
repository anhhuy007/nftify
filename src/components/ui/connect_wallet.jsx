import { Button } from "./button";

export const ConnectWallet = ({
    walletAddress,
    handleOnClicked
}) => {
    console.log("walletAddress", walletAddress);

    return (
      <Button
        onClick={handleOnClicked}
        variant="primary"
        className="bg-[hsl(214,84%,56%)] p-6"
      >
        <span className="text-primary-foreground">{walletAddress === "" ? "Connect Wallet" : "Wallet Connected"}</span>
      </Button>
    );
  };
  