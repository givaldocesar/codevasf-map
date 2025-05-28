import classNames from "classnames";
import styles from "./Form.module.scss";

export default function Form({
    children, 
    className, 
    ...props
} : React.FormHTMLAttributes<HTMLFormElement>){
    return (
        <form className={classNames(styles.form,className)} {...props}>
            { children }
        </form>
    );
}