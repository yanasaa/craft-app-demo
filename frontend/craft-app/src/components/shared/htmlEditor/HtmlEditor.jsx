import { useEffect, useState } from "react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import "./HtmlEditor.scss";

const HtmlEditor = () => {
  const modules = {
    toolbar: {
      container: [
        ["bold", "italic", "underline", "strike"],
        [{ align: [] }],

        [{ list: "ordered" }, { list: "bullet" }],
        [{ indent: "-1" }, { indent: "+1" }],

        [{ size: ["small", "large", "huge"] }],
        [{ header: [3, 4, 5, 6] }],
        ["link", "image", "video"],
        [{ color: [] }, { background: [] }],

        ["clean"],
      ],
      handlers: {
        image: imageHandler,
      },
    },
    clipboard: {
      matchVisual: false,
    },
  };
  const { quill, quillRef } = useQuill({ modules });
  const [value, setValue] = useState("");
 useEffect(() => {
    if (quill) {
      quill.on("text-change", () => {
        setValue(quillRef.current.firstChild.innerHTML);
      });
    }
  }, [quill]);
  

  function imageHandler() {
    const tooltip = this.quill.theme.tooltip;
    const originalSave = tooltip.save;
    const originalHide = tooltip.hide;
    tooltip.save = function () {
      const range = this.quill.getSelection(true);
      const value = this.textbox.value;
      if (value) {
        this.quill.insertEmbed(range.index, "image", value, "user");
      }
    };
    tooltip.hide = function () {
      tooltip.save = originalSave;
      tooltip.hide = originalHide;
      tooltip.hide();
    };
    tooltip.edit("image");
    tooltip.textbox.placeholder = "Ссылка на изображение";
  }

  console.log(value);
  return (
    <div className="editor">
      <div ref={quillRef} />
    </div>
  );
};

export default HtmlEditor;
