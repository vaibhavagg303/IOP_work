import React,{useState,useEffect,createRef} from 'react';
import { CircularProgress,Grid,
InputLabel,
MenuItem,
FormControl,
Select, 
Typography} from '@material-ui/core';
import PlaceDetails from '../PlaceDetails/PlaceDetails';
import useStyles from './styles';
const List = ({places,childClicked,isLoading,type,setType,rating,setRating}) => {

  const [elRefs,setElRefs] = useState([]);
    const classes = useStyles();
    
    useEffect(() => {
      setElRefs((refs) => Array(places?.length).fill().map((_, i) => refs[i] || createRef()));
    }, [places]);

    return (
      <div className={classes.container}>
        <Typography variant="h4">
        EV Charging Stations
        </Typography>
        {isLoading? (<div className={classes.loading}>
        <CircularProgress size="5rem" />
        </div>) : (
          <>
        <FormControl className={classes.formControl}>
            <InputLabel>Type</InputLabel>
            <Select value={type} onChange={(e) => setType(e.target.value)}>
              <MenuItem value="restaurants">Electric Vehice Charging Station Tier 1</MenuItem>
              <MenuItem value="hotels">Electric Vehice Charging Station Tier 2</MenuItem>
              <MenuItem value="attractions">Electric Vehice Charging Station Tier 3</MenuItem>
            </Select>
        </FormControl>

        <FormControl className={classes.formControl}>
            <InputLabel>Rating</InputLabel>
            <Select value={rating} onChange={(e) => setRating(e.target.value)}>
              <MenuItem value={0}>All</MenuItem>
              <MenuItem value={3}>Above 3.0</MenuItem>
              <MenuItem value={4}>Above 4.0</MenuItem>
              <MenuItem value={4.5}>Above 4.5</MenuItem>
            </Select>
        </FormControl>

        <Grid container spacing ={3} className={classes.list}>
          {places?.map((place,i) => (
            <Grid ref={elRefs[i]} item key={i} xs={12}>
            <PlaceDetails place={place}
            selected={Number(childClicked) === i } 
              refProp={elRefs[i]}
            />
          </Grid>))}
        </Grid>
        </>
        )}
      </div>);
}

export default List;