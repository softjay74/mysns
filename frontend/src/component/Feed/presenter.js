import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Loading from './loading';
import {Grid, Row, Col} from 'react-bootstrap';
import FeedPhoto from 'component/FeedPhoto';
import Masonry from 'react-masonry-component';

const Feed = props => {
    if (props.loading) {
      return <LoadingFeed /> 
   } else if (props.feed) { 
       return <RenderFeed {...props}/>
   }
}     

Feed.propTypes = {
    loading : PropTypes.bool.isRequired
}



class RenderFeed extends Component{

    render() {
        const masonryOptions = {
            transitionDuration: 0
        };
         
        const imagesLoadedOptions = { background: '.my-bg-image-el' }

        const childElements = this.props.feed.map( post => <FeedPhoto {...post} key={post.id}/>)
        return(
        <Grid>
            <Row>
                <Col lg={12} >

                <Masonry
                className={'my-gallery-class'} // default ''
                //elementType={'ul'} // default 'div'
                options={masonryOptions} // default {}
                disableImagesLoaded={false} // default false
                updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
                imagesLoadedOptions={imagesLoadedOptions} // default {}
                    >
                {childElements}
                </Masonry>
                {/*props.feed.map( post => <FeedPhoto {...post} key={post.id}/>) */}
                   
                </Col>
            </Row>
        </Grid>            
        )
    }
}
const LoadingFeed = props =>(

    <Loading /> 
)

export default Feed;
