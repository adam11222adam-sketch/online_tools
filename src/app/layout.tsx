import './globals.css';

// This root layout exists only to satisfy Next.js requirement.
// The actual root layout with locale is in [locale]/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
