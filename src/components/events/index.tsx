export default function Events({children} : {children?: React.ReactNode}){
    return <>{children}</>
}

export { Events };
export * from "./AddFeatures";
export * from "./AddLayer";
export * from "./FitToFeatures";
export * from "./RemoveLayer";
export * from "./RemoveFeatures";