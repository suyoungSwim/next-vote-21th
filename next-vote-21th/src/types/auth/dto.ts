import { signupSchema } from "@/schemas/signupSchema";
import { z } from "zod";

export type SignupForm = z.infer<typeof signupSchema>;
export type SignupErrors = Record<keyof SignupForm, string>;

export type LoginPayload = {
  username: string;
  password: string;
};

export type SignupPayload = {
  name: string;
  username: string;
  password: string;
  email: string;
  position: "FRONTEND" | "BACKEND" | "DESIGN" | "PRODUCT_MANAGER";
  team: "HANI_HOME" | "POP_UPCYCLE" | "DEAR_DREAM" | "PROMESA" | "INFLUY";
};
