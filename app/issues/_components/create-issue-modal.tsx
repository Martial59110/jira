"use client";

import { useEffect } from "react";
import { CreateIssueForm } from "./create-issue-form";
import { useTranslations } from "next-intl";

type CreateIssueModalProps = {
  onClose: () => void;
};

export function CreateIssueModal({ onClose }: CreateIssueModalProps) {
  const t = useTranslations("CreateIssueModal");
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0f172a]/30 backdrop-blur">
      <div className="w-full max-w-xl rounded-[36px] bg-white/95 p-8 shadow-[0_30px_80px_rgba(15,23,42,0.25)] ring-1 ring-[#e0e7ff]">
        <header className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-[#94a3b8]">{t("tickets")}</p>
            <h2 className="text-2xl font-semibold text-[#0f172a]">{t("create_ticket")}</h2>
            <p className="text-sm text-[#4c5773]">{t("create_ticket_description")}</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-full border border-[#e0e7ff] px-3 py-1 text-sm text-[#4c5773] transition hover:border-[#2563eb] hover:text-[#2563eb]"
          >
            {t("close")}
          </button>
        </header>
        <CreateIssueForm onSuccess={onClose} />
      </div>
    </div>
  );
}
