"use client";

import { useActionState } from "react";
import { submitEnquiry } from "@/lib/actions";
import { initialFormState } from "@/lib/form-state";
import { SubmitButton } from "@/components/ui/Button";
import {
  FormStatus,
  HoneypotField,
  SelectField,
  TextArea,
  TextField,
} from "@/components/forms/fields";

const grades = [
  "Nursery",
  "LKG",
  "UKG",
  "Class 1",
  "Class 2",
  "Class 3",
  "Class 4",
  "Class 5",
  "Class 6",
  "Class 7",
  "Class 8",
  "Class 9",
  "Class 10",
];

export function EnquiryForm() {
  const [state, formAction, pending] = useActionState(submitEnquiry, initialFormState);

  if (state.status === "success") {
    return <FormStatus status={state.status} message={state.message} />;
  }

  return (
    <form action={formAction} className="relative space-y-5" noValidate>
      <HoneypotField />
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          label="Parent / Guardian Name"
          name="parentName"
          required
          autoComplete="name"
          error={state.fieldErrors?.parentName}
        />
        <TextField
          label="Student Name"
          name="studentName"
          required
          error={state.fieldErrors?.studentName}
        />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <SelectField
          label="Grade Applying For"
          name="gradeApplying"
          required
          options={grades}
          error={state.fieldErrors?.gradeApplying}
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
      <TextArea
        label="Message (optional)"
        name="message"
        placeholder="Any questions or details you would like to share…"
        error={state.fieldErrors?.message}
      />
      <FormStatus status={state.status} message={state.message} />
      <SubmitButton size="lg" disabled={pending}>
        {pending ? "Submitting…" : "Submit Enquiry"}
      </SubmitButton>
    </form>
  );
}
