// app/layout.js
import Head from "next/head";

function RootLayout({ children }) {
  return (
    <html lang='en'>
      <Head>
        <script defer src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "75b28db06fcd4f898c2cfc5ba549ea78"}'></script>
      </Head>
      <body>
      {children}
      </body>
      
    </html>
  );
}

export default RootLayout;
