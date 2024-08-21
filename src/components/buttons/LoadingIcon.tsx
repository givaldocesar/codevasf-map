import styles from "./Button.module.scss";

const LoadingIcon: React.FC = () => {
    return <div className={`${styles.layer_icon} ${styles.load_circle}`} />;
}

export default LoadingIcon;