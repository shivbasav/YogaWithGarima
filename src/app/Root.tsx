import { Outlet, useLocation } from "react-router";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { ScrollToTop } from "./components/ScrollToTop";
// import { WhatsAppButton } from "./components/WhatsAppButton";
import { SessionProvider } from "./contexts/SessionProvider";

export function Root() {
  const location = useLocation();

  return (
    <SessionProvider>
      <div
        style={{ fontFamily: "'Jost', sans-serif" }}
        className="min-h-screen bg-[#faf8f5] text-[#2c2c2c]"
      >
        <Navbar />
        <Outlet key={location.pathname} />
        <Footer />
        <ScrollToTop />
        {/* <WhatsAppButton /> */}
      </div>
    </SessionProvider>
  );
}