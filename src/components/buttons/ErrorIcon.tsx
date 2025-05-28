import styles from "./Button.module.scss";

export default function ErrorIcon({message} : {message: string}){
    return (
        <svg className={styles.layer_icon} viewBox="0 0 50 50" style={{cursor: 'help'}}>
            <title>{message}</title>
            <line x1={10} y1={10} x2={40} y2={40} stroke="red" strokeWidth={5} />
            <line x1={40} y1={10} x2={10} y2={40} stroke="red" strokeWidth={5} />
        </svg>
    );
}

            