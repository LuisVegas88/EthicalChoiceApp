import React, { useState } from 'react';
//import {render} from 'react-dom';


const FirebaseUpload = () => {
    
    const [image, setImage] = useState(null);
    
    const handleChange = async (e) => {
        if (e.target.files[0]){
            setImage(e.target.files[0])
        }
    }

    const handleUpload = () => {
        if (image) 
        {
            // const img = (new Blob(new Uint8Array(await file.arrayBuffer())));
            const reader = new FileReader();
            reader.readAsDataURL(image);
            reader.addEventListener("loadend", () => {
                const img = reader.result;
                // console.log(img);
                const FD = new FormData();
                FD.append("img", img);
                fetch("http://localhost:8888/upload", {
                    method: "POST",
                    body: FD
                }).then(resp => resp.json()).then(d => console.log("data:", d)).catch(console.log);
            });
        };
    }

    console.log ("image: ", image);
    return (
        <div>
        <input type="file" accept="image/*" onChange={handleChange}  />
        <button onClick={handleUpload}>Upload</button>
    </div>
    )
}



export default FirebaseUpload;
