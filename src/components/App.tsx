import React, { useEffect, useRef } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import { Modal, modalData } from "./reuse/Modal";
import { useAtom } from "jotai";
import styles from "./App.module.scss";
import "../css/Main.css";
import "../css/ScrollBar.scss";

import { ScrollToTop } from "../helpers/ScrollToTop";
// import { WordPressPosts } from "./WordPressCMS";
import { IFooter, INavBar } from "../data";
import { HomePage } from "./pages/HomePage";
import { ServicePage } from "./pages/ServicePage";
import { useFetchPage } from "../api/useFetchPage";
import { Navbar } from "./navbar/Navbar";
import { Footer } from "./footer/Footer";
import { AboutPage } from "./pages/AboutPage";
import { langData } from "./navbar/LangSwitcher/LangSwitcher";
import { ContactPage } from "./pages/ContactPage";
import { NotFound } from "./pages/NotFound";
import { LegalPage } from "./pages/LegalPage";

const App = () => {
  const ref = useRef<any>(null);
  const [modalOpen] = useAtom(modalData);
  const [lang] = useAtom(langData);
  const navigate = useNavigate();

  const navQuery = `*[_type == 'navbar' && lang == '${lang}'][0]`;
  const navbarData: INavBar = useFetchPage(navQuery)!;

  const footerQuery = `*[_type == 'footer' && lang == '${lang}'][0]{
    ...,
    legals[]->{
      title,
      path,
    },
    socials->{
      ...,
      links[],
    },
  }`;
  const footerData: IFooter = useFetchPage(footerQuery)!;
  console.log("footer", footerData);

  const servicesQuery = `*[_type == 'servicePage' && lang == '${lang}']{
   path
  }`;
  const serviceData: { path: string }[] = useFetchPage(servicesQuery)!;

  const legalQuery = `*[_type == 'legalPage' && lang == '${lang}']{
    path
  }`;

  const legalPageData: { path: string }[] = useFetchPage(legalQuery)!;
  // console.log("legal", legalPageData);
  useEffect(() => {
    modalOpen
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "auto");
  }, [modalOpen]);

  useEffect(() => {
    const currentPath = window.location.pathname;
    const newLangPath = currentPath.replace(/\/(en|fr)\//, `/${lang}/`);
    navigate(newLangPath);
  }, [lang, navigate]);

  return (
    navbarData && (
      <div className={styles.app} ref={ref}>
        <Navbar {...navbarData} />
        {modalOpen && <Modal {...modalOpen} />}

        <ScrollToTop />
        <div className={styles.page}>
          <Routes>
            {/* Super important to keep the same order as in navbar*/}
            <Route path="/" element={<Navigate to={`/${lang}/home`} />} />
            <Route path={`/${lang}/home`} element={<HomePage />} />
            <Route path={`/${lang}/home`} element={<HomePage />} />
            {serviceData?.map((service) => {
              return (
                <Route
                  path={`/${lang}/service/${service.path}`}
                  element={<ServicePage path={service.path} />}
                />
              );
            })}
            <Route path={`/${lang}/about`} element={<AboutPage />} />
            <Route path={`/${lang}/contact`} element={<ContactPage />} />
            {legalPageData?.map((page) => {
              return (
                <Route
                  path={`/${lang}/${page.path}`}
                  element={<LegalPage path={page.path} />}
                />
              );
            })}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>

        {footerData && (
          <Footer
            legals={footerData?.legals}
            trademark={footerData?.trademark}
            links={navbarData?.links}
            socials={{ links: footerData?.socials?.links }}
          />
        )}
      </div>
    )
  );
};

export default App;
