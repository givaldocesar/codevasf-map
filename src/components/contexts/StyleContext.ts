import React from "react";
import { CustomSimpleStyle, CustomCategorizedStyle } from "../../classes";

export default React.createContext<CustomSimpleStyle | CustomCategorizedStyle | null>(null);