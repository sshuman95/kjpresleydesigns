import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import { Link } from 'react-router-dom';
import './mobileNav.css';
import DehazeIcon from '@material-ui/icons/Dehaze';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

class TemporaryDrawer extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            top:false,
            open:false
        }
    }
    toggleDrawer = () => event => {
        this.setState({
            top:true
        })
      };

      closeDrawer = () => event => {
        this.setState({
            top:false,
            open:false
        })
      };
      
    handleOpen = (event) =>{
        event.preventDefault();
        let open = this.state.open;
        this.setState({
            open:!open
        })
    }
    render(){
        return (
            <div id='drawer'>
                <DehazeIcon style={{paddingRight:'10px',cursor:'pointer',overflow:'hidden'}} onClick={this.toggleDrawer()}/>
                {    
                <Drawer anchor="top" open={this.state.top}>
                    <ul className='navList2'>
                    <Link to='/' className='mobileLink'>
                        <li onClick={this.closeDrawer()}>Home</li>
                    </Link>
                    <div onClick={this.handleOpen} className='mobileStoreNav'>
                    
                    <li className='mobileLink'>Store</li>
                    <ExpandMoreIcon />
                    </div>
                    {this.state.open?<ul className='mobileNav'>
                        <Link to='/store/All' className='mobileLink'>
                        <li onClick={this.closeDrawer()}>All Items</li>
                        </Link>
                        <Link to='/store/Toys' className='mobileLink' >
                        <li onClick={this.closeDrawer()}>Toys</li>
                        </Link>
                        <Link to='/store/Scarves' className='mobileLink'>
                        <li onClick={this.closeDrawer()}>Scarves</li>
                        </Link>
                        <Link to='/store/Hats' className='mobileLink'>
                        <li onClick={this.closeDrawer()}>Hats</li>
                        </Link>
                        <Link to='/store/Blankets' className='mobileLink'>
                        <li onClick={this.closeDrawer()}>Blankets</li>
                        </Link>
                        <Link to='/store/Holiday' className='mobileLink'>
                        <li onClick={this.closeDrawer()}>Holiday</li>
                        </Link>
                        
                    </ul>:null}
                    <Link to='/custom' className='mobileLink'>
                        <li onClick={this.closeDrawer()}>Custom Orders</li>
                    </Link>
                    <Link to='/Cart' className='mobileLink'>
                        <li onClick={this.closeDrawer()}>Cart</li>
                    </Link>
                </ul>
                <button id='closeButton' onClick={this.closeDrawer()}>Close</button>
                </Drawer>}
          </div>
        )
    }
}


export default TemporaryDrawer