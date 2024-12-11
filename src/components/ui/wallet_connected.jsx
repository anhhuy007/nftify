import { Button } from "./button";

export const WalletConnected = (handleOnClicked) => {
  return (
    <Button
      onClick={handleOnClicked}
      variant="primary"
      className="bg-[hsl(214,84%,56%)] p-6"
    >
      <span className="text-primary-foreground">Wallet Connected</span>
    </Button>
  );
};
