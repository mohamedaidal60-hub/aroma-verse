import React, { Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { WhatsAppBubble } from "./components/WhatsAppBubble";

// Lazy Loaded Pages for Performance (Code Splitting)
const Index = React.lazy(() => import("./pages/Index"));
const Marketplace = React.lazy(() => import("./pages/Marketplace"));
const Studio = React.lazy(() => import("./pages/Studio"));
const Blog = React.lazy(() => import("./pages/Blog"));
const Investir = React.lazy(() => import("./pages/Investir"));
const Auth = React.lazy(() => import("./pages/Auth"));
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const Database = React.lazy(() => import("./pages/Database"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
const Store = React.lazy(() => import("./pages/Store"));
const Academy = React.lazy(() => import("./pages/Academy"));
const Admin = React.lazy(() => import("./pages/Admin"));
const Community = React.lazy(() => import("./pages/Community"));
const Pricing = React.lazy(() => import("./pages/Pricing"));
const BlogPost = React.lazy(() => import("./pages/BlogPost"));
const CoursePlayer = React.lazy(() => import("./pages/CoursePlayer"));
const AccessoiresIndustriels = React.lazy(() => import("./pages/AccessoiresIndustriels"));
const AccessoiresArtisanaux = React.lazy(() => import("./pages/AccessoiresArtisanaux"));
const Cosmetiques = React.lazy(() => import("./pages/Cosmetiques"));

// Simple Loader Fallback
const PageLoader = () => (
  <div className="min-h-screen bg-[#f1f5f9] flex flex-col items-center justify-center">
    <div className="w-16 h-16 border-4 border-gold/30 border-t-gold rounded-full animate-spin"></div>
    <p className="mt-4 text-gold uppercase tracking-widest font-bold text-xs animate-pulse">Chargement Nexus...</p>
  </div>
);

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <LanguageProvider>
          <AuthProvider>
            <CartProvider>
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/marketplace" element={<Marketplace />} />
                  <Route path="/studio" element={<Studio />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/blog/:slug" element={<BlogPost />} />
                  <Route path="/accessoires-industriels" element={<AccessoiresIndustriels />} />
                  <Route path="/accessoires-artisanaux" element={<AccessoiresArtisanaux />} />
                  <Route path="/cosmetiques" element={<Cosmetiques />} />
                  <Route path="/investir" element={<Investir />} />
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/database" element={<Database />} />
                  <Route path="/store" element={<Store />} />
                  <Route path="/academy" element={<Academy />} />
                  <Route path="/academy/courses/:id" element={<CoursePlayer />} />
                  <Route path="/admin" element={<Admin />} />
                  <Route path="/community" element={<Community />} />
                  <Route path="/pricing" element={<Pricing />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
              <WhatsAppBubble />
            </CartProvider>
          </AuthProvider>
        </LanguageProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
