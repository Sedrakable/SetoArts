import React, { useEffect, useRef } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import { Modal, modalData } from "./reuse/Modal";
import { useAtom } from "jotai";
import styles from "./App.module.scss";
import "../css/Main.css";
import "../css/ScrollBar.scss";

import { ScrollToTop } from "../helpers/ScrollToTop";
import { HomePage } from "./pages/HomePage";
import { ServicePage } from "./pages/ServicePage";
import { Navbar } from "./navbar/Navbar";
import { Footer } from "./footer/Footer";
import { AboutPage } from "./pages/AboutPage";
import { langData } from "./navbar/LangSwitcher/LangSwitcher";
import { ContactPage } from "./pages/ContactPage";
import { NotFound } from "./pages/NotFound";
import { LegalPage } from "./pages/LegalPage";
import { LocalPaths } from "../data.d";
import { useDataQuery } from "../api/useDataQuery";

const App = () => {
  const ref = useRef<any>(null);
  const [modalOpen] = useAtom(modalData);
  const [lang] = useAtom(langData);
  const navigate = useNavigate();

  const {
    footerData,
    navbarData,
    homePageData,
    legalPageData,
    servicePageData,
    aboutPageData,
    contactPageData,
    notFoundPageData,
  } = useDataQuery();

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

  const handleModalClose = (handleClose: () => void) => {
    handleClose();

    const newPath = `/${lang}${LocalPaths.ABOUT}`;
    navigate(newPath);
  };

  return (
    navbarData && (
      <div className={styles.app} ref={ref}>
        <Navbar {...navbarData} />
        {modalOpen && (
          <Modal
            {...modalOpen}
            handleClose={() => handleModalClose(modalOpen.handleClose)}
          />
        )}

        <ScrollToTop />
        <div className={styles.page}>
          <Routes>
            <Route
              path="/"
              element={<Navigate to={`/${lang}${LocalPaths.HOME}`} />}
            />
            <Route
              path={`/${lang}${LocalPaths.HOME}`}
              element={<HomePage {...homePageData} />}
            />
            {servicePageData?.map((service) => {
              return (
                <Route
                  key={service.path}
                  path={`/${lang}${LocalPaths.SERVICE}${service.path}`}
                  element={<ServicePage {...service} />}
                />
              );
            })}
            <Route
              path={`/${lang}${LocalPaths.ABOUT}`}
              element={<AboutPage {...aboutPageData} />}
            />
            <Route
              path={`/${lang}${LocalPaths.ABOUT}/:slug`}
              element={<AboutPage {...aboutPageData} />}
            />
            <Route
              path={`/${lang}${LocalPaths.CONTACT}`}
              element={<ContactPage {...contactPageData} />}
            />
            {legalPageData?.map((page) => {
              return (
                <Route
                  key={page.path}
                  path={`/${lang}${page.path}`}
                  element={<LegalPage {...page} />}
                />
              );
            })}
            {/* {workData?.map((work) => {
              return (
                <Route
                  key={work._id}
                  path={`/${lang}${LocalPaths.WORK}${work.slug}`}
                  element={<Work {...page} />}
                />
              );
            })} */}
            <Route path="*" element={<NotFound {...notFoundPageData} />} />
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
