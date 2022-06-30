import React, { Dispatch, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useQuery, gql, useLazyQuery, useMutation } from '@apollo/client';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import ReactCardFlip from 'react-card-flip';
import CircularProgress from '@mui/material/CircularProgress';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import QuestionAnswerTwoToneIcon from '@mui/icons-material/QuestionAnswerTwoTone';
import { Link, useNavigate } from 'react-router-dom';
import CardActions from '@mui/material/CardActions';
import { Button, Container, MenuItem, Modal, Select, Stack, TextField, useTheme } from '@mui/material';
import NavBar from '../components/NavBar';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { CardState, loadingCreateCardAction, cardErrorAction, createCardAction } from '../redux/reducers/card.reducer';
import { RootState } from '../redux/store';

const DISPLAY_ALL_CARDS = gql`
  query {
    getAllFlashcard {
      id
      url
      description
    }
  }
`;


const CREATE_CARD = gql`
  mutation ($url: String!, $description: String!) {
    post(url: $url, description: $description) {
      id
      url
      description
    }
  }
`;
function AllFlashCard() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [flippedCard, setFlippedCard] = useState(0);

  const { refetch,loading, data } = useQuery(DISPLAY_ALL_CARDS);
  const flipCard = (id: number, e: any) => {
    setIsFlipped(!isFlipped);
    setFlippedCard(id);
  };

  // const navigate = useNavigate();
  // const theme = useTheme();
  // const cardsData: CardState = useSelector(
  //   (state: RootState) => state.cardReducer
  // );
  // const [author, setAuthor] = useState<string | undefined>(undefined);
  const [filter, setfilter] = useState<string | undefined>(undefined);
  const [selectCreateAt, setSelectCreateAt] = useState<string | undefined>(
    "asc"
  );
  const [openCreateModal, setOpenCreateModal] = useState(false);

  const dispatch = useDispatch();
  
  const [
    post,
    { data: createData, loading: createLoading, error: createError },
  ] = useMutation(CREATE_CARD);
 
  const {
    register: createRegister,
    reset: createReset,
    getValues: createGetValues,
    handleSubmit: createHandleSubmit,
  } = useForm();

  const handleCreateCard = async (data: object) => {
    dispatch(loadingCreateCardAction({}));
    await post({
      variables: data,
      onError: (error) => {
        refetch();
        // toast.error(error.message);
        dispatch(cardErrorAction(error.message));
      },
      onCompleted: (data) => {
        dispatch(createCardAction(data.post));
        refetch()
      },
    });

    createReset();
    setOpenCreateModal(false);
  };
  
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
    <Stack margin="10px 0px">
          <Button
            fullWidth
            variant="contained"
            color="primary"
            sx={{ padding: "10px 15px", width: 150 }}
            onClick={() => setOpenCreateModal(true)}
          >
            <>
              {/* <AddIcon sx={{ margin: "0px 5px" }} /> */}
              <Typography fontSize="14px" fontWeight="bold">
                Add FlashCard
              </Typography>
            </>
          </Button>
        </Stack>
        {/* <Grid item>
            <TextField
              size="small"
              id="author"
              label="Author Email"
              name="author"
              autoComplete="author"
              value={author}
              onChange={(e) => {
                setAuthor(e.target.value);
              }}
            />
          </Grid> */}
          <Grid item>
            <TextField
              size="small"
              id="filter"
              label="Filter"
              name="filter"
              autoComplete="filter"
              value={filter}
              onChange={(e) => {
                setfilter(e.target.value);
              }}
            />
          </Grid>
          <Grid item>
            <Select
              size="small"
              value={selectCreateAt}
              onChange={(e) => {
                setSelectCreateAt(e.target.value);
              }}
              sx={{ width: "150px" }}
            >
              <MenuItem value="asc">ascending</MenuItem>
              <MenuItem value="desc">descending</MenuItem>
              <MenuItem value="">none</MenuItem>
            </Select>
          </Grid>

          <Modal
          open={openCreateModal}
          onClose={() => {
            if (!createLoading) {
              setOpenCreateModal(false);
            }
          }}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          <Box
            component="div"
            sx={{
              width: "100%",
              maxWidth: "300px",
              padding: "20px",
              backgroundColor: "white",
              borderRadius: "10px",
            }}
          >
            <Stack gap="10px">
              <TextField
                fullWidth
                id="url"
                label="url"
                defaultValue=""
                autoFocus
                {...createRegister("url")}
              />
              <TextField
                fullWidth
                id="description"
                label="description"
                defaultValue=""
                {...createRegister("description")}
              />
              <Button
                fullWidth
                variant="contained"
                onClick={createHandleSubmit(handleCreateCard)}
                disabled={createLoading}
              >
                {createLoading ? (
                  <CircularProgress size="20px" />
                ) : (
                  <>
                   
                    
                   <Typography>Create</Typography>
                    
                  </>
                )}
              </Button>
            </Stack>
		 
          </Box>
        </Modal>
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
                onClick={(e) => flipCard(card.id, e)}
                sx={{ maxWidth: 345, marginTop: '20px', marginRight: '20px' }}
                style={{ backgroundColor: '#8fadcc' }}
              >
                <ReactCardFlip isFlipped={isFlipped && flippedCard === card.id}>
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
                </ReactCardFlip>
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