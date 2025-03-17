import {PrismaClient, Prisma} from "@prisma/client";
import {NextRequest, NextResponse} from "next/server";

export async function GET({params}: { params: Promise<{ id: string }> }) {
    try {
        const {id} = await params;
        const prismaClient = new PrismaClient();
        const user = await prismaClient.users.findUnique({where: {id: +id}})
        prismaClient.$disconnect()
        if (!user) return NextResponse.json({error: 'User not found', status: 404});
        return NextResponse.json({user, status: 200})
    } catch (err) {
        return NextResponse.json({error: err, status: 401});
    }

}

export async function PUT(req: NextRequest, {params}: { params: Promise<{ id: string }> }) {
    try {
        const data: Prisma.usersUpdateInput = (await req.json()) satisfies Prisma.usersUpdateInput;
        const {id} = await params;
        const prismaClient = new PrismaClient();
        const updatedUser = await prismaClient.users.update({where: {id: +id}, data: data});
        prismaClient.$disconnect()
        return NextResponse.json({updatedUser, status: 200})
    } catch (err) {
        return NextResponse.json({error: err, status: 401});
    }
}