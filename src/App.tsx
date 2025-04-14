
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ServiceCategory from "./pages/ServiceCategory";
import ServiceProvider from "./pages/ServiceProvider";
import BookService from "./pages/BookService";
import ClientAuth from "./pages/ClientAuth";
import ProviderAuth from "./pages/ProviderAuth";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/services/:slug" element={<ServiceCategory />} />
          <Route path="/services/:slug/provider/:providerSlug" element={<ServiceProvider />} />
          <Route path="/book/:slug/:providerSlug" element={<BookService />} />
          <Route path="/client-auth" element={<ClientAuth />} />
          <Route path="/provider-auth" element={<ProviderAuth />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </TooltipProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
