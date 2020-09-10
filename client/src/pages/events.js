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
        className={
          showModal ? "modalContainer showModal" : " modalContainer hideModal"
        }
      >
        <div className="modal">
          <div className="modalHeader">
            <h1>Add Events</h1>
          </div>
          <div className="modalBody">
            <p>content</p>
            <button>Submit</button>
            <button onClick={() => setShowModal(false)}>Cancel</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default EventsPage;
