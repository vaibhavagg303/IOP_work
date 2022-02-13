import React,{useEffect,useState} from 'react';

import {CssBaseline, Grid } from '@material-ui/core';
import Header from '../components/Header/Header';
import List from '../components/List/List';
import Map from '../components/Map/Map';
import Form from '../components/Form/Form';
import { getPlacesData } from '../api';

const Homescreen = () => {
    const [type,setType] = useState('restaurants');
    const [rating,setRating] = useState('');
    const [places,setPlaces] = useState([]);
    const [filteredPlaces,setFilteredPlaces] = useState([]);
    const [childClicked,setChildClicked] = useState(null);
    const [coordinates, setCoordinates] = useState({});
    const [bounds,setBounds] = useState({});
    const [isLoading,setIsLoading] = useState(false);
    useEffect(()=> {
        navigator.geolocation.getCurrentPosition(({coords:{latitude,longitude}} ) => {
            setCoordinates({lat:latitude, lng:longitude})
        })
        const API_KEY = process.env.REACT_APP_PLACES_API;
        const script = document.createElement('script'); 
        script.src = `https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${API_KEY}`; 
        document.head.append(script);
    },[])
    useEffect(() => {
        const filteredPlaces = places.filter((place) => Number(place.rating) > rating)
        setFilteredPlaces(filteredPlaces);
    },[rating])
    useEffect(() => {
        if(bounds.sw && bounds.ne){
            setIsLoading(true);
        console.log(coordinates,bounds)

        getPlacesData(type,bounds.sw,bounds.ne)
        .then((data) => {
            // console.log(data);
            setPlaces(data.filter((place) => place.name && place.num_reviews > 0));
            setFilteredPlaces([]);
            setIsLoading(false);
        })
        }
    },[type,bounds])
    return(
        <>
        <Header />
        <CssBaseline />
        <Grid container spacing={3} style={{ width: '100%'}}>
            <Grid item xs={12} md={4}>
            <List 
            places={filteredPlaces.length ? filteredPlaces : places}
            childClicked={childClicked}
            isLoading={isLoading}
            type={type}
            setType={setType}
            rating={rating}
            setRating={setRating}
            />
            </Grid>

            <Grid item xs={12} md={6}>
            <Map
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            coordinates={coordinates}
            places={filteredPlaces.length ? filteredPlaces : places}
            setChildClicked={setChildClicked}
            />
            </Grid>
            <Grid item xs={12} md={2}>
            <Form />
            </Grid>

        </Grid>
        </>
        )
}

export default Homescreen;