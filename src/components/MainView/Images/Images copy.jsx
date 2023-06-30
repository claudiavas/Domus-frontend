import React, { useEffect, useState } from 'react'
import { Button, Grid, Input  } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from 'axios';

// cloudinary.config({
//   cloud_name: 'domusfsd',

// });

const REACT_APP_API_KEY="T718166227781428";
// const REACT_APP_API_URL=your_api_url;
const REACT_APP_API_SECRET="d4_GHSbDhOAou1iuByzSpSLcp8U";
const REACT_APP_CLOUDINARY_UPLOAD_PRESET="Domus";
const REACT_APP_CLOUDINARY_URL="https://api.cloudinary.com/v1_1/domusfsd/image/upload";

// const apiKey = process.env.REACT_APP_API_KEY;
const apiKey = REACT_APP_API_KEY;

export const Images = () => {

const [file, setFile] = useState([]);
const [urls, setUrls] = useState([]);

console.log("file", file);

const getMediaType = (file) => {
    
    if (file.type.includes("image")) return "image";
    if (file.type.includes("video")) return "video";
}

// const upload = (file) => {
//     const mediaType = getMediaType(file.type);
//     const data = new FormData();
//     data.append("file", file);
//     data.append("upload_preset", "Domus");
//     data.append("cloud_name", "domusfsd");
//     fetch(`https://api.cloudinary.com/v1_1/domusfsd/${mediaType}/upload`, {
//         method: "post",
//         body: data
//     })
//     .then(res => res.json())
//     .then(data => {
//         // console.log("urls", data);
//         setUrls(prev=> prev.concat(data.url));
//     })
//     .catch (err => console.log(err));
// }

// uploadFileToCloudinary.js

const upload = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  // formData.append('upload_preset', process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET);
  formData.append('upload_preset', REACT_APP_CLOUDINARY_UPLOAD_PRESET);
  try {
    // const response = await axios.post(process.env.REACT_APP_CLOUDINARY_URL, formData);
    const response = await axios.post(REACT_APP_CLOUDINARY_URL, formData);
    console.log("response", response);
    return response.data.secure_url;
  } catch (error) {
    console.error('Error uploading file to Cloudinary:', error);
    return null;
  }
}


const multipleUpload = () => {
    if (file && file.length > 0) {
        for (let i = 0; i < file.length; i++) {
          // const mediaType = getMediaType(file[i]);
          //     const data = new FormData();
          //     const archivo = file[i];
          //     data.append("file", archivo)
          //     data.append("upload_preset", "Domus");
          //     data.append("cloud_name", "domusfsd");
          //     fetch(`https://api.cloudinary.com/v1_1/domusfsd/${mediaType}/upload`, {
          //         method: "post",
          //         body: data
          //     })
          //     .then(res => res.json())
          //     .then(data => {
          //         console.log("data", data);
          //         setUrls(prev=> prev.concat(data.url));
          //     })
          //     .catch (err => console.log(err));
          upload(file[i])
          console.log("FormData", FormData)
          setUrls(prev=> prev.concat(FormData.url));
        }
    }
}

useEffect(() => {
    console.log("urls", urls);
}, [urls]);



  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
      <Input
          type="file"
          color="secondary"
          inputProps={{ multiple: true, accept: "image/*,video/*" }}
          onChange={(e) => setFile(e.target.files)}
          disableUnderline
        />
      </Grid>
    <Grid item xs={12}>
      <Button
        variant="contained"
        color="primary"
        startIcon={<CloudUploadIcon />}
        onClick={multipleUpload}
      >
        Upload
      </Button>
    </Grid>
    <Grid item xs={12}>
      {urls &&
        urls.map((url) => (
          <div key={url}>
            {url.includes("image") ? (
              <img src={url} alt="uploaded" />
            ) : (
              <video controls>
                <source src={url} type="video/mp4" />
              </video>
            )}
          </div>
        ))}
    </Grid>
  </Grid>
);
};