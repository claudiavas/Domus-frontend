import React, { useState } from 'react'
import { Button, Grid, Input  } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

// cloudinary.config({
//   cloud_name: 'domusfsd',
//   api_key: 'T718166227781428',
//   api_secret: 'd4_GHSbDhOAou1iuByzSpSLcp8U'
// });

export const Images = () => {

const [file, setFile] = useState([]);
const [urls, setUrls] = useState([]);

// console.log("file", file);

const getMediaType = (file) => {
    
    if (file.type.includes("image")) return "image";
    if (file.type.includes("video")) return "video";;
}

const upload = (file) => {
    const mediaType = getMediaType(file.type);
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "Domus");
    data.append("cloud_name", "domusfsd");
    fetch(`https://api.cloudinary.com/v1_1/domusfsd/${mediaType}/upload`, {
        method: "post",
        body: data
    })
    .then(res => res.json())
    .then(data => {
        // console.log("urls", data);
        setUrls(prev=> prev.concat(data.url));
    })
    .catch (err => console.log(err));
}

const multipleUpload = () => {
    if (file && file.length > 0) {
        for (let i = 0; i < file.length; i++) {
            upload(file[i]);
        }
    }
}

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