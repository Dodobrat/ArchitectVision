import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {clearRoomMessages, deleteRoom, getRooms, openRoomModal, setRoomsLoading} from "../actions/roomActions";
import Loader from "./Loader";
import Card from "./ui/Card";
import {parseDate} from "./util/DateParse";
import {Link} from "react-router-dom";
import Footer from "./ui/Footer";
import RoomModal from "./RoomModal";

const Dashboard = ({rooms: {rooms, roomsLoading, roomModal, success, error}, getRooms, setRoomsLoading, openRoomModal, clearRoomMessages, deleteRoom}) => {

    useEffect(() => {
        document.title = "AV | Dashboard";
        setRoomsLoading();
        getRooms();
        //eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (error?.length > 0){
            console.error(error);
        }
        if (success?.length > 0){
            setRoomsLoading();
            getRooms().then(() => clearRoomMessages());
            console.log(success);
        }
        //eslint-disable-next-line
    }, [success, error]);

    return (
        <>
            <div className="container">
                {roomsLoading && <Loader/>}
                <div className="card-row">
                    {rooms?.map((item, index) =>
                        <Card key={index} header={<Link to={`/room/${item.id}`}>{item.title}</Link>}>
                            <small className="card-timestamp">{parseDate(item.createdAt)}</small>
                            <div className="btn-container">
                                <button onClick={() => deleteRoom(item.id)}><i className="fas fa-trash"/> Delete</button>
                                <button onClick={() => openRoomModal(item)}><i className="fas fa-edit"/> Edit</button>
                            </div>
                        </Card>
                    )}
                    <Card className="placeholder">
                        <button type="button" onClick={() => openRoomModal(null)} className="placeholder-btn">
                            <i className="fas fa-plus"/>
                        </button>
                    </Card>
                </div>
                <Footer/>
            </div>
            {roomModal && <RoomModal/>}
        </>
    );
};

Dashboard.propTypes = {
    rooms: PropTypes.object,
};

const mapStateToProps = state => ({
    rooms: state.rooms
});

export default connect(mapStateToProps, {getRooms, setRoomsLoading, openRoomModal, clearRoomMessages, deleteRoom})(Dashboard);
