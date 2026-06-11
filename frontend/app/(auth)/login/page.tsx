import { MdOutlineMail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import {
    Field,
    FieldLabel,
} from "@/components/ui/field";

import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group";
import { Checkbox } from "@/components/ui/checkbox";

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

                <div className="mt-8 space-y-6">
                    <div className="space-y-4">
                        <Field>
                            <FieldLabel htmlFor="email" className="text-sm font-medium">Email</FieldLabel>
                            <InputGroup>
                                <InputGroupInput id="email" type="email" placeholder="name@example.com" />
                                <InputGroupAddon align="inline-start">
                                    <MdOutlineMail className="text-muted-foreground" />
                                </InputGroupAddon>
                            </InputGroup>
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="password" className="text-sm font-medium">Password</FieldLabel>
                            <InputGroup>
                                <InputGroupInput id="password" type="password" placeholder="••••••••" />
                                <InputGroupAddon align="inline-start">
                                    <RiLockPasswordLine className="text-muted-foreground" />
                                </InputGroupAddon>
                            </InputGroup>
                        </Field>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Checkbox id="show-password" name="show-password" />
                            <Label
                                htmlFor="show-password"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Show Password
                            </Label>
                        </div>
                    </div>

                    <Button className="w-full bg-sky-600 hover:bg-sky-700 text-white transition-colors" size="lg">
                        Sign in
                    </Button>

                    <p className="text-center text-sm text-muted-foreground">
                        Don't have an account?{" "}
                        <a href="#" className="font-semibold leading-6 text-sky-600 hover:text-sky-500 transition-colors">
                            Sign up
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}