import { useEffect, useState } from 'react';
import './App.css';
import { Auth } from './components/auth';
import { auth, db, storage } from "./config/firebase";
import { getDocs, collection, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes } from 'firebase/storage';

function App() {
  const [movieList, setMovieList] = useState([]);
  const [newTitleMovie, setNewTitleMovie] = useState("");
  const [newReleaseDate, setNewReleaseDate] = useState("");
  const [isNewMovieOscar, setIsNewMovieOscar] = useState(false);
  const [newUpdateTitle, setNewUpdateTitle] = useState("");

  const moviesCollectionRef = collection(db, "movies");

  const getMovieList = async () => {
    try {
      const data = await getDocs(moviesCollectionRef);
      const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setMovieList(filteredData);
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    getMovieList();
  }, []);

  const onSubmitMovie = async () => {
    try {
      await addDoc(moviesCollectionRef, {
        title: newTitleMovie,
        releasedate: newReleaseDate,
        receivedAnOscar: isNewMovieOscar,
        userId: auth?.currentUser?.uid,
      });

      await getMovieList();
    } catch (error) {
      alert(error.message);
    }
  };

  const deleteMovie = async (id) => {
    const movieDoc = doc(db, "movies", id);
    await deleteDoc(movieDoc);
    getMovieList();
  };

  const updateMovieTitle = async (id) => {
    const movieDoc = doc(db, "movies", id);
    await updateDoc(movieDoc, { title: newUpdateTitle });
    getMovieList();
  };

  const [fileUpload, setUploadFile] = useState(null);

  const uploadFile = async () => {
    try {
      if (!fileUpload) {
        alert("Por favor, selecciona un archivo");
        return;
      }
      const filesFolderRef = ref(storage, `projectFiles/${fileUpload.name}`);
      await uploadBytes(filesFolderRef, fileUpload);
      alert("Archivo subido exitosamente");
    } catch (error) {
      alert(`Error al subir el archivo: ${error.message}`);
    }
  };

  return (
    <div className="App">
      <Auth />
      <div>
        <input type="text" placeholder="Movie Title..." onChange={(e) => setNewTitleMovie(e.target.value)} />
        <input type="number" placeholder="Release Year..." onChange={(e) => setNewReleaseDate(Number(e.target.value))} />
        <input type="checkbox" checked={isNewMovieOscar} onChange={(e) => setIsNewMovieOscar(e.target.checked)} />
        <label>Received an Oscar</label>
        <button onClick={onSubmitMovie}>Submit</button>
      </div>
      <div>
        {movieList.map((movie) => (
          <div key={movie.id}>
            <h1 style={{ color: movie.receivedAnOscar ? "green" : "red" }}>{movie.title}</h1>
            <p>{movie.releasedate}</p>
            <button onClick={() => deleteMovie(movie.id)}>Delete Movie</button>
            <input type="text" placeholder="New title ..." onChange={(e) => setNewUpdateTitle(e.target.value)} />
            <button onClick={() => updateMovieTitle(movie.id)}>Update title</button>
          </div>
        ))}
      </div>
      <div>
        <input type="file" onChange={(e) => setUploadFile(e.target.files[0] || null)} />
        <button onClick={uploadFile}>Upload file</button>
      </div>
    </div>
  );
}

export default App;
