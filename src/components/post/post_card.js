import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle } from 'reactstrap';
import { FormattedMessage } from 'react-intl'
import { BORDER_EVENT } from '../../utils/constant';
import Border from '../ui/content/bordered_content';
import $ from 'jquery';

import styles from './post_card.module.css';

export default ({post}) => {
    //todo: card text trucation by css
    return (
        <Border type={BORDER_EVENT}>
            <div className={styles.card}>
                <img src={post.thumbnail} className={styles.thumbnail} />
                <h5 className={styles.title}>
                    {post.title}
                </h5>
                <div className={styles.preview}>
                    {$(post.content).text().slice(1,200)}...
                </div>
            </div>
        </Border>
    )
}