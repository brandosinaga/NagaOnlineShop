import React,{useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Badge,ButtonGroup, Button, DropdownButton,Dropdown,Offcanvas,ListGroup} from 'react-bootstrap';


export default class Header extends React.Component{
    
       


    btn_filter = (e) => this.props.callOverlayPage(e.target.id);
    
        handleChange = (e) => this.props.textFilter(e.target.value);


         



    render(){

        const {itemInCart, filterData, filteredText, filterGender} = this.props

        return (
        
        <header className="header-container">
                    <div className="brand">
                        <span style={{color:"red",fontWeight:"bolder"}}>Naga</span><span>OnlineShop</span>
                            </div>
                    <div className="filter">
                        <span id="call_filter" onClick={this.btn_filter} className="material-symbols-outlined">youtube_searched_for</span>
                        <input placeholder="Search for ..." onChange={this.handleChange} />
                            </div>
                    <div className="cart">
                      <span id="call_cart"  className="material-symbols-outlined" onClick={this.btn_filter}>garden_cart
                      <CountItemInCart itemInCart = {itemInCart} />
                      </span>
                            </div>
                          <div className="menu">
                                <ResponsiveMenu handleChange = {this.handleChange} filteredText = {filteredText} filterGender = {filterGender} />
                           </div>
             </header>)
            
    }
}








class ResponsiveMenu extends React.Component {

    state = {show : false};

    handleClose = () => this.setState({show : false});

    handleShow = () => this.setState({show : true});
   


    filterGender = (e) => this.props.filterGender(e.target.value)

  


render(){
  
        const {show} = this.state;
        const {handleChange, filteredText} = this.props;
       

    return (<>

            <span className="material-symbols-outlined menu" onClick={this.handleShow}>blur_on</span> 

  
        <Offcanvas show={show} onHide={this.handleClose}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>
                 <input placeholder="Search for ..." onChange={handleChange} value = {filteredText} />
            </Offcanvas.Title>
          </Offcanvas.Header>



          <Offcanvas.Body>



          <ListGroup>

    
    <Button className="gender" variant="light" value="" onClick={this.filterGender}>for All</Button>
    <Button className="gender" variant="light" value="male" onClick={this.filterGender}>for Men</Button>
    <Button className="gender" variant="light" value="woman"  onClick={this.filterGender} >for Woman</Button>


    </ListGroup>





           

          </Offcanvas.Body>
        </Offcanvas>
      </>
    )
  }



}











class CountItemInCart extends React.Component{
    render(){
        return (
                    <div bg="secondary" className="itemInCart">{this.props.itemInCart}</div>


        )
    }
}