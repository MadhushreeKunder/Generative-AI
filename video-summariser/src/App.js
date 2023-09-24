import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";

const API_KEY = process.env.REACT_APP_API_KEY;
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const SCOPES = "https://www.googleapis.com/auth/youtube.force-ssl";
const videoId = "dWqNgzZwVJQ";

function App() {
  const [captions, setCaptions] = useState([]);
  const [user, setUser] = useState({});
  const [token, setToken] = useState();
  const [tokenClient, setTokenClient] = useState({});
  const [accessToken, setAccessToken] = useState();

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

  console.log(CLIENT_ID, "client new");

  function getAccessToken() {
    tokenClient.requestAccessToken();
  }

  useEffect(() => {
    // /* global google */
    const google = window.google;
    google.accounts.id.initialize({
      client_id: CLIENT_ID,
      // "840174794170-735bmhplqvqbrv4bll4ru2sh2qms2ube.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    });

    const tokenCallback = (tokenResponse) => {
      console.log(tokenResponse);
      setAccessToken(tokenResponse.access_token);
    };

    let tokentest = "";
    setTokenClient(
      google.accounts.oauth2.initTokenClient({
        client_id: CLIENT_ID,
        scope: SCOPES,
        redirect_uri: "http://localhost:3000",
        response_type: "token",
        state: "pass-through value",
        callback: tokenCallback,
      }),
    );

    console.log(tokentest, "tokentest");

    // tokenc

    // google.accounts.id.prompt();
  }, []);

  console.log(tokenClient, "token client");

  console.log(accessToken, "accesssss");

  // -------------------------------------------------------------------

  // https://developers.google.com/youtube/v3/guides/auth/client-side-web-apps

  const config = {
    headers: { Authorization: `Bearer ${tokenClient}` },
  };

  function handleLoadData() {
    axios
      .get(
        `https://www.googleapis.com/youtube/v3/captions?part=snippet&videoId=${videoId}&key=${API_KEY}`,
      )
      .then((response) => {
        setCaptions(response.data.items);
      })
      .catch((error) => {
        console.error("Error fetching captions:", error);
      });
  }

  console.log(captions);

  console.log("access token client", tokenClient.access_token);

  const getTranscript = async (captionId, API_KEY) => {
    // Make a request to the YouTube Data API to get the transcript for the specified caption track

    try {
      const captionsData = await fetch(
        `https://www.googleapis.com/youtube/v3/captions/${captionId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      console.log(captionsData, "data captions");
    } catch (error) {
      console.error(error);
    }

    // axios
    //   .get(
    //     `https://www.googleapis.com/youtube/v3/captions/${captionId}?key=${API_KEY}`,
    //     config,
    //   )
    //   .then((response) => {
    //     const transcript = response.data.snippet.track;
    //     console.log("Transcript:", transcript);
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching transcript:", error);
    //   });
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
          <input type="submit" onClick={getAccessToken} />
        </div>
      )}
      {/* <input type="text" onChange={handleInput}></input> */}
      <button onClick={handleLoadData}>Load Data</button>
      <h1>YouTube Video Captions</h1>
      <ul>
        {captions.map((caption) => (
          <li key={caption.id}>
            <strong>Language: {caption.snippet.language}</strong>
            <button onClick={() => getTranscript(caption.id, API_KEY)}>
              Get Transcript
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
