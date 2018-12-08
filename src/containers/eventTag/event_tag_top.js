import React from 'react';
import { connect } from 'react-redux';
import {
  Row,
  Col,
  Input} from 'reactstrap';
import BorderCol from '../../components/ui/content/bordered_content';
import { loadTags } from '../../actions';

import TagList from '../../components/tag/tag_list';

class EventTagTop extends React.Component {
  componentDidMount() {
    this.props.loadTags();
  }

  render = () => {
    const { isLoading, tags } = this.props;
    // todo: add filtering and spinning animation
    return (
      <Row>
        <TagList tags={tags}/>
      </Row>
    )
  }
}

const mapStateToProps = ({ tags }) => {
  return {
    isLoading: tags.isLoading,
    tags : tags.byId
  }
};

export default connect( mapStateToProps, { loadTags }) (EventTagTop);