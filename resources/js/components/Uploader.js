import React, { useEffect, useRef, useState } from "react";
import { ReactDOM } from "react";
import axios from "axios";

const Uploader = () => {

    const supportedFilesTypes = ["png", "pjp", "jpg","pjpeg", "jfif", "jpeg", "gif"];

    // manual upload (choose a file) (trigger)
    const manualUpload = () => document.getElementById("manualuploader").click(); 

    const [file, setFile] = useState(); 

    const [textDrop, setTextDrop] = useState("Drag & Drop your image here");
    const [emptyF, setEmptyF] = useState(true); // is empty on load page. 
 

    //const csrf_token = '{{ echo csrf_token()}}';
    const csrf_token = document.head.querySelector('meta[name="csrf-token"]').getAttribute('content'); 


    const [loading, setLoading] = useState(false); // not loading default; 
    const [message, setMessage] = useState(); 
    const [response, setResponse]=useState(); 
    const [status, setStatus] = useState(); 

    const pathUplFile = useRef(null);

    const handleUpload = (e,source) => {
        e.preventDefault(); // stop refresh (prevent)
        let input, fl; 
                            // document.qs ---> REF React convert... later. 
        if(source === 1){ // drop 
            input = document.querySelector("#file-upload"); 
            fl = input.files;
        }else if(source === 2){ // select file manually
            input = document.querySelector("#manualuploader");
            //console.log('input 2', input, input.files); 
            fl = input.files; 
        }

        if((fl) && fl.length === 1){ // only 1 now; 
            let file = fl[0]; 
            if(supportedFilesTypes.includes( file.type.split("/")[1]   )){
                setTextDrop(file.name); 
                setFile(file); 
                setEmptyF(false); 
                uploadF(file); 
            }else{
                setEmptyF(true);
                setTextDrop('unsupported type!');
            }
        }else{
            setEmptyF(true);
            setTextDrop('only 1 file!');
        }


    }

    const uploadF = (file) => {
        setLoading(true);
        const token = document.head.querySelector('meta[name="csrf-token"]').getAttribute('content'); 
        const formData = new FormData(); 
        formData.append('image', file); 
        formData.append('_token', token); 

        axios.post('/upload', formData)
        .then(res => {
            setLoading(false); ; 
            setResponse(res.data); 
            setStatus(res.data.status); 
        })
        .catch(e => {
            setStatus("erreur...");
        }); 
    }

    const copyText = () => {
        navigator.clipboard.writeText(pathUplFile.current.value); 
        setMessage("Link copied!");
    }


    return (
        <div id="uploader">
            {/* {loading ? "loading" : "not loading"} */}
            
            {
                (emptyF) ? // empty file and NOT loading
                <form method="POST" action="/upload" encType="multipart/form-data" id="formSubmit">

                    <input type="hidden" name="_token" value={csrf_token} />
                    <h4 className="pt-5 font-weight-bold">Upload your image</h4>
                    <p className="p-2 m-3" >File should be .png, .jpg...</p>

                    <label htmlFor="imgdrop" id="dropimage" className="custom-file-upload" style={{position:"relative"}}>

                        {(emptyF) ? <span className="material-icons big" id="spanMatIcon" style={{zIndex:"1"}}>image</span> : <img className="mx-auto" src={URL.createObjectURL(file)} alt="preview" width="100p" height="100" /> }
                        

                        <p className="font-weight-bold text-secondary" id="dropText" style={{zIndex:"1"}}>{textDrop}</p>
                        <input onChange={e => handleUpload(e,1)} id="file-upload" name="imgdrop" accept="image/png, image/jpg, image/jpeg, image/gif" type="file" style={{zIndex:"2", position:"absolute", width:"100%", height:"100%", /*border:"1px solid black",*/ opacity:"0" }} /> 
                    </label>
                
                    <p className="p-3 text-secondary">Or</p>


                    <div className="d-flex flex-column align-items-center p-3">
                        <label htmlFor="uploadmanually" onClick={manualUpload}  className="w-25 btn btn-primary">Choose a file </label>
                        <input type="file" id='manualuploader' onChange={e => handleUpload(e,2)} name="uploadmanually" accept="image/png, image/jpg, image/jpeg, image/gif" style={{opacity:'0'}} />
                    </div>

                </form>
                :
                loading 
                    ?
                    // loading file
                    <div id="load" className="m-3 p-5 mx-auto">
                        <p className="p-2">Loading...</p>
                        <div id="loadingbar" className="m-3"></div>
                    </div>
                    :
                        (status && status === 200 && response)
                    ? 
                        <div className="d-flex flex-column align-items-center">
                            <span className="mx-2 material-icons text-success">check_circle</span>     
                            <p>Uploaded Successfully!</p>
                            <img className="img-fluid" style={{maxHeight:"250px", borderRadius:"15px"}} src={"./storage/imageupload/"+response.store} alt={response.img.file_org_name} />
                            
                            <div className="input-group m-4" style={{width:"90%"}}>
                                <input type='text' className='form-control' ref={pathUplFile} value={window.location.href+"storage/imageupload/"+response.store} readOnly />

                                <div className="input-group-append" >
                                    <input type='submit' onClick={copyText} className='input-group-text form-control btn btn-primary' value='Copy Link' /> 
                                </div>
                            </div>
                            <p className="text-center">{message ? message : ""}</p>
                        </div>
                    :
                        <p>Err on loading file. {status} </p>
                
            }

            <hr />

            {/* <div className="d-flex flex-column align-items-center">
                <span className="material-icons text-success">check_circle</span>     
                <p>Uploaded Successfully!</p>
                <img className="img-fluid" style={{maxHeight:"150px", borderRadius:"15px"}} src={"./storage/imageupload/XEpU3bbBUUZnjPbuPf9frczBpyJdUYwct5P4kcL4.png"} alt="alt" />
                
                <div className="input-group m-4" style={{width:"90%"}}>
                    <input type='text' className='form-control' value={window.location.href} readOnly />

                    <div className="input-group-append" >
                        <input type='submit' className='input-group-text form-control btn btn-primary' value='Copier' /> 
                    </div>
                </div>
            </div> */}

        </div>
    );
}

export default Uploader; 