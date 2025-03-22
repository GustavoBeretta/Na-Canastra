'use client'

import { useState, useEffect } from 'react';
import styles from '../../../styles/CRUDProduto.module.css';
import { useRouter } from 'next/navigation'
import { getStorage, ref, deleteObject, uploadBytes, getDownloadURL } from "firebase/storage";
import { app } from '../../../lib/firebaseConfig';

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
        imagem: null,
        tipo: '',
        urlImagem: '',
        caminhoImagem: ''
    });
    const [isLoading, setIsLoading] = useState(true);
    const [uploading, setUploading] = useState(false);

    const router = useRouter()

    const { id } = params

    useEffect(() => {
        const fetchProduct = async (id) => {
          const product = await getProduct(id);
          if (product === null) {
              router.push('/editar-produto')
              return
          }
          product.preco = String((product.preco/100).toFixed(2))
          setFormData(product);
          setIsLoading(false);
        };
        
        fetchProduct(id);
    }, []);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'imagem') {
          setFormData({ ...formData, imagem: files[0] });
        } else {
          const newValue = name === 'preco' ? value.replace(/,/g, '.') : value;
          setFormData({ ...formData, [name]: newValue });
        }
      };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (isNaN(formData.preco) || (formData.preco.includes('.') && formData.preco.split('.')[1].length != 2)) {
                throw new Error('O preço deve ser um número no formato "1.23"');
            }

            setUploading(true);

            let payload = formData;

            if (formData.imagem) {
                const storage = getStorage(app);
                const filePath = `${Date.now()}_${formData.imagem.name}`
                let imageRef = ref(storage, filePath);
                await uploadBytes(imageRef, formData.imagem);
                const downloadURL = await getDownloadURL(imageRef);
                
                imageRef = ref(storage, formData.caminhoImagem);
                deleteObject(imageRef)
                    .catch((error) => {
                        throw new Error(error.message);
                    });
                
                payload = { 
                ...formData, 
                urlImagem: downloadURL, 
                caminhoImagem: filePath 
                };
            }

            const res = await fetch(`/api/products/${id}`, {
                method: 'PUT',
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(payload)
            })

            const data = await res.json()
            if (res.ok) {
                alert(data.message)
            } else {
                throw new Error(data.message)
            }
        } catch(error) {
            alert(error)
        } finally {
            setUploading(false)
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
                    const storage = getStorage(app);
                    const imageRef = ref(storage, formData.caminhoImagem);

                    deleteObject(imageRef)
                        .then(() => {
                            alert(data.message)
                            router.push('/editar-produto')
                        })
                        .catch(async (error) => {
                            throw new Error(error.message);
                        });  
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
        <button className={styles.button} style={styles_local.button} onClick={() => router.push('/editar-produto')}>Voltar</button>
        <h1 className='tipo_cardapio'>Editar ou excluir um produto</h1>
        <div>
            <form onSubmit={handleSubmit} className={styles.form_container}>
                <label htmlFor="name" className={styles.text}>Nome do produto:</label>
                <input type="text" name="name" onChange={handleChange} required className={styles.input} value={formData.name}/>

                <label htmlFor="peso" className={styles.text}>Peso:</label>
                <input type="text" name="peso" onChange={handleChange} required className={styles.input} value={formData.peso}/>

                <label htmlFor="preco" className={styles.text}>Preço:</label>
                <input type="text" name="preco" onChange={handleChange} required className={styles.input} value={formData.preco}/>

                <label htmlFor="imagem" className={styles.text}>Selecione a imagem:</label>
                <input type="file" name="imagem" onChange={handleChange} accept="image/*" />

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
                    {uploading ? 'Salvando...' : 'Salvar'}
                </button>

                <button type="button" onClick={removeProduct} className={styles.button} disabled={uploading}>Excluir produto</button>
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