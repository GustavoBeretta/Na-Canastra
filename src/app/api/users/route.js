import { NextResponse } from "next/server";
import connectMongoDB from "../../../lib/db"
import Users from "../../../models/user";

// função POST para criar users
export async function POST(request) {
    // const { name, email, password, gender, shoeSize, age, weight, height, role } = await request.json();
    const{ email, password} = await request.json();
    await connectMongoDB();
    await Users.create({email, password});
    //await Users.create({name, email, password, gender, shoeSize, age, weight, height, role});
    return NextResponse.json({message: "User created"}, {status: 201})
}

// função GET para obter os users
export async function GET() {
    await connectMongoDB();
    const users = await Users.find();
    return NextResponse.json({ users });
}

// função DELETE para excluir users
export async function DELETE(request) {
    const id = request.nextUrl.searchParams.get("id");
    await connectMongoDB();
    await Users.findByIdAndDelete(id)
    return NextResponse.json({message: "User deleted"}, {status: 200})
}