import { Providers } from './providers'
import "../styles/globals.css";

export const metadata = {
  title: "Flippando gateway",
  description: "The entry point to Flippando universe",
};

export default function RootLayout({ children }) {
  return (
    <Providers >
    {children}
    </Providers>
  );
}
