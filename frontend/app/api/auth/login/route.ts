import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const body = await req.json();

    const response = await fetch(
        process.env.NEXT_PUBLIC_BACKEND_URL + "/auth/login",
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        },
    );

    const data = await response.json();

    const nextResponse = NextResponse.json(data, { status: response.status });

    if (response.ok) {
        nextResponse.cookies.set("token", data.token, {
            httpOnly: true,
            secure: true,
            sameSite: "lax",
            maxAge: 24 * 60 * 60 * 1000,
            path: "/",
        });
    }

    return nextResponse;
}
