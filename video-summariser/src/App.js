import "./App.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { VideoInput } from "./Video/VideoInput";

function App() {
  return (
    <div className="App">
      <VideoInput />
    </div>
  );
}

export default App;
