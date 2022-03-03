import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import ReactMarkdown from 'react-markdown'

type Props = {
  changelogMd: string,
  currentVersion: string
}

const ChangelogModal = ({ changelogMd, currentVersion }: Props): JSX.Element => {
  const [show, setShow] = useState<boolean>(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const fcpxmlonlineeditorVerion = localStorage.getItem('fcpxmlonlineeditorVerion')
    if (!fcpxmlonlineeditorVerion || fcpxmlonlineeditorVerion !== currentVersion) {
      localStorage.setItem('fcpxmlonlineeditorVerion', currentVersion)
      handleShow()
    }
  }, [currentVersion])  

  return mounted
    ?
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>Ultime novità</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ReactMarkdown>
            {changelogMd}
          </ReactMarkdown>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Capito
          </Button>
        </Modal.Footer>
      </Modal>
    </>
    :
    <div></div>
}

export default ChangelogModal