import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {getRooms, openRoomModal, setRoomsLoading} from "../actions/roomActions";
import Loader from "./Loader";
import Card from "./ui/Card";
import {parseDate} from "./util/DateParse";
import {Link} from "react-router-dom";
import Footer from "./ui/Footer";
import RoomModal from "./RoomModal";

const Dashboard = ({rooms: {rooms, roomsLoading, roomModal, success, error, dataUpdate}, getRooms, setRoomsLoading, openRoomModal}) => {

    useEffect(() => {
        document.title = "AV | Dashboard";
        setRoomsLoading();
        getRooms();
        setCounter(counter + 1);
        //eslint-disable-next-line
    }, []);

    const [counter, setCounter] = useState(0);

    useEffect(() => {
        if (counter > 0){
            setRoomsLoading();
            getRooms();
        }
        if (error.length > 0){
            console.error(error);
        }
        if (success.length > 0){
            console.log(success);
        }
        //eslint-disable-next-line
    }, [success, error, dataUpdate]);

    return (
        <>
            <div className="container">
                {roomsLoading && <Loader/>}
                <div className="card-row">
                    {rooms?.map((item, index) =>
                        <Card key={index} header={<Link to={`/room/${item.id}`}>{item.title}</Link>} className="mini-card">
                            <small className="card-timestamp">{parseDate(item.createdAt)}</small>
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

export default connect(mapStateToProps, {getRooms, setRoomsLoading, openRoomModal})(Dashboard);
