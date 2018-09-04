import React from 'react';
import PropTypes from 'prop-types'
import Ionicons from 'react-ionicons'
import './popup.css';
import LoginForm from 'component/LoginForm'

class Popup extends React.Component {
    state = {
        popupState : true
    }

    static propTypes = {
        message : PropTypes.string.isRequired,
        popupType : PropTypes.string.isRequired
    } 

    render() {
        const {popupState} = this.state
        return (
            <div className='popup'>
            <div className='popup_inner'>
            {<span onClick={this._ClosePop}><Ionicons icon="md-close" fontsize="20px" color="black" /></span>} 
            { popupState && <PopupMessage  message={this.props.message}  popupType={this.props.popupType}  /> }
            </div>
            </div>    
        )
    }
    
    _ClosePop=() => {
        this.setState({
            popupState : false
        })
    }

}

export default Popup


const PopupMessage = (props) => {

    console.log(props.popupType)
        switch(props.popupType) {
            case 'Login' :
            return <LoginForm  message='loginloginlogin'  ClosePop={props.ClosePop} />    
            default :
            return <MessageForm  message={props.message}  popupType={props.popupType}  ClosePop={props.ClosePop} />
        }

}
PopupMessage.propTypes={
    popupType : PropTypes.string.isRequired,
    message : PropTypes.string.isRequired,
    ClosePop : PropTypes.func.isRequired
}


const MessageForm = (props) => (
   <div>
    <h1>{props.popupType}</h1>
    <br/>
    <h1>{props.message}</h1>            
   </div> 
)
MessageForm.propTypses={
    popupType : PropTypes.string.isRequired,
    message : PropTypes.string.isRequired,
    ClosePop : PropTypes.func.isRequired
}       


