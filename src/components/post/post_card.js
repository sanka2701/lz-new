import React from 'react';
import { FormattedMessage } from 'react-intl'
import { BORDER_EVENT } from '../../utils/constant';
import Border from '../ui/content/bordered_content';
import moment from 'moment';
import $ from 'jquery';
import PropTypes from 'prop-types';

import styles from './post_card.module.css';

const formatDate = (dateMillis) => {
    return moment(new Date(dateMillis)).format('DD MMM');
};

const PostCard = ({post}) => {
    //todo: card text trucation by css
    return (
        <Border type={BORDER_EVENT}>
            <div className={styles.card}>
                <div className={styles['ribbon-wrapper']}>
                    <img src={post.thumbnail} className={styles.thumbnail} />
                    {post.startDate && (
                        <div className={styles.ribbon}>
                            <span>
                                {formatDate(post.startDate)}
                            </span>
                        </div>
                    )}
                </div>
                <h5 className={styles.title}>
                    {post.title}
                </h5>
                <div className={styles.preview}>
                    {$(post.content).text().slice(1,200)}...
                </div>
            </div>
        </Border>
    )
};

PostCard.propTypes = {
    post: PropTypes.object.isRequired
};

export default PostCard