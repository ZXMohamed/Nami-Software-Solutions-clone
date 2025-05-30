import oursidevideo from "../assets/video/our/our side video.mp4";

export default function Oursidevideo() {

    return (
        <video loop autoPlay muted >
            <source src={ oursidevideo } type='video/mp4' />
        </video>
    )
}