// helpers/emailTranslations.ts
import { FormServiceType } from "@/components/reuse/Form/formTypes";
import { LangType } from "@/i18n";

export const emailTranslations: Record<
  LangType,
  Record<FormServiceType | "digital", any>
> = {
  en: {
    "wood-sign": {
      subject: "Seto x Arts | Your Custom LED Wood Sign Inquiry 💡",
      title: "Your Custom LED Wood Sign Inquiry",
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
    digital: {
      subject: "Seto x Arts | Your Digital Project Inquiry 🚀",
      title: "Your Digital Project Inquiry",
      greeting: (name: string) => `Hey ${name},`,
      thankYouMessage: (_name: string) =>
        `Thanks for getting in touch! I’m Seto from Seto x Arts. I’ll review your inquiry for your branding or website project and reach out soon to discuss details, pricing, and next steps. Check your inbox (and spam folder) for updates!`,
      projectDetails: "Project Breakdown:",
      budget: "Your Budget Range:",
      additionalInfo: "Extra Details:",
      regards: "Talk soon,",
      team: "Seto – Seto x Arts",
    },
    branding: {
      subject: "Seto x Arts | Your Branding Project Inquiry 🚀",
      title: "Your Branding Project Inquiry",
      greeting: (name: string) => `Hey ${name},`,
      thankYouMessage: (_name: string) =>
        `Thanks for getting in touch! I’m Seto from Seto x Arts. I’ll review your inquiry for your branding project and reach out soon to discuss details, pricing, and next steps. Check your inbox (and spam folder) for updates!`,
      projectDetails: "Project Breakdown:",
      budget: "Your Budget Range:",
      additionalInfo: "Extra Details:",
      regards: "Talk soon,",
      team: "Seto – Seto x Arts",
    },
    website: {
      subject: "Seto x Arts | Your Web Design Project Inquiry 🚀",
      title: "Your Web Design Project Inquiry",
      greeting: (name: string) => `Hey ${name},`,
      thankYouMessage: (_name: string) =>
        `Thanks for getting in touch! I’m Seto from Seto x Arts. I’ll review your inquiry for your website project and reach out soon to discuss details, pricing, and next steps. Check your inbox (and spam folder) for updates!`,
      projectDetails: "Project Breakdown:",
      budget: "Your Budget Range:",
      additionalInfo: "Extra Details:",
      regards: "Talk soon,",
      team: "Seto – Seto x Arts",
    },
  },
  fr: {
    "wood-sign": {
      subject: "Seto x Arts | Votre demande de panneau LED en bois 💡",
      title: "Votre demande de panneau LED en bois",
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
    digital: {
      subject: "Seto x Arts | Votre demande de projet digital 🚀",
      title: "Votre demande de projet digital",
      greeting: (name: string) => `Salut ${name},`,
      thankYouMessage: (_name: string) =>
        `Merci de nous avoir contactés ! Je suis Seto de Seto x Arts. Je vais examiner votre demande pour votre projet de branding ou de site web et je vous contacterai bientôt pour discuter des détails, des prix et des prochaines étapes. Surveillez votre boîte de réception (et le dossier spam) pour les mises à jour !`,
      projectDetails: "Détails du projet :",
      budget: "Votre gamme de budget :",
      additionalInfo: "Détails supplémentaires :",
      regards: "À bientôt,",
      team: "Seto – Seto x Arts",
    },
    branding: {
      subject: "Seto x Arts | Votre demande de projet de branding 🚀",
      title: "Votre demande de projet de branding",
      greeting: (name: string) => `Salut ${name},`,
      thankYouMessage: (_name: string) =>
        `Merci de nous avoir contactés ! Je suis Seto de Seto x Arts. Je vais examiner votre demande pour votre projet de branding et je vous contacterai bientôt pour discuter des détails, des prix et des prochaines étapes. Surveillez votre boîte de réception (et le dossier spam) pour les mises à jour !`,
      projectDetails: "Détails du projet :",
      budget: "Votre gamme de budget :",
      additionalInfo: "Détails supplémentaires :",
      regards: "À bientôt,",
      team: "Seto – Seto x Arts",
    },
    website: {
      subject: "Seto x Arts | Votre demande de projet de site web 🚀",
      title: "Votre demande de projet de site web",
      greeting: (name: string) => `Salut ${name},`,
      thankYouMessage: (_name: string) =>
        `Merci de nous avoir contactés ! Je suis Seto de Seto x Arts. Je vais examiner votre demande pour votre projet de site web et je vous contacterai bientôt pour discuter des détails, des prix et des prochaines étapes. Surveillez votre boîte de réception (et le dossier spam) pour les mises à jour !`,
      projectDetails: "Détails du projet :",
      budget: "Votre gamme de budget :",
      additionalInfo: "Détails supplémentaires :",
      regards: "À bientôt,",
      team: "Seto – Seto x Arts",
    },
  },
};
