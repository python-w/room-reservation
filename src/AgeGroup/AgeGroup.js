import React, { useState, useEffect } from "react";
import RoomSearchDropdown from "./RoomSearchDropdown";
import { checkAgeGroup, getAllAgeGroup } from '../services/apiAgeGroup';

const HomeScreen = (props) => {

    const [checkAgeGroupEnabled, setCheckAgeGroupEnabled] = useState(false);
    const [allAgeGroupsList, setAllAgeGroupsList] = useState([]);

    useEffect(() => {
        async function isAgeGroupEnabled() {
            try {
              const isEnabled = await checkAgeGroup();
              setCheckAgeGroupEnabled(isEnabled)
            } catch (error) {
              console.error('Error:', error.message);
            }
        }
        isAgeGroupEnabled();
    
        async function getAgeGroupList() {
            try {
                const agrGroupList = await getAllAgeGroup();
                setAllAgeGroupsList(agrGroupList)
            } catch (error) {
              console.error('Error:', error.message);
            }
        }
        getAgeGroupList();
    }, [checkAgeGroupEnabled])  


    return (
        <>
            <div className="root-container">
                <div className={"room-search-block"}>
                    <div className="row">
                        <div className="col-xl-6 col-lg-6 col-md-6">
                            <div className="top-section">
                                <h5 className="guest-room-title">Guests & Rooms</h5>
                            </div>
                            <div className="guest-room-comp">
                                <RoomSearchDropdown
                                    checkAgeGroupEnabled={checkAgeGroupEnabled}
                                    allAgeGroupsList={allAgeGroupsList}
                                    ageGroupTypeMaxOccupants={{"1":4,"2":3,"3":2,"5":5}}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default HomeScreen;