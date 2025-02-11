import React, { useState, useEffect } from "react";
import { useAuth } from "./Auth";
import   "./MyPodcasts.css";
import Header from "./Header";
//import { useSelector } from 'react-redux';
const MyPodcasts = () => {
  const [podcasts, setPodcasts] = useState([]);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

const { userId, token } = useAuth()
  useEffect(() => {
    console.log(userId);
    fetch(`http://localhost:8000/api/mypodcasts?user_id=${userId}`)
      .then((res) => res.json())
      .then((data) => setPodcasts(data))
      .catch((error) => console.error("Erreur de récupération:", error)); 
 
  console.log("this is the userid",userId);
}, [userId]);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert("Sélectionne un fichier!");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("file", file);
    formData.append("user_id",userId);

    const response = await fetch("http://localhost:8000/api/podcasts", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      alert("Podcast ajouté avec succès!");
      window.location.reload();
    } else {
      alert("Erreur lors de l'upload");
    }

  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this podcast?");
    
    if (confirmed) {
      try {
        const response = await fetch(`http://localhost:8000/api/podcasts/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          setPodcasts(podcasts.filter((podcast) => podcast.id !== id)); // Remove from state
          alert("Podcast deleted successfully!");
        } else {
          alert("Error deleting podcast.");
        }
      } catch (error) {
        console.error("Error deleting podcast:", error);
        alert("An error occurred while deleting the podcast.");
      }
    }
  };

  return (
    <div className="app-container-mypodcasts">
   <Header className="headerOtherC"/>
    <div className="containerMypodcasts">
      <div className="form-container">
        <form className="Myform" onSubmit={handleUpload}>
          <h3  className="h3AddPod">Add a podcast</h3>
          <div>
            <label className="Mylabel">The title</label>
            <input
              type="text"
              placeholder="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="Myinput"
            />
          </div>
          <div>
            <label className="Mylabel">The description</label>
            <input
              type="text"
              placeholder="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="Myinput"
            />
          </div>
          <div>
            <label className="Mylabel">The podcast</label>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              required
              className="Myinput"
            />
          </div>
          <div className="buttonClass">
            <button className="Mybutton" type="submit">
              Uploader
            </button>
          </div>
        </form>
      </div>
  
      <div className="podcast-list">
        <h2 className="h2Mypodcasts">My Podcasts</h2>
        <ul className="podcast-scrollable">
          {podcasts.map((podcast) => (
            <li key={podcast.id} className="podcast-item">
              <h4 className="h4title">{podcast.title}</h4>
              <p className="description">{podcast.description}</p>
              {/* Check if the file is a video */}
              {podcast.filename.endsWith(".mp4") ? (
                <video className="videoMyPodcasts" width="300" controls>
                  <source
                    src={`http://localhost:8000/uploads/${podcast.filename}`}
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <a className="afile" href={`http://localhost:8000/uploads/${podcast.filename}`} download>
                  Télécharger
                </a>
              )}
              <button
                className="delete-button"
                onClick={() => handleDelete(podcast.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
  
   
  );
};

export default MyPodcasts;
