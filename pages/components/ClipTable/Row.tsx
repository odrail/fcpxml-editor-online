import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";
import { useAppDispatch } from "../../../app/hooks";
import { modificaTitoliRiga } from "../../../features/fcpxml/fcpxmlSlice";

type Props = {
  index: number,
  title: any
}

const Row: React.FC<Props> = ({ index, title }) => {
  const dispatch = useAppDispatch();
  const [isEditable, setIsEditable] = useState<boolean>(false)
  const [lang1, setLang1] = useState<string>(title.lang1 || '')
  const [lang2, setLang2] = useState<string>(title.lang2 || '')

  const handleOnChange = (event: any) => {
    const name = event.target.name
    const value = event.target.value
    switch (name) {
      case 'lang1':
        setLang1(value)
        break;
      case 'lang2':
        setLang2(value)
        break;
      default:
        break;
    }
  }

  const handleOnEditClick = () => {
    if (isEditable) {
      dispatch(modificaTitoliRiga({index, lang1, lang2}))
    }
    setIsEditable(!isEditable)
  }

  return (
    <tr>
      <td>{index}</td>
      <td>
        {
          isEditable ?
            <Form.Control type="text" onChange={handleOnChange} name="lang1" value={lang1}></Form.Control>
            :
            lang1
        }</td>
      <td>{
          isEditable ?
          <Form.Control type="text" onChange={handleOnChange} name="lang2" value={lang2}></Form.Control>
            :
            lang2
        }</td>
      <td>
        <Button 
          onClick={handleOnEditClick}
          variant={isEditable ? 'danger' : "light"}
          >
          <FaEdit />
        </Button>
      </td>
    </tr>
  )
};

export default Row
