import {useCategory} from "../../context/CategoryContext";
import {IQuestion} from "../../Backend/model/Question-model";

type DragEvent = React.DragEvent<HTMLDivElement>;

export default function useDragDropHook() {
    const {dispatch} = useCategory();

    // ** OnDragOver Event - while user holding state...
    function onDragOver(event: DragEvent, payload: IQuestion) {
        event.stopPropagation();
        event.preventDefault();
    }

    // ** OnDrop - when user drop held question onto div
    function onDrop(event: DragEvent, payload: IQuestion) {
        event.stopPropagation();
        const dropZone: string = event.currentTarget.id;
        if (dropZone === 'easy')
            dispatch({type: "CAT_EASY", payload: {question: payload}});
        else if (dropZone === 'medium')
            dispatch({type: "CAT_MEDIUM", payload: {question: payload}});
        else if (dropZone === 'hard')
            dispatch({type: "CAT_HARD", payload: {question: payload}});
    }

    return {
        onDrop, onDragOver
    }

}