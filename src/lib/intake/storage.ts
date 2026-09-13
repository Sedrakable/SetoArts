import { IntakeAnswers } from "./answers";

// Draft answers live in localStorage, namespaced by client slug so one client's
// URL never surfaces another client's draft. All access is guarded for private
// browsing, where localStorage can throw or be unavailable.
const storageKey = (client: string) => `setoxarts-intake-${client}-v1`;

export const readStoredAnswers = (client: string): IntakeAnswers => {
  if (typeof window === "undefined") return {};

  try {
    const stored = window.localStorage.getItem(storageKey(client));
    return stored ? (JSON.parse(stored) as IntakeAnswers) : {};
  } catch {
    return {};
  }
};

export const writeStoredAnswers = (client: string, answers: IntakeAnswers) => {
  try {
    window.localStorage.setItem(storageKey(client), JSON.stringify(answers));
  } catch (error) {
    console.error("Unable to save intake progress:", error);
  }
};

export const clearStoredAnswers = (client: string) => {
  try {
    window.localStorage.removeItem(storageKey(client));
  } catch {
    // Nothing to do — a failed clear on a private-mode store is harmless.
  }
};
