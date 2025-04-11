import { LocalPaths, ICta, INavLink, LocalTargets } from "@/data.d";
import { LangType } from "@/i18n";
import { Translations } from "@/langs/langTypes";

export const navContactButtonData = (
  locale: LangType,
  trans: Translations
): ICta => {
  return {
    path: `/${locale}${LocalPaths.CONTACT}`,
    text: trans.buttons.contact,
  };
};
// export const navWoodButtonData = (trans: Translations): ICta => {
//   return {
//     path: LocalPaths.WOOD,
//     scrollTarget: LocalTargets.WOODFORM,
//     text: trans.buttons.getQuote,
//   };
// };

// export const navDigitalButtonData = (trans: Translations): ICta => {
//   return {
//     path: LocalPaths.DIGITAL,
//     scrollTarget: LocalTargets.DIGITALFORM,
//     // text: trans.buttons.getQuote,
//     text: "TEST Digital",
//   };
// };
// export const navBrandingButtonData = (trans: Translations): ICta => {
//   return {
//     path: LocalPaths.DIGITAL + LocalPaths.BRANDING,
//     scrollTarget: LocalTargets.BRANDINGFORM,
//     // text: trans.buttons.getQuote,
//     text: "TEST BRANDING",
//   };
// };
// export const navWebButtonData = (trans: Translations): ICta => {
//   return {
//     path: LocalPaths.DIGITAL + LocalPaths.WEB,
//     scrollTarget: LocalTargets.WEBFORM,
//     // text: trans.buttons.getQuote,
//     text: "TEST Web",
//   };
// };

export const chooseNavButtonData = (
  locale: LangType,
  trans: Translations
  // path: LocalPaths
): ICta => {
  // const NavButtonDataObject = {
  //   [LocalPaths.WOOD]: navContactButtonData(trans),
  //   [LocalPaths.DIGITAL]: navContactButtonData,
  //   [LocalPaths.BRANDING]: navContactButtonData,
  //   [LocalPaths.WEB]: navContactButtonData,
  //   [LocalPaths.CONTACT]: navContactButtonData,
  // };

  // const generator = NavButtonDataObject[path];
  return navContactButtonData(locale, trans); // fallback
};

export const navLinkData = (trans: Translations): (INavLink | ICta)[] => {
  return [
    {
      title: trans.nav.digital,
      path: LocalPaths.DIGITAL,
      ctaArray: [
        {
          text: trans.nav.branding,
          path: LocalPaths.BRANDING,
        } as ICta,
        {
          text: trans.nav.web,
          path: LocalPaths.WEB,
        } as ICta,
      ],
    } as INavLink,
    { text: trans.nav.wood, path: LocalPaths.WOOD } as ICta,
    { text: trans.nav.about, path: LocalPaths.ABOUT } as ICta,
  ];
};
