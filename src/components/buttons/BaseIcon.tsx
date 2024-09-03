import styles from "./Button.module.scss";

const BaseIcon: React.FC<React.HTMLAttributes<HTMLOrSVGElement>> = ({
    children,
    onClick,
    className
}) => {
    return (
        <svg 
            className={`${styles.layer_icon} ${className}`} 
            viewBox="0 0 50 50" 
            onClick={onClick}
        >
            { children }
        </svg>
    );
}

export default BaseIcon;