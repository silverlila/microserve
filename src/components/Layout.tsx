import React from "react";

export default function Layout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>My Website</title>
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body className="bg-red-100 text-gray-900 flex flex-col gap-10 min-h-screen container mx-auto">
        <header className="flex justify-between items-center py-4">
          <a href="/" className="text-3xl font-bold">
            My Website
          </a>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <a href="/" className="hover:underline">
                  Home
                </a>
              </li>
              <li>
                <a href="/test" className="hover:underline">
                  Test Page
                </a>
              </li>
            </ul>
          </nav>
        </header>
        <main className="flex-grow">{children}</main>
        <footer className="py-4">
          <p>© 2023 My Website</p>
        </footer>
      </body>
    </html>
  );
}
