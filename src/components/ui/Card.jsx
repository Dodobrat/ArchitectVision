import React from 'react';
import classnames from 'classnames';

const Card = ({children, header, dismissible, className, ...rest}) => {
    return (
        <div className={classnames('card', className)} {...rest}>
            {header && <div className="card-header">
                <div className="card-header-container">
                    <span>{header}</span>
                    {dismissible && dismissible}
                </div>
            </div>}
            <div className="card-body">
                {children}
            </div>
        </div>
    );
};

export default Card;
