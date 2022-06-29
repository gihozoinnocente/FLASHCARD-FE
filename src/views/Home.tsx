import * as React from 'react';
import { Box, Button, CssBaseline, Grid, Paper, Typography } from '@mui/material';
import NavBar from '../components/NavBar';
import flashCard from "../assets/images/img8.jpg";
function Home() {
	return (
		<>
			<NavBar />
			<Box
				sx={{
					display: 'flex',
					height: '100%',
					width: '100%',
					alignItems: 'center',
					justifyContent: 'center',
					flexDirection: 'column',
				}}>
				{/* <Typography color='primary' fontSize={{ xs: '35px', md: '50px' }} fontWeight='bold'>
					The Flashcard App
				</Typography>
				<Typography color='black' fontSize={{ xs: '14px', md: '16px' }}>
					The right place to enlight your self .
				</Typography> */}


      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${flashCard})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[800],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
            }}
          >
            <Typography
              variant="h2"
              sx={{ fontWeight: 700, color: "primary.main", marginTop:30 }}
            >
              Welcome to F-card
            </Typography>
            <Typography variant="h4" sx={{ my: 5 }}>
              Flashcards to everyone.
            </Typography>
            <Button
              variant="contained"
              sx={{
                width: 220,
                height: 70,
                textTransform: "none",
              }}
            >
              Get Flashcard
            </Button>
            
          </Box>
        </Grid>
      </Grid>
    
  
			</Box>
		</>
	);
}

export default Home;
