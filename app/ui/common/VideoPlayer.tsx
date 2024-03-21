import React from 'react';

interface VideoPlayerProps {
  url: string;
  type: string;
}

const VideoPlayer = ({ url, type }: VideoPlayerProps) => {
  return (
    <div>
      <video controls width="100%">
        <source src={url} type={type}/>
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;
