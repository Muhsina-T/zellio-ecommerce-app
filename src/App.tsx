import { useEffect } from "react";
import AppRoutes from "./routes/AppRoutes";
import { initializeUsers } from "./services/auth";
import ScrollToTop from "./components/ScrollToTop";

function App() {

  useEffect(() => {
    initializeUsers();
  }, []);

  return (
    <>
      <ScrollToTop />
      <AppRoutes />
    </>
  );
}

export default App;