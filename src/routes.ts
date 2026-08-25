import type { ComponentType } from "react";

export type RouteDef = {
  path: string;
  load: () => Promise<{ default: ComponentType }>;
  /** Written to disk as static HTML at build time. */
  prerender: boolean;
};

/**
 * Single source of truth for the app's routes.
 *
 * The client wraps each `load` in React.lazy for code splitting; the
 * prerenderer awaits them directly, because renderToString would otherwise
 * emit the Suspense fallback instead of the page.
 */
export const routes: RouteDef[] = [
  { path: "/", load: () => import("./pages/Home"), prerender: true },
  { path: "/about", load: () => import("./pages/About"), prerender: true },
  { path: "/events", load: () => import("./pages/Events"), prerender: true },
  { path: "/gallery", load: () => import("./pages/Gallery"), prerender: true },
  { path: "/sponsorship", load: () => import("./pages/Sponsorship"), prerender: true },
  { path: "/donate", load: () => import("./pages/Donate"), prerender: true },
  { path: "/contact", load: () => import("./pages/Contact"), prerender: true },
  // Hidden from navigation and marked noindex, but still prerendered so the
  // routes resolve for anyone holding a direct link.
  { path: "/membership", load: () => import("./pages/Membership"), prerender: true },
  { path: "/volunteer", load: () => import("./pages/Volunteer"), prerender: true },
  { path: "/news", load: () => import("./pages/News"), prerender: true },
  { path: "*", load: () => import("./pages/NotFound"), prerender: false },
];

export const prerenderPaths = routes
  .filter((route) => route.prerender)
  .map((route) => route.path);
