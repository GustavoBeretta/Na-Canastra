import { NextResponse } from 'next/server';
import connectDatabase from '../../../lib/db';
import Product from '../../../models/product';

export async function GET() {
  try {
    await connectDatabase();
    const products = await Product.find();
    return NextResponse.json({ products });
  } catch (error) {
    console.error('Database fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

export async function POST(request) {
  const formData = await request.json()
  try {
    await connectDatabase();
    await Product.create(formData)
    return NextResponse.json({ message: 'Product created' });
  } catch (error) {
    console.error( error);
    return NextResponse.json({ error: 'Failed to create the product' }, { status: 500 });
  }
}
