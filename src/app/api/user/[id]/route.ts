import {PrismaClient, Prisma} from "@prisma/client";
import {NextResponse} from "next/server";

export async function GET({ params }: { params: Promise<{ id: string }> }) {
    const {id} =  await params;
    const prismaClient = new PrismaClient();
    const user = await prismaClient.users.findUnique({where : {id: +id}})
    prismaClient.$disconnect()
    if(!user) return NextResponse.json({error: 'User not found', status: 401});
    return NextResponse.json({user, status: 200})
}
export async function PUT(){
    const prismaClient = new PrismaClient();

   //TODO
    // const {id} =  await params;

    // const prismaClient = new PrismaClient();
    // const data = await req.json();
}