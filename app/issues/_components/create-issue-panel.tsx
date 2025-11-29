"use client";

import { CreateIssueForm } from "./create-issue-form";

type CreateIssuePanelProps = {
  onClose: () => void;
};

export function CreateIssuePanel({ onClose }: CreateIssuePanelProps) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">Créer un ticket</h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Ce ticket sera automatiquement ajouté au board avec le statut sélectionné.
          </p>
        </div>
        <button
          type="button"
          className="text-sm text-zinc-500 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
          onClick={onClose}
        >
          Fermer
        </button>
      </div>
      <div className="mt-4">
        <CreateIssueForm onSuccess={onClose} />
      </div>
    </div>
  );
}
