import React from 'react';
import PropTypes from 'prop-types';
import {parseDate} from "./util/DateParse";

const NoteItem = ({info: {title, description, createdAt}}) => {
    return (
        <div className="note-item">
            <h4>{title}</h4>
            <p>{description}</p>
            <small>{parseDate(createdAt)}</small>
        </div>
    );
};

NoteItem.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    createdAt: PropTypes.string,
};

export default NoteItem;
