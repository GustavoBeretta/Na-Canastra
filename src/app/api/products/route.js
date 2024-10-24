import { NextResponse } from 'next/server';
import connectDatabase from '../../../lib/db';
import Product from '../../../models/product';

export async function GET() {
  try {
    await connectDatabase();
    const products = await Product.find();
    return NextResponse.json({ products });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: 'Erro ao buscar os produtos' }, { status: 500 });
  }
}

export async function POST(request) {
  const formData = await request.json()
  try {
    await connectDatabase();
    await Product.create(formData)
    return NextResponse.json({ message: 'Produto criado' });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: 'Erro ao criar o produto' }, { status: 500 });
  }
}
