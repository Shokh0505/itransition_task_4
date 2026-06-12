import { loginSchema } from "@/zodSchemas/loginSchema";
import { signupSchema } from "@/zodSchemas/registerScheme";
import * as z from "zod";

interface loginSubmitInterface {
    setValidationErros: React.Dispatch<
        React.SetStateAction<{ email: string; password: string }>
    >;
    e: React.SubmitEvent<HTMLFormElement>;
}

export const loginSubmit = async ({
    e,
    setValidationErros,
}: loginSubmitInterface) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");
    setValidationErros({ email: "", password: "" });

    const validate = loginSchema.safeParse({ email, password });
    if (!validate.success) {
        const flattenedErrors = z.flattenError(validate.error);
        if (flattenedErrors.fieldErrors.email) {
            setValidationErros((prev) => ({
                ...prev,
                email: flattenedErrors.fieldErrors.email?.[0] || "",
            }));
        }
        if (flattenedErrors.fieldErrors.password) {
            setValidationErros((prev) => ({
                ...prev,
                password: flattenedErrors.fieldErrors.password?.[0] || "",
            }));
        }
        return;
    }

    const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL;
    const response = await fetch(`${backendURL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
    });

    return response;
};

interface registerSubmitInterface {
    setValidationErrors: React.Dispatch<
        React.SetStateAction<{
            first_name: string;
            last_name: string;
            email: string;
            password: string;
        }>
    >;
    e: React.SubmitEvent<HTMLFormElement>;
}

export const registerSubmit = async ({
    setValidationErrors,
    e,
}: registerSubmitInterface) => {
    const formData = new FormData(e.currentTarget);

    const email = formData.get("email");
    const password = formData.get("password");
    const first_name = formData.get("first_name");
    const last_name = formData.get("last_name");
    setValidationErrors({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
    });

    const validation = signupSchema.safeParse({
        email,
        password,
        first_name,
        last_name,
    });

    if (!validation.success) {
        const flattenErrors = z.flattenError(validation.error);
        const fields = flattenErrors.fieldErrors;
        setValidationErrors(
            Object.fromEntries(
                Object.entries(fields).map(([key, value]) => [key, value?.[0]]),
            ) as {
                first_name: string;
                last_name: string;
                email: string;
                password: string;
            },
        );
    }

    const result = await fetch(
        process.env.NEXT_PUBLIC_BACKEND_URL + "/auth/register",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password, first_name, last_name }),
        }
    );
    return result;
};
