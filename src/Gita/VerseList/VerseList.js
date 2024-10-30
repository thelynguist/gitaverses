import DownloadJSON from "../DLButton";
import Verse from "../Verse/Verse";

export default function VerseList({
  verses,
  clearData,
  addToData,
  logData,
  replaceVerse,
  logFullData,
  replaceChapter,
  data,
}) {
  return (
    <div id="list-container">
      <div id="box-container">
        <div className="header-container">
          <h2>Recently Translated Verses</h2>
        </div>
        <ul>
          {verses.map((verse) => {
            return (
              <Verse
                verses={verses}
                verse={verse}
                key={verse.id}
                replaceVerse={replaceVerse}
              />
            );
          })}
        </ul>
      </div>
      <div id="button-container">
        <div id="button-top-row">
          <button className="bottom-buttons" onClick={clearData}>
            Clear List of Verses
          </button>
          <button onClick={() => addToData(verses)} className="bottom-buttons">
            Add to Chatper
          </button>
          <button
            className="bottom-buttons"
            onClick={() => replaceChapter(data)}
          >
            Replace Full Chapter
          </button>
        </div>
        <div id="button-bottom-row">
          <DownloadJSON data={verses} fileName="versesUpdate" />
          <button className="bottom-buttons" onClick={logData}>
            Log Chapter
          </button>
          <button className="bottom-buttons" onClick={logFullData}>
            Log All Data
          </button>
        </div>
      </div>
    </div>
  );
}
