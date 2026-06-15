import { LoginForm } from "@/components/loginPage/loginForm";
import { Suspense } from "react";

export default function Login() {
    return (
        <div className="flex items-center justify-center h-full bg-background px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-sm space-y-8">
                <div className="text-center">
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">
                        Welcome back
                    </h1>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Please enter your details to sign in to your account.
                    </p>
                </div>
                <Suspense fallback={<div>Loading...</div>}>
                    <LoginForm />
                </Suspense>
            </div>
        </div>
    );
}