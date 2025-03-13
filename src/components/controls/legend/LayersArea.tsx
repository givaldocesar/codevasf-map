import { forwardRef, useState } from "react";
import classNames from "classnames";
import { ArrowButton } from "../../buttons";
import styles from "./Legend.module.scss";


const LayersArea = forwardRef<HTMLDivElement, {children?: React.ReactNode; title?: string;hide?: boolean;}>(({children, title, hide=false}, ref) => {
    const [_hide, setHide] = useState<boolean>(hide);

    return (
        <div className={styles.area} ref={ref}>
            <div className={styles.title}>
                <ArrowButton 
                    title={_hide ? 'Mostrar camadas' : 'Ocultar camadas'}
                    style={{rotate: _hide ? '180deg' : '0deg'}}
                    onClick={() => setHide(!_hide)}
                />
                <h3>{title}</h3>
            </div>
            <div className={
                    classNames({
                        [styles.items]: true,
                        [styles.collapsed]: _hide
                    })
                }
            >
                { children }
            </div>
        </div>
    );
});

export default LayersArea;