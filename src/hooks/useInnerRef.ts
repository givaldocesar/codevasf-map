import { useRef, useImperativeHandle } from "react";

export default function useInnerRef(ref: React.ForwardedRef<HTMLDivElement>){
    const innerRef = useRef<HTMLDivElement>(null);
    useImperativeHandle(ref, () => innerRef.current!, []);
    return innerRef;
}