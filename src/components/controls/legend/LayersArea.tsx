import { forwardRef, useState } from "react";
import { ArrowButton } from "../../buttons";
import styles from "./Legend.module.scss";

interface Props {
    children?: React.ReactNode; 
    title?: string;
    hide?: boolean;
}

const LayersArea = forwardRef<HTMLDivElement, Props>(({children, title, hide=false}, ref) => {
    const [_hide, setHide] = useState(hide);

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
            <div className={styles.items} style={{maxHeight: _hide ? '0px' : '500px' }}>
                { children }
            </div>
        </div>
    );
});

export default LayersArea;