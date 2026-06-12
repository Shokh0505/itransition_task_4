import * as z from "zod";

export const signupSchema = z.object({
    email: z.email("Email must be a valid email"),
    password: z.string().min(1, "Password is required"),
    first_name: z.string().min(1, "First name is required"),
    last_name: z.string().min(1, "Last name is required"),
});
