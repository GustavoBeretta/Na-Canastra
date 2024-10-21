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
