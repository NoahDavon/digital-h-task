import {PrismaClient, Prisma} from "@prisma/client";
import {NextRequest, NextResponse} from "next/server";
import bcrypt from "bcryptjs";

export async function GET({params}: { params: Promise<{ id: string }> }) {
    try {
        const {id} = await params;
        const prismaClient = new PrismaClient();
        const user = await prismaClient.users.findUnique({where: {id: +id}})
        prismaClient.$disconnect()
        if (!user) return NextResponse.json({error: 'User not found'}, {status: 404});
        return NextResponse.json({user}, {status: 200})
    } catch (err) {
        return NextResponse.json({error: err}, {status: 401});
    }

}

export async function PUT(req: NextRequest, {params}: { params: Promise<{ id: string }> }) {
    try {
        const data: Prisma.usersUpdateInput & Prisma.hashesUpdateInput = (await req.json()) satisfies Prisma.usersUpdateInput & Prisma.hashesUpdateInput;


        const {id} = await params;
        const prismaClient = new PrismaClient();
        const updatedUser = await prismaClient.users.update({
            where: {id: +id}, data: {
                first_name: data.first_name,
                last_name: data.last_name,
                email: data.email,
                bio: data.bio,
            }
        });
        if (data.pass_hash) {
            const salt = await bcrypt.genSalt(4);
            data.pass_hash = await bcrypt.hash(data.pass_hash as string, salt);
            await prismaClient.hashes.update({where: {id: +id}, data: {pass_hash: data.pass_hash}})
        }
        prismaClient.$disconnect()
        return NextResponse.json({updatedUser}, {status: 200})
    } catch (err) {
        return NextResponse.json({error: err}, {status: 401});
    }
}