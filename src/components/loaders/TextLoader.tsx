import styles from "./Loaders.module.scss";

const Loader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
    children,
    className
}) => {
    return (
        <div className={className}>
            <p className={styles.pulse}>
                {children}
                <span className={styles.dots} />
            </p>
        </div>
    )
}

export default Loader;