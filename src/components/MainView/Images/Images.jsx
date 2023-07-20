import React, { useState, useContext, useEffect } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, Input, Chip, IconButton, DialogActions, Grid } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloseIcon from '@mui/icons-material/Close';
import { ImagesContext } from '../../Contexts/ImagesContext';
import axios from 'axios';
import { useLocation } from "react-router-dom";


export const Images = () => {
  const { imageUrls, setImageUrls } = useContext(ImagesContext);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const location = useLocation();
  const { housingData = {} } = location.state || {};

useEffect(() => {
  if (housingData.images) {
    setImageUrls(housingData.images);
    setPreviewUrls(housingData.images);
  }
}, [housingData.images, setImageUrls]);

  const handleUploadImages = async () => {
    try {
      setUploading(true);

      const uploadPromises = selectedFiles.map((file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "domusfsd");

        return axios.post(
          "https://api.cloudinary.com/v1_1/domusfsd/image/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      });

      const responses = await Promise.all(uploadPromises);

      const uploadedImageUrls = responses.map((response) => response.data.secure_url);
      setImageUrls((prevImageUrls) => [...prevImageUrls, ...uploadedImageUrls]);

    } catch (error) {
      console.error("Error uploading files:", error);
    } finally {
      setUploading(false);
      handleCloseDialog();
    }
  };

  useEffect(() => {
    // console.log("imageUrls:", imageUrls);
  }, [imageUrls]);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const urls = files.map((file) => URL.createObjectURL(file));
    setSelectedFiles((prevSelectedFiles) => [...prevSelectedFiles, ...files]);
    setPreviewUrls((prevPreviewUrls) => [...prevPreviewUrls, ...urls]);
  };

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedFiles([]);
    setPreviewUrls([]);
  };

  const handleDelete = (index) => {
    setSelectedFiles((prevSelectedFiles) => {
      const newSelectedFiles = [...prevSelectedFiles];
      newSelectedFiles.splice(index, 1);
      return newSelectedFiles;
    });

    setPreviewUrls((prevPreviewUrls) => {
      const newPreviewUrls = [...prevPreviewUrls];
      newPreviewUrls.splice(index, 1);
      return newPreviewUrls;
    });
  };

  return (
    <>
      <Button color="primary" startIcon={<CloudUploadIcon />} onClick={handleOpenDialog}>
        Subir Imágenes
      </Button>

      <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="md">
        <DialogTitle>
          <Grid container alignItems="center">
            <Grid item xs={6}>
              Subir Imágenes y/o Videos
            </Grid>
            <Grid item xs={6} container justifyContent="flex-end">
              <Button variant="contained" component="label">
                Seleccionar Archivos
                <Input
                  type="file"
                  hidden
                  color="secondary"
                  inputProps={{ multiple: true, accept: 'image/*,video/*' }}
                  onChange={handleFileChange}
                  disableUnderline
                  style={{ display: 'none' }}
                />
              </Button>
            </Grid>
          </Grid>
        </DialogTitle>

        <DialogContent>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {previewUrls.map((url, index) => (
              <div key={index} style={{ width: '60px', height: '60px', position: 'relative' }}>
                <img
                  src={url}
                  alt={`Preview ${index}`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '4px' }}
                />
                <IconButton
                  size="small"
                  style={{
                    position: 'absolute',
                    top: '2px',
                    right: '2px',
                    width: '24px',
                    height: '24px',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    color: '#ffffff',
                  }}
                  onClick={() => handleDelete(index)}
                >
                  <CloseIcon style={{ fontSize: '16px' }} />
                </IconButton>
              </div>
            ))}
          </div>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="primary" onClick={handleCloseDialog}>
            Cancelar
          </Button>
          {!uploading && (
            <Button variant="contained" color="primary" onClick={handleUploadImages}>
              Subir
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
};
