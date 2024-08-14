import proj4 from "proj4";
import { register } from "ol/proj/proj4";

export default function registerProjections(){
    //UTM 23S
    proj4.defs(
        "EPSG:31983",
        "+proj=utm +zone=23 +south +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs"
    );

    //UTM 24S
    proj4.defs(
        "EPSG:31984",
        "+proj=utm +zone=24 +south +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs"
    );

    //SIRGAS2000
    proj4.defs(
        "EPSG:4674",
        "+proj=longlat +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +no_defs"
    )

    register(proj4);
}