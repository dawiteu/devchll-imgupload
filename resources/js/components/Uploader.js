import React from "react";
import { ReactDOM } from "react";


const Uploader = () => {

    const supportedFilesTypes = ["png", "jpg"]; 
    const uploaderDiv = document.querySelector("#uploader");

    // manual upload (choose a file)
    const manualUpload = () => document.getElementById("manualuploader").click(); 

    // on drop
    const allowDrop = (e) => {
        e.preventDefault(); 
    }

    const handleDrop = (e) =>{
        e.preventDefault();
        //console.log('e', e); 

        let dt = e.dataTransfer; 
        let fl = dt.files; //file

        const textDrop = document.querySelector("#dropText"); 
        textDrop.innerHTML = ''; 

        // Array.from(fl).forEach(file => {
        //     if(supportedFilesTypes.includes( file.type.split("/")[1] )){
        //         console.log('file: ', file.name, ' type: ', file.type, file);
        //         textDrop.innerHTML += file.name + ' '; 
        //     }else{
        //         console.log('error on file :', file.name); 
        //     }
        // });

        
        if(fl.length === 1){ // only 1 now; 
            let file = fl[0]; 
            if(supportedFilesTypes.includes( file.type.split("/")[1]   )){
                textDrop.innerHTML += file.name; 
                uploadFile(file); 
            }
        }else{
            textDrop.innerHTML = 'only 1 file!'; 
        }

    }

    const uploadFile = (file) => {
        console.log('try to upload: ', file); 
    }


    return (
        <div id="uploader">

            <h4 className="pt-5 font-weight-bold">Upload your image</h4>
            <p className="p-2 m-3" >File should be .png, .jpg...</p>
            <div id="dropimage" className="p-3" onDrop={(e) => handleDrop(e)} onDragOver={(e) => allowDrop(e)}>
            
                <span className="material-icons big" id="spanMatIcon">image</span> 

                <p className="font-weight-bold text-secondary" id="dropText">Drag & Drop your image here</p>

            </div>
            <p className="p-3 text-secondary">Or</p>
            <div className="d-flex flex-column align-items-center p-3">
                <label htmlFor="uploadmanually" onClick={manualUpload} className="w-25 btn btn-primary">Choose a file </label>
                <input type="file" id='manualuploader' name="uploadmanually" accept=".jpg,.png" style={{visibility:'hidden'}} />
            </div>

        </div>
    );
}

export default Uploader; 