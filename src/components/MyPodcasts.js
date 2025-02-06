import React, { useState, useEffect } from "react";
import { useAuth } from "./Auth";
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
    <div>
      <h2>Mes Podcasts</h2>
      <ul>
      {podcasts.map((podcast) => (
  <li key={podcast.id}>
    <h4>{podcast.title}</h4>
    <p>{podcast.description}</p>

    {/* Check if the file is a video */}
    {podcast.filename.endsWith(".mp4") ? (
      <video width="300" controls>
        <source
          src={`http://localhost:8000/uploads/${podcast.filename}`}
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
    ) : (
      <a href={`http://localhost:8000/uploads/${podcast.filename}`} download>
        Télécharger
      </a>
    )}
    {/* Delete button */}
    <button onClick={() => handleDelete(podcast.id)}>Delete</button>
  </li>
))}
      </ul>

      <h3>Ajouter un Podcast</h3>
      <form onSubmit={handleUpload}>
        <input
          type="text"
          placeholder="Titre"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input type="file" onChange={(e) => setFile(e.target.files[0])} required />
        <button type="submit">Uploader</button>
      </form>
    </div>
  );
};

export default MyPodcasts;
