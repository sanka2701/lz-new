import React from 'react';
import { FormattedMessage } from 'react-intl'
import { BORDER_EVENT } from '../../utils/constant';
import Border from '../ui/content/bordered_content';
import $ from 'jquery';

import styles from './post_card.module.css';

import moment from 'moment';

const formatDate = (date) => {
    return moment().format('DD MMM');
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

export default PostCard