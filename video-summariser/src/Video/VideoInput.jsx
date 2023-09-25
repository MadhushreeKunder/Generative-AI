import { useEffect, useState } from "react";
import "./VideoInput.css";
import { MdOutlineFileDownload } from "react-icons/md";
import { MdContentCopy } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export const VideoInput = () => {
  const [inputVideoURL, setInputVideoURL] = useState("");
  const [transcriptData, setTranscriptData] = useState(null);
  const [summary, setSummary] = useState("");
  const [explainType, setExplainType] = useState("explainLikeIamFive");
  const [videoDetails, setVideoDetails] = useState({});
  const [videoThumbnail, setVideoThumbnail] = useState();
  const [wordCount, setWordCount] = useState(20);

  const handleExplainTypeChange = (event) => {
    setExplainType(event.target.value);
  };

  const handleWordCountChange = (event) => {
    setWordCount(Number(event.target.value));
  };

  const handleDownload = () => {
    const updatedText = document.querySelector("p").textContent;

    const fileData = JSON.stringify(updatedText);
    const blob = new Blob([fileData], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = "summary.txt";
    link.href = url;
    link.click();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(document.querySelector("p").textContent);
    toast("Copied!", { autoClose: 300 });
  };

  async function summarizeText(captionsData) {
    const promptMessage = `Write a summary of the text in a single paragraph below providing explaination it as if to a ${explainType} within maximum of
  ${wordCount} words : ${captionsData}`;
    console.log("final");
    // const openai = new OpenAI({
    //   apiKey: process.env.REACT_APP_JWT_SECRET,
    //   dangerouslyAllowBrowser: true,
    // });
    //   openai.chat.completions
    //     .create({
    //       model: "gpt-3.5-turbo",
    //       messages: [{ role: "user", content: promptMessage }],
    //       max_tokens: 50,
    //     })
    //     .then((res) => {
    //       setSummary(res.choices[0].message.content);
    //     });
  }

  const getVideoSummary = () => {
    if (inputVideoURL.length > 0) {
      toast("Loading...", { autoClose: 1000 });

      axios
        .get(
          `https://narrowexoticprofile.kavuuuu.repl.co/transcript?videoURL=${inputVideoURL}`,
        )
        .then((response) => {
          setVideoDetails(response.data);
          const responseData = response.data.data
            ?.map((singleLine) => singleLine.text)
            .toString();
          setTranscriptData(responseData);

          summarizeText(responseData);
          toast("Summarised!", { autoClose: 300 });
        })
        .catch((error) => {
          toast("Not a valid Youtube link", { autoClose: 1000 });
          console.error("An error occurred:", error);
        });
    }
  };

  useEffect(() => {
    setVideoThumbnail(
      `https://img.youtube.com/vi/${videoDetails.videoId}/maxresdefault.jpg`,
    );
    // axios.get(
    //   `https://img.youtube.com/vi/${videoDetails.videoId}/maxresdefault.jpg`,
    // ).then()
  }, [transcriptData]);

  return (
    <div className="main">
      <div className="data-section">
        <h1 className="notranslate heading">In a Nutshell!</h1>
        <div className="notranslate sub-heading">
          Videos Summarized with AI Wizardry
        </div>
        <div className="video__input--area">
          <input
            type="text"
            className="video__input notranslate"
            onChange={(e) => setInputVideoURL(e.target.value.trim())}
            placeholder="Enter Youtube video link"
          />

          <button
            className="video__button--summary notranslate"
            onClick={getVideoSummary}
            disabled={inputVideoURL.length === 0}
          >
            Get Summary
          </button>
        </div>

        {transcriptData && videoThumbnail && (
          <div className="video__summary--section">
            <div className="flex">
              <div className="flex">
                <div className="customise_dropdown">
                  <span className="notranslate">Level: </span>
                  <select
                    value={explainType}
                    onChange={handleExplainTypeChange}
                    className="notranslate customise_dropdown--option"
                  >
                    <option
                      value="kid"
                      className="notranslate customise_dropdown--option"
                    >
                      Kid
                    </option>
                    <option
                      value="expert"
                      className="notranslate customise_dropdown--option"
                    >
                      Expert
                    </option>
                  </select>
                </div>
                <div className="customise_dropdown">
                  <span className="notranslate">Choose Word Count: </span>
                  <select
                    value={wordCount}
                    onChange={handleWordCountChange}
                    className="notranslate customise_dropdown--option"
                  >
                    <option
                      value={20}
                      className="notranslate customise_dropdown--option"
                    >
                      Short
                    </option>
                    <option
                      value={50}
                      className="notranslate customise_dropdown--option"
                    >
                      Long
                    </option>
                  </select>
                </div>
              </div>

              <div>
                <div id="google_element"></div>
                <button className="icon_button" onClick={handleDownload}>
                  <MdOutlineFileDownload />
                </button>
                <button className="icon_button" onClick={handleCopy}>
                  <MdContentCopy />
                </button>
              </div>
            </div>

            <div>
              <div className="video__details">
                <img
                  src={videoThumbnail}
                  alt={videoDetails.videoTitle}
                  className="video__thumbnail "
                />
                <div className="notranslate video__title">
                  {videoDetails.videoTitle}
                </div>
              </div>
              <p className="video__summary">{transcriptData}</p>
            </div>
          </div>
        )}
      </div>
      <ToastContainer className="notranslate" />
    </div>
  );
};
