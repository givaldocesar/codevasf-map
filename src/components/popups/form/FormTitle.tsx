import styles from "./Form.module.scss";

export default function FormTitle({children} : React.HTMLAttributes<HTMLSpanElement>){
    return (
        <span className={styles.title}>
            { children }
        </span>
    );
}