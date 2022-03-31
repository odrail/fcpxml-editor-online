import React, { ChangeEventHandler, FormEventHandler, useState } from "react";
import { CSSProperties } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useAppDispatch } from "../../../app/hooks";
import { trovaESostituisci } from "../../../features/fcpxml/fcpxmlSlice";
import { TrovaESostituisciReducerPayload } from "../../../features/fcpxml/trovaESostituisciReducer";

type Props = {
  style?: CSSProperties
}

const statoIniziale: TrovaESostituisciReducerPayload = {
  trova: '',
  sostituisci: ''
}

const TrovaESostituisci: React.FC<Props> = ({ style }) => {
  const dispatch = useAppDispatch();
  const [show, setShow] = useState<boolean>(false);
  const [form, setForm] = useState<TrovaESostituisciReducerPayload>(statoIniziale)

  const handleClose = () => {
    setShow(false)
    setForm(statoIniziale)
  }

  const handleOnSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()
    dispatch(trovaESostituisci(form))
    handleClose()
  }

  const handleOnChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setForm(state => ({
      ...state,
      [event.target.name]: event.target.value
    }))
  }

  return (
    <React.Fragment>
      <Button
        style={style}
        onClick={() => setShow(true)}
        variant="dark"
      >
        Trova e Sostituisci
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Trova e Sostituisci</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleOnSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Trova</Form.Label>
              <Form.Control type="text" placeholder="Trova" name="trova" onChange={handleOnChange} />
              {/* <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text> */}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Sostituisci</Form.Label>
              <Form.Control type="text" placeholder="Sostituisci" name="sostituisci" onChange={handleOnChange} />
            </Form.Group>
            {/* <Button variant="primary" type="submit">
              Submit
            </Button> */}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Annulla
            </Button>
            <Button variant="primary" type="submit">
              Applica
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

    </React.Fragment>
  )
};

export default TrovaESostituisci;
