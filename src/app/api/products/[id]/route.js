import connectDatabase from "@/lib/db";
import Product from "@/models/product";
import { NextResponse } from "next/server";

export async function PUT(request, {params}) {
    try {
        const { id } = params
        const formData = await request.json()
        await connectDatabase()
        await Product.findByIdAndUpdate(id, formData)
        return NextResponse.json({ message: 'Produto atualizado'})
    } catch(error) {
        console.log(error)
        return NextResponse.json({ message: 'Erro ao atualizar o produto' }, { status: 500 });
    }
}

export async function GET(request, {params}) {
    try {
        const { id } = params
        await connectDatabase()
        const product = await Product.findById(id)
        return NextResponse.json({ product })
    } catch(error) {
        console.log(error)
        return NextResponse.json({ message: 'Erro ao buscar o produto' }, { status: 500 });
    }
}