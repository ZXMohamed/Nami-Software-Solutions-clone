import ourSideVideo from "../assets/video/our/our side video.mp4";

export default function() {

    return (
        <video loop autoPlay muted className="sideVideo">
            <source src={ ourSideVideo } type='video/mp4' />
        </video>
    )
}