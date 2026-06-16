"use client";
import { MdOutlineMail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Field,
    FieldLabel,
} from "@/components/ui/field";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { loginSubmit } from "@/service/auth.service";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

const messages = {
    session_expired: "Session expired, please login again.",
    blocked: "You are blocked, please contact admin.",
    unknown: "Something went wrong, please try again later.",
}

export function LoginForm() {
    const searchParams = useSearchParams();

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [validationErros, setValidationErros] = useState({ email: '', password: '' })
    const router = useRouter();

    useEffect(() => {
        const error = searchParams.get('error');
        if (error) {
            toast.error(messages[error as keyof typeof messages] || "Something went wrong!");
        }
    }, [searchParams])

    const onSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const response = await loginSubmit({ e, setValidationErros });
        if (!response) return;

        const data = await response.json();
        if (!response.ok) {
            toast.error(data.message || "Something went wrong!")
            setLoading(false);
            return;
        };

        setLoading(false);
        toast.success(data.message || "Login successful!");

    }

    return <>
        <div className="mt-8 space-y-6">
            <form className="flex flex-col gap-8" onSubmit={onSubmit}>
                <div className="space-y-4">
                    <Field>
                        <FieldLabel htmlFor="email" className="text-sm font-medium">Email</FieldLabel>
                        <InputGroup>
                            <InputGroupInput id="email" name="email" type="email" placeholder="name@example.com" />
                            <InputGroupAddon align="inline-start">
                                <MdOutlineMail className="text-muted-foreground" />
                            </InputGroupAddon>
                        </InputGroup>
                        {validationErros.email && <p className="text-red-500">{validationErros.email}</p>}
                    </Field>

                    <Field>
                        <FieldLabel htmlFor="password" className="text-sm font-medium">Password</FieldLabel>
                        <InputGroup>
                            <InputGroupInput id="password" name="password" type={showPassword ? "text" : "password"} placeholder="••••••••" />
                            <InputGroupAddon align="inline-start" >
                                <RiLockPasswordLine className="text-muted-foreground" />
                            </InputGroupAddon>
                        </InputGroup>
                        {validationErros.password && <p className="text-red-500">{validationErros.password}</p>}
                    </Field>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Checkbox id="show-password" name="show-password" checked={showPassword} onCheckedChange={() => setShowPassword(!showPassword)} />
                        <Label
                            htmlFor="show-password"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Show Password
                        </Label>
                    </div>
                </div>

                <Button className="w-full bg-sky-600 hover:bg-sky-700 text-white transition-colors" size="lg"
                    disabled={loading}
                >
                    Sign in
                </Button>
            </form>

            <p className="text-center text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link href={'/register'} className="font-semibold leading-6 text-sky-600 hover:text-sky-500 transition-colors">
                    Register
                </Link>
            </p>
        </div>
    </>
}