"use client";

import { useState, useTransition } from "react";
import { useActionState } from "react";
import { submitFullValidated } from "./actions";

const initialState = {
  errors: {},
  success: false,
  message: "",
};

export default function FullValidationPage() {
  const [state, formAction] = useActionState(submitFullValidated, initialState);
  const [isPending, startTransition] = useTransition();

  // 🆕 Client-side validation error state
  const [clientErrors, setClientErrors] = useState({});

  function handleClientValidation(formData) {
    const errors = {};
    const name = formData.get("name")?.trim();
    const email = formData.get("email")?.trim();
    const message = formData.get("message")?.trim();

    if (!name) errors.name = "Name is required (client).";
    if (!email) {
      errors.email = "Email is required (client).";
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      errors.email = "Invalid email (client).";
    }
    if (!message || message.length < 10) {
      errors.message = "Message too short (client).";
    }

    return errors;
  }

  return (
    <main className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Full Validation Form</h1>

      {state.success && (
        <p className="bg-green-100 text-green-700 p-3 rounded mb-4">
          {state.message}
        </p>
      )}

      <form
        noValidate
        action={(formData) => {
          const clientSideErrors = handleClientValidation(formData); // 🆕 validate first

          if (Object.keys(clientSideErrors).length > 0) {
            setClientErrors(clientSideErrors); // 🆕 if errors, set them in local state
            return;
          }

          setClientErrors({}); // 🆕 clear client errors if all good
          startTransition(() => {
            formAction(formData); // 🆕 call server action
          });
        }}
        className="space-y-4"
      >
        {/* Name */}
        <div>
          <label htmlFor="name" className="block font-medium">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            className={`w-full px-3 py-2 rounded border ${
              clientErrors.name || state.errors.name
                ? "border-red-500"
                : "border-gray-300"
            }`}
          />
          {clientErrors.name && (
            <p className="text-sm text-red-500 mt-1">{clientErrors.name}</p>
          )}
          {!clientErrors.name && state.errors.name && (
            <p className="text-sm text-red-500 mt-1">{state.errors.name}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block font-medium">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className={`w-full px-3 py-2 rounded border ${
              clientErrors.email || state.errors.email
                ? "border-red-500"
                : "border-gray-300"
            }`}
          />
          {clientErrors.email && (
            <p className="text-sm text-red-500 mt-1">{clientErrors.email}</p>
          )}
          {!clientErrors.email && state.errors.email && (
            <p className="text-sm text-red-500 mt-1">{state.errors.email}</p>
          )}
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="block font-medium">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows="4"
            className={`w-full px-3 py-2 rounded border ${
              clientErrors.message || state.errors.message
                ? "border-red-500"
                : "border-gray-300"
            }`}
          ></textarea>
          {clientErrors.message && (
            <p className="text-sm text-red-500 mt-1">{clientErrors.message}</p>
          )}
          {!clientErrors.message && state.errors.message && (
            <p className="text-sm text-red-500 mt-1">{state.errors.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isPending}
          className={`px-4 py-2 rounded text-white ${
            isPending
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isPending ? "Submitting..." : "Submit"}
        </button>
      </form>
    </main>
  );
}
