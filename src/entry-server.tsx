import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { Routes, Route } from "react-router-dom";
import { HelmetProvider, type HelmetServerState } from "react-helmet-async";
import AppShell from "@/AppShell";
import { routes, prerenderPaths } from "@/routes";

export { prerenderPaths };

export type RenderResult = {
  html: string;
  head: string;
  htmlAttributes: string;
  bodyAttributes: string;
};

export async function render(url: string): Promise<RenderResult> {
  // Resolve every route component up front. renderToString has no async
  // boundary, so an unresolved React.lazy would render its fallback.
  const resolved = await Promise.all(
    routes.map(async (route) => ({
      path: route.path,
      Component: (await route.load()).default,
    })),
  );

  const helmetContext: { helmet?: HelmetServerState } = {};

  const html = renderToString(
    <HelmetProvider context={helmetContext}>
      <StaticRouter location={url}>
        <AppShell>
          <Routes>
            {resolved.map(({ path, Component }) => (
              <Route key={path} path={path} element={<Component />} />
            ))}
          </Routes>
        </AppShell>
      </StaticRouter>
    </HelmetProvider>,
  );

  const { helmet } = helmetContext;

  return {
    html,
    head: [
      // `prioritizeSeoTags` splits title/canonical/description/og tags into
      // this bucket — omitting it silently drops the most important tags.
      helmet?.priority.toString(),
      helmet?.title.toString(),
      helmet?.meta.toString(),
      helmet?.link.toString(),
      helmet?.script.toString(),
    ]
      .filter(Boolean)
      .join("\n    "),
    htmlAttributes: helmet?.htmlAttributes.toString() ?? "",
    bodyAttributes: helmet?.bodyAttributes.toString() ?? "",
  };
}
