import styles from "./Spinner.module.scss";

export const Spinner: React.FC = () => {
  return (
    <div className={styles.spinner}>
      <div className={styles.loader}></div>
    </div>
  );
};
