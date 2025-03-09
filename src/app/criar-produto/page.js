'use client'

import React, { useState } from 'react';
import styles from '../../styles/CRUDProduto.module.css';
import { useRouter } from 'next/navigation';

export default function CriarProduto() {
    const [formData, setFormData] = useState({
        name: '',
        peso: '',
        preco: '',
        imagem: '',
        tipo: ''
    });

    const [previewImage, setPreviewImage] = useState(null); // Estado para pré-visualização da imagem

    const handleChange = (e) => {
        const { name, value } = e.target;
        const newValue = name === 'preco' ? value.replace(/,/g, '.') : value;
        setFormData({ ...formData, [name]: newValue });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result); // Atualiza a pré-visualização da imagem
                setFormData({ ...formData, imagem: reader.result }); // Salva a imagem convertida para base64
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isNaN(formData.preco) || (formData.preco.includes('.') && formData.preco.split('.')[1].length !== 2)) {
                throw new Error('O preço deve ser um número no formato "1,23"');
            }

            const res = await fetch('/api/products', {
                method: 'POST',
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(formData)
            });

            const data = await res.json();
            if (res.ok) {
                alert(data.message);
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            alert(error);
        }
    };

    const router = useRouter();

    return (
        <main>
            <button className={styles.button} style={styles_local.button} onClick={() => router.push('/editar-produto')}>Voltar</button>
            <h1 className='tipo_cardapio'>Criar um produto</h1>
            <div>
                <form onSubmit={handleSubmit} className={styles.form_container}>
                    <label htmlFor="name" className={styles.text}>Nome do produto:</label>
                    <input type="text" name="name" onChange={handleChange} required className={styles.input} />

                    <label htmlFor="peso" className={styles.text}>Peso:</label>
                    <input type="text" name="peso" onChange={handleChange} required className={styles.input} />

                    <label htmlFor="preco" className={styles.text}>Preço:</label>
                    <input type="text" name="preco" onChange={handleChange} required className={styles.input} />

                    <label htmlFor="imagem" className={styles.text}>Upload da imagem:</label>
                    <input type="file" accept="image/*" onChange={handleImageChange} required className={styles.input} />

                    {previewImage && (
                        <div>
                            <p>Pré-visualização da imagem:</p>
                            <img src={previewImage} alt="Imagem do produto" className={styles.preview} />
                        </div>
                    )}

                    <label htmlFor="tipo" className={styles.text}>Tipo:</label>
                    <select
                        name="tipo"
                        onChange={handleChange}
                        value={formData.tipo}
                        required
                        className={styles.input}
                    >
                        <option value="" disabled>Selecione um tipo</option>
                        <option value="Queijos" className={styles.options}>Queijos</option>
                        <option value="Búfala" className={styles.options}>Búfala</option>
                        <option value="Zero Lactose" className={styles.options}>Zero Lactose</option>
                        <option value="Doces" className={styles.options}>Doces</option>
                        <option value="Variedades" className={styles.options}>Variedades</option>
                    </select>

                    <button type="submit" className={styles.button}>Criar produto</button>
                </form>
            </div>
        </main>
    );
}

const styles_local = {
    button: {
        display: 'block',
    }
};
