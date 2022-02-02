import React from "react";
import { ReactDOM } from "react";


const Uploader = () => {

    const manualUpload = () => document.getElementById("manualuploader").click(); 

    return (
        <div id="uploader">
            <h4 className="pt-5 font-weight-bold">Upload your image</h4>
            <p className="p-2 m-3" >File should be .png, .jpg...</p>
            <div id="dropimage"></div>
            <p className="p-3 text-secondary">Or</p>
            <div class="d-flex flex-column align-items-center p-3">
                <label htmlFor="uploadmanually" onClick={manualUpload} className="w-25 btn btn-primary">Choose a file </label>
                <input type="file" id='manualuploader' name="uploadmanually" accept=".jpg,.png" style={{visibility:'hidden'}} />
            </div>
        </div>
    );
}

export default Uploader; 