import moment from "moment";
import React from "react";
import { Modal } from "react-bootstrap";

export const JobModal = (props) => {
  const { item } = props;
  return (
    <Modal
      {...props}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              style={{ height: "150px", width: "auto", marginRight: "50px" }}
              src={item.image}
              alt="기업 이미지"
            />
            <div>
              <p>{item.name}</p>
              <span>
                {moment(item.start_time).format("YYYY.MM.DD HH:MM")} ~{" "}
                {moment(item.end_time).format("YYYY.MM.DD HH:MM")}
              </span>
            </div>
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div
          style={{ textAlign: "center" }}
          dangerouslySetInnerHTML={{ __html: item.content }}
        ></div>
      </Modal.Body>
    </Modal>
  );
};
