import React from 'react';

class ErrorBoundary extends React.Component {

    constructor(props){
        super(props);
        this.state = { hasError: false, error: null }
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Caught an error",error,errorInfo);
    }

    handleReset = () => {
        this.setState({ hasError: false, error: null });
    }

    render() {
        if (this.state.hasError){
            return (
                <>
                    <div>
                        ERROR!
                    </div>
                </>
            )
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
