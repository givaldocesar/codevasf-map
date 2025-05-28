import { useState } from "react";

export default function useForceUpdate(){
    const [revision, setRevision] = useState<number>(0);
    return () => setRevision(revision => revision + 1);
}