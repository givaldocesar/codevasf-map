import React from "react";
import { CustomLayer } from "../../classes";

export default React.createContext<CustomLayer>(new CustomLayer({geometry: "NoGeometry"}));