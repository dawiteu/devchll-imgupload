import React, { useEffect, useRef, useState } from "react";
import { ReactDOM } from "react";
import axios from "axios";

const Uploader = () => {

    const supportedFilesTypes = ["png", "jpg"]; 
    const uploaderDiv = document.querySelector("#uploader");
    const [uplResponse, setUplResponse] = useState(); 
    // manual upload (choose a file)
    const manualUpload = () => document.getElementById("manualuploader").click(); 

    const [file, setFile] = useState(); 
    const refFile = useRef(null); 

    const [textDrop, setTextDrop] = useState("Drag & Drop your image here");
    const [emptyF, setEmptyF] = useState(true); // is empty on load page. 
 
    const formform = useRef(null); 

    //const csrf_token = '{{ echo csrf_token()}}';
    const csrf_token = document.head.querySelector('meta[name="csrf-token"]').getAttribute('content'); 

    useEffect(() =>{
        console.log('upl erspnse: ', uplResponse); 
    }, [uplResponse]);

    const handleChange = () => {
        console.log('handlechange');
    }

    const handleUpload = e => {
        e.preventDefault(); // stop refresh (prevent)

        const input = document.querySelector("#file-upload"); 
        const fl = input.files; 

        if(fl.length === 1){ // only 1 now; 
            let file = fl[0]; 
            if(supportedFilesTypes.includes( file.type.split("/")[1]   )){
                //console.log('file info:', file); 
                //textDrop.innerHTML += file.name; 
                setTextDrop(file.name); 
                setFile(file); 
                setEmptyF(false); 
                uploadF(file); 
            }else{
                //textDrop.innerHTML = 'unsupported type!'; 
                setEmptyF(true);
                setTextDrop('unsupported type!');
            }
        }else{
            //textDrop.innerHTML = 'only 1 file!'; 
            setEmptyF(true);
            setTextDrop('only 1 file!');
        }


    }

    /*
    const uploadFile = async (file) => {
        //console.log('try to upload: ', file, typeof file); 
        //const formulaire = document.querySelector("#formSubmit");
        //document.removeEventListener("submit", formulaire);
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
                //console.log('res', res); 
                console.log('res- data:', res.data); 

                
            })
            .catch(res => console.log('error res', res));

        } catch(e) {
            console.log('Huston we have problem...:', e);
        }
        //formulaire.submit(); 
    }
    */

    const uploadF = (file) => {
        const token = document.head.querySelector('meta[name="csrf-token"]').getAttribute('content'); 
        const formData = new FormData(); 
        formData.append('image', file); 
        formData.append('_token', token); 


        axios.post('/upload', formData)
        .then(res => console.log('respnose', res))
        .catch(e => console.log('error', e)); 
        
        // axios({
        //     method:"POST",
        //     url:"/upload",
        //     data: formData,
        //     headers: { "Content-Type": "multipart/form-data" },
        // })
        // .then(res => {
        //     console.log('full result: ', res); 
        //     console.log('response data', res.data); 
        // })
        // .catch(res => console.log('error response', res));
    }

    useEffect(() => {
        if(file !== undefined){
            console.log('file change!', file);
            //console.log('ref: ', refFile); 

            //uploadF(file); 
        }
    }, [file]);


    return (
        <div id="uploader">

            <form method="POST" ref={formform} action="/upload" encType="multipart/form-data" id="formSubmit">
                <input type="hidden" name="_token" value={csrf_token} />
                <h4 className="pt-5 font-weight-bold">Upload your image</h4>
                <p className="p-2 m-3" >File should be .png, .jpg...</p>

                <label htmlFor="imgdrop" id="dropimage" className="custom-file-upload" style={{position:"relative"}}>

                    {(emptyF) ? <span className="material-icons big" id="spanMatIcon" style={{zIndex:"1"}}>image</span> : <img className="mx-auto" src={URL.createObjectURL(file)} alt="preview" width="100p" height="100" /> }
                    

                    <p className="font-weight-bold text-secondary" id="dropText" style={{zIndex:"1"}}>{textDrop}</p>
                    <input onChange={e => handleUpload(e)} id="file-upload" name="imgdrop" accept="image/*" type="file" style={{zIndex:"2", position:"absolute", width:"100%", height:"100%", /*border:"1px solid black",*/ opacity:"0" }} /> 
                </label>
            
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