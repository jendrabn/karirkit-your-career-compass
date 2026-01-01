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
import Blogs from "./pages/Blogs";
import BlogCreate from "./pages/BlogCreate";
import BlogEdit from "./pages/BlogEdit";
import BlogShow from "./pages/BlogShow";
import Categories from "./pages/Categories";
import Tags from "./pages/Tags";
import Templates from "./pages/Templates";
import TemplateCreate from "./pages/TemplateCreate";
import TemplateEdit from "./pages/TemplateEdit";
import TemplateShow from "./pages/TemplateShow";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Users from "./pages/Users";
import UserCreate from "./pages/UserCreate";
import UserEdit from "./pages/UserEdit";
import UserShow from "./pages/UserShow";
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
import PortfolioCreate from "./pages/PortfolioCreate";
import PortfolioEdit from "./pages/PortfolioEdit";
import PortfolioShow from "./pages/PortfolioShow";
import PortfolioList from "./pages/PortfolioList";
import PortfolioDetail from "./pages/PortfolioDetail";
import Documents from "./pages/Documents";
import Profile from "./pages/Profile";
import ChangePassword from "./pages/ChangePassword";
import OTPVerification from "./pages/OTPVerification";
import NotFound from "./pages/NotFound";
import Jobs from "./pages/Jobs";
import JobDetail from "./pages/JobDetail";
import AdminJobs from "./pages/AdminJobs";
import AdminJobCreate from "./pages/AdminJobCreate";
import AdminJobEdit from "./pages/AdminJobEdit";
import AdminJobShow from "./pages/AdminJobShow";
import AdminCompanies from "./pages/AdminCompanies";
import AdminJobRoles from "./pages/AdminJobRoles";

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
          <Route path="/auth/verify-otp" element={<OTPVerification />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogDetail />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/create" element={<BlogCreate />} />
          <Route path="/blogs/:id/edit" element={<BlogEdit />} />
          <Route path="/blogs/:id" element={<BlogShow />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/tags" element={<Tags />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/templates/create" element={<TemplateCreate />} />
          <Route path="/templates/:id/edit" element={<TemplateEdit />} />
          <Route path="/templates/:id" element={<TemplateShow />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<Users />} />
          <Route path="/admin/users/create" element={<UserCreate />} />
          <Route path="/admin/users/:id/edit" element={<UserEdit />} />
          <Route path="/admin/users/:id" element={<UserShow />} />
          <Route path="/admin/jobs" element={<AdminJobs />} />
          <Route path="/admin/jobs/create" element={<AdminJobCreate />} />
          <Route path="/admin/jobs/:id/edit" element={<AdminJobEdit />} />
          <Route path="/admin/jobs/:id" element={<AdminJobShow />} />
          <Route path="/admin/companies" element={<AdminCompanies />} />
          <Route path="/admin/job-roles" element={<AdminJobRoles />} />
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
          <Route path="/portfolios/create" element={<PortfolioCreate />} />
          <Route path="/portfolios/:id/edit" element={<PortfolioEdit />} />
          <Route path="/portfolios/:id" element={<PortfolioShow />} />
          <Route path="/me/:username" element={<PortfolioList />} />
          <Route path="/me/:username/:id" element={<PortfolioDetail />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/jobs/:slug" element={<JobDetail />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
