import React from 'react';
import PropTypes from 'prop-types';
import {parseDate} from "./util/DateParse";
import {connect} from "react-redux";
import {deleteRoomNote, setCurrentNote} from "../actions/roomActions";

const NoteItem = ({info, setCurrentNote, deleteRoomNote}) => {
    return (
        <div className="note-item">
            <h4>{info.title}</h4>
            <p>{info.description}</p>
            <small>{parseDate(info.createdAt)}</small>
            <div className="btn-container">
                <button onClick={() => deleteRoomNote(info.id)}><i className="fas fa-trash"/> Delete</button>
                <button onClick={() => setCurrentNote(info)}><i className="fas fa-edit"/> Edit</button>
            </div>
        </div>
    );
};

NoteItem.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    createdAt: PropTypes.string,
};

const mapStateToProps = state => ({

});

export default connect(mapStateToProps, {deleteRoomNote, setCurrentNote})(NoteItem);
