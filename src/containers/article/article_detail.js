import React from 'react';
import { connect } from 'react-redux';
import { loadArticleById } from '../../actions';
import { Row, Col } from 'reactstrap';
import PostImage from '../../components/post/post_image';
import PostContextMenu from '../../components/post/post_context_menu';
import PostContent from '../../components/post/post_content';
import Spinner from '../../components/ui/spinner';

class ArticleDetail extends React.Component {
    componentDidMount() {
        const { articleId } = this.props.match.params;
        (articleId && !this.props.article) && this.props.loadArticleById(articleId);
    }

    render () {
        const { article } = this.props;

        if(!article) {
            return (
                <div>
                    <Spinner />
                </div>
            )
        }

        return (
            <div>
                <Row>
                    <Col>
                        <PostImage imgSrc={article.thumbnail} title={article.title} />
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <PostContent content={article.content} />
                    </Col>
                </Row>
            </div>
        )
    }
}

const mapStateToProps = ({ articles, auth }, ownProps) => {
    const { articleId } = ownProps.match.params;
    return {
        article: articles[articleId],
        currentUser: auth.user
    }
};

export default connect(mapStateToProps, { loadArticleById })(ArticleDetail);
