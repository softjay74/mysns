import React from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import PropTypes from 'prop-types';
//import Ionicon from 'react-ionicons';
import LoginForm from 'component/LoginForm';
import SignupForm from 'component/SignupForm';


const Auth = (props, context) => (
    <div>
        <Grid >
            <Row> 
                    <Col xs={12} sm={12} md={8}>Left</Col>
                    <Col xs={12} sm={12} md={4} className="text-center"> 

                    <img src={"http://www.seattlen.com/images/logo1.png"} alt="" /> 
                    { props.action ==="Login" && ( 
                        <div>
                        
                        <LoginForm />

                        <p><span>{context.t("Forget password")}</span></p>    
                        <p><span onClick={props.changeAction} >{context.t("Don't have an account ?")}</span>
                        </p>
                        </div>
                    ) }   

                    { props.action ==="Signup" && ( 
                        <div>
                          <SignupForm />
                                        <p>
                        By Signing up, you agree to our <span>Terms & Privacy Policy</span> 
                        </p>   
                        {/*<img src="require("images/xxx.jpg")" alt="TEST" />*/}
                        <p>Have an account ? {" "}
                        <span onClick={props.changeAction} >Login</span>
                        </p>
                        </div>
                     ) }   



                    </Col>
                

            </Row>
        </Grid>
    </div>
);

Auth.contextTypes = {
    t : PropTypes.func.isRequired
};

export default Auth;