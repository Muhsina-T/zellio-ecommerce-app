import { useEffect } from "react";
import AppRoutes from "./routes/AppRoutes";
import { initializeUsers } from "./services/auth";

function App() {

  useEffect(() => {
    initializeUsers();
  }, []);

  return <AppRoutes />;
}

export default App;