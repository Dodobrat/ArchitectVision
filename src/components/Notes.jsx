import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {addRoomNote, getRoomNotes} from "../actions/roomActions";

const Notes = ({roomId, addRoomNote, rooms: {roomNotes, notesLoading}, getRoomNotes}) => {

    useEffect(() => {
        if (roomId){
            getRoomNotes(roomId);
        }
        //eslint-disable-next-line
    },[roomId]);

    const [counter, setCounter] = useState(0);

    useEffect(() => {
        if (counter > 0){
            getRoomNotes(roomId);
        }
        //eslint-disable-next-line
    },[counter]);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        roomId: roomId
    })

    const handleChange = e => setFormData({...formData, [e.target.name]: e.target.value});

    const onSubmit = (e) => {
        e.preventDefault();
        addRoomNote(formData).then(() => setCounter(counter + 1));
    };

    return (
        <div className="notes-container">
            <div className="note-add">
                <form onSubmit={onSubmit}>
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" id="title" value={formData.title} onChange={handleChange}/>
                    <label htmlFor="description">Description</label>
                    <textarea name="description" id="desc" value={formData.description} onChange={handleChange}/>
                    <input type="hidden" name="roomId" value={formData.roomId}/>
                    <input type="submit"/>
                </form>
            </div>
            <div className="notes-display">
                {notesLoading && <h1>Loading...</h1>}
                {roomNotes?.map((item) => <p key={item.id}>{item.title}</p>)}
            </div>
        </div>
    );
};

Notes.propTypes = {
    rooms: PropTypes.object,
};

const mapStateToProps = state => ({
    rooms: state.rooms
});

export default connect(mapStateToProps, {addRoomNote, getRoomNotes})(Notes);
