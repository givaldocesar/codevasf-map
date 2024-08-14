import styles from "./Button.module.scss";

const ArrowButton: React.FC<React.SVGAttributes<HTMLOrSVGElement>&{title?: string}> = ({className="", title, ...props}) => {
    return (
        <svg className={`${styles.arrow} ${className}`} viewBox="0 0 250 250" {...props}>
            <title>{title}</title>
            <path d="M 30 80 L125 200 L220 80 Z" />
        </svg>
    );
}

export default ArrowButton;