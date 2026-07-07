"use client";

import { useActionState } from "react";
import { submitContact } from "@/lib/actions";
import { initialFormState } from "@/lib/form-state";
import { SubmitButton } from "@/components/ui/Button";
import {
  FormStatus,
  HoneypotField,
  TextArea,
  TextField,
} from "@/components/forms/fields";

export function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContact, initialFormState);

  if (state.status === "success") {
    return <FormStatus status={state.status} message={state.message} />;
  }

  return (
    <form action={formAction} className="relative space-y-5" noValidate>
      <HoneypotField />
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          label="Your Name"
          name="name"
          required
          autoComplete="name"
          error={state.fieldErrors?.name}
        />
        <TextField
          label="Phone Number"
          name="phone"
          type="tel"
          required
          autoComplete="tel"
          placeholder="+91 XXXXX XXXXX"
          error={state.fieldErrors?.phone}
        />
      </div>
      <TextField
        label="Email Address"
        name="email"
        type="email"
        required
        autoComplete="email"
        error={state.fieldErrors?.email}
      />
      <TextField
        label="Subject"
        name="subject"
        required
        error={state.fieldErrors?.subject}
      />
      <TextArea
        label="Message"
        name="message"
        required
        error={state.fieldErrors?.message}
      />
      <FormStatus status={state.status} message={state.message} />
      <SubmitButton size="lg" disabled={pending}>
        {pending ? "Sending…" : "Send Message"}
      </SubmitButton>
    </form>
  );
}
