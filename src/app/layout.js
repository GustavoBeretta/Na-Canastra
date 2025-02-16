import "../styles/globals.css";
import NavBar from "../components/Navbar"
import { AuthProvider } from './Providers'

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <head>
        <title>Na Canastra</title>
        <link rel="icon" href="/Logo.jpeg" />
      </head>
      <body>
        <AuthProvider>
          <NavBar/>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
