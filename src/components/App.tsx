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

const App = () => {
  const ref = useRef<any>(null);
  const [modalOpen] = useAtom(modalData);
  const [lang] = useAtom(langData);
  const navigate = useNavigate();

  const navQuery = `*[_type == 'navbar' && lang == '${lang}'][0]`;
  const navbarData: INavBar = useFetchPage(navQuery)!;

  const footerQuery = `*[_type == 'footer' && lang == '${lang}'][0]`;
  const footerData: IFooter = useFetchPage(footerQuery)!;

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
            <Route
              path={`/${lang}/service/landing`}
              element={<ServicePage path="landing" />}
            />
            <Route
              path={`/${lang}/service/branding`}
              element={<ServicePage path="branding" />}
            />
            <Route
              path={`/${lang}/service/custom`}
              element={<ServicePage path="custom" />}
            />
            <Route path={`/${lang}/about`} element={<AboutPage />} />
            <Route path={`/${lang}/contact`} element={<ContactPage />} />
          </Routes>
        </div>

        {footerData && (
          <Footer
            privacyTerms={footerData?.privacyTerms}
            trademark={footerData?.trademark}
            links={navbarData?.links}
          />
        )}
      </div>
    )
  );
};

export default App;
