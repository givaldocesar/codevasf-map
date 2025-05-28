import Image, { StaticImageData } from "next/image";
import styles from "./Toolbar.module.scss";
import classNames from "classnames";

export default function Tool({
    children,
    icon,
    className,
    ...props
} : React.ButtonHTMLAttributes<HTMLButtonElement>&{
    children?: React.ReactNode;
    icon: {
        src: string | StaticImageData;
        alt: string
    }
}){
    return (
        <button className={classNames(styles.tool, className)} {...props}>
            <Image 
                src={icon.src}
                width={32}
                height={32}
                alt={icon.alt}
            />
            { children }
        </button>
    );
}