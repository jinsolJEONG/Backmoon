import React from "react";

const YoutubeUCC = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingTop: '200px' }}>
            <h1>
                UCC
            </h1>
            <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/zOz0kyh3i4Y?autoplay=1"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
            ></iframe>
        </div>
    );
};

export default YoutubeUCC;
