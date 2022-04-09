import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import ReactMarkdown from 'react-markdown'
import { getVersion, setVersion } from '../../../app/localstorage'

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
    const fcpxmlonlineeditorVersion = getVersion()
    if (!fcpxmlonlineeditorVersion || fcpxmlonlineeditorVersion !== currentVersion) {
      setVersion(currentVersion)
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