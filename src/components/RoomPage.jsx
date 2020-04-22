import React from 'react';
import PropTypes from 'prop-types';
import Notes from "./Notes";
import Viewer from "./Viewer";

const RoomPage = ({match}) => {
    return (
        <>
            {/*Notes Container*/}
            <Notes roomId={match.params.id}/>
            {/*3d Model viewport*/}
            <Viewer roomId={match.params.id}/>
        </>
    );
};

RoomPage.propTypes = {
    match: PropTypes.object,
};

export default RoomPage;
