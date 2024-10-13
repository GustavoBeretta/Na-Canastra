import Image from "next/image"
import WhatsIcon from "public\whats_icon.png"

export default function Navbar() {

    return(
        <header class="header">
            <nav class="nav">
                <h1 id="title">Na Canastra</h1>
                <div class="buttons">
                    <a
                        href="https://wa.me/553799077244"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="contato whats_mobile"
                    >
                        <img
                            src={WhatsIcon}
                            alt="WhatsApp"
                        />
                    </a>
                    <button class="hamburger"></button>
                </div>
                <ul class="nav-list">
                    <li><a href="index.html">Queijos</a></li>
                    <li><a href="bufala.html">Búfala</a></li>
                    <li><a href="zero_lactose.html">Zero Lactose</a></li>
                    <li><a href="doces.html">Doces</a></li>
                    <li><a href="variedades.html">Variedades</a></li>
                </ul>
                <a
                    href="https://wa.me/553799077244"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="contato whats_web"
                >
                        <img
                            src={WhatsIcon}
                            alt="WhatsApp"
                        />
                </a>
            </nav>
        </header>
    )
}