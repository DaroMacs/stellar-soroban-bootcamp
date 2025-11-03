import { Button, Layout, Profile } from "@stellar/design-system";
import { Outlet, Route, Routes } from "react-router-dom";
import AccountManager from "./components/AccountManager";
import { NavLink } from "react-router-dom";
import { shortenAddress } from "./utils/shorten-address";
import { useStellarAccounts } from "./stellar/StellarAccountProvider";
import ConnectWallet from "./pages/ConnectWallet";
import RoleSelection from "./pages/RoleSelection";
import Dashboard from "./pages/Dashboard";

const AppLayout: React.FC = () => {
  const { walletAddress, selectedRole } = useStellarAccounts();

  return (
    <main>
      <Layout.Header
        projectId="My App"
        projectTitle="Rent a car"
        contentCenter={
          <>
            <nav className="flex justify-between gap-8">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `font-medium transition-colors duration-200 ${
                    isActive
                      ? "text-blue-600 border-b-2 border-blue-600 pb-1"
                      : "text-gray-700 hover:text-blue-600"
                  }`
                }
              >
                Connect Wallet
              </NavLink>

              <NavLink
                to="/role-selection"
                className={({ isActive }) =>
                  `font-medium transition-colors duration-200 ${
                    isActive
                      ? "text-blue-600 border-b-2 border-blue-600 pb-1"
                      : "text-gray-700 hover:text-blue-600"
                  }`
                }
              >
                Select Role
              </NavLink>

              {selectedRole && (
                <NavLink
                  to="/cars"
                  className={({ isActive }) =>
                    `font-medium transition-colors duration-200 ${
                      isActive
                        ? "text-blue-600 border-b-2 border-blue-600 pb-1"
                        : "text-gray-700 hover:text-blue-600"
                    }`
                  }
                >
                  Car List
                </NavLink>
              )}
            </nav>
          </>
        }
        contentRight={
          <>
            <nav>
              {walletAddress && (
                <Button variant="tertiary" size="md">
                  <Profile
                    publicAddress={shortenAddress(walletAddress)}
                    size="md"
                  />
                </Button>
              )}
            </nav>
          </>
        }
      />
      <div className="min-h-[65vh]">
        <Outlet />
      </div>
      <Layout.Footer>
        <span>
          © {new Date().getFullYear()} My App. Licensed under the{" "}
          <a
            href="http://www.apache.org/licenses/LICENSE-2.0"
            target="_blank"
            rel="noopener noreferrer"
          >
            Apache License, Version 2.0
          </a>
          .
        </span>
      </Layout.Footer>
    </main>
  );
};

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<ConnectWallet />} />
        <Route path="/role-selection" element={<RoleSelection />} />
        <Route path="/cars" element={<Dashboard />} />
        <Route path="/horizon-example" element={<AccountManager />} />
      </Route>
    </Routes>
  );
}
