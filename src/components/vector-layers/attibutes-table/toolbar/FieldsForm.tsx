import React from "react";
import classNames from "classnames"
import { FieldType } from "../../../../interfaces";
import styles from "./Toolbar.module.scss";


export default function FieldsForm({
    children,
    className,
    inputsClassName,
    fields,
    ...props
} : React.FormHTMLAttributes<HTMLFormElement>&{
    fields: FieldType[];
    inputsClassName?: string;
}){
    return (
        <form 
            className={classNames(styles.form, className)}
            { ...props }
        >
            <div className={styles.fields}>
                { fields.map(field => {
                    return (
                        <div key={field.name} className={styles.field}>
                            <label>
                                {field.label || field.name}
                            </label>
                            <input 
                                type={field.type}
                                name={field.name}
                                className={inputsClassName}
                                maxLength={field.maxLength}
                            />
                        </div>
                    );
                })}
            </div>
            { children }
        </form>
    );
}