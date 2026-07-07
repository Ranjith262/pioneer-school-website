"use server";

import { z } from "zod";
import type { FormState } from "@/lib/form-state";

const phoneSchema = z
  .string()
  .trim()
  .regex(/^[+\d][\d\s-]{9,14}$/, "Enter a valid phone number");

const enquirySchema = z.object({
  parentName: z.string().trim().min(2, "Parent name is required"),
  studentName: z.string().trim().min(2, "Student name is required"),
  gradeApplying: z.string().trim().min(1, "Select a grade"),
  phone: phoneSchema,
  email: z.string().trim().email("Enter a valid email address"),
  message: z.string().trim().max(1000).optional(),
});

const contactSchema = z.object({
  name: z.string().trim().min(2, "Name is required"),
  email: z.string().trim().email("Enter a valid email address"),
  phone: phoneSchema,
  subject: z.string().trim().min(3, "Subject is required"),
  message: z.string().trim().min(10, "Please write a short message"),
});

const visitSchema = z.object({
  name: z.string().trim().min(2, "Name is required"),
  phone: phoneSchema,
  email: z.string().trim().email("Enter a valid email address"),
  preferredDate: z.string().trim().min(1, "Choose a preferred date"),
  visitors: z.string().trim().min(1, "Tell us how many visitors to expect"),
});

const newsletterSchema = z.object({
  email: z.string().trim().email("Enter a valid email address"),
});

/**
 * Honeypot spam protection: real users never fill the visually hidden
 * "website" field. Bots that do are silently accepted without processing.
 */
function isSpam(formData: FormData): boolean {
  return Boolean(formData.get("website"));
}

function zodErrors(error: z.ZodError): Record<string, string> {
  const fieldErrors: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    if (!fieldErrors[key]) fieldErrors[key] = issue.message;
  }
  return fieldErrors;
}

/**
 * Persistence hook. Wire this to Prisma (see prisma/schema.prisma) and an
 * email provider once DATABASE_URL / SMTP settings are configured — the
 * schema models map 1:1 to these submission types.
 */
async function persistSubmission(kind: string, data: Record<string, unknown>) {
  console.info(`[form:${kind}]`, JSON.stringify(data));
}

export async function submitEnquiry(
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  if (isSpam(formData)) return { status: "success", message: "Thank you!" };

  const parsed = enquirySchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return {
      status: "error",
      message: "Please correct the highlighted fields.",
      fieldErrors: zodErrors(parsed.error),
    };
  }

  await persistSubmission("admission-enquiry", parsed.data);
  return {
    status: "success",
    message:
      "Thank you! Your admission enquiry has been received. Our admissions team will contact you within one working day.",
  };
}

export async function submitContact(
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  if (isSpam(formData)) return { status: "success", message: "Thank you!" };

  const parsed = contactSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return {
      status: "error",
      message: "Please correct the highlighted fields.",
      fieldErrors: zodErrors(parsed.error),
    };
  }

  await persistSubmission("contact", parsed.data);
  return {
    status: "success",
    message: "Thank you for reaching out! We will get back to you shortly.",
  };
}

export async function submitVisit(
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  if (isSpam(formData)) return { status: "success", message: "Thank you!" };

  const parsed = visitSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return {
      status: "error",
      message: "Please correct the highlighted fields.",
      fieldErrors: zodErrors(parsed.error),
    };
  }

  await persistSubmission("campus-visit", parsed.data);
  return {
    status: "success",
    message:
      "Your campus visit request is confirmed on our side! We will call you to fix the exact time.",
  };
}

export async function subscribeNewsletter(
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  if (isSpam(formData)) return { status: "success", message: "Subscribed!" };

  const parsed = newsletterSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return {
      status: "error",
      message: "Enter a valid email address.",
      fieldErrors: zodErrors(parsed.error),
    };
  }

  await persistSubmission("newsletter", parsed.data);
  return { status: "success", message: "Subscribed! Watch your inbox for updates." };
}
