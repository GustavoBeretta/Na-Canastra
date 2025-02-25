'use client'

import Link from 'next/link';
import { useState, useEffect } from 'react';
import styles from '../styles/Navbar.module.css';
import { FaWhatsapp, FaBars, FaTimes } from 'react-icons/fa';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(prev => !prev);
  };
  
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
  }, [isOpen]);

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
          <li>
            <Link href="/" onClick={() => setIsOpen(false)}>
              Queijos
            </Link>
          </li>
          <li>
            <Link href="/bufala" onClick={() => setIsOpen(false)}>
              Búfala
            </Link>
          </li>
          <li>
            <Link href="/zero-lactose" onClick={() => setIsOpen(false)}>
              Zero Lactose
            </Link>
          </li>
          <li>
            <Link href="/doces" onClick={() => setIsOpen(false)}>
              Doces
            </Link>
          </li>
          <li>
            <Link href="/variedades" onClick={() => setIsOpen(false)}>
              Variedades
            </Link>
          </li>
        </ul>
      
      </nav>

    </header>
  );
}
