const Events: React.FC<{children?: React.ReactNode}> = ({children}) => {
    return <>{children}</>
}

export default Events;
export { Events };
export * from "./AddFeatures";
export * from "./FitToFeatures";
export * from "./RemoveLayer";
export * from "./RemoveFeatures";