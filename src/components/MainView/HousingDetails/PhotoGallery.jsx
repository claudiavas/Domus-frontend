import * as React from 'react';
import { ImageList, ImageListItem, Modal, Typography } from '@mui/material';
import { useState } from 'react';
import { IconButton } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

export function PhotoGallery() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleImageClick = (image, index) => {
    setSelectedImage(image);
    setCurrentIndex(index);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? itemData.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % itemData.length);
  };

  return (
    <>
      <ImageList
        sx={{ width: '92vw', height: 300, mt: 0, mb: 3 }}
        variant="quilted"
        cols={4}
        rowHeight={100}
      >
        {itemData.map((item, index) => (
          <ImageListItem
            key={item.img}
            cols={item.cols || 1}
            rows={item.rows || 1}
            onClick={() => handleImageClick(item, index)}
          >
            <img
              {...srcset(item.img, 100, item.rows, item.cols)}
              alt={item.title}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>

      <Modal
        open={Boolean(selectedImage)}
        onClose={handleCloseModal}
        style={{ display: 'flex', alignItems: 'top', justifyContent: 'center', margin: "40px" }}
      >
        <div style={{ maxWidth: '80vw', maxHeight: '80vh', position: 'relative' }}>
          {selectedImage && (
            <>
              <IconButton
                aria-label="Previous"
                onClick={handlePrev}
                style={{ position: 'absolute', top: '50%', left: '10px', transform: 'translateY(-50%)', color: 'white'}}
              >
                <ChevronLeftIcon />
              </IconButton>
              <img
                src={selectedImage.img}
                alt={selectedImage.title}
                style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
              />
              <IconButton
                aria-label="Next"
                onClick={handleNext}
                style={{ position: 'absolute', top: '50%', right: '10px', transform: 'translateY(-50%)', color: 'white' }}
              >
                <ChevronRightIcon />
              </IconButton>
              <Typography
                variant="body1"
                color="textSecondary"
                style={{
                  position: 'absolute',
                  bottom: '10px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  color: 'white'
                }}
              >
                {currentIndex + 1}/{itemData.length}
              </Typography>
            </>
          )}
        </div>
      </Modal>
    </>
  );
}


const itemData = [
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Breakfast',
    rows: 3,
    cols: 2,
  },
  {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: 'Burger',
  },
  {
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    title: 'Camera',
  },
  {
    img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
    title: 'Coffee',
  },
  {
    img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
    title: 'Hats',
  },
  {
    img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
    title: 'Honey',
    author: '@arwinneil',
  },
  {
    img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
    title: 'Basketball',
  },
  {
    img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
    title: 'Fern',
  },
  {
    img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
    title: 'Mushrooms',
  },
  {
    img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
    title: 'Tomato basil',
  },
  {
    img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
    title: 'Sea star',
  },
  {
    img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
    title: 'Bike',
  },
];