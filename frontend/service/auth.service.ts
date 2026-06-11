import { loginSchema } from "@/zodSchemas/loginSchema";
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
    const response = await fetch(`${backendURL}/api/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
    });

    return response;
};
