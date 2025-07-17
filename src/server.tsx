import path from "node:path";
import { fileURLToPath } from "node:url";
import { promises as fs, existsSync } from "node:fs";
import { statSync } from "node:fs";

import { renderToReadableStream } from "react-dom/server";
import { FileSystemRouter } from "bun";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, "./pages");
const publicDir = path.join(__dirname, "../public");

async function renderComponent(filePath: string, props: Record<string, any>) {
  const source = await fs.readFile(filePath, "utf-8");

  if (source.includes('"use client"')) {
    const name = path.basename(filePath).replace(/\.(tsx|jsx)$/, "");
    return (
      <div
        data-island={name}
        data-props={encodeURIComponent(JSON.stringify(props || {}))}
        id={`island-${Math.random().toString(36).slice(2)}`}
      ></div>
    );
  } else {
    const { default: Component } = await import(`file://${filePath}`);
    return <Component {...props} />;
  }
}

Bun.serve({
  port: 3000,
  async fetch(request: Request) {
    const url = new URL(request.url);
    const staticPath = path.join(publicDir, url.pathname);
    // Static assets handling
    if (existsSync(staticPath) && statSync(staticPath).isFile()) {
      return new Response(Bun.file(staticPath));
    }

    const router = new FileSystemRouter({
      dir: rootDir,
      style: "nextjs",
    });

    const route = router.match(request);
    if (!route || !route.filePath) {
      return new Response("404 Not Found", { status: 404 });
    }

    const Component = await renderComponent(route.filePath, route.params);

    const stream = await renderToReadableStream(Component, {
      bootstrapScripts: ["/main.js"],
      onError(err) {
        console.error("React RSC error", err);
      },
    });

    const controlledStream = new ReadableStream({
      async start(controller) {
        const reader = stream.getReader();
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          controller.enqueue(value);
        }
        controller.close();
      },
    });

    return new Response(controlledStream);
  },
});

console.log("Microserve running with Bun at http://localhost:3000");
