import { RegisterForm } from "@/components/registerPage/registerForm";

export default function Register() {
    return (
        <div className="flex items-center justify-center h-full bg-background px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-sm space-y-8">
                <div className="text-center">
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">
                        Welcome!
                    </h1>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Let's create and set up your account.
                    </p>
                </div>
                <RegisterForm />
            </div>
        </div>
    );
}