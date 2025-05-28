import classNames from "classnames";
import styles from "./Button.module.scss";


export default function BaseIcon({
    children,
    className,
    ...props
} : React.HTMLAttributes<HTMLOrSVGElement>){
    return (
        <svg 
            className={classNames(styles.layer_icon, className)} 
            viewBox="0 0 50 50" 
            {...props}
        >
            { children }
        </svg>
    );
}