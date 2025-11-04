export const metadata = {
  title: "AI Resume Analyzer",
  description: "Mock AI Resume Analyzer built with Next.js and Tailwind CSS",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col items-center justify-center p-6">
        {children}
        <footer className="mt-10 text-sm text-gray-500">
          © 2025 Built by <span className="font-semibold">Your Name</span>
        </footer>
      </body>
    </html>
  );
}
