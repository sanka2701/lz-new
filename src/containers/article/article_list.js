import React from 'react';
import PostCard from '../../components/post/post_card';
import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { loadArticlesByFilter } from '../../actions';
import _ from 'lodash';

class ArticleList extends React.Component {
    componentDidMount(){
        this.props.loadArticlesByFilter({});
    }

    renderCards(row) {
        return _.map(row, article => {
            return (
                <Col sm='6' key={article.id}>
                    <Link to={`/articles/${article.id}`} style={{ textDecoration: 'none', color: 'inherit' }} >
                        <PostCard post={article}/>
                    </Link>
                </Col>
            )
        })
    }

    renderRows() {
        const articlessArr = _.values(this.props.articles);
        const articlesRows = _.chunk(articlessArr,2);
        let index = 0;

        return _.map(articlesRows, row => {
            return (
                <Row key={'articlesRow' + index++}>
                    { this.renderCards(row) }
                </Row>
            )
        })
    }

    render () {
        return (
            <div>
                { this.renderRows() }
            </div>
        )
    }
}

const mapStateToProps = ({articles}) => {
    return { articles }
};

export default connect(mapStateToProps, { loadArticlesByFilter })(ArticleList);
