import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { loadArticlesByFilter, setArticlesPagination } from '../../actions';
import withLoadingAnimation from '../../components/ui/content/withLodingAnimation';
import withSideBar from '../../components/ui/content/with_sidebar';
import Pagination from '../../components/ui/pagination';
import ArticleList from '../../components/article/article_list';
import _ from 'lodash';

import { makeGetPostsByPage } from '../../filters/post_pagination_filter';

const ArticleListWithSpinner = withLoadingAnimation(ArticleList);

// todo: similar to the EventsTop and EventsManageTop -> generify
class ArticleTop extends React.Component{
    constructor(props) {
        super(props);
        this.onPaginationChange = this.onPaginationChange.bind(this);
    }

    componentDidMount() {
        this.props.loadArticlesByFilter();
    }

    onPaginationChange(pageIndex) {
        this.props.setArticlesPagination(pageIndex);
    }

    render() {
        const { isLoading, articles: { pageCount, currentPage, byId, pages } } = this.props;
        const articles = _.map(pages[currentPage - 1], (id) => byId[id]);

        return (
            <div>
                <ArticleListWithSpinner isLoading={isLoading} articles={articles}/>
                <Pagination activePage={currentPage} pageCount={pageCount} onPageSelect={this.onPaginationChange} />
            </div>
        )
    }
}

const mapStateToProps = ( state ) => {
    const getPostsByPage = makeGetPostsByPage();
    return {
        articles: getPostsByPage(state, 'articles'),
        isLoading: state.articles.isLoading
    }
};

export default compose(
    connect(mapStateToProps, { loadArticlesByFilter, setArticlesPagination }),
    withSideBar
)(ArticleTop);



