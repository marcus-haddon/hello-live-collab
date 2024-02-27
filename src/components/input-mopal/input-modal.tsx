import { FunctionComponent, useState } from "react";

import "./input-modal.css";

interface Props {
  prompt: string;
  onSubmit: (input: string) => void;
  onCancel: () => void;
}

export const InputModal: FunctionComponent<Props> = ({
  prompt,
  onSubmit,
  onCancel
}) => {
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="container">
      <div className="backdrop"></div>
      <div className="input-modal">
        <div className="top-row">
          <h3>{prompt}</h3>
          <button className="cancel" onClick={onCancel}>X</button>
        </div>
        
        <textarea
          className="text-input"
          suppressContentEditableWarning={true}
          contentEditable={true}
          onChange={e => setInputValue(e.target.value)}
        />
        <button
          className="submit"
          disabled={!!!inputValue.length}
          onClick={() => onSubmit(inputValue)}
        >
          Submit
        </button>
      </div>
    </div>
  );
};
