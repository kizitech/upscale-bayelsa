"use client";

import { createContext, useContext, useState, useCallback, useMemo } from "react";
import { pricingData } from "@/data/pricing-data";
import PricingInquiryModal from "./PricingInquiryModal";

interface PricingInquiryContextValue {
  openInquiryModal: (planId?: string) => void;
}

const PricingInquiryContext = createContext<PricingInquiryContextValue | null>(
  null,
);

export function usePricingInquiry() {
  const ctx = useContext(PricingInquiryContext);
  if (!ctx) {
    throw new Error(
      "usePricingInquiry must be used within a PricingInquiryProvider",
    );
  }
  return ctx;
}

export default function PricingInquiryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState(
    pricingData[0] ? String(pricingData[0].id) : "",
  );
  const [requestId, setRequestId] = useState(0);

const openInquiryModal = useCallback((planId?: string) => {
  setSelectedPlanId(planId ?? "");
  setRequestId((n) => n + 1);
  setIsOpen(true);
}, []);

  const value = useMemo(() => ({ openInquiryModal }), [openInquiryModal]);

  const plans = pricingData.map((tier) => ({
    id: String(tier.id),
    name: tier.name,
  }));

  return (
    <PricingInquiryContext.Provider value={value}>
      {children}
      {isOpen && (
        <PricingInquiryModal
          key={requestId}
          onClose={() => setIsOpen(false)}
          plans={plans}
          selectedPlanId={selectedPlanId}
        />
      )}
    </PricingInquiryContext.Provider>
  );
}