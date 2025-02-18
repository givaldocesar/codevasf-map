import styles from "./Button.module.scss";

export default function LoadingIcon(){
    return <div className={`${styles.layer_icon} ${styles.load_circle}`} />;
}