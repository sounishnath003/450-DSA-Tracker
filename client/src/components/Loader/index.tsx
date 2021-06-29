import React from 'react';
import './style.css'

const Loader: React.FC = () => {
    return (
        <React.Fragment>
            <div className="text-center">
                <div className="lds-roller">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div/>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <div className="mt-4">
                    Initializing ...
                </div>
            </div>
        </React.Fragment>)
}

export default Loader