import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import Dashboard from "./pages/Dashboard";
import Applications from "./pages/Applications";
import ApplicationCreate from "./pages/ApplicationCreate";
import ApplicationEdit from "./pages/ApplicationEdit";
import ApplicationShow from "./pages/ApplicationShow";
import ApplicationLetters from "./pages/ApplicationLetters";
import ApplicationLetterCreate from "./pages/ApplicationLetterCreate";
import ApplicationLetterEdit from "./pages/ApplicationLetterEdit";
import ApplicationLetterShow from "./pages/ApplicationLetterShow";
import CVs from "./pages/CVs";
import CVCreate from "./pages/CVCreate";
import CVEdit from "./pages/CVEdit";
import CVShow from "./pages/CVShow";
import Portfolios from "./pages/Portfolios";
import PortfolioList from "./pages/PortfolioList";
import PortfolioDetail from "./pages/PortfolioDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
          <Route path="/auth/forgot-password" element={<ForgotPassword />} />
          <Route path="/auth/reset-password" element={<ResetPassword />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogDetail />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/applications" element={<Applications />} />
          <Route path="/applications/create" element={<ApplicationCreate />} />
          <Route path="/applications/:id/edit" element={<ApplicationEdit />} />
          <Route path="/applications/:id" element={<ApplicationShow />} />
          <Route path="/application-letters" element={<ApplicationLetters />} />
          <Route path="/application-letters/create" element={<ApplicationLetterCreate />} />
          <Route path="/application-letters/:id/edit" element={<ApplicationLetterEdit />} />
          <Route path="/application-letters/:id" element={<ApplicationLetterShow />} />
          <Route path="/cvs" element={<CVs />} />
          <Route path="/cvs/create" element={<CVCreate />} />
          <Route path="/cvs/:id/edit" element={<CVEdit />} />
          <Route path="/cvs/:id" element={<CVShow />} />
          <Route path="/portfolios" element={<Portfolios />} />
          <Route path="/me/:username" element={<PortfolioList />} />
          <Route path="/me/:username/:id" element={<PortfolioDetail />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
