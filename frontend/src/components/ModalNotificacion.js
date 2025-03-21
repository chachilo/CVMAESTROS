import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ModalNotificacion = ({ show, onClose, mensaje, tipo = 'success' }) => {
  return (
    <Modal
      show={show}
      onHide={onClose}
      centered // Centra el modal en la pantalla
      backdrop="static" // Evita que el modal se cierre al hacer clic fuera de él
      keyboard={false} // Evita que el modal se cierre al presionar la tecla ESC
    >
      <Modal.Header closeButton className={`bg-${tipo} text-white`}>
        <Modal.Title>Notificación</Modal.Title>
      </Modal.Header>
      <Modal.Body>{mensaje}</Modal.Body>
      <Modal.Footer>
        <Button variant={tipo} onClick={onClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalNotificacion;