import React from 'react';
import { NavLink } from 'react-router-dom';
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

const Footer = () => {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className="footerCointainer">
        <div className="mainFooter">
          <div className="footerDiv">

            <div>
              <button className='btn save footer' onClick={handleClickOpen}>About </button>
            </div>

            <div >
              <div className='logosdiv'>
                <a href='https://atlasv.io/' target="_blank"><img className='logos' src="/atlasV.png" alt='' /></a>
                <a href='https://www.nfb.ca/interactive/marrow' target="_blank"><img className='logos' src="/NFB.png" alt='' /></a>
                <a href='https://ars.electronica.art/news/de/' target="_blank"><img className='logos' src="/Ars-Electronica.png" alt='' /></a>
              </div>
            </div>

          </div>
        </div>
      </div>

      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"About GAN Latent Space Explorer Tool"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
          The GAN Explorer is an interactive web-based tool that lets you explore the latent space of 
          <a className='link footer' href="https://github.com/NVlabs/stylegan" alt="" target="_blank" rel="noopener noreferrer"> StyleGAN V1</a>’s results, 
          encode your own images to the latent space, and create chains of key-frame animations between different points on the latent space.
          <br/>
          <br/>
          This tool was developed and designed for Ars Electronica Future Thinking School by
          <a className='link footer' href="https://avner.js.org/" alt="" target="_blank" rel="noopener noreferrer"> Avner Peled </a> 
          and <a className='link footer'className='link footer' href="https://shirin.works/" alt="" target="_blank" rel="noopener noreferrer">shirin anlen</a>, 
          and is part of the development of the 
          <a className='link footer' href="https://shirin.works/Marrow-teach-me-how-to-see-you-mother-Machine-learning-immersive" alt="" target="_blank" rel="noopener noreferrer"> Marrow project</a>, 
          with the support of the National Film Board of Canada.
          <br/>
          <br/>
          Read more about the motivation and code in this <a className='link footer' href="https://towardsdatascience.com/a-tool-for-collaborating-over-gans-latent-space-b7ea92ad63d8" alt="" target="_blank" rel="noopener noreferrer">
           Medium post</a>.
            
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <button className='btn save footer' onClick={handleClose}> close </button>

        </DialogActions>
      </Dialog>
    </>
  );
};

export default Footer;
