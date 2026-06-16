import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    const resolvedParams = await params;

    const body = await req.json();

    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/${resolvedParams.path.join('/')}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...(token && { Cookie: `token=${token}` }),
        },
        body: JSON.stringify(body),
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    const resolvedParams = await params;

    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/${resolvedParams.path.join('/')}`, {
        method: "GET",
        headers: {
            ...(token && { Cookie: `token=${token}` }),
        },
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
}
