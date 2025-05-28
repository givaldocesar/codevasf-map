import classNames from "classnames";
import styles from "./Button.module.scss";

export default function ArrowButton({
    className, 
    title, 
    ...props
} : React.SVGAttributes<HTMLOrSVGElement>&{title?: string}){
    return (
        <svg 
            className={classNames(styles.arrow, className)} 
            viewBox="0 0 250 250" 
            {...props}
        >
            <title>{title}</title>
            <path d="M 30 80 L125 200 L220 80 Z" />
        </svg>
    );
}