'use client'

import Link from 'next/link';
import { useState } from 'react';
import styles from '../styles/Navbar.module.css';
import { FaWhatsapp, FaBars, FaTimes } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();

  function RedirectQueijos() {
    router.push('/')
  }

  function RedirectBufala() {
    router.push('/bufala')
  }

  function RedirectZeroLactose() {
    router.push('/zero-lactose')
  }

  function RedirectDoces() {
    router.push('/doces')
  }

  function RedirectVariedades() {
    router.push('/variedades')
  }


  const toggleMenu = () => {
    setIsOpen(!isOpen);
    document.body.style.overflow = isOpen ? 'auto' : 'hidden';
  };
  

  return (
    <header className={styles.header}>

      <nav className={styles.nav}>

        <h1 className={styles.title}>Na Canastra</h1>

        <div className={styles.buttons}>

          <a 
            href="https://wa.me/553799077244" 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label="Whatsapp"
          >
            <FaWhatsapp size={35} />
          </a>

          <button 
            className={styles.hamburger} 
            onClick={toggleMenu} 
            aria-label="Menu"
          >
            {isOpen ? <FaTimes size={30} /> : <FaBars size={30} />}
          </button>

        </div>

        <ul className={`${styles.nav_list} ${isOpen ? styles.open : ''}`}>
            <li><Link href="/">Queijos</Link></li>
            <li><Link href="/bufala">Búfala</Link></li>
            <li><Link href="/zero-lactose">Zero Lactose</Link></li>
            <li><Link href="/doces">Doces</Link></li>
            <li><Link href="/variedades">Variedades</Link></li>
        </ul>
      
      </nav>

    </header>
  );
}
