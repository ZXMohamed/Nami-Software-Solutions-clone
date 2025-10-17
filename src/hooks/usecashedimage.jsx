import { useDispatch, useSelector } from "react-redux";
import { fetchImage } from "../redux/clint state/imagecash";

function useCashedImage(url, section, id) {

    if (!url || !section || !id) return [null, () => { console.error(`Missing Param => url = ${url} OR section = ${section} OR id = ${id}`); }]; 

    const dispatch = useDispatch();
    const images = useSelector((state) => state.loadImage?.[section]?.[id]);

    return [images, () => dispatch(fetchImage({ url:url+5, section, id }))];
}

export default useCashedImage;