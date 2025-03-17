import {PrismaClient, Prisma} from "@prisma/client";
import bcrypt from "bcryptjs";
import {NextRequest, NextResponse} from "next/server";
import hashesCreateInput = Prisma.hashesCreateInput;

export async function GET() {
    try {
        const prismaClient = new PrismaClient();
        const users = await prismaClient.users.findMany()
        prismaClient.$disconnect()
        return NextResponse.json({users}, {status: 200})
    } catch (err) {
        return NextResponse.json({error: err}, {status: 401});
    }

}

export async function POST(req: NextRequest) {
    try {
        const data: Prisma.usersCreateInput & Prisma.hashesCreateInput = (await req.json()) satisfies Prisma.usersCreateInput & hashesCreateInput;
        const salt = await bcrypt.genSalt(4);
        data.pass_hash = await bcrypt.hash(data.pass_hash, salt);
        const prismaClient = new PrismaClient();
        const createdUser = await prismaClient.users.create({
            data: {
                first_name: data.first_name,
                last_name: data.last_name,
                email: data.email,
                bio: data.bio,
            }
        });
        await prismaClient.hashes.create({
            data: {
                pass_hash: data.pass_hash,
            }
        })
        prismaClient.$disconnect()
        return NextResponse.json({createdUser}, {status: 200})
    } catch (err) {
        return NextResponse.json({error: err}, {status: 401});
    }
}