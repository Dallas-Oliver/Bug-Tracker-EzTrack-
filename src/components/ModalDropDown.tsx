import React from "react";
import { Button, Modal } from "react-bootstrap";

type ModalDropDownProps = {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
  confirmDelete: () => void;
};

export default function ModalDropDown(props: ModalDropDownProps) {
  return (
    <Modal show={props.showModal} onHide={() => props.setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Are you sure?</Modal.Title>
      </Modal.Header>
      <Modal.Body>Data deleted cannot be recovered!</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => props.setShowModal(false)}>
          whoops!
        </Button>
        <Button
          variant="danger"
          onClick={() => {
            props.setShowModal(false);
            props.confirmDelete();
          }}>
          Yes Im sure!
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
