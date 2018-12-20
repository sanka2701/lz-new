import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col } from 'reactstrap';
import { loadArticlesByFilter, loadEvents } from '../actions';
import PostCard from '../components/post/post_card';
import _ from 'lodash';

//todo: this needs to be polished .... like a lot
//todo: probably remove
class Home extends React.Component{
    componentDidMount(){
        this.props.loadArticlesByFilter({});
        this.props.loadEvents();
    }

    renderCards(row) {
        return _.map(row, post => {
            return !!post.placeId ? (
                <Col sm='6' key={post.id + 'event'}>
                    <Link to={`/events/${post.id}/${post.placeId}`} style={{ textDecoration: 'none', color: 'inherit' }} >
                        <PostCard post={post}/>
                    </Link>
                </Col>
            ) : (
                <Col sm='6' key={post.id + 'article'}>
                    <Link to={`/articles/${post.id}`} style={{ textDecoration: 'none', color: 'inherit' }} >
                        <PostCard post={post}/>
                    </Link>
                </Col>
            )
        })
    }

    renderRows(posts) {
        const postsArr = _.values(posts);

        if(postsArr.length < 1) {
            return
        }

        const postsRows = _.chunk(postsArr, 2);
        let index = 0;

        return _.map(postsRows, row => {
            return (
                <Row key={'postRow' + index++}>
                    { this.renderCards(row) }
                </Row>
            )
        })
    }

    render() {
        return (
            <div>
                { this.renderRows(this.props.events) }
                { this.renderRows(this.props.articles) }
            </div>
        )
    }
}

const mapStateToProps = ({events, articles}) => {
    return { events, articles }
};

export default connect(mapStateToProps, { loadArticlesByFilter, loadEvents })(Home);