"use server";

export async function submitFeedback(prevState, formData) {
  const name = formData.get("name")?.trim();
  const email = formData.get("email")?.trim();
  const message = formData.get("message")?.trim();

  const errors = {};

  if (!name) {
    errors.name = "Name is required.";
  }

  if (!email) {
    errors.email = "Email is required.";
  } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
    errors.email = "Invalid email format.";
  }

  if (!message) {
    errors.message = "Message is required.";
  } else if (message.length < 10) {
    errors.message = "Message must be at least 10 characters.";
  }

  if (Object.keys(errors).length > 0) {
    return { errors, success: false };
  }

  // Simulate saving the data (like writing to a DB)
  console.log("Form submitted to server:", { name, email, message });

  return {
    errors: {},
    success: true,
    message: "Thanks for your feedback!",
  };
}
