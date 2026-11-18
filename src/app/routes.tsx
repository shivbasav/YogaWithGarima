import * as React from "react";
import { createBrowserRouter } from "react-router";
import { Root } from "./Root";
import { HomePage } from "./pages/HomePage";
import { AboutPage } from "./pages/AboutPage";
import { ClassesPage } from "./pages/ClassesPage";
import { RetreatsPage } from "./pages/RetreatsPage";
import { BlogPage } from "./pages/BlogPage";
import { BlogPostPage } from "./pages/BlogPostPage";
import { ContactPage } from "./pages/ContactPage";
import { SchedulePage } from "./pages/SchedulePage";
import { SetupGuidePage } from "./pages/SetupGuidePage";
import ProtectedAdminPage from "./pages/AdminPage";
import ProtectedAttendancePage from "./pages/AttendancePage";
import { ForgotPasswordPage } from "./pages/ForgotPasswordPage";
import { ResetPasswordPage } from "./pages/ResetPasswordPage";
import { NotFoundPage } from "./pages/NotFoundPage";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      Component: Root,
      children: [
        { index: true, Component: HomePage },
        { path: "about", Component: AboutPage },
        { path: "classes", Component: ClassesPage },
        { path: "retreats", Component: RetreatsPage },
        // { path: "blog", Component: BlogPage },
        // { path: "blog/:slug", Component: BlogPostPage },
        { path: "contact", Component: ContactPage },
        { path: "schedule", Component: SchedulePage },
        // { path: "setup-guide", Component: SetupGuidePage },
        // { path: "admin", Component: ProtectedAdminPage },
        // { path: "attendance", Component: ProtectedAttendancePage },
        // { path: "forgot-password", Component: ForgotPasswordPage },
        // { path: "reset-password", Component: ResetPasswordPage },
        { path: "*", Component: NotFoundPage },
      ],
    },
  ],
  {
    future: {
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true,
    },
  },
);