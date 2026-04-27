import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import "./index.css";

export default function App() {
  const location = useLocation();
  const isLanding = location.pathname === "/";

  return (
    <div className={`min-h-screen flex flex-col ${isLanding ? "landing-mode" : "tool-mode"}`}>
      <Header />
      <div className="flex-1 flex flex-col">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
