"use server";
import { signIn, signOut as authSignOut } from "@/auth";
import { AuthError } from "@auth/core/errors";

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", Object.fromEntries(formData));
  } catch (error) {
    if (error instanceof AuthError) {
      //@ts-ignore
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}

// export async function signOut(prevState: string | undefined, formData: FormData) {}
