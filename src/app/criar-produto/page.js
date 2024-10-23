'use client'

import React, { useState } from 'react';

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
            console.log(typeof(formData))
            console.log(formData)
            const res = await fetch('/api/products', {
                method: 'POST',
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(formData)
            })

            if (res.ok) {
                alert('Produto criado com sucesso')
            } else {
                throw new Error('Erro ao criar produto')
            }
        } catch(error) {
            alert(error)
        }

        alert('Cadastro realizado com sucesso!');
    };

    return (
        <main>
        <h1 className='tipo_cardapio'>Criar um produto</h1>
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Nome do produto:</label>
                <input type="text" name="name" onChange={handleChange} required/>

                <label htmlFor="peso">Peso:</label>
                <input type="text" name="peso" onChange={handleChange} required/>

                <label htmlFor="preco">Preço:</label>
                <input type="text" name="preco" onChange={handleChange} required/>

                <label htmlFor="imagem">Link da imagem:</label>
                <input type="text" name="imagem" onChange={handleChange} required/>

                <label htmlFor="tipo">Tipo:</label>
                <select
                    name="tipo"
                    onChange={handleChange}
                >
                    <option value="Queijos">Queijos</option>
                    <option value="Búfala">Búfala</option>
                    <option value="Zero Lactose">Zero Lactose</option>
                    <option value="Doces">Doces</option>
                    <option value="Variedades">Variedades</option>
                </select>

                <button type="submit">Criar produto</button>
            </form>
        </div>
        </main>
    );
}