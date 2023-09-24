import { useEffect, useState } from "react";
import "./VideoInput.css";
import { MdOutlineFileDownload } from "react-icons/md";
import { MdContentCopy } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const VideoInput = () => {
  const [summary, setSummary] = useState("");

  useEffect(() => {
    setSummary(
      "Duis deserunt qui dolore exercitation id aute excepteur laborum consequat culpa esse elit exercitation cupidatat. Occaecat id ametdeserunt tempor reprehenderit. Aliqua aliqua quis amet nisi ullamcoeu magna. Excepteur fugiat occaecat ipsum eu qui esse nisi fugiatconsequat. Magna quis dolore anim ad est non officia proident essead. Voluptate irure fugiat elit do anim eu commodo veniam mollit.Velit irure exercitation duis quis sit irure. Duis deserunt quidolore exercitation id aute excepteur laborum consequat culpa esseelit exercitation cupidatat. Occaecat id amet deserunt temporreprehenderit. Aliqua aliqua quis amet nisi ullamco eu magna.Excepteur fugiat occaecat ipsum eu qui esse nisi fugiat consequat.Magna quis dolore anim ad est non officia proident esse ad.Voluptate irure fugiat elit do anim eu commodo veniam mollit. Velitirure exercitation duis quis sit irure. Duis deserunt qui doloreexercitation id aute excepteur laborum consequat culpa esse elitexercitation cupidatat. Occaecat id amet deserunt temporreprehenderit. Aliqua aliqua quis amet nisi ullamco eu magna.Excepteur fugiat occaecat ipsum eu qui esse nisi fugiat consequat.Magna quis dolore anim ad est non officia proident esse ad.Voluptate irure fugiat elit do anim eu commodo veniam mollit. Velitirure exercitation duis quis sit irure. Duis deserunt qui doloreexercitation id aute excepteur laborum consequat culpa esse elitexercitation cupidatat. Occaecat id amet deserunt temporreprehenderit. Aliqua aliqua quis amet nisi ullamco eu magna.Excepteur fugiat occaecat ipsum eu qui esse nisi fugiat consequat.Magna quis dolore anim ad est non officia proident esse ad.Voluptate irure fugiat elit do anim eu commodo veniam mollit. Velitirure exercitation duis quis sit irure.",
    );
  }, []);

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
            <button className="icon_button">
              <MdOutlineFileDownload />
            </button>
            <button
              className="icon_button"
              onClick={() => {
                navigator.clipboard.writeText(summary);
                toast("Copied!");
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
