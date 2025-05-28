import classNames from "classnames";
import styles from "./Button.module.scss";

export default function LoadingIcon(){
    return <div className={classNames(styles.layer_icon, styles.load_circle)} />;
}