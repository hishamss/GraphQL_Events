import React, { useState } from "react";
import "./events.css";
function EventsPage() {
  const [hideModal, setHideModal] = useState(true);
  return (
    <>
      <div className="eventsContainer">
        <button id="createEvent" onClick={() => setHideModal(false)}>
          Add Event
        </button>
      </div>
      <div
        className={
          hideModal ? "modalContainer hideModal" : " modalContainer showModal"
        }
      >
        <div className="modal">
          <div className="modalHeader">
            <h1>Add Events</h1>
          </div>
          <div className="modalBody">
            <p>content</p>
            <button>Submit</button>
            <button onClick={() => setHideModal(true)}>Cancel</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default EventsPage;
