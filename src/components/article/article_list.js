import React from 'react';
import PropTypes from "prop-types";
import PostCard from '../post/post_card';
import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import _ from 'lodash';

const getRows = (articles) => _.map(articles, (article) => (
    <Col md={6} key={'article-' + article.id}>
        <Link to={`/articles/${article.id}`} style={{ textDecoration: 'none', color: 'inherit' }} >
            <PostCard post={article}/>
        </Link>
    </Col>
));

const ArticleList = ({ articles }) => (
    <Row>
        { getRows(articles) }
    </Row>
);

ArticleList.propTypes = {
    articles: PropTypes.array.isRequired
};

export default ArticleList;
