import React, { useEffect, useState } from 'react'
import { Button, Grid, Input  } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { uploadToCloudinary } from '../../apiService/apiService';


export const Images = () => {

const [file, setFile] = useState([]);
const [urls, setUrls] = useState([]);

console.log("file", file);

// const getMediaType = (file) => {
    
//     if (file.type.includes("image")) return "image";
//     if (file.type.includes("video")) return "video";
// }

const CLOUDINARY_UPLOAD_PRESET="domusfsd";

const upload = async (file) => {
  const data = new FormData();
  data.append('file', file);
  data.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
  data.append('cloud_name', 'domusfsd');
  try {
    const response = await uploadToCloudinary(data);
    console.log("response", response);
    return response.data.secure_url;
  } catch (error) {
    console.error('Error uploading file to Cloudinary:', error);
    return null;
  }
}


// const multipleUpload = () => {
//     if (file && file.length > 0) {
//         for (let i = 0; i < file.length; i++) {
//           upload(file[i])
//           console.log("FormData", FormData)
//           setUrls(prev=> prev.concat(FormData.url));
//         }
//     }
// }


const multipleUpload = async () => {
  if (file && file.length > 0) {
    for (let i = 0; i < file.length; i++) {
      const imageUrl = await upload(file[i]);
      if (imageUrl) {
        setUrls((prev) => prev.concat(imageUrl));
      }
    }
  }
};

useEffect(() => {
    console.log("urls", urls);
}, [urls]);

useEffect(() => {
    console.log("file", file);
}, [file]);


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