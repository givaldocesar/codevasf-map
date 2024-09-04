import { Feature, Overlay } from "ol";
import styles from "./DragAndDrop.module.scss";

export default function updatePopup(popup: Overlay, feature: Feature){
    const container = popup.getElement() as HTMLDivElement;
    while(container.firstChild) container.removeChild(container.firstChild); //clear html

    const table = document.createElement('table');
    const tbody = document.createElement('tbody');
    table.appendChild(tbody);

    const data = Object.entries(feature.getProperties());
    data.forEach(([key, value]) => {
           if(key !== 'geometry' && key !== 'styleUrl') {
            const row = document.createElement('tr');

            const keyCell = document.createElement('td');
            keyCell.className = styles.label;
            keyCell.appendChild(document.createTextNode(key));
            row.appendChild(keyCell);
    
            const valueCell = document.createElement('td');
            valueCell.className = styles.value;
            valueCell.appendChild(document.createTextNode(value));
            row.appendChild(valueCell);
    
            tbody.appendChild(row);
        }
    });

    container.appendChild(table);
}