import '../App.css'
import React, { useState } from 'react'
import axios from 'axios'


function UploadMaster(props) {
    const [file, setfile] = useState()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const url = 'http://localhost:8080/api/dc/uploaddc';
        const formData = new FormData();
        formData.append('file', file);
        formData.append('fileName', file.name);
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
            },
        };
        axios.post(url, formData, config).then((response) => {
            if(response.data.respCode === 1){
                alert(response.data.respMsg);
            }
            else{
                alert(response.data.respMsg);
            }
        });
    }

    const onChange = (event) => {
        setfile(event.target.files[0]);
    }


    return (
        <>
            {localStorage.getItem('role') === "JE" ? <div className="container">
                <div className="card login-form mx-auto">
                    <div className="card-body">
                        <div className="card-title text-center"><h3>Upload Master Data</h3></div>
                        <div className='card-text'>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group my-4">
                                    <input type="file" className="form-control" id="master" onChange={onChange} placeholder="Master Data" required/>
                                </div>
                                <button type="submit" className="btn btn-primary"  >Upload</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div> : <></>}
        </>
    );
}

export default UploadMaster