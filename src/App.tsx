import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import Home from "./pages/Home";
import About from "./pages/About";
import Events from "./pages/Events";
import Membership from "./pages/Membership";
import Donate from "./pages/Donate";
import Gallery from "./pages/Gallery";
import News from "./pages/News";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <div className="flex min-h-screen flex-col">
          <Header />
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/events" element={<Events />} />
              <Route path="/membership" element={<Membership />} />
              <Route path="/donate" element={<Donate />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/news" element={<News />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

// Organization Schema for SEO
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Limbach Samaaj",
  "url": "https://limbachsamaaj.ca",
  "logo": "https://limbachsamaaj.ca/logo.png",
  "description": "Limbach Samaaj represents Limbach families and community members across Canada, fostering cultural heritage and community connections.",
  "areaServed": {
    "@type": "Country",
    "name": "Canada"
  },
  "foundingLocation": {
    "@type": "Country",
    "name": "Canada"
  }
};

// Add schema to document head
if (typeof document !== 'undefined') {
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.text = JSON.stringify(organizationSchema);
  document.head.appendChild(script);
}
