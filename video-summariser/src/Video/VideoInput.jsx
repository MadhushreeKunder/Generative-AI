import { useEffect, useState } from "react";
import "./VideoInput.css";
import { MdOutlineFileDownload } from "react-icons/md";
import { MdContentCopy } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const data =
  "An apple is a round, edible fruit produced by an apple tree (Malus domestica). Apple trees are cultivated worldwide and are the most widely grown species in the genus Malus. The tree originated in Central Asia, where its wild ancestor, Malus sieversii, is still found. Apples have been grown for thousands of years in Asia and Europe and were introduced to North America by European colonists. Apples have religious and mythological significance in many cultures, including Norse, Greek, and European Christian tradition.Apples grown from seed tend to be very different from those of their parents, and the resultant fruit frequently lacks desired characteristics. Generally, apple cultivars are propagated by clonal grafting onto rootstocks. Apple trees grown without rootstocks tend to be larger and much slower to fruit after planting. Rootstocks are used to control the speed of growth and the size of the resulting tree, allowing for easier harvesting.There are more than 7,500 cultivars of apples. Different cultivars are bred for various tastes and uses, including cooking, eating raw, and cider production. Trees and fruit are prone to fungal, bacterial, and pest problems, which can be controlled by a number of organic and non-organic means. In 2010, the fruit's genome was sequenced as part of research on disease control and selective breeding in apple production.";

export const VideoInput = () => {
  const [summary, setSummary] = useState("");

  useEffect(() => {
    setSummary(data);
  }, []);

  function handleDownload(summary) {
    const fileData = JSON.stringify(summary);
    const blob = new Blob([fileData], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = "summary.txt";
    link.href = url;
    link.click();
  }

  return (
    <div className="main">
      <div className="data-section">
        <h1>In a nutshell</h1>
        <div className="video__input--area">
          <input type="text" className="video__input"></input>

          <button className="video__button--summary">Get Summary</button>
        </div>
        <div className="video__summary--section">
          <div className="flex">
            <button
              className="icon_button"
              onClick={() => {
                handleDownload(summary);
              }}
            >
              <MdOutlineFileDownload />
            </button>
            <button
              className="icon_button"
              onClick={() => {
                navigator.clipboard.writeText(summary);
                toast("Copied!", { autoClose: 300 });
              }}
            >
              <MdContentCopy />
            </button>
          </div>
          <p className="video__summary">{summary}</p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};
