"use client";

import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type FormEvent,
} from "react";
import { createPortal } from "react-dom";
import { User, MessageSquare, Send, Loader2, CheckCircle2, Info } from "lucide-react";
import {
  BuildingOfficeIcon,
  CaretDownIcon,
  XIcon,
} from "@phosphor-icons/react";

import { useServiceModal } from "./ServiceModalContext";
import { buildServiceInquiryLink } from "@/lib/whatsapp";
import { SERVICE_OPTIONS, OTHER_SERVICE_OPTION } from "@/data/service-options";

interface FormState {
  name: string;
  organization: string;
  service: string;
  customService: string;
  message: string;
}

function initialFormFor(presetService: string | null): FormState {
  const isKnownService = presetService
    ? SERVICE_OPTIONS.includes(presetService)
    : false;

  return {
    name: "",
    organization: "",
    service: isKnownService
      ? (presetService as string)
      : presetService
        ? OTHER_SERVICE_OPTION
        : "",
    customService: isKnownService ? "" : (presetService ?? ""),
    message: "",
  };
}

// Client-only mount detection without a setState-in-effect: the store
// never changes, but the server snapshot (false) differs from the client
// snapshot (true), so React swaps it in right after hydration.
function useHasMounted() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

function InquiryForm({
  presetService,
  closeModal,
}: {
  presetService: string | null;
  closeModal: () => void;
}) {
  const [form, setForm] = useState<FormState>(() =>
    initialFormFor(presetService),
  );
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const nameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const focusTimer = window.setTimeout(
      () => nameInputRef.current?.focus(),
      150,
    );
    return () => window.clearTimeout(focusTimer);
  }, []);

  function update<K extends keyof FormState>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const resolvedService =
      form.service === OTHER_SERVICE_OPTION
        ? form.customService.trim()
        : form.service;

    if (!form.name.trim() || !resolvedService || !form.message.trim()) return;

    setStatus("sending");

    const link = buildServiceInquiryLink({
      name: form.name.trim(),
      organization: form.organization.trim(),
      service: resolvedService,
      message: form.message.trim(),
    });

    window.open(link, "_blank", "noopener,noreferrer");

    setStatus("sent");
    window.setTimeout(() => {
      closeModal();
    }, 1400);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex-1 px-6 py-6 sm:px-8"
    >
     <section className="overflow-y-scroll h-98 flex flex-col">
       <div className="mb-5">
        <label
          htmlFor="si-name"
          className="mb-2 block text-sm font-medium text-black"
        >
          Name
        </label>
        <div className="relative">
          <User
            className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400"
            aria-hidden="true"
          />
          <input
            ref={nameInputRef}
            id="si-name"
            type="text"
            required
            placeholder="Your name"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            className="w-full rounded-2xl border border-neutral-200 bg-neutral-50 py-3.5 pl-11 pr-4 text-sm text-black placeholder:text-neutral-400 outline-none transition-colors focus:border-green-950 focus:bg-white"
          />
        </div>
      </div>

      <div className="mb-5">
        <label
          htmlFor="si-org"
          className="mb-2 block text-sm font-medium text-black"
        >
          Organization <span className="text-neutral-400">(optional)</span>
        </label>
        <div className="relative">
          <BuildingOfficeIcon
            size={16}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
            aria-hidden="true"
          />
          <input
            id="si-org"
            type="text"
            placeholder="Your business or brand name"
            value={form.organization}
            onChange={(e) => update("organization", e.target.value)}
            className="w-full rounded-2xl border border-neutral-200 bg-neutral-50 py-3.5 pl-11 pr-4 text-sm text-black placeholder:text-neutral-400 outline-none transition-colors focus:border-green-950 focus:bg-white"
          />
        </div>
      </div>

      <div className="mb-5">
        <label
          htmlFor="si-service"
          className="mb-2 block text-sm font-medium text-black"
        >
          Service
        </label>
        <div className="relative">
          <select
            id="si-service"
            required
            value={form.service}
            onChange={(e) => update("service", e.target.value)}
            className="w-full appearance-none rounded-2xl border border-neutral-200 bg-neutral-50 py-3.5 pl-4 pr-11 text-sm text-black outline-none transition-colors focus:border-green-950 focus:bg-white"
          >
            <option value="" disabled>
              Select a service
            </option>
            {SERVICE_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
            <option value={OTHER_SERVICE_OPTION}>Other</option>
          </select>
          <CaretDownIcon
            size={14}
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400"
            aria-hidden="true"
          />
        </div>

        <div
          className={`grid overflow-hidden transition-all duration-300 ease-in-out ${
            form.service === OTHER_SERVICE_OPTION
              ? "mt-3 grid-rows-[1fr] opacity-100"
              : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="min-h-0">
            <input
              type="text"
              required={form.service === OTHER_SERVICE_OPTION}
              placeholder="What service are you looking for?"
              value={form.customService}
              onChange={(e) => update("customService", e.target.value)}
              className="w-full rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3.5 text-sm text-black placeholder:text-neutral-400 outline-none transition-colors focus:border-green-950 focus:bg-white"
            />
          </div>
        </div>
      </div>

      <div className="mb-6">
        <label
          htmlFor="si-message"
          className="mb-2 block text-sm font-medium text-black"
        >
          Message
        </label>
        <div className="relative">
          <MessageSquare
            className="pointer-events-none absolute left-4 top-4 h-4 w-4 text-neutral-400"
            aria-hidden="true"
          />
          <textarea
            id="si-message"
            required
            rows={4}
            placeholder="Tell us a bit about your business and what you need."
            value={form.message}
            onChange={(e) => update("message", e.target.value)}
            className="w-full resize-none rounded-2xl border border-neutral-200 bg-neutral-50 py-3.5 pl-11 pr-4 text-sm text-black placeholder:text-neutral-400 outline-none transition-colors focus:border-green-950 focus:bg-white"
          />
        </div>
      </div>
     </section>

    <div className="flex flex-col items-center justify-center gap-2 py-4">
        <button
        type="submit"
        disabled={status === "sending"}
        className="flex w-full items-center justify-center gap-2 rounded-2xl bg-black py-4 text-sm font-medium text-white transition-colors hover:bg-green-950 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === "sending" && <Loader2 className="h-4 w-4 animate-spin" />}
        {status === "sent" && (
          <CheckCircle2 className="h-4 w-4 text-lime-400" />
        )}
        {status === "idle" && <Send className="h-4 w-4" />}
        {status === "sent"
          ? "Opened in WhatsApp"
          : status === "sending"
            ? "Sending..."
            : "Send "}
      </button>

      <p className="mt-3 text-center text-xs text-neutral-400">
        Sends your message straight to our WhatsApp.
      </p>
    </div>
    </form>
  );
}

export default function ServiceInquiryModal() {
  const { isOpen, presetService, openId, closeModal } = useServiceModal();
  const mounted = useHasMounted();

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, closeModal]);

  if (!mounted) return null;

  return createPortal(
    <div
      aria-hidden={!isOpen}
      className={`fixed inset-0 z-100 flex items-center justify-center p-4 transition-opacity duration-300 ${
        isOpen ? "visible opacity-100" : "invisible opacity-0"
      }`}
    >
      <button
        type="button"
        aria-label="Close"
        tabIndex={isOpen ? 0 : -1}
        onClick={closeModal}
        className="absolute inset-0 backdrop-blur-sm bg-gray-900/10 "
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="service-inquiry-title"
        className={`relative flex w-full max-w-lg max-h-[92vh] flex-col overflow-hidden rounded-3xl bg-white shadow-2xl shadow-black/30 transition-all duration-300 ${
          isOpen
            ? "translate-y-0 scale-100 opacity-100"
            : "translate-y-6 scale-95 opacity-0"
        }`}
      >
        {/* Header */}
        <div className="relative shrink-0 overflow-hidden bg-linear-to-b from-green-200 via-green-50 to-white px-6 pb-4 pt-6 sm:px-8 sm:pt-7">
          <button
            type="button"
            aria-label="Close"
            onClick={closeModal}
            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-xl border-black border text-black transition-colors hover:bg-white/20"
          >
            <XIcon size={18} />
          </button>

          <h2
            id="service-inquiry-title"
            className="relative mt-4 max-w-xs text-xl font-semibold leading-tight text-black sm:text-2xl"
          >
            Tell us what you need, we&apos;ll take it from there
          </h2>
          <p className="relative mt-2 max-w-sm text-sm flex leading-relaxed text-green-950/40 font-semibold">
           <Info size={24} className="mr-1" /> Fill this in and it opens straight into WhatsApp, message drafted
            and ready to send to our team.
          </p>
        </div>

        <InquiryForm
          key={openId}
          presetService={presetService}
          closeModal={closeModal}
        />
      </div>
    </div>,
    document.body,
  );
}
