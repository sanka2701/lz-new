import React from 'react'
import PropTypes from "prop-types";
import Spinner from '../spinner';

const withLoadingAnimation = (WrappedComponent) => {
    const LoadingWrapper = ({isLoading, ...props}) => (
        <div>
            { isLoading ? <Spinner/> : <WrappedComponent {...props} /> }
        </div>
    );

    LoadingWrapper.propTypes = {
        isLoading: PropTypes.bool.isRequired
    };

    return LoadingWrapper;
};


export default withLoadingAnimation;