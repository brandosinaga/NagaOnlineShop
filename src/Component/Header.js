import React from "react"

export default class Header extends React.Component{
    
    btn_filter(e){this.props.callOverlayPage(e.target.id)};
    handleChange(e){this.props.textFilter(e.target.value)};

    render(){
        return (<header className="header-container">
                    <div className="brand">
                        <span style={{color:"red",fontWeight:"bolder"}}>Naga</span><span>OnlineShop</span>
                            </div>
                    <div className="filter">
                        <span id="call_filter" onClick={this.btn_filter.bind(this)} className="material-symbols-outlined">youtube_searched_for</span>
                        <input placeholder="Search for ..." onChange={this.handleChange.bind(this)} />
                            </div>
                    <div className="cart">
                      <span id="call_cart"  className="material-symbols-outlined" onClick={this.btn_filter.bind(this)}>garden_cart
                      <CountItemInCart itemInCart = {this.props.itemInCart} />
                      </span>
                            </div>
                    <div className="menu">
                        <span className="material-symbols-outlined">blur_on</span>
                           </div>
                 </header>);
    }
}




class CountItemInCart extends React.Component{
    render(){
        return (<div className="itemInCart">{this.props.itemInCart}</div>)
    }
}