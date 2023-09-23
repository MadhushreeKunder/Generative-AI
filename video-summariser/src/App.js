import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import React, { useEffect, useState } from "react";

function App() {
  const [captions, setCaptions] = useState([]);
  const apiKey = "AIzaSyBcdWHs9aLKJE2wP7X3GX8IsTAp-WLV3I0";
  const videoId = "dWqNgzZwVJQ";

  useEffect(() => {
    // Make a request to the YouTube Data API to get the video's captions
    axios
      .get(
        `https://www.googleapis.com/youtube/v3/captions?part=snippet&videoId=${videoId}&key=${apiKey}`,
      )
      .then((response) => {
        setCaptions(response.data.items);
      })
      .catch((error) => {
        console.error("Error fetching captions:", error);
      });
  }, []);

  console.log(captions);

  const handleInput = (e) => {
    console.log(e.target.value);
  };

  const getTranscript = (captionId, apiKey) => {
    // Make a request to the YouTube Data API to get the transcript for the specified caption track
    axios
      .get(
        `https://www.googleapis.com/youtube/v3/captions/${captionId}?key=${apiKey}`,
      )
      .then((response) => {
        const transcript = response.data.snippet.track;
        console.log("Transcript:", transcript);
      })
      .catch((error) => {
        console.error("Error fetching transcript:", error);
      });
  };

  return (
    <div className="App">
      <input type="text" onChange={handleInput}></input>
      <h1>YouTube Video Captions</h1>
      <ul>
        {captions.map((caption) => (
          <li key={caption.id}>
            <strong>Language: {caption.snippet.language}</strong>
            <button onClick={() => getTranscript(caption.id, apiKey)}>
              Get Transcript
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
