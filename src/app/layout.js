import "./globals.css";

export const metadata = {
  title: "Open Recruitment Staf TASIS 2025/2026",
  description: "Form pendaftaran staff TASIS (Tata Tertib Siswa) periode 2025/2026",
  viewport: "width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes",
  themeColor: "#0d1216",
  icons: {
    icon: '/logo.svg',
    apple: '/logo.svg',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes" />
        <meta name="theme-color" content="#0d1216" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className="antialiased" style={{ fontFamily: 'ui-sans-serif, sans-serif' }}>
        {children}
      </body>
    </html>
  );
}
