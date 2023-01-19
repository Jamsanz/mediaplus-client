import React, { ChangeEvent, useState } from 'react';
import dynamic from "next/dynamic";
const ReactQuill = dynamic(import('react-quill'), { ssr: false })
import 'react-quill/dist/quill.snow.css';

interface IEditor {
  value?: string;
  onChange: (e: string) => void
}
const Editor: React.FC<IEditor> = (props) => {

  return (
    <ReactQuill
      theme="snow"
      value={props.value}
      onChange={props.onChange}
      placeholder="Write something..."
    />
  );
};

export default Editor;