'use client'

import React, { useState } from 'react';
import styles from '../../styles/CriarProduto.module.css';

export default function Home() {

    const [formData, setFormData] = useState({
        name: '',
        peso: '',
        preco: '',
        imagem: '',
        tipo: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch('/api/products', {
                method: 'POST',
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(formData)
            })

            const data = await res.json()
            if (res.ok) {
                alert(data.message)
            } else {
                throw new Error(data.message)
            }
        } catch(error) {
            alert(error)
        }

    };

    return (
        <main>
        <h1 className='tipo_cardapio'>Criar um produto</h1>
        <div>
            <form onSubmit={handleSubmit} className={styles.form_container}>
                <label htmlFor="name" className={styles.text}>Nome do produto:</label>
                <input type="text" name="name" onChange={handleChange} required className={styles.input}/>

                <label htmlFor="peso" className={styles.text}>Peso:</label>
                <input type="text" name="peso" onChange={handleChange} required className={styles.input}/>

                <label htmlFor="preco" className={styles.text}>Preço:</label>
                <input type="text" name="preco" onChange={handleChange} required className={styles.input}/>

                <label htmlFor="imagem" className={styles.text}>Link da imagem:</label>
                <input type="text" name="imagem" onChange={handleChange} required className={styles.input}/>

                <label htmlFor="tipo" className={styles.text}>Tipo:</label>
                <select
                    name="tipo"
                    onChange={handleChange}
                    className={styles.input}
                >
                    <option value="Queijos" className={styles.options}>Queijos</option>
                    <option value="Búfala" className={styles.options}>Búfala</option>
                    <option value="Zero Lactose" className={styles.options}>Zero Lactose</option>
                    <option value="Doces" className={styles.options}>Doces</option>
                    <option value="Variedades" className={styles.options}>Variedades</option>
                </select>

                <button type="submit">Criar produto</button>
            </form>
        </div>
        </main>
    );
}