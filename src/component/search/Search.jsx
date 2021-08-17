import React, { Component } from 'react'
import { TextField } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import axios from 'axios'
import ImageResult from '../image-result/ImageResult';
import { makeStyles } from '@material-ui/core/styles';
export default class Search extends Component {
    state = {
    searchText :'',
    amount:15,
    apiUrl :'https://pixabay.com/api/',
    apiKey:'22961158-eccd4410428448a490a555791',
    images:[]
    }
    onTextChaange = (e)=>{
        this.setState({[e.target.name]:e.target.value},()=>{
        axios.get(`${this.state.apiUrl}/?key=${this.state.apiKey}&q=${this.state.searchText}&image_type=photo&per_page=${this.state.amount}&safesearch=true`)
        .then((res)=>{this.setState({images:res.data.hits})})
        .catch((error)=>{console.log(error)});
    })
}
onAmountChange = (e)=>{
this.setState({amount:e.target.value});
}
 useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
}));
    render() {
        const classes = this.useStyles;
        return (
            <div>
            <Grid container spacing ={4} direction= 'column' alignItems = 'center'>
                <Grid item>
                <TextField
     name='searchText'
     label="Search For Images"
     value ={this.state.searchText}
     onChange = {this.onTextChaange} 
     /> 
     <br />
                </Grid>
                <Grid item>
                <FormControl className={classes.formControl}>
        <InputLabel htmlFor="age-native-simple">Image</InputLabel>
        <Select
          native
          value={this.state.amount}
          onChange={this.onAmountChange}
         name= 'amount'
        >
          <option aria-label="None" value="" />
          <option value={5}>Five</option>
          <option value={10}>Ten</option>
          <option value={15}>Fifteen</option>
          <option value={30}>Thirty</option>
          <option value={50}>Fifty</option>

        </Select>
      </FormControl>

</Grid>

            </Grid><br />
            {this.state.images.length >0 ?(<ImageResult images = {this.state.images}/>):null}
     
       </div>
        )
    }
}
