'use client'

import React, { useState } from 'react';
import styles from '../../styles/CRUDProduto.module.css';
import { useRouter } from 'next/navigation';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { app } from '../../lib/firebaseConfig';

export default function CriarProduto() {
    const [formData, setFormData] = useState({
        name: '',
        peso: '',
        preco: '',
        imagem: null,
        tipo: '',
        urlImagem: '',
        caminhoImagem: ''
    });
    const [uploading, setUploading] = useState(false);
    const router = useRouter();

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'imagem') {
          setFormData({ ...formData, imagem: files[0] });
        } else {
          setFormData({ ...formData, [name]: value });
        }
      };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setUploading(true);
          
            const storage = getStorage(app);
            const filePath = `${Date.now()}_${formData.imagem.name}`
            const imageRef = ref(storage, filePath);
            await uploadBytes(imageRef, formData.imagem);
            const downloadURL = await getDownloadURL(imageRef);

            const payload = { 
                ...formData, 
                urlImagem: downloadURL, 
                caminhoImagem: filePath 
            };
            
            const res = await fetch('/api/products', {
                method: 'POST',
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(payload)
            });
    
            const data = await res.json();
            if (res.ok) {
                alert(data.message)
                router.push('/editar-produto');
            } else {
                throw new Error(data.message)
            }
        } catch(error) {
            alert(error.message);
        } finally {
            setUploading(false)
        }
    };

    return (
        <main>
        <button className={styles.button} style={styles_local.button} onClick={() => router.push('/editar-produto')}>Voltar</button>
        <h1 className='tipo_cardapio'>Criar um produto</h1>
        <div>
            <form onSubmit={handleSubmit} className={styles.form_container}>
                <label htmlFor="name" className={styles.text}>Nome do produto:</label>
                <input type="text" name="name" onChange={handleChange} required className={styles.input}/>

                <label htmlFor="peso" className={styles.text}>Peso:</label>
                <input type="text" name="peso" onChange={handleChange} required className={styles.input}/>

                <label htmlFor="preco" className={styles.text}>Preço:</label>
                <input type="text" name="preco" onChange={handleChange} required className={styles.input}/>

                <label htmlFor="imagem" className={styles.text}>Selecione a imagem:</label>
                <input type="file" name="imagem" onChange={handleChange} accept="image/*" required />

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

                <button type="submit" className={styles.button} disabled={uploading}>
                    {uploading ? 'Criando...' : 'Criar produto'}
                </button>
            </form>
        </div>
        </main>
    );
}

const styles_local = {
    button: {
        display: 'block',
    }
}