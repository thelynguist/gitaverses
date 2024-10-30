export default function Verse({ verses, verse, replaceVerse }) {
  return (
    <li>
      <div id="verse-box-outer">
        <div className="verse-box">
          <h4>
            <b>Verse: </b>
            {verse.verse}
          </h4>
          <span>
            <b>Sanskrit:</b> {verse.sanskrit}
          </span>
          <span>
            <b>Sanskrit Parsed:</b> {verse.sktParsed}
          </span>
          <span>
            <b>Prabhupada's Translation:</b> {verse.prabhupada}
          </span>
          <span>
            <b>Winthrop's Translation:</b> {verse.winthrop}
          </span>
          <span>
            <b>Mitchell's Translation:</b> {verse.mitchell}
          </span>
          <span>
            <b>Notes on Grammar:</b> {verse.notes}
          </span>
        </div>
        <div id="replace-button">
          <button onClick={() => replaceVerse(verse)}>Replace Original</button>
          <button>Delete</button>
        </div>
      </div>
    </li>
  );
}
