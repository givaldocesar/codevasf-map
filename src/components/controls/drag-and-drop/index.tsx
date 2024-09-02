import BaseControl from "../BaseControl";

interface Props extends React.HTMLAttributes<HTMLDivElement>{
    collapsable?: boolean;
    collapseImage?: string;
    collapsePositionButton?: 'top_right' | 'top_left';
}

const DragAndDrop: React.FC<Props> = ({
    className, 
    collapsable=false, 
    collapseImage, 
    collapsePositionButton ='top_right'
}) => {
    return (
        <BaseControl
            className={className} 
            collapsable={collapsable}
            collapseImage={collapseImage}
            collapsePositionButton={collapsePositionButton}
        >

        </BaseControl>
    )
}

export default DragAndDrop;