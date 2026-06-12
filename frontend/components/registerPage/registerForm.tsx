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
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { registerSubmit } from "@/service/auth.service";
import { useRouter } from "next/navigation";


export function RegisterForm() {
    const [validationErrors, setValidationErrors] = useState({ first_name: '', last_name: '', email: '', password: '' })
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const onSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const result = await registerSubmit({ setValidationErrors, e })
        const data = await result.json();

        if (!result.ok) {
            toast.error(data.message || "Something went wrong");
            setLoading(false);
            return;
        }

        toast.success(data.message || "Registration successful");
        setLoading(false);
        router.push("/login");
    }

    return (
        <>
            <div className="mt-8 space-y-6 overflow-y-auto">
                <form onSubmit={onSubmit} className="flex flex-col gap-8">
                    <div className="space-y-4">
                        <Field>
                            <FieldLabel htmlFor="email" className="text-sm font-medium">Email</FieldLabel>
                            <InputGroup>
                                <InputGroupInput id="email" name="email" type="email" placeholder="name@example.com" />
                                <InputGroupAddon align="inline-start">
                                    <MdOutlineMail className="text-muted-foreground" />
                                </InputGroupAddon>
                            </InputGroup>
                            {validationErrors.email && <p className="text-red-500 text-sm">{validationErrors.email}</p>}
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="first_name" className="text-sm font-medium">First Name</FieldLabel>
                            <InputGroup>
                                <InputGroupInput id="first_name" name="first_name" type="text" placeholder="First Name" />
                                <InputGroupAddon align="inline-start">
                                    <MdOutlineMail className="text-muted-foreground" />
                                </InputGroupAddon>
                            </InputGroup>
                            {validationErrors.first_name && <p className="text-red-500 text-sm">{validationErrors.first_name}</p>}
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="last_name" className="text-sm font-medium">Last Name</FieldLabel>
                            <InputGroup>
                                <InputGroupInput id="last_name" name="last_name" type="text" placeholder="Last Name" />
                                <InputGroupAddon align="inline-start">
                                    <MdOutlineMail className="text-muted-foreground" />
                                </InputGroupAddon>
                            </InputGroup>
                            {validationErrors.last_name && <p className="text-red-500 text-sm">{validationErrors.last_name}</p>}
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="password" className="text-sm font-medium">Password</FieldLabel>
                            <InputGroup>
                                <InputGroupInput id="password" name="password" type={showPassword ? "text" : "password"} placeholder="••••••••" />
                                <InputGroupAddon align="inline-start" >
                                    <RiLockPasswordLine className="text-muted-foreground" />
                                </InputGroupAddon>
                            </InputGroup>
                            {validationErrors.password && <p className="text-red-500 text-sm">{validationErrors.password}</p>}
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
                        Register
                    </Button>
                </form>

                <p className="text-center text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <Link href={'/login'} className="font-semibold leading-6 text-sky-600 hover:text-sky-500 transition-colors">
                        Login
                    </Link>
                </p>
            </div>
        </>
    )
}