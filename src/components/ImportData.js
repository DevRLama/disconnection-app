
import React,{useState} from 'react'

function ImportData(props) {
    const [fileData, setfileData] = useState()
    const fileChangeHandler=(e)=>{
        setfileData(e.target.files[0]);
    }
    const onSubmitHandler=async(e)=>{
        e.preventDefault()
        const data=new FormData()
        data.append('image',fileData)
       const response=await fetch("http://localhost:8080/api/dc/single",{
            method:"POST",
            body:data,
        })
        const json = await response.json();
        if(json.respCode===1)
        {
            props.showAlert(json.msg,"success")
        }else{
            props.showAlert("Some problem occured","warning")
        }
    }



   
return (
    <div><h1>React App file uploading</h1>
    <form onSubmit={onSubmitHandler}>
        <input type="file" name="image" onChange={fileChangeHandler}/>
        <br/>
        <br/>
        <button type="submit">Submit file to backend</button>
    </form>
    </div>
  )
}

export default ImportData