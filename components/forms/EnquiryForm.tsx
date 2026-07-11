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
import { useLanguage } from "@/components/i18n/LanguageProvider";

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
  const { t } = useLanguage();

  if (state.status === "success") {
    return <FormStatus status={state.status} message={state.message} />;
  }

  return (
    <form action={formAction} className="relative space-y-5" noValidate>
      <HoneypotField />
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          label={t("forms.enquiry.parentName")}
          name="parentName"
          required
          autoComplete="name"
          error={state.fieldErrors?.parentName}
        />
        <TextField
          label={t("forms.enquiry.studentName")}
          name="studentName"
          required
          error={state.fieldErrors?.studentName}
        />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <SelectField
          label={t("forms.enquiry.gradeApplying")}
          name="gradeApplying"
          required
          options={grades}
          error={state.fieldErrors?.gradeApplying}
        />
        <TextField
          label={t("forms.enquiry.phone")}
          name="phone"
          type="tel"
          required
          autoComplete="tel"
          placeholder={t("forms.enquiry.phonePlaceholder")}
          error={state.fieldErrors?.phone}
        />
      </div>
      <TextField
        label={t("forms.enquiry.email")}
        name="email"
        type="email"
        required
        autoComplete="email"
        error={state.fieldErrors?.email}
      />
      <TextArea
        label={t("forms.enquiry.message")}
        name="message"
        placeholder={t("forms.enquiry.messagePlaceholder")}
        error={state.fieldErrors?.message}
      />
      <FormStatus status={state.status} message={state.message} />
      <SubmitButton size="lg" disabled={pending}>
        {pending ? t("forms.enquiry.submitting") : t("forms.enquiry.submit")}
      </SubmitButton>
    </form>
  );
}
