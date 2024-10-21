import "../styles/globals.css";
import NavBar from "../components/Navbar"

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body>
        <NavBar/>
        {children}
      </body>
    </html>
  );
}
