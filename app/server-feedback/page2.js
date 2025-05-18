"use client";

import { useActionState } from "react";
import { submitFeedback } from "./actions";

const initialState = {
  errors: {},
  success: false,
  message: "",
};

export default function ServerFeedbackPage() {
  const [state, formAction] = useActionState(submitFeedback, initialState);

  return (
    <main className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Server-Validated Feedback Form</h1>

      {state.success && (
        <p className="bg-green-100 text-green-700 p-3 rounded mb-4">
          {state.message}
        </p>
      )}

      <form action={formAction} noValidate className="space-y-4">
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
              state.errors.name ? "border-red-500" : "border-gray-300"
            }`}
          />
          {state.errors.name && (
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
              state.errors.email ? "border-red-500" : "border-gray-300"
            }`}
          />
          {state.errors.email && (
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
              state.errors.message ? "border-red-500" : "border-gray-300"
            }`}
          ></textarea>
          {state.errors.message && (
            <p className="text-sm text-red-500 mt-1">
              {state.errors.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </main>
  );
}
