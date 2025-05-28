import styles from "./Form.module.scss";

export default function FormRow({children, ...props} : React.HTMLAttributes<HTMLDivElement>){
    return (
        <div className={styles.row} {...props}>
            { children }
        </div>
    );
}