"use client";

import { useEffect } from "react";
import { CreateIssueForm } from "./create-issue-form";

type CreateIssueModalProps = {
  onClose: () => void;
};

export function CreateIssueModal({ onClose }: CreateIssueModalProps) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-3xl bg-white p-8 shadow-2xl ring-1 ring-[var(--border-color)]">
        <header className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">Tickets</p>
            <h2 className="text-2xl font-semibold text-[var(--foreground)]">Créer un ticket</h2>
            <p className="text-sm text-[var(--muted)]">
              Précise le statut, l’assignation et l’échéance dès maintenant.
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-full border border-[var(--border-color)] px-3 py-1 text-sm text-[var(--muted)] transition hover:border-slate-400"
          >
            Fermer
          </button>
        </header>
        <CreateIssueForm onSuccess={onClose} />
      </div>
    </div>
  );
}
