import React from "react";
import styles from "./customloadingcomponent.module.scss";

export const CustomLoading = () => {
  return (
    <div className={styles.preloder}>
      <div className={styles.loader}></div>
    </div>
  );
};
