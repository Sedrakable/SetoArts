import React, { lazy, useEffect, useRef, Suspense } from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import { Modal, modalData } from "./reuse/Modal";
import { useAtom } from "jotai";
import styles from "./App.module.scss";
import "../css/Main.css";
import "../css/ScrollBar.scss";

import { HomePage } from "./pages/HomePage";
import { Navbar } from "./navbar/Navbar";
import { Footer } from "./footer/Footer";
import { langData } from "./navbar/LangSwitcher/LangSwitcher";
import { LocalPaths } from "../data.d";
import { useDataQuery } from "../api/useDataQuery";
import { ScrollToTop } from "../helpers/ScrollToTop";
import { BlogPage } from "./pages/BlogPage";
import { ArticlePage } from "./pages/ArticlePage";

const LegalPage = lazy(() =>
  import("./pages/LegalPage").then((comp) => ({ default: comp.LegalPage }))
);
const NotFound = lazy(() =>
  import("./pages/NotFound").then((comp) => ({ default: comp.NotFound }))
);
const ContactPage = lazy(() =>
  import("./pages/ContactPage").then((comp) => ({ default: comp.ContactPage }))
);
const AboutPage = lazy(() =>
  import("./pages/AboutPage").then((comp) => ({ default: comp.AboutPage }))
);
const ServicePage = lazy(() =>
  import("./pages/ServicePage").then((comp) => ({ default: comp.ServicePage }))
);

const App = () => {
  const ref = useRef<any>(null);
  const [modalOpen, setModalOpen] = useAtom(modalData);
  const [lang] = useAtom(langData);
  const location = useLocation();

  const {
    footerData,
    navbarData,
    homePageData,
    legalPageData,
    servicePageData,
    aboutPageData,
    contactPageData,
    notFoundPageData,
    blogPageData,
  } = useDataQuery(lang);

  useEffect(() => {
    modalOpen
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "auto");
  }, [modalOpen]);

  // Close modal when navigating to /about route
  useEffect(() => {
    if (location.pathname === `/${lang}${LocalPaths.ABOUT}`) {
      setModalOpen(null);
    }
  }, [lang, setModalOpen, location]);
  return (
    navbarData && (
      <div className={styles.app} ref={ref}>
        <Navbar {...navbarData} />
        {modalOpen && <Modal {...modalOpen} />}

        <ScrollToTop />
        <div className={styles.page}>
          <Suspense fallback={<div>Loading...</div>}>
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
                path={`/${lang}${LocalPaths.BLOG}`}
                element={<BlogPage {...blogPageData} />}
              />
              {blogPageData?.blog.articles?.map((article) => {
                return (
                  <Route
                    key={article.slug.current}
                    path={`/${lang}${LocalPaths.BLOG}/${article.slug.current}`}
                    element={<ArticlePage article={article} />}
                  />
                );
              })}
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

              <Route path="*" element={<NotFound {...notFoundPageData} />} />
            </Routes>
          </Suspense>
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
