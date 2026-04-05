import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";
import Index from "./pages/Index";
import Marketplace from "./pages/Marketplace";
import Studio from "./pages/Studio";
import Blog from "./pages/Blog";
import Investir from "./pages/Investir";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Store from "./pages/Store";
import Academy from "./pages/Academy";
import Admin from "./pages/Admin";
import Community from "./pages/Community";
import Pricing from "./pages/Pricing";
import { WhatsAppBubble } from "./components/WhatsAppBubble";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <CartProvider>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/marketplace" element={<Marketplace />} />
              <Route path="/studio" element={<Studio />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/investir" element={<Investir />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/store" element={<Store />} />
              <Route path="/academy" element={<Academy />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/community" element={<Community />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <WhatsAppBubble />
          </CartProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
