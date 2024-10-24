'use client'

import { useState, useEffect } from 'react';
import styles from '../../../styles/CRUDProduto.module.css';
import { useRouter } from 'next/navigation'

const getProduct= async (id) => {
    try {
        const res = await fetch(`/api/products/${id}`, { cache: "no-store" })
        const data = await res.json()
        if (!res.ok) {
            throw new Error(data.message);
        }
        return data.product
    } catch (error) {
        alert(error)
        return null
    }
}

export default function EditarProduto({ params }) {

    const [formData, setFormData] = useState({
        name: '',
        peso: '',
        preco: '',
        imagem: '',
        tipo: ''
    });

    const [isLoading, setIsLoading] = useState(true);

    const router = useRouter()

    const { id } = params

    useEffect(() => {
        const fetchProduct = async (id) => {
          const product = await getProduct(id);
          setFormData(product);
          setIsLoading(false);
        };
        
        fetchProduct(id);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(`/api/products/${id}`, {
                method: 'PUT',
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

    const removeProduct = async () => {
        const confirmed = confirm('Deseja excluir este produto?')

        if (confirmed) {
            try{
                const res = await fetch(`/api/products?id=${id}`, {
                    method: "DELETE"
                })

                const data = await res.json()
                if (res.ok) {
                    alert(data.message)
                    router.push('/editar-produto')
                } else {
                    throw new Error(data.message)
                }
            } catch (error) {
                alert (error)
            } 
        }
    }

    if (isLoading) {
        return <p>Carregando...</p>;
    }

    return (
        <main>
        <h1 className='tipo_cardapio'>Editar ou excluir um produto</h1>
        <div>
            <form onSubmit={handleSubmit} className={styles.form_container}>
                <label htmlFor="name" className={styles.text}>Nome do produto:</label>
                <input type="text" name="name" onChange={handleChange} required className={styles.input} value={formData.name}/>

                <label htmlFor="peso" className={styles.text}>Peso:</label>
                <input type="text" name="peso" onChange={handleChange} required className={styles.input} value={formData.peso}/>

                <label htmlFor="preco" className={styles.text}>Preço:</label>
                <input type="text" name="preco" onChange={handleChange} required className={styles.input} value={formData.preco}/>

                <label htmlFor="imagem" className={styles.text}>Link da imagem:</label>
                <input type="text" name="imagem" onChange={handleChange} required className={styles.input} value={formData.imagem}/>

                <label htmlFor="tipo" className={styles.text}>Tipo:</label>
                <select
                    name="tipo"
                    onChange={handleChange}
                    className={styles.input}
                    value={formData.tipo}
                >
                    <option value="Queijos" className={styles.options}>Queijos</option>
                    <option value="Búfala" className={styles.options}>Búfala</option>
                    <option value="Zero Lactose" className={styles.options}>Zero Lactose</option>
                    <option value="Doces" className={styles.options}>Doces</option>
                    <option value="Variedades" className={styles.options}>Variedades</option>
                </select>

                <button type="submit" className={styles.button}>Editar produto</button>

                <button type="button" onClick={removeProduct} className={styles.button}>Excluir produto</button>
            </form>
        </div>
        </main>
    );
}