import React, { useState } from 'react';
import { Alert, Box, Button, CircularProgress, Container, Grid, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import Axios for HTTP requests
import { keyframes } from '@mui/material';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const pages = [
  { name: 'Home', link: '/ho' },
  { name: 'Why Us', link: '/wh' },
  { name: 'Rent Your Vehicle', link: '/ca' }
];

const settings = [
  { name: 'Profile', link: '/pp' },
  { name: 'Account', link: '#' },
  { name: 'Dashboard', link: '#' },
  { name: 'Logout', link: '/si' }
];

const BikeBook = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    number: '',
    plate: '',
    email: '',
    price: '',
    address: '',
    mileage:'',
  });

  const [error, setError] = useState(null);
  const [successAlert, setSuccessAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null); // State to hold the image file

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    if (error) {
      setError(null);
    }
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]); // Store the selected image file
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.description || !formData.number || !formData.plate || !formData.email || !formData.price || !formData.address || !formData.mileage) {
      setError('All fields are required.');
      return;
    }

    if (!imageFile) {
      setError('Please upload an image.');
      return;
    }

    const price = parseFloat(formData.price);
    if (isNaN(price)) {
      setError('Invalid price format.');
      return;
    }

    setLoading(true);

    try {
      // Upload the image to Cloudinary
      const formDataToUpload = new FormData();
      formDataToUpload.append('file', imageFile);
      formDataToUpload.append('upload_preset', 'vehicle_renting'); // Replace with your actual upload preset

      const uploadResponse = await axios.post('https://api.cloudinary.com/v1_1/vehiclerenting/image/upload', formDataToUpload);

      const imageUrl = uploadResponse.data.secure_url;

      const formattedData = {
        ...formData,
        url: imageUrl, // Use the URL from Cloudinary
        price: price
      };

      const response = await fetch('http://localhost:8080/bikes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formattedData)
      });

      
      const data = await response.json();

      if (response.ok) {
        console.log('Bike added successfully:', data);
        setSuccessAlert(true);
        setFormData({ name: '', description: '', number: '', plate: '', email: '', price: '', address: '',mileage:''});
        setImageFile(null); // Reset the image file
        setTimeout(() => setSuccessAlert(false), 3000);
      } else {
        console.error('Failed to add bike:', data);
        setError('Failed to add bike. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        {successAlert && <Alert severity="success">Vehicle added successfully!</Alert>}
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <Box
          sx={{
            mt: 4,
            animation: `${fadeIn} 1s ease-in-out`,
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            padding: '30px',
            borderRadius: '8px',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
            '&:hover': {
              transform: 'scale(1.01)',
              boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
            },
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom sx={{ textAlign: 'center', mb: 2 }}>
            Add Your Vehicle
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Name"
              name="name"
              fullWidth
              value={formData.name}
              onChange={handleChange}
              margin="normal"
              required
              sx={{
                backgroundColor: 'white',
                borderRadius: '4px',
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'grey.500',
                  },
                  '&:hover fieldset': {
                    borderColor: 'primary.main',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'primary.main',
                  },
                },
              }}
            />
            <TextField
              label="Description"
              name="description"
              fullWidth
              multiline
              rows={4}
              value={formData.description}
              onChange={handleChange}
              margin="normal"
              required
              sx={{
                backgroundColor: 'white',
                borderRadius: '4px',
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'grey.500',
                  },
                  '&:hover fieldset': {
                    borderColor: 'primary.main',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'primary.main',
                  },
                },
              }}
            />
            <TextField
              label="Number"
              name="number"
              fullWidth
              value={formData.number}
              onChange={handleChange}
              margin="normal"
              required
              sx={{
                backgroundColor: 'white',
                borderRadius: '4px',
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'grey.500',
                  },
                  '&:hover fieldset': {
                    borderColor: 'primary.main',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'primary.main',
                  },
                },
              }}
            />
            <TextField
              label="Registeration no"
              name="plate"
              fullWidth
              value={formData.plate}
              onChange={handleChange}
              margin="normal"
              required
              sx={{
                backgroundColor: 'white',
                borderRadius: '4px',
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'grey.500',
                  },
                  '&:hover fieldset': {
                    borderColor: 'primary.main',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'primary.main',
                  },
                },
              }}
            />
            <TextField
              label="Email"
              name="email"
              fullWidth
              value={formData.email}
              onChange={handleChange}
              margin="normal"
              required
              sx={{
                backgroundColor: 'white',
                borderRadius: '4px',
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'grey.500',
                  },
                  '&:hover fieldset': {
                    borderColor: 'primary.main',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'primary.main',
                  },
                },
              }}
            />
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={8}>
                <Typography variant="body1">Upload Image</Typography>
              </Grid>
              <Grid item xs={4}>
                <Button
                  variant="contained"
                  component="label"
                  sx={{
                    '&:hover': { backgroundColor: 'lightgray', color: 'darkblue' },
                    color: 'white',
                  }}
                >
                  Choose File
                  <input type="file" hidden onChange={handleImageChange} />
                </Button>
              </Grid>
            </Grid>
            <TextField
              label="Price"
              name="price"
              type="number"
              fullWidth
              value={formData.price}
              onChange={handleChange}
              margin="normal"
              required
              sx={{
                backgroundColor: 'white',
                borderRadius: '4px',
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'grey.500',
                  },
                  '&:hover fieldset': {
                    borderColor: 'primary.main',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'primary.main',
                  },
                },
              }}
            />
            <TextField
              label="Address"
              name="address"
              fullWidth
              value={formData.address}
              onChange={handleChange}
              margin="normal"
              required
              sx={{
                backgroundColor: 'white',
                borderRadius: '4px',
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'grey.500',
                  },
                  '&:hover fieldset': {
                    borderColor: 'primary.main',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'primary.main',
                  },
                },
              }}
            />
            <TextField
              label="mileage"
              name="mileage"
              fullWidth
              value={formData.mileage}
              onChange={handleChange}
              margin="normal"
              required
              sx={{
                backgroundColor: 'white',
                borderRadius: '4px',
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'grey.500',
                  },
                  '&:hover fieldset': {
                    borderColor: 'primary.main',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'primary.main',
                  },
                },
              }}
            />
            <Box sx={{ textAlign: 'center', mt: 3 }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading}
                sx={{
                  minWidth: '150px',
                  backgroundColor: 'primary.main',
                  '&:hover': { backgroundColor: 'primary.dark' },
                }}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Submit'}
              </Button>
            </Box>
          </form>
        </Box>
      </Container>
    </div>
  );
};

export default BikeBook;
