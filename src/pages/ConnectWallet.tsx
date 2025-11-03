import { Button, Icon, Text } from "@stellar/design-system";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStellarAccounts } from "../stellar/StellarAccountProvider";
import { walletService } from "../services/wallet.service";

export default function ConnectWallet() {
  const [isConnecting, setIsConnecting] = useState(false);
  const { setWalletAddress } = useStellarAccounts();
  const navigate = useNavigate();

  const handleConnectWallet = async () => {
    setIsConnecting(true);

    try {
      const address = await walletService.connect();
      localStorage.setItem("wallet", address);

      setWalletAddress(address);
      void navigate("/role-selection");
    } catch (error) {
      console.error(error);
      setIsConnecting(false);
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <div className="flex items-center justify-center bg-background">
      <div className="text-center space-y-8 max-w-md px-4">
        <div className="space-y-4">
          <h1 className="text-5xl font-bold text-foreground text-balance uppercase">
            Stellar Car Rental
          </h1>
          <Text as="p" size="lg">
            Connect your wallet to access the decentralized rental platform
          </Text>
        </div>

        <div className="flex justify-center">
          <Button
            onClick={() => void handleConnectWallet()}
            disabled={isConnecting}
            size="xl"
            variant="primary"
          >
            {isConnecting ? (
              <>
                <div className="w-6 h-6 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                Connecting...
              </>
            ) : (
              <>
                <Icon.Wallet02 className="w-6 h-6" />
                Connect Wallet
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
