// app/layout.js

function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body>
      {children}
      </body>
      <script defer src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "75b28db06fcd4f898c2cfc5ba549ea78"}'></script>
    </html>
  );
}

export default RootLayout;
