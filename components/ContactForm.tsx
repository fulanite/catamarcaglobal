"use client";

import { FormEvent, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { ErrorState } from "@/components/ErrorState";
import { Icon } from "@/components/Icon";
import { LoadingState } from "@/components/LoadingState";
import { participationOptions } from "@/data/site";

type FormState = {
  fullName: string;
  email: string;
  phone: string;
  age: string;
  institution: string;
  participation: string;
  message: string;
  consent: boolean;
};

const initialState: FormState = {
  fullName: "",
  email: "",
  phone: "",
  age: "",
  institution: "",
  participation: "",
  message: "",
  consent: false,
};

type Errors = Partial<Record<keyof FormState, string>>;

export function ContactForm({ context = "contacto" }: { context?: "contacto" | "sumate" }) {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const title = context === "sumate" ? "Formulario para sumarte" : "Formulario de contacto";
  const participationLabel =
    context === "sumate" ? "Tipo de participación" : "Motivo del mensaje";

  const helperText = useMemo(
    () =>
      context === "sumate"
        ? "Los datos se validan localmente y quedan listos para conectar al canal institucional definido por el equipo."
        : "El canal de envío institucional está pendiente de configuración.",
    [context],
  );

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  }

  function validate(): Errors {
    const nextErrors: Errors = {};
    if (!form.fullName.trim()) {
      nextErrors.fullName = "Ingresá tu nombre y apellido.";
    }
    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      nextErrors.email = "Ingresá un correo válido.";
    }
    if (!form.institution.trim()) {
      nextErrors.institution = "Indicanos tu institución o vínculo.";
    }
    if (!form.participation) {
      nextErrors.participation = "Elegí una opción.";
    }
    if (form.message.trim().length < 12) {
      nextErrors.message = "Escribí un mensaje un poco más completo.";
    }
    if (!form.consent) {
      nextErrors.consent = "Necesitamos tu consentimiento para responder.";
    }
    return nextErrors;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      return;
    }
    setStatus("sending");
    window.setTimeout(() => {
      setStatus("sent");
      setForm(initialState);
    }, 450);
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <div className="form-header">
        <span className="icon-badge">
          <Icon name="Send" />
        </span>
        <div>
          <h2>{title}</h2>
          <p>{helperText}</p>
        </div>
      </div>
      {status === "sent" ? (
        <div className="success-message" role="status">
          <Icon name="CheckCircle2" />
          Mensaje validado. El equipo puede conectar este formulario al canal institucional.
        </div>
      ) : null}
      <div className="form-grid">
        <Field label="Nombre y apellido" error={errors.fullName} id="fullName" required>
          <input
            id="fullName"
            name="fullName"
            autoComplete="name"
            value={form.fullName}
            onChange={(event) => updateField("fullName", event.target.value)}
          />
        </Field>
        <Field label="Correo electrónico" error={errors.email} id="email" required>
          <input
            id="email"
            name="email"
            autoComplete="email"
            inputMode="email"
            value={form.email}
            onChange={(event) => updateField("email", event.target.value)}
          />
        </Field>
        <Field label="Teléfono opcional" id="phone">
          <input
            id="phone"
            name="phone"
            autoComplete="tel"
            value={form.phone}
            onChange={(event) => updateField("phone", event.target.value)}
          />
        </Field>
        <Field label="Edad opcional" id="age">
          <input
            id="age"
            name="age"
            inputMode="numeric"
            value={form.age}
            onChange={(event) => updateField("age", event.target.value)}
          />
        </Field>
        <Field label="Institución o vínculo" error={errors.institution} id="institution" required>
          <input
            id="institution"
            name="institution"
            value={form.institution}
            onChange={(event) => updateField("institution", event.target.value)}
          />
        </Field>
        <Field label={participationLabel} error={errors.participation} id="participation" required>
          <select
            id="participation"
            name="participation"
            value={form.participation}
            onChange={(event) => updateField("participation", event.target.value)}
          >
            <option value="">Seleccionar</option>
            {participationOptions.map((option) => (
              <option value={option} key={option}>
                {option}
              </option>
            ))}
          </select>
        </Field>
      </div>
      <Field label="Mensaje" error={errors.message} id="message" required>
        <textarea
          id="message"
          name="message"
          rows={6}
          value={form.message}
          onChange={(event) => updateField("message", event.target.value)}
        />
      </Field>
      <label className="checkbox-field" htmlFor="consent">
        <input
          id="consent"
          name="consent"
          type="checkbox"
          checked={form.consent}
          onChange={(event) => updateField("consent", event.target.checked)}
        />
        <span>
          Acepto que Catamarca Global use estos datos para responder este mensaje. No se
          solicitan datos innecesarios.
        </span>
      </label>
      {errors.consent ? <ErrorState message={errors.consent} /> : null}
      <button className="btn btn-primary form-submit" type="submit" disabled={status === "sending"}>
        {status === "sending" ? <LoadingState label="Validando" /> : "Enviar mensaje"}
      </button>
    </form>
  );
}

function Field({
  label,
  id,
  error,
  required = false,
  children,
}: {
  label: string;
  id: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
}) {
  const errorId = `${id}-error`;
  return (
    <div className="field">
      <label htmlFor={id}>
        {label}
        {required ? <span aria-hidden> *</span> : null}
      </label>
      {children}
      {error ? (
        <p className="field-error" id={errorId}>
          {error}
        </p>
      ) : null}
    </div>
  );
}
