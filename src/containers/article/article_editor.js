import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postArticle, post, get } from '../../actions'
import Spinner from '../../components/ui/spinner';
import HtmlContentPostprocess from '../../utils/html_content_postprocess';
import { ARTICLE_LOADED, ARTICLES_LOADED } from '../../actions/types';
import ArticleEditForm from './article_edit_form';
import PropTypes from "prop-types";

class ArticleEditor extends Component{
    constructor(props) {
        super(props);
        this.onSubmit  = this.onSubmit.bind(this);
        this.onCancel  = this.onCancel.bind(this);
    }

    componentDidMount() {
        const { articleId } = this.props.match.params;
        // todo
        // (articleId && !this.props.article) && this.loadArticle(articleId);
    }

    async onSubmit(values) {

        let a = values.title;

        debugger;

        // this.props.postArticle();
    }

    onCancel() {
        this.props.history.goBack();
    }

    render() {
        const { match: {params: { articleId }}, article } = this.props;
        const editMode  = !!articleId;

        if(editMode && (!articleId || !article)) {
            return (
                <div>
                    <Spinner />
                </div>
            )
        }

        return (
            <div>
                <ArticleEditForm
                    editMode={editMode}
                    initialValues={{ ...article }}
                    onSubmit={this.onSubmit}
                    onCancel={this.onCancel}
                />
            </div>
        )
    }
}

ArticleEditor.propTypes = {
    article: PropTypes.object
};

ArticleEditor.defaultProps = {
    article: null
};

function mapStateToProps({ articles }, ownProps) {
    const { articleId } = ownProps.match.params;
    return {
        article: articles[articleId]
    }
}

export default connect(mapStateToProps, { get, post })(ArticleEditor);