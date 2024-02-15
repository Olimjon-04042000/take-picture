import { useEffect, useRef, useState } from "react"

export default () => {

    const videoRef = useRef(null);
    const [imgURL, setImgURL] = useState(null);


    useEffect(() => {
        if (!imgURL) {
            startVideo();
        }

    }, [imgURL]);


    const startVideo = () => {
        const video = videoRef.current;
        navigator.mediaDevices
            .getUserMedia({ video: true, audio: false })
            .then((stream) => {
                video.srcObject = stream;
                video.play();
            })
            .catch((err) => {
                console.error(`An error occurred: ${err}`);
            });
    }


    function takepicture() {
        if (imgURL) {
            setImgURL(null);
            return;
        }

        const canvas = document.querySelector('.canvas')
        const context = canvas.getContext("2d");
        const video = videoRef.current;

        canvas.width = 500;
        canvas.height = 350;
        context.drawImage(video, 0, 0, 500, 350);

        const data = canvas.toDataURL("image/png");
        setImgURL(data);

        const stream = video.srcObject;
        const tracks = stream.getTracks();

        tracks.forEach(track => {
            track.stop();
        });
        video.srcObject = null;
    };

    const download = () => {
        const link = document.createElement("a");

        const date = new Date();
        const time = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}-${date.getHours()}-${date.getMinutes()}`
        link.download = `image-${time}.png`;
        link.href = imgURL;
        link.click();
    }

    return {
        videoRef,
        imgURL,
        takepicture,
        download,
    }
}