import React, { useEffect, useState } from 'react';
import './LatestPodcasts.css';
import { SearchContext } from "./searchcontext"; 
import { useContext } from 'react';
import Header from './Header';


const LatestPodcasts = () => {
  const { valueSearch, setValueSearch } = useContext(SearchContext); // Retrieve search term from context
  const [videos, setVideos] = useState([]); // State to store fetched videos
  const [selectedVideo, setSelectedVideo] = useState(null); // State to store the selected video
  const [error, setError] = useState(null); // State to handle errors

  useEffect(() => {
    const fetchVideos = async () => {
     
      try {
        let searchUrl = '';
        
        // Check if valueSearch is empty or not
        if (valueSearch) {
          // If there's a search term, fetch videos based on that term
          searchUrl = `https://www.googleapis.com/youtube/v3/search?key=AIzaSyBpw6J864zcY-z-dapQetpYHgdglgpzUu4&channelId=UCA7iyb3oUVwbg0ozi0DtsUg&q=${valueSearch}&part=snippet,id&order=date&maxResults=5`;
        } else {
          // If there's no search term, fetch videos sorted by date
          searchUrl = `https://www.googleapis.com/youtube/v3/search?key=AIzaSyBpw6J864zcY-z-dapQetpYHgdglgpzUu4&channelId=UCA7iyb3oUVwbg0ozi0DtsUg&part=snippet,id&order=date&maxResults=5`;
        }

        // Make the API call
        const response = await fetch(searchUrl);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setVideos(data.items); // Set fetched videos to state
        setSelectedVideo(data.items[0]); // Set the first video as the default selected video
      } catch (err) {
        console.error("Error fetching videos:", err);
        setError(err.message);
      }
    };

    fetchVideos(); // Call fetchVideos whenever `valueSearch` changes
  }, [valueSearch]); // Re-run whenever `valueSearch` changes

  if (error) {
    return <div>Error fetching videos: {error}</div>;
  }

  // Function to clean the video title
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

