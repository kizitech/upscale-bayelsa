"use client";

import { useEffect, useState, useCallback } from "react";
import {
  X,
  User,
  Building2,
  Package,
  MessageSquare,
  Send,
  CheckCircle2,
} from "lucide-react";
import { buildServiceInquiryLink } from "@/lib/whatsapp";

export interface PricingPlanOption {
  id: string;
  name: string;
}

interface PricingInquiryModalProps {
  onClose: () => void;
  plans: PricingPlanOption[];
  selectedPlanId: string;
}

export default function PricingInquiryModal({
  onClose,
  plans,
  selectedPlanId,
}: PricingInquiryModalProps) {
  const [name, setName] = useState("");
  const [organization, setOrganization] = useState("");
  const [planId, setPlanId] = useState(selectedPlanId);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleClose = useCallback(() => onClose(), [onClose]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleClose]);

  const selectedPlan = plans.find((p) => p.id === planId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }
    if (!selectedPlan) {
      setError("Please select a package.");
      return;
    }
    

    setError("");
    setIsSubmitting(true);

    const link = buildServiceInquiryLink({
      name: name.trim(),
      organization: organization.trim() || undefined,
      service: selectedPlan.name,
      message:
        message.trim() ||
        `I'd like to get started with the ${selectedPlan.name} plan.`,
    });

    window.open(link, "_blank", "noopener,noreferrer");
    handleClose();
  };

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center px-4 py-8"
      role="dialog"
      aria-modal="true"
      aria-labelledby="pricing-inquiry-title"
    >
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={handleClose}
      />

      <div className="relative w-full max-w-md rounded-3xl bg-white shadow-2xl shadow-green-950/20 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 px-8 pt-8 pb-2">
          <div className="flex flex-col gap-1">
            <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-green-950">
              <CheckCircle2 size={14} />
              {selectedPlan?.name ?? "Package"}
            </span>
            <h2
              id="pricing-inquiry-title"
              className="text-2xl font-semibold text-green-950 mt-2"
            >
              Request this package
            </h2>
          </div>

          <button
            type="button"
            onClick={handleClose}
            aria-label="Close"
            className="shrink-0 rounded-full p-2 text-green-950/50 transition-colors hover:bg-green-100 hover:text-green-950"
          >
            <X size={18} />
          </button>
        </div>

        <p className="px-8 text-sm text-green-950/60 font-medium mb-6">
          Share a few details and we&apos;ll pick up the conversation on
          WhatsApp.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 px-8 pb-8">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="inquiry-name"
              className="text-sm font-medium text-green-950"
            >
              Name<span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <User
                size={16}
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-green-950/40"
              />
              <input
                id="inquiry-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your full name"
                className="w-full rounded-xl border border-green-950/15 bg-green-50/40 py-2.5 pl-10 pr-4 text-sm text-green-950 outline-none transition-colors focus:border-green-950/40 focus:bg-white"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="inquiry-organization"
              className="text-sm font-medium text-green-950"
            >
              Organization{" "}
              <span className="text-green-950/40 font-normal">(optional)</span>
            </label>
            <div className="relative">
              <Building2
                size={16}
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-green-950/40"
              />
              <input
                id="inquiry-organization"
                type="text"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                placeholder="Your company or brand"
                className="w-full rounded-xl border border-green-950/15 bg-green-50/40 py-2.5 pl-10 pr-4 text-sm text-green-950 outline-none transition-colors focus:border-green-950/40 focus:bg-white"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="inquiry-plan"
              className="text-sm font-medium text-green-950"
            >
              Package<span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Package
                size={16}
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-green-950/40"
              />
              <select
                id="inquiry-plan"
                value={planId}
                onChange={(e) => setPlanId(e.target.value)}
                className="w-full appearance-none rounded-xl border border-green-950/15 bg-green-50/40 py-2.5 pl-10 pr-4 text-sm text-green-950 outline-none transition-colors focus:border-green-950/40 focus:bg-white"
              >
                <option value="" disabled hidden>
                  Select a package
                </option>
                {plans.map((plan) => (
                  <option key={plan.id} value={plan.id}>
                    {plan.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="inquiry-message"
              className="text-sm font-medium text-green-950"
            >
              Message{" "}
              <span className="text-green-950/40 font-normal">(optional)</span>
            </label>
            <div className="relative">
              <MessageSquare
                size={16}
                className="pointer-events-none absolute left-3.5 top-3 text-green-950/40"
              />
              <textarea
                id="inquiry-message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={3}
                placeholder="Anything specific you'd like us to know?"
                className="w-full resize-none rounded-xl border border-green-950/15 bg-green-50/40 py-2.5 pl-10 pr-4 text-sm text-green-950 outline-none transition-colors focus:border-green-950/40 focus:bg-white"
              />
            </div>
          </div>

          {error && <p className="text-sm text-red-500 font-medium">{error}</p>}

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-green-950 px-6 py-3 font-medium text-white transition-all duration-500 ease-in-out hover:bg-black disabled:opacity-60"
          >
            <Send size={16} />
            Send Request
          </button>
        </form>
      </div>
    </div>
  );
}
