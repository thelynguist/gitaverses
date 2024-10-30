import { useState } from "react";
import VerseInput from "../VerseInput/VerseInput";
import VerseList from "../VerseList/VerseList";

export default function Input({
  verses,
  onAddVerse,
  changeChpt,
  chapter,
  addTempData,
  changeChptData,
  tempData,
}) {
  const [book, setBook] = useState(1);
  const [verse, setVerse] = useState(1);
  const [sanskrit, setSkt] = useState("");
  const [sktParsed, setSktParsed] = useState("");
  const [prabhupada, setPrabh] = useState("");
  const [winthrop, setWinth] = useState("");
  const [mitchell, setMitch] = useState("");
  const [notes, setNotes] = useState("");

  function createList(newVerse) {
    return <VerseList verses={addTempData(newVerse)} />;
  }
  function createVerse(e) {
    e.preventDefault();

    const newVerse = {
      id: Date.now(),
      book,
      chapter: chapter === 0 ? chapter + 1 : chapter,
      verse,
      sanskrit,
      sktParsed,
      prabhupada,
      winthrop,
      mitchell,
      notes,
    };
    //onAddVerse(newVerse);
    createList(newVerse);
    setSkt("");
    setSktParsed("");
    setPrabh("");
    setWinth("");
    setMitch("");
    setNotes("");
    console.log(newVerse);
  }

  return (
    <div className="input-container">
      <div id="verse-input">
        <div className="generic-centering-div">
          <h3>Enter New Verse Data Here</h3>
        </div>
        <form id="verse-form" onSubmit={createVerse}>
          <div id="num-inputs">
            <div className="input-section">
              <p>Add Book Number: </p>
              <select
                className="input"
                value={book}
                onChange={(e) => setBook(Number(e.target.value))}
              >
                {Array.from({ length: 30 }, (_, i) => i + 1).map((num) => (
                  <option value={num} key={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>
            <div className="input-section">
              <p>Add a Chapter Number: </p>
              <select
                className="input"
                value={chapter}
                onChange={(e) => {
                  changeChpt(Number(e.target.value));
                }}
              >
                {Array.from({ length: 18 }, (_, i) => i + 1).map((chapter) => (
                  <option value={chapter} key={chapter}>
                    {chapter}
                  </option>
                ))}
              </select>
            </div>
            <div className="input-section">
              <p>Add a Verse Number: </p>
              <select
                className="input"
                value={verse}
                onChange={(e) => setVerse(Number(e.target.value))}
              >
                {Array.from({ length: 75 }, (_, i) => i + 1).map((num) => (
                  <option value={num} key={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="three-verses">
            <VerseInput
              inputType={`Sanskrit: `}
              inputValue={sanskrit}
              addText={(e) => setSkt(e.target.value)}
            />
            <VerseInput
              inputType={`Parsed Sanskrit: `}
              inputValue={sktParsed}
              addText={(e) => setSktParsed(e.target.value)}
            />
            <VerseInput
              inputType={`Prabhupada's Translation: `}
              inputValue={prabhupada}
              addText={(e) => setPrabh(e.target.value)}
            />
          </div>

          <div className="three-verses">
            <VerseInput
              inputType={`Winthrops's Translation: `}
              inputValue={winthrop}
              addText={(e) => setWinth(e.target.value)}
            />
            <VerseInput
              inputType={`Mitchell's Translation: `}
              inputValue={mitchell}
              addText={(e) => setMitch(e.target.value)}
            />
            <VerseInput
              inputType={`Translation Notes`}
              inputValue={notes}
              addText={(e) => setNotes(e.target.value)}
            />
          </div>

          <div className="save-button-div">
            <button className="save-button" onClick={createVerse}>
              Save Verse
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
