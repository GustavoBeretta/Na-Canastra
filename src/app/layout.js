import "../styles/globals.css";
import NavBar from "../components/Navbar"

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <head>
        <title>Na Canastra</title>
        <link rel="icon" href="/Logo.jpeg" />
      </head>
      <body>
        <NavBar/>
        {children}
      </body>
    </html>
  );
}
