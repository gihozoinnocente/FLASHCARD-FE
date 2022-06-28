import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useQuery, gql } from '@apollo/client';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
// import ReactCardFlip from 'react-card-flip';
import CircularProgress from '@mui/material/CircularProgress';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import QuestionAnswerTwoToneIcon from '@mui/icons-material/QuestionAnswerTwoTone';
import { Link } from 'react-router-dom';
import CardActions from '@mui/material/CardActions';
import { Button } from '@mui/material';
import NavBar from '../components/NavBar';

const DISPLAY_ALL_CARDS = gql`
  query {
    getAllFlashcard {
      id
      url
      description
    }
  }
`;

function AllFlashCard() {
  // const [isFlipped, setIsFlipped] = useState(false);
  // const [flippedCard, setFlippedCard] = useState(0);

  const { loading, data } = useQuery(DISPLAY_ALL_CARDS);
  // const flipCard = (id: number, e: any) => {
  //   setIsFlipped(!isFlipped);
    // setFlippedCard(id);
  // };

  
  return (
   <>
    <NavBar />
    <Box sx={{ display: 'flex',marginTop:10 }}>

     <Link to='/flashcard'>
            <CardActions>
              {' '}
              <Button size='small' variant='contained'>
                {/* <CreateIcon /> */}
                Add new Card
              </Button>
            </CardActions>
          </Link>

      <Grid container spacing={5} sx={{ margin: '80px 0 0 100px' }}>
        <Grid
          container
          spacing={5}
          sx={{ margin: '10px 0 0 0' }}
          textAlign='center'
        >
          <Typography
            variant='h4'
            fontSize={30}
            className='p'
            fontFamily='Josefin Sans, sans-serif'
            fontWeight={900}
            color='#00095E'
            sx={{ ml: 20, mt: -5, lg: 30, md: 20, sm: 15, xs: 10 }}
          >
            All Cards
          </Typography>
        </Grid>
        {loading ? (
          <CircularProgress sx={{ margin: 30 }} />
        ) : (
          <>
            {data.getAllFlashcard.map((card: any) => (
              <Card
                // onClick={(e) => flipCard(card.id, e)}
                sx={{ maxWidth: 345, marginTop: '20px', marginRight: '20px' }}
                style={{ backgroundColor: '#8fadcc' }}
              >
                {/* <ReactCardFlip isFlipped={isFlipped && flippedCard === card.id}> */}
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant='h5'
                      component='div'
                      color='#00095E'
                    >
                      <QuestionAnswerIcon />
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                      {card.url}
                    </Typography>
                    <Typography
                      variant='h6'
                      color='text.secondary'
                    ></Typography>
                  </CardContent>
                  <CardContent>
                    <Typography gutterBottom variant='h6' component='div'>
                      <QuestionAnswerTwoToneIcon />
                      Description
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                      {card.description}
                    </Typography>
                  </CardContent>
                {/* </ReactCardFlip> */}
              </Card>
            ))}
          </>
        )}
      </Grid>
    </Box>
   </>
  );
}
export default AllFlashCard;