const VectorLayers: React.FC<{children?: React.ReactNode}> = ({children}) => {
    return <>{children}</>
}

export default VectorLayers;
export { default as Layer } from "./Layer";
export { default as URLDataLayer } from "./URLDataLayer";