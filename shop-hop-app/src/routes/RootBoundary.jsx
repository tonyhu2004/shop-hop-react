import { Component } from 'react';
import PropTypes from 'prop-types';
import {Navigate} from "react-router-dom";

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            error: null
        };
    }

    // This lifecycle method catches errors during rendering
    static getDerivedStateFromError() {
        // Update state to indicate that an error has occurred
        console.log("derived")

        return { hasError: true };
    }

    // This lifecycle method catches errors during component updates
    componentDidCatch(error, errorInfo) {
        const { setIsAuthenticated } = this.props; // Destructure the prop
        const {status} = error;

        this.setState({ hasError: true, error });

        if (status === 401){
            console.log(status)
            setIsAuthenticated(false);
        }
        console.error('Error caught by RootBoundary:', error, errorInfo);
    }

    render() {
        const { children } = this.props; // Destructure the prop
        // If an error has occurred, render different UI based on the error status
        console.log("status state "+ this.state.error)
        if (this.state.error !== null && this.state.error !== undefined) {
            const { status } = this.state.error;
            if (typeof status === 'number' && !isNaN(status)) {
                switch (status) {
                    case 404:
                        return <h2>404 - Page Not Found</h2>;
                    case 401:
                        return children;
                    case 403:
                        return <h2>403 - Forbidden</h2>;
                    case 400:
                        return <h2>400 - User error</h2>;
                    case 500:
                        return <h2>500 - Server Error</h2>;
                    default:
                        return <h2>Something went wrong.</h2>;
                }
            }
        }
        return children;
    }
}

ErrorBoundary.propTypes = {
    setIsAuthenticated: PropTypes.func.isRequired, // Define prop types
    children: PropTypes.node.isRequired // Children prop validation
};

export default ErrorBoundary;
