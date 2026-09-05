"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

interface ServiceModalContextValue {
  isOpen: boolean;
  presetService: string | null;
  // Bumped on every openModal() call, even if the service is the same as
  // last time, so consumers can key off it to get a fresh form instance
  // (rather than syncing state back in from props via an effect).
  openId: number;
  openModal: (service?: string) => void;
  closeModal: () => void;
}

const ServiceModalContext = createContext<ServiceModalContextValue | null>(null);

export function ServiceModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [presetService, setPresetService] = useState<string | null>(null);
  const [openId, setOpenId] = useState(0);

  const openModal = useCallback((service?: string) => {
    setPresetService(service ?? null);
    setIsOpen(true);
    setOpenId((id) => id + 1);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  const value = useMemo(
    () => ({ isOpen, presetService, openId, openModal, closeModal }),
    [isOpen, presetService, openId, openModal, closeModal],
  );

  return (
    <ServiceModalContext.Provider value={value}>
      {children}
    </ServiceModalContext.Provider>
  );
}

export function useServiceModal() {
  const ctx = useContext(ServiceModalContext);

  if (!ctx) {
    throw new Error("useServiceModal must be used within a ServiceModalProvider");
  }

  return ctx;
}
