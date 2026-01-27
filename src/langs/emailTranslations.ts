// helpers/emailTranslations.ts
import { LangType } from "@/i18n/request";

interface EmailTranslation {
  subject: string;
  title: string;
  greeting: (name: string) => string;
  thankYouMessage: (name: string) => string;
  signDetails: string;
  dimensions: string;
  budget: string;
  additionalInfo: string;
  regards: string;
  team: string;
}

export const emailTranslations: Record<LangType, EmailTranslation> = {
  en: {
    subject: "Seto x Arts | Your Custom Glow Wood Sign/Decor Inquiry 💡",
    title: "Your Custom Glow Sign/Decor Inquiry",
    greeting: (name: string) => `Hey ${name},`,
    thankYouMessage: (_name: string) =>
      `Appreciate you reaching out! I’m Seto, the guy behind Seto x Arts. I’ll be checking out your request and hitting you up soon to go over the details, pricing, and what’s possible. Keep an eye on your inbox (and maybe your spam folder, just in case).`,
    signDetails: "Project Breakdown:",
    dimensions: "Size:",
    budget: "Your Budget Range:",
    additionalInfo: "Extra Details:",
    regards: "Catch you soon,",
    team: "Seto – Seto x Arts",
  },
  fr: {
    subject:
      "Seto x Arts | Votre demande pour une enseigne/décor lumineux en bois 💡",
    title: "Votre demande pour une enseigne/décor lumineux personnalisé",
    greeting: (name: string) => `Salut ${name},`,
    thankYouMessage: (_name: string) =>
      `Merci de nous avoir contactés ! Je suis Seto, le créateur de Seto x Arts. Je vais examiner votre demande et je vous contacterai bientôt pour discuter des détails, des prix et des possibilités. Surveillez votre boîte de réception (et peut-être votre dossier spam, au cas où).`,
    signDetails: "Détails du projet :",
    dimensions: "Dimensions :",
    budget: "Votre gamme de budget :",
    additionalInfo: "Détails supplémentaires :",
    regards: "À bientôt,",
    team: "Seto – Seto x Arts",
  },
};
