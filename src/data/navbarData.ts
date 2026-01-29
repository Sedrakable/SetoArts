import { LocalPaths, ICta, INavLink } from "@/data.d";
import { LangType } from "@/i18n/request";
import { Translations } from "@/langs/langTypes";

export const navContactButtonData = (
  locale: LangType,
  trans: Translations,
): ICta => {
  return {
    path: `/${locale}${LocalPaths.CONTACT}`,
    text: trans.buttons.contact,
  };
};
// export const navWoodButtonData = (trans: Translations): ICta => {
//   return {
//     path: LocalPaths.SIGNS,
//     scrollTarget: LocalTargets.SIGNSFORM,
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
  trans: Translations,
  // path: LocalPaths
): ICta => {
  // const NavButtonDataObject = {
  //   [LocalPaths.SIGNS]: navContactButtonData(trans),
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
    { text: trans.nav.home, path: LocalPaths.HOME } as ICta,
    // {
    //   title: trans.nav.services,
    //   path: LocalPaths.SERVICES,
    //   ctaArray: [
    //     {
    //       text: trans.nav.signs,
    //       path: LocalPaths.SIGNS,
    //     } as ICta,
    //     {
    //       text: trans.nav.decor,
    //       path: LocalPaths.DECOR,
    //     } as ICta,
    //   ],
    // } as INavLink,

    { text: trans.nav.projects, path: LocalPaths.PROJECTS } as ICta,
    // { text: trans.nav.about, path: LocalPaths.ABOUT } as ICta,
  ];
};
