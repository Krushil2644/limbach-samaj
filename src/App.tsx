import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

// Lazy load pages to reduce initial bundle size
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Events = lazy(() => import("./pages/Events"));
const Membership = lazy(() => import("./pages/Membership"));
const Donate = lazy(() => import("./pages/Donate"));
const Gallery = lazy(() => import("./pages/Gallery"));
const News = lazy(() => import("./pages/News"));
const Contact = lazy(() => import("./pages/Contact"));
const Sponsorship = lazy(() => import("./pages/Sponsorship"));
const Volunteer = lazy(() => import("./pages/Volunteer"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Loading component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-[400px]">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
  </div>
);

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
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/events" element={<Events />} />
                <Route path="/membership" element={<Membership />} />
                <Route path="/donate" element={<Donate />} />
                <Route path="/sponsorship" element={<Sponsorship />} />
                <Route path="/volunteer" element={<Volunteer />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/news" element={<News />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/sponsorship" element={<Sponsorship />} />
                <Route path="/volunteer" element={<Volunteer />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
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
  name: "Limbach Samaaj",
  url: "https://limbachsamaaj.ca",
  logo: "https://limbachsamaaj.ca/logo.png",
  description:
    "Limbach Samaaj represents Limbach families and community members across Canada, fostering cultural heritage and community connections.",
  areaServed: {
    "@type": "Country",
    name: "Canada",
  },
  foundingLocation: {
    "@type": "Country",
    name: "Canada",
  },
};

// Add schema to document head
if (typeof document !== "undefined") {
  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.text = JSON.stringify(organizationSchema);
  document.head.appendChild(script);
}
