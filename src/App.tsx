import { Layout } from "@stellar/design-system";
import { Outlet } from "react-router-dom";
import AccountManager from "./components/AccountManager";

const App: React.FC = () => (
  <main>
    <Layout.Header
      projectId="Scaffold Stellar Starter App"
      projectTitle="Scaffold Stellar Starter App"
    />
    <Outlet />
    <AccountManager />
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

export default App;
