import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Image from "next/image";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "User Management System | Login",
    description: "User Management System Login",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
        >
            <body className="h-screen flex">
                <div className="flex-1">
                    {children}
                </div>
                <div className="flex-1 relative h-full">
                    <Image
                        src="/auth_right.jpg"
                        alt="Login page image"
                        fill
                        className="object-cover"
                    />
                </div>
            </body>
        </html>
    );
}
