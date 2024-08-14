const Controls: React.FC<{children?: React.ReactNode}> = ({children}) => {
    return <>{ children }</>;
}

export default Controls;
export { default as BaseControl } from "./BaseControl";
export { default as Attribution } from "./Attributions";
export { default as Legend } from "./legend";
export { default as Scale } from "./Scale";
export { default as Title } from "./Title";