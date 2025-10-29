import { createContext, useCallback, use, useState } from "react";
import { IAccount } from "../interface/account";
import { getCurrentAccountFromStorage } from "../utils/local-storage";
import { saveCurrentAccount } from "../utils/local-storage";
import { getAccountFromStorage } from "../utils/local-storage";

interface StellarContextType {
  currentAccount: string;
  hashId: string;
  setHashId: React.Dispatch<React.SetStateAction<string>>;
  setCurrentAccount: (name: string) => void;
  getAccount: (name: string) => IAccount | null;
  getCurrentAccountData: () => IAccount | null;
}

const StellarAccountContext = createContext<StellarContextType | undefined>(
  undefined,
);

export const useStellarAccounts = () => {
  const context = use(StellarAccountContext);
  if (context === undefined) {
    throw new Error(
      "useStellarAccounts must be used within a StellarAccountProvider",
    );
  }
  return context;
};

export const StellarAccountProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [hashId, setHashId] = useState<string>("");

  const [currentAccount, setCurrentAccountState] = useState<string>(() =>
    getCurrentAccountFromStorage(),
  );

  const setCurrentAccount = useCallback((name: string) => {
    setCurrentAccountState(name);
    saveCurrentAccount(name);
  }, []);

  const getAccount = useCallback((name: string): IAccount | null => {
    return getAccountFromStorage(name);
  }, []);

  const getCurrentAccountData = useCallback((): IAccount | null => {
    if (!currentAccount) return null;
    return getAccountFromStorage(currentAccount);
  }, [currentAccount]);

  const value: StellarContextType = {
    currentAccount,
    hashId,
    setHashId,
    setCurrentAccount,
    getAccount,
    getCurrentAccountData,
  };

  return (
    <StellarAccountContext value={value}>{children}</StellarAccountContext>
  );
};
