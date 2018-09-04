import React, {Component} from "react";
import PropTypes from "prop-types";
import {Grid, Row, Col } from "react-bootstrap";
import './index.css';

class Footer extends Component{
    
    static contextTypes ={
        t : PropTypes.func.isRequired
    };
    
    render(){

        console.log(this.context)
        return (
            <footer className="footer navbar-fixed-bottom">
            <Grid >
                <Row className="show-grid text-center">            
                    <Col xs={12} sm={6} md={8} lg={8} className="social">
                        <nav>
                            <ul>
                                <li>{this.context.t("About Us")}</li>
                                <li>{this.context.t("Support")}</li>
                                <li>{this.context.t("Blog")}</li>
                                <li>{this.context.t("Press")}</li>
                                <li>{this.context.t("Jobs")}</li>
                                <li>{this.context.t("Pravacy")}</li>
                                <li>{this.context.t("Terms")}</li>
                            </ul>
                        </nav>
                    </Col>
                    <Col xs={12} sm={6} md={4} lg={4} className="copyright">
                        <span>2018 Jdgram</span>
                    </Col>
                </Row>
            </Grid>        
        </footer>
        )
    }
}
export default Footer