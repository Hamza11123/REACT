import React from 'react'

import { useParams } from "react-router-dom";
const Video = () => {
    const prams = useParams();

    console.log(prams)

    return (
        <div>VideoDetails</div>
    )
}

export default Video;