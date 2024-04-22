import { DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import React, { useRef, useState } from 'react'
import './ImageLoader.scss'

export default function ImageLoader({setSelectedFile, selectedFile}) {
    const [fileUrl, setFileUrl] = useState("");
    const filePicker = useRef(null);

    function handleChange(e) {
        setSelectedFile(e.target.files[0]);
        setFileUrl(URL.createObjectURL(e.target.files[0]));
      }
    
      function handlePick() {
        filePicker.current.click();
      }
    
    

  return (
    <div className="new-article__load-img">
    <h3>Главное фото</h3>
    <div className="img-loader">
      {selectedFile ? (
        <>
          <PlusOutlined
            className="icon icon__load-img"
            onClick={handlePick}
          />
          <p>Загрузите фото</p>
        </>
      ) : (
        <>
          <img src={fileUrl} alt="article preview"/>
          <DeleteOutlined
            className="icon__delete-img"
            onClick={() => setSelectedFile()}
          />
        </>
      )}

      <input
        className="hidden"
        type="file"
        id="preview"
        ref={filePicker}
        onChange={handleChange}
        accept="image/* .png, .jpg, .jpeg"
      />
    </div>
  </div>
  )
}
