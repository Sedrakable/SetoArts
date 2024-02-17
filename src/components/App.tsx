import React, { useRef } from "react";
import { Route, Routes } from "react-router-dom";
import { Modal, modalData } from "./reuse/Modal";
import { useAtom } from "jotai";
import styles from "./App.module.scss";
import "../css/Main.css";
import "../css/ScrollBar.scss";

import { ScrollToTop } from "../helpers/ScrollToTop";
// import { WordPressPosts } from "./WordPressCMS";
import { INavBar } from "../data";
import { HomePage } from "./pages/HomePage";
import { ServicePage } from "./pages/ServicePage";
import { useFetchPage } from "../api/useFetchPage";
import { Navbar } from "./navbar/Navbar";

const App = () => {
  const ref = useRef<any>(null);
  const [modalOpen] = useAtom(modalData);
  const navQuery = `*[_type == 'navbar'][0]`;
  const navbarData: INavBar = useFetchPage(navQuery)!;

  console.log("nav", navbarData);
  return (
    <div className={styles.app} ref={ref}>
      {navbarData && <Navbar {...navbarData} />}
      {modalOpen && <Modal {...modalOpen} />}

      <ScrollToTop />
      <div className={styles.page}>
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/services" element={<ServicePage />} />
        </Routes>
      </div>

      {/* <Footer /> */}
    </div>
  );
};

export default App;
