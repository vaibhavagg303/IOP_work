import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import useStyles from './styles';
const Form = () => {
    // const [postData, setPostData] = useState({ creator: '', title: '', message: '', tags: '', selectedFile: '' });
    // const post = useSelector((state) => currentId? state.posts.find((p) => p._id === currentId) : null);
    // const dispatch= useDispatch();
    const classes= useStyles();
    
    // useEffect(() => {
    //     if(post) setPostData(post);
    // },[post])
    // const handleSubmit = (e) => {
    //        e.preventDefault();
    //        if(currentId) {
    //            dispatch(updatePost(currentId, postData));
    //            clear();
    //         }
    //        else {dispatch(createPost(postData));
    //            clear();
    //     }
    // }

    // const clear = () => {
    //      setCurrentId(null);
    //      setPostData({creator: '', title: '', message: '', tags: '', selectedFile: '' });
    // }

    return (
        <Paper className={classes.paper}>
              <form autoComplete="on" noValidate className={` ${classes.root} ${classes.form}`}>
                <Typography variant="h6"> Book a station</Typography>
                <TextField name="stationId" variant="outlined" value=""  label="Station Id" fullWidth />
                <TextField name="slot" variant="outlined" value=""  label="Slot" fullWidth />
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                <Button variant="contained" color="secondary" size="small" fullWidth>Clear</Button>

              </form>
        </Paper>
    )
}

export default Form;
