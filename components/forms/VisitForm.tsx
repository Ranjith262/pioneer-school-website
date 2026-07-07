"use client";

import { useActionState } from "react";
import { submitVisit } from "@/lib/actions";
import { initialFormState } from "@/lib/form-state";
import { SubmitButton } from "@/components/ui/Button";
import {
  FormStatus,
  HoneypotField,
  SelectField,
  TextField,
} from "@/components/forms/fields";

export function VisitForm() {
  const [state, formAction, pending] = useActionState(submitVisit, initialFormState);

  if (state.status === "success") {
    return <FormStatus status={state.status} message={state.message} />;
  }

  const today = new Date().toISOString().split("T")[0];

  return (
    <form action={formAction} className="relative space-y-5" noValidate>
      <HoneypotField />
      <TextField
        label="Your Name"
        name="name"
        required
        autoComplete="name"
        error={state.fieldErrors?.name}
      />
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          label="Phone Number"
          name="phone"
          type="tel"
          required
          autoComplete="tel"
          placeholder="+91 XXXXX XXXXX"
          error={state.fieldErrors?.phone}
        />
        <TextField
          label="Email Address"
          name="email"
          type="email"
          required
          autoComplete="email"
          error={state.fieldErrors?.email}
        />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          label="Preferred Date"
          name="preferredDate"
          type="date"
          required
          min={today}
          error={state.fieldErrors?.preferredDate}
        />
        <SelectField
          label="Number of Visitors"
          name="visitors"
          required
          options={["1", "2", "3", "4 or more"]}
          error={state.fieldErrors?.visitors}
        />
      </div>
      <FormStatus status={state.status} message={state.message} />
      <SubmitButton size="lg" variant="secondary" disabled={pending}>
        {pending ? "Booking…" : "Book Campus Tour"}
      </SubmitButton>
    </form>
  );
}
