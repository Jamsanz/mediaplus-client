import React, { useRef } from 'react';


import dynamic from 'next/dynamic';
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });
interface IEditor {
  value?: string;
  onChange: (e: string) => void
}

const initialValue = [{ type: "paragraph", children: [{ text: "Start typing..." }] }];
const Editor: React.FC<IEditor> = (props) => {
  const editor = useRef(null);
  const config = {
    readonly: false,
    height: 400
  };


  return (
    <JoditEditor
      ref={editor}
      value={props.value}
      config={config}
      onBlur={props.onChange}
    />
  );
};

export default Editor;