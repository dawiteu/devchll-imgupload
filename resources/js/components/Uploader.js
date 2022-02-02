import React from "react";
import { ReactDOM } from "react";


const Uploader = () => {

    const manualUpload = () => document.getElementById("manualuploader").click(); 

    return (
        <div id="uploader">
            <h5 className="p-2">Upload your image</h5>
            <p className="p-1" >File should be .png, .jpg...</p>
            <div id="dropimage"></div>
            <p>Or</p>
            <label htmlFor="uploadmanually" onClick={manualUpload} className="btn btn-primary">Choise a file </label>
            <input type="file" id='manualuploader' name="uploadmanually" accept=".jpg,.png" style={{visibility:'hidden'}} />
        </div>
    );
}

export default Uploader; 