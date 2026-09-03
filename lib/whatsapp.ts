// lib/whatsapp.ts
// Builds a wa.me deep link that opens WhatsApp (app or web) with a
// pre-filled, templated message addressed to your clinic's WhatsApp number.
// No server-side credentials needed — works entirely client-side.

export interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  message: string;
}

// The clinic's WhatsApp number, in international format with no
// leading "+", spaces, or dashes (e.g. "2348012345678" for Nigeria).
// Set this via env so it's easy to change per-deployment.
export const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "15551234567";

// The message "template" — edit the copy here and it updates everywhere
// a message is generated.
export function buildWhatsAppMessage({
  name,
  phone,
  email,
  message,
}: ContactFormData): string {
  return [
    "🐾 *New appointment request*",
    "",
    `*Name:* ${name}`,
    `*Phone:* ${phone}`,
    `*Email:* ${email}`,
    "",
    `*Message:*`,
    message,
  ].join("\n");
}

export function buildWhatsAppLink(data: ContactFormData): string {
  const text = encodeURIComponent(buildWhatsAppMessage(data));
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}