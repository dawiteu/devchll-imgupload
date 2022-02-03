import React, { useEffect, useState } from "react";
import { ReactDOM } from "react";
import axios from "axios";

const Uploader = () => {

    const supportedFilesTypes = ["png", "jpg"]; 
    const uploaderDiv = document.querySelector("#uploader");
    const [uplResponse, setUplResponse] = useState(); 
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
                console.log('file info:', file); 
                textDrop.innerHTML += file.name; 
                uploadFile(file); 
            }else{
                textDrop.innerHTML = 'unsupported type!'; 
            }
        }else{
            textDrop.innerHTML = 'only 1 file!'; 
        }

    }


    const uploadFile = async (file) => {
        //console.log('try to upload: ', file, typeof file); 
        //const formulaire = document.querySelector("#formSubmit");
        //formulaire.submit(); 
        const token = document.head.querySelector('meta[name="csrf-token"]').getAttribute('content'); 

        const formData = new FormData(); // image: file, _token: token 

        formData.append('image', file);
        formData.append('_token', token);
        
        console.log('FormData Data:', Array.from(formData));

        const ctrl = new AbortController()    // timeout
        setTimeout(() => ctrl.abort(), 5000);

        try {
            axios({
                method:"POST",
                url:"/upload",
                data: formData,
                headers: { "Content-Type": "multipart/form-data" },
            })
            .then(res => {
                console.log('res', res); 
            })
            .catch(res => console.log('error res', res));
            // let r = await fetch('/upload/', 
            // {   method: "POST", 
            //     body: formData, 
            //     signal: ctrl.signal,
            //     'Content-Type':"multipart/form-data",
            //     "X-CSRF-TOKEN": token
            // }
            // ).then(res => res.json()).then(result => console.log ('result', result)); 
            // console.log('HTTP response code:', r); 
        } catch(e) {
            console.log('Huston we have problem...:', e);
        }
    }

    useEffect(() =>{
        console.log('upl erspnse: ', uplResponse); 
    }, [uplResponse]);

    const handleChange = () => {
        console.log('handlechange');
    }

    const test = () => {
        console.log('test changement!');
    }

    return (
        <div id="uploader">
            <form method="POST" encType="multipart/form-data" id="formSubmit" onSubmit={e => { e.preventDefault();}}>
                <h4 className="pt-5 font-weight-bold">Upload your image</h4>
                <p className="p-2 m-3" >File should be .png, .jpg...</p>

                <div id="dropimage" className="p-3" onChange={test} onDrop={(e) => handleDrop(e)} onDragOver={(e) => allowDrop(e)}>
                        <span className="material-icons big" id="spanMatIcon">image</span> 

                        <p className="font-weight-bold text-secondary" id="dropText">Drag & Drop your image here</p>
                    </div>
                <input type="file" name="imagedropped" />
            
                <p className="p-3 text-secondary">Or</p>
                <div className="d-flex flex-column align-items-center p-3">
                    <label htmlFor="uploadmanually" onClick={manualUpload} onChange={handleChange} className="w-25 btn btn-primary">Choose a file </label>
                    <input type="file" id='manualuploader' name="uploadmanually" accept=".jpg,.png" style={{visibility:'hidden'}} />
                </div>

            </form>
        </div>
    );
}

export default Uploader; 