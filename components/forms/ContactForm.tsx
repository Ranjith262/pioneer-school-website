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
import { useLanguage } from "@/components/i18n/LanguageProvider";

export function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContact, initialFormState);
  const { t } = useLanguage();

  if (state.status === "success") {
    return <FormStatus status={state.status} message={state.message} />;
  }

  return (
    <form action={formAction} className="relative space-y-5" noValidate>
      <HoneypotField />
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          label={t("forms.contact.yourName")}
          name="name"
          required
          autoComplete="name"
          error={state.fieldErrors?.name}
        />
        <TextField
          label={t("forms.contact.phone")}
          name="phone"
          type="tel"
          required
          autoComplete="tel"
          placeholder={t("forms.contact.phonePlaceholder")}
          error={state.fieldErrors?.phone}
        />
      </div>
      <TextField
        label={t("forms.contact.email")}
        name="email"
        type="email"
        required
        autoComplete="email"
        error={state.fieldErrors?.email}
      />
      <TextField
        label={t("forms.contact.subject")}
        name="subject"
        required
        error={state.fieldErrors?.subject}
      />
      <TextArea
        label={t("forms.contact.message")}
        name="message"
        required
        error={state.fieldErrors?.message}
      />
      <FormStatus status={state.status} message={state.message} />
      <SubmitButton size="lg" disabled={pending}>
        {pending ? t("forms.contact.submitting") : t("forms.contact.submit")}
      </SubmitButton>
    </form>
  );
}
