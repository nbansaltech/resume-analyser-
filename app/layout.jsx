// app/layout.jsx
import "./globals.css";


export const metadata = {
  title: "AI Resume Analyzer",
  description: "Built by Nishant Bansal – Analyze your resume with AI instantly",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 min-h-screen">
        {children}
        <footer className="text-center py-4 text-sm text-gray-500 border-t mt-8">
          © {new Date().getFullYear()} Built by <b>Nishant Bansal</b>
        </footer>
      </body>
    </html>
  );
}
