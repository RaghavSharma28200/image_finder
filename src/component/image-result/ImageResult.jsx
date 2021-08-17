import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { IconButton } from '@material-ui/core';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import { Dialog } from '@material-ui/core';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
export default class ImageResult extends Component {
    state ={
        open:false,
        currentImg:''
    }
    handleOpen = (img)=>{
   this.setState({open:true,currentImg:img});
    }
    handleClose = ()=>{
        this.setState({open:false});
    }
    render() {
        let imageListContent;
        const {images} = this.props;
        if(images){
       imageListContent = (
         <ImageList cols = {3}>
           {images.map((img) => (
          <ImageListItem key={img.id}>
            <img src={img.largeImageURL} alt='' />
            <ImageListItemBar
              title={img.tags}
              subtitle={<span>by: <b>{img.user}</b></span>}
              actionIcon={
                <IconButton onClick = {()=>this.handleOpen(img.largeImageURL)}>
                  <ZoomInIcon color = "action"/>
                </IconButton>
              }
            />
              </ImageListItem>
               ))}
         </ImageList>
       )
        }else{
            imageListContent = null;
        }
        return (
            <div>
              {imageListContent} 
              <Dialog
        className = 'dialog'
        open={this.state.open}
        onClose={this.handleClose}
      
      >
        <DialogContent> 
        <img src={this.state.currentImg} alt="" style={{width:'100%'}} />   
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
            </div>
        )
    }
}
ImageResult.propTypes = {
    images: PropTypes.array.isRequired
}
