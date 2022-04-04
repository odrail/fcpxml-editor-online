import { ChangeEventHandler } from 'react'
import { useAppDispatch } from '../../app/hooks'
import { setFcpxml } from '../../features/fcpxml/fcpxmlSlice'
import styles from './style.module.css'
import * as xml from '../../utils/xml'
import { setFileName } from '../../features/fileName/fileNameSlice'

type Props = {
}

const LoadButton = ({ }: Props) => {
  const dispatch = useAppDispatch();
  
  const handleOnChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    handleOnInputFile(event.target.files)
    event.target.value = ''
  }

  const handleOnInputFile = async (files: FileList | null) => {
    if (!files || files.length == 0) return
    if (files.item(0)) {
      const file: File | null = files.item(0);
      if (!file) return
      const fileText: string | undefined = await file.text()
      const fileName: string = file.name
      if (fileText) {
        try {
          dispatch(setFcpxml(xml.parse(fileText)))
          dispatch(setFileName(fileName))
        } catch (error) {
          console.error('error', error)
          alert('File non valido')
        }
      }
    }
  }

  return <div className={styles["file-input"]}>
    <input
      type="file"
      name="file-input"
      id="file-input"
      className={styles["file-input__input"]}
      onChange={handleOnChange}
    />
    <label className={styles["file-input__label"]} htmlFor="file-input">
      <svg
        aria-hidden="true"
        focusable="false"
        data-prefix="fas"
        data-icon="upload"
        className="svg-inline--fa fa-upload fa-w-16"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
      >
        <path
          fill="currentColor"
          d="M296 384h-80c-13.3 0-24-10.7-24-24V192h-87.7c-17.8 0-26.7-21.5-14.1-34.1L242.3 5.7c7.5-7.5 19.8-7.5 27.3 0l152.2 152.2c12.6 12.6 3.7 34.1-14.1 34.1H320v168c0 13.3-10.7 24-24 24zm216-8v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h136v8c0 30.9 25.1 56 56 56h80c30.9 0 56-25.1 56-56v-8h136c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"
        ></path>
      </svg>
      <span>Carica fcpxml</span></label>
  </div>
}

export default LoadButton