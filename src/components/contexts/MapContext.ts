import React from "react";
import { CustomMap } from "../../classes";

export default React.createContext<CustomMap>(new CustomMap({}));