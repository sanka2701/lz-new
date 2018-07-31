import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { connect } from 'react-redux';
import { dismissModalError, testAction } from '../../actions/index';
import { FormattedMessage } from 'react-intl';

class ModalExample extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpened: !!props.errorMessage
        };

        this.toggle = this.toggle.bind(this);
    }

    componentWillReceiveProps({errorMessage}) {
        if (errorMessage !== this.props.errorMessage) {
            this.setState({ isOpened: !!errorMessage })
        }
    }

    toggle() {
        this.props.dismissModalError();
    }

    render() {
        return (
            <div>
                <Button color="danger" onClick={() => this.props.testAction()}>Test error modal</Button>

                <Modal isOpen={this.state.isOpened} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>
                        <FormattedMessage id={'error.modalHeader'} defaultMessage='Ooops wild error has appeared'/>
                    </ModalHeader>
                    <ModalBody>
                        {this.props.errorMessage &&
                            <FormattedMessage id={this.props.errorMessage} defaultMessage='Unknown error has occured'/>
                        }
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.toggle}>okay</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        errorMessage: state.error.messageId
    }
};

ModalExample.defaultProps = {
    errorMessage: ""
};

export default connect(mapStateToProps, { dismissModalError, testAction })(ModalExample);