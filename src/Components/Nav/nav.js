import React from 'react';
import { Link } from 'react-router-dom';
import TemporaryDrawer from './mobileNav';
//import Popper from '@material-ui/core/Popper';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import './nav.css';

const Nav = ({quantity})=>{
   // const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = event => {
      document.getElementById('superTest').style.height = '110px'
    };
    const handleClose = event => {
      document.getElementById('superTest').style.height = 0;
    };
    //const open = Boolean(anchorEl);

    
    return (     
    <div className='navContainer'>
    <div onMouseEnter={handleClose} className='bannerText'>
    <Link className='link' to='/' style={{color:'rgb(96, 73, 139)'}}>
        <h1 style={{border:'1px solid white',margin:'0'}}>KJPresley Designs</h1>
    </Link>
    </div>
    <ul className='navList'>
        <li className='storeNavLink' onMouseEnter={handleClick} >
         <span stlye={{margin:'0 auto'}}>Store</span>
        <ExpandMoreIcon fontSize="small" id='expand' />
      </li>
      
      <div onMouseLeave={handleClose} id='superTest'>
         <h4><Link  onClick={handleClose} className='link' to='/store/All' >All Items</Link></h4>
         <h4> <Link onClick={handleClose} className='link' to='/store/Blankets' >Blankets</Link></h4>
         <h4><Link onClick={handleClose} className='link' to='/store/Holiday' >Holiday</Link></h4>
         <h4><Link onClick={handleClose} className='link' to='/store/Hats' >Hats</Link></h4>
         <h4><Link onClick={handleClose} className='link' to='/store/Scarves' >Scarves</Link></h4>
         <h4><Link onClick={handleClose} className='link' to='/store/Toys' >Toys</Link></h4>
        
        </div>
        <Link className='link' to='/custom' >
         <li onMouseEnter={handleClose}>Custom Orders</li>
        </Link>
        <Link className='link' to='/about' >
         <li onMouseEnter={handleClose}>About Us</li>
        </Link>
        <Link className='link' to='/Cart'>
            <i onMouseEnter={handleClose} className="fa fa-shopping-cart" style={{fontSize:'24px',paddingBottom:'13px'}}><span style={{fontSize:'12px'}}>{(quantity>0)?(`(${quantity})`):null}</span></i>
        </Link>
        <li onMouseEnter={handleClose} style={{paddingBottom:'5px'}}><a href="https://www.facebook.com/KJPresleyDesigns/" target='_blank' rel="noopener noreferrer" className="fa fa-facebook"> <i aria-hidden="true"/></a></li>
    </ul>
    <TemporaryDrawer/>
    </div>
     
    )
  };
  export default Nav;

  //<Popper onMouseLeave={handleClose} placement={'bottom-start'} open={open} anchorEl={anchorEl} id='popper'>


  /* const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = event => {
      setAnchorEl(anchorEl ? null : event.currentTarget);
    };
    const handleClose = event => {
      setAnchorEl(anchorEl ? null : null );
    };
    const open = Boolean(anchorEl);*/