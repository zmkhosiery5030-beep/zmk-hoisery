import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Markets } from "./components/Markets";
import { About } from "./components/About";
import { Products } from "./components/Products";
import { Gallery } from "./components/Gallery";
import { Capabilities } from "./components/Capabilities";
import { Insights } from "./components/Insights";
import { Faq } from "./components/Faq";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { WhatsAppButton } from "./components/WhatsAppButton";
import { StickyCta } from "./components/StickyCta";
import { LiveChat } from "./components/LiveChat";
import "./App.css";

export default function App() {
  return (
    <div className="app">
      <Navbar />
      <main id="main-content">
        <Hero />
        <Markets />
        <About />
        <Products />
        <Gallery />
        <Capabilities />
        <Insights />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
      <LiveChat />
      <StickyCta />
    </div>
  );
}
