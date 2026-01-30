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
  tradeSubject: string;
  tradeTitle: string;
  tradeGreeting: (firstName: string) => string;
  tradeThankYouMessage: string;
  tradeDetails: string;
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
    regards: "Talk to you soon,",
    team: "Seto – Seto x Arts",
    tradeSubject: "Trade Program Inquiry Confirmation",
    tradeTitle: "Trade Program Inquiry",
    tradeGreeting: (firstName: string) => `Hello ${firstName},`,
    tradeThankYouMessage:
      "Thank you for your interest in our trade program! We've received your inquiry and will review it shortly. A member of our team will reach out to you within 1-2 business days to discuss partnership opportunities.",
    tradeDetails: "Your Inquiry",
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
    tradeSubject: "Confirmation de demande du programme partenaire",
    tradeTitle: "Demande du programme partenaire",
    tradeGreeting: (firstName: string) => `Bonjour ${firstName},`,
    tradeThankYouMessage:
      "Merci  pour votre intérêt pour notre programme partenaire ! Nous avons reçu votre demande et l'examinerons sous peu. Un membre de notre équipe vous contactera dans 1 à 2 jours ouvrables pour discuter des opportunités de partenariat.",
    tradeDetails: "Votre demande",
  },
};
