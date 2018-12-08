import React from 'react';
import PropTypes from "prop-types";
import BorderCol from '../ui/content/bordered_content';
import { map } from 'lodash';
import { Table } from 'reactstrap';
import { FormattedMessage } from 'react-intl';

const getTableRows = (tags) => map(tags, (tag, index) => {
  // todo: resolve dynamic translations of the tag labels
  return (
    <tr key={'tag-mng-' + tag.id}>
      <th scope="row">
        {parseInt(index)}
      </th>
      <td>
        {tag.label}
      </td>
    </tr>
  )
});

const TagList = ({ tags }) => (
  <BorderCol>
    <Table responsive hover striped>
      <thead>
      <tr>
        <th>#</th>
        <th>
          <FormattedMessage id={'tag.category'} defaultMessage={'Category'}/></th>
      </tr>
      </thead>
      <tbody>
        { getTableRows(tags) }
      </tbody>
    </Table>
  </BorderCol>
);

TagList.propTypes = {
  tags: PropTypes.array.isRequired
};

export default TagList;
