import styles from "./Form.module.scss";

const Form: React.FC<React.FormHTMLAttributes<HTMLFormElement>> = ({children, className="", ...props}) => {
    return (
        <form className={styles.form + " " + className} {...props}>
            { children }
        </form>
    );
}

export default Form;
export { default as FormRow } from "./FormRow";
export { default as FormTitle } from "./FormTitle";
export { default as Select } from "./Select";