import { useEffect, useState } from "react";
import "./VideoInput.css";
import { MdOutlineFileDownload } from "react-icons/md";
import { MdContentCopy } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const data =
  "An apple is a round, edible fruit produced by an apple tree (Malus domestica). Apple trees are cultivated worldwide and are the most widely grown species in the genus Malus. The tree originated in Central Asia, where its wild ancestor, Malus sieversii, is still found. Apples have been grown for thousands of years in Asia and Europe and were introduced to North America by European colonists. Apples have religious and mythological significance in many cultures, including Norse, Greek, and European Christian tradition.Apples grown from seed tend to be very different from those of their parents, and the resultant fruit frequently lacks desired characteristics. Generally, apple cultivars are propagated by clonal grafting onto rootstocks.   ";

export const VideoInput = () => {
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

  return (
    <div className="main">
      <div className="data-section">
        <h1 className="notranslate">In a nutshell</h1>
        <div className="video__input--area">
          <input type="text" className="video__input notranslate"></input>

          <button className="video__button--summary notranslate">
            Get Summary
          </button>
        </div>
        <div className="video__summary--section">
          <div className="flex">
            <div id="google_element"></div>

            <button className="icon_button" onClick={handleDownload}>
              <MdOutlineFileDownload />
            </button>
            <button className="icon_button" onClick={handleCopy}>
              <MdContentCopy />
            </button>
          </div>
          <p className="video__summary">{data}</p>
        </div>
      </div>
      <ToastContainer className="notranslate" />
    </div>
  );
};
