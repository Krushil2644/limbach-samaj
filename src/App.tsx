import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Suspense, lazy, useMemo } from "react";
import AppShell from "@/AppShell";
import { routes } from "@/routes";

const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-[400px]">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
  </div>
);

const App = () => {
  // Lazy in the browser only — the prerenderer resolves these eagerly so the
  // static HTML contains real markup rather than the spinner.
  const lazyRoutes = useMemo(
    () => routes.map((route) => ({ path: route.path, Component: lazy(route.load) })),
    [],
  );

  return (
    <HelmetProvider>
      <BrowserRouter>
        <AppShell>
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              {lazyRoutes.map(({ path, Component }) => (
                <Route key={path} path={path} element={<Component />} />
              ))}
            </Routes>
          </Suspense>
        </AppShell>
      </BrowserRouter>
    </HelmetProvider>
  );
};

export default App;
