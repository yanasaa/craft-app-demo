import React, { useEffect, useRef, useState } from "react";

import ReactQuill from "react-quill";
import "quill/dist/quill.snow.css";
import "./HtmlEditor.scss";


function HtmlEditor({value, onChange}) {
  
  const quillRef = useRef();

  const insertImageByLink = () => {
    const editor = quillRef.current.getEditor();
    
    const tooltip = editor.theme.tooltip;
    const originalSave = tooltip.save;
    const originalHide = tooltip.hide;
    tooltip.save = function () {
      const range = this.quill.getSelection(true);
      const value = this.textbox.value;
      if (value) {
        this.quill.insertEmbed(range.index, "image", value);
      }
    };
    tooltip.hide = function () {
      tooltip.save = originalSave;
      tooltip.hide = originalHide;
      tooltip.hide();
    };
    tooltip.edit("image");
    tooltip.textbox.placeholder = "URL изображения";
    console.log(tooltip.textbox)
  };

  const modules = {
    toolbar: {
      container: [
        ["bold", "italic", "underline", "strike", "blockquote"],
        [{ size: [] }],
        [{ align: [] }],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link"],
        [{ color: [] }],
        [{ background: [] }],
        [{ image: "" }], // Placeholder for the custom image button
      ],
    },
    clipboard: {
      matchVisual: false,
    },
  };

  useEffect(() => {
    const editor = quillRef.current.getEditor();
    const toolbar = quillRef.current.getEditor().getModule("toolbar");
    toolbar.addHandler("image", insertImageByLink);
  }, []);

  return (
    <>
      <ReactQuill theme="snow" ref={quillRef} value={value} onChange={onChange} modules={modules} />
    </>
  );
}

export default HtmlEditor;
