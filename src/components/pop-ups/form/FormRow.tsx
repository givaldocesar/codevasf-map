import styles from "./Form.module.scss";

const FormRow: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({children, ...props}) => {
    return (
        <div className={styles.row} {...props}>
            { children }
        </div>
    );
}

export default FormRow;