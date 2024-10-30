export default function VerseInput({ inputType, addText, inputValue }) {
  return (
    <div className="stacked-input">
      <p>{inputType}</p>
      <input
        type="text"
        value={inputValue}
        className="data-text"
        onChange={addText}
      />
    </div>
  );
}
