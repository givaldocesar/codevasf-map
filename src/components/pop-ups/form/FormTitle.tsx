import styles from "./Form.module.scss";

const FormTitle: React.FC<React.HTMLAttributes<HTMLSpanElement>> = ({children}) => {
    return (
        <span className={styles.title}>
            { children }
        </span>
    );
}

export default FormTitle;