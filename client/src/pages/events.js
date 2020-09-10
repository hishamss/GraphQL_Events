import React, { useState } from "react";
import "./events.css";
function EventsPage() {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <div className="eventsContainer">
        <button id="createEvent" onClick={() => setShowModal(true)}>
          Add Event
        </button>
      </div>
      <div
        className={"modalContainer" + (showModal ? " showModal" : " hideModal")}
      >
        <div className="modal">
          <div className="modalHeader">
            <h3>Add Events</h3>
          </div>
          <div className="modalBody">
            <div className="modalContent">
              <p>Content</p>
            </div>
            <div className="modalButtons">
              <button>Submit</button>
              <button onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EventsPage;
