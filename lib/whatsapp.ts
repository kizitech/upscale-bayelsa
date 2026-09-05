// lib/whatsapp.ts
// Builds a wa.me deep link that opens WhatsApp (app or web) with a
// pre-filled, templated message addressed to Upscale's WhatsApp number.
// No server-side credentials needed — works entirely client-side.

export interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  message: string;
}

// Data captured by the service-inquiry modal (triggered from the home
// page action buttons and the footer's services list).
export interface ServiceInquiryData {
  name: string;
  organization?: string;
  service: string;
  message: string;
}

// Upscale's WhatsApp number, in international format with no
// leading "+", spaces, or dashes (e.g. "2348012345678" for Nigeria).
// Set this via env so it's easy to change per-deployment.
export const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "2347033878044";

// The message "template" — edit the copy here and it updates everywhere
// a message is generated.
export function buildWhatsAppMessage({
  name,
  phone,
  email,
  message,
}: ContactFormData): string {
  return [
    "👋 *New contact request*",
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

// Template used by the service-inquiry modal. Kept separate from
// buildWhatsAppMessage above since the fields collected (and the people
// reading them) are different — this is a sales/service enquiry, not a
// booking.
export function buildServiceInquiryMessage({
  name,
  organization,
  service,
  message,
}: ServiceInquiryData): string {
  const lines = [
    "🚀 *New service inquiry*",
    "",
    `*Name:* ${name}`,
  ];

  if (organization && organization.trim().length > 0) {
    lines.push(`*Organization:* ${organization}`);
  }

  lines.push(`*Service:* ${service}`, "", `*Message:*`, message);

  return lines.join("\n");
}

export function buildServiceInquiryLink(data: ServiceInquiryData): string {
  const text = encodeURIComponent(buildServiceInquiryMessage(data));
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}