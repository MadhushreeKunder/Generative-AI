import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";

function App() {
  const [captions, setCaptions] = useState([]);
  const [user, setUser] = useState({});
  const [token, setToken] = useState();

  const apiKey = "AIzaSyBcdWHs9aLKJE2wP7X3GX8IsTAp-WLV3I0";
  const videoId = "dWqNgzZwVJQ";

  // Oath 0.2---------------------------------
  function handleCallbackResponse(response) {
    console.log(response.credential);
    setToken(response.credential);
    let userObject = jwt_decode(response.credential);
    setUser(userObject);
    document.getElementById("signInDiv").hidden = true;
  }

  function handleSignOut(event) {
    setUser({});
    document.getElementById("signInDiv").hidden = false;
  }

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: `${process.env.REACT_APP_CLIENT_ID}`,
      // "840174794170-735bmhplqvqbrv4bll4ru2sh2qms2ube.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    });
  }, []);

  // -------------------------------------------------------------------

  // useEffect(() => {
  //   // Make a request to the YouTube Data API to get the video's captions
  //   axios
  //     .get(
  //       `https://www.googleapis.com/youtube/v3/captions?part=snippet&videoId=${videoId}&key=${apiKey}`,
  //     )
  //     .then((response) => {
  //       setCaptions(response.data.items);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching captions:", error);
  //     });
  // }, []);

  // https://developers.google.com/youtube/v3/guides/auth/client-side-web-apps

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  function handleLoadData() {
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
  }

  console.log(captions);

  const handleInput = (e) => {
    console.log(e.target.value);
  };

  const getTranscript = (captionId, apiKey) => {
    // Make a request to the YouTube Data API to get the transcript for the specified caption track
    axios
      .get(
        `https://www.googleapis.com/youtube/v3/captions/${captionId}?key=${apiKey}`,
        // config,
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
      <div id="signInDiv"></div>

      {Object.keys(user).length !== 0 && (
        <button onClick={(e) => handleSignOut(e)}>Sign Out</button>
      )}

      {user && (
        <div>
          <img src={user.picture} alt={user.name} />
          <h3>{user.name}</h3>
        </div>
      )}
      {/* <input type="text" onChange={handleInput}></input> */}
      <button onClick={handleLoadData}>Load Data</button>
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
