import React, { useEffect, useState } from 'react';
import './LatestPodcasts.css';
import { SearchContext } from "./searchcontext"; 
import { useContext } from 'react';
import Header from './Header';


const LatestPodcasts = () => {
  const { valueSearch, setValueSearch } = useContext(SearchContext); 
  const [videos, setVideos] = useState([]); 
  const [selectedVideo, setSelectedVideo] = useState(null); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchVideos = async () => {
     
      try {
        let searchUrl = '';
        
       
        if (valueSearch) {
      
          searchUrl = `https://www.googleapis.com/youtube/v3/search?key=AIzaSyBpw6J864zcY-z-dapQetpYHgdglgpzUu4&channelId=UCA7iyb3oUVwbg0ozi0DtsUg&q=${valueSearch}&part=snippet,id&order=date&maxResults=5`;
        } else {
        
          searchUrl = `https://www.googleapis.com/youtube/v3/search?key=AIzaSyBpw6J864zcY-z-dapQetpYHgdglgpzUu4&channelId=UCA7iyb3oUVwbg0ozi0DtsUg&part=snippet,id&order=date&maxResults=5`;
        }

        
        const response = await fetch(searchUrl);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setVideos(data.items); 
        setSelectedVideo(data.items[0]); 
      } catch (err) {
        console.error("Error fetching videos:", err);
        setError(err.message);
      }
    };

    fetchVideos(); 
  }, [valueSearch]); 

  if (error) {
    return <div>Error fetching videos: {error}</div>;
  }

 
  const cleanTitle = (title) => {
    const parser = new DOMParser();
    const decodedString = parser.parseFromString(title, "text/html").body.textContent || "";
    return decodedString;
  };

  return (
    <div>
    <Header className="headerOtherC"/>
    <div className="parent">
      
    <div className="video-container-Lp">
      {/* Sidebar */}
      <div className="video-sidebar">
        <h2 className='Lph2'>Playlist</h2>
        <ul className='Lpul'>
          {videos.length > 0 ? (
            videos.map((video) => (
              <li className='Lpli' key={video.id.videoId}>
                <button
                  onClick={() => setSelectedVideo(video)}
                  className={selectedVideo?.id.videoId === video.id.videoId ? 'active' : ''}
                >
                  <img
                    src={video.snippet.thumbnails.medium.url}
                    alt={video.snippet.title}
                    className="video-thumbnail"
                  />
                  <span>{cleanTitle(video.snippet.title)}</span>
                </button>
              </li>
            ))
          ) : (
            <p>Loading videos...</p>
          )}
        </ul>
      </div>

      {/* Video Player */}
      <div className="video-player">
        {selectedVideo ? (
          <div>
            <iframe 
              className='Lpiframe'
              width="100%"
              height="400"
              src={`https://www.youtube.com/embed/${selectedVideo.id.videoId}`}
              title={selectedVideo.snippet.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <h3 className='Lph3'>{cleanTitle(selectedVideo.snippet.title)}</h3>
          </div>
        ) : (
          <p className='Lpp'>Select a video from the playlist to play.</p>
        )}
      </div>
    </div>
    </div></div>
  );
};
export default LatestPodcasts;

