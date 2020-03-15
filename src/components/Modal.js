import React from 'react';
import ReactDOM from 'react-dom';

const Modal = props => {
    return ReactDOM.createPortal(
        <div
            className="modal"
            onClick={props.hideModal}
        >
            <div
                className="modal-content"
                onClick={(e) => e.stopPropagation()}
            >
                <svg
                    role="img" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                    tabIndex="0"
                    onClick={props.hideModal}
                >
                    <path d="M6.34314575 6.34314575L17.6568542 17.6568542M6.34314575 17.6568542L17.6568542 6.34314575" />
                </svg>

                {props.children}
            </div>
        </div>,
        document.querySelector('#modal-root')
    );
};

export default Modal;