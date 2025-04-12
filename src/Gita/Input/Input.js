import { useState, useEffect } from "react";
import "../gita.css";
import "./Input.css";
import VerseInput from "../VerseInput/VerseInput";
import VerseList from "../VerseList/VerseList";
import {
  deleteDoc,
  setDoc,
  collection,
  getDocs,
  addDoc,
  getFirestore,
  doc,
  updateDoc,
  writeBatch,
  where,
  query,
  onSnapshot,
  getDoc,
} from "firebase/firestore";
export default function Input({
  onAddVerse,
  setChpt,
  changeChpt,
  chapter,
  addTempData,
  changeChptData,
  tempData,
  id,
  setId,
}) {
  const [book, setBook] = useState("");
  const [verse, setVerse] = useState("");
  const [sanskrit, setSkt] = useState("");
  const [sktParsed, setSktParsed] = useState("");
  const [prabhupada, setPrabh] = useState("");
  const [winthrop, setWinth] = useState("");
  const [mitchell, setMitch] = useState("");
  const [notes, setNotes] = useState("");
  const [sourcename, setSourcename] = useState("");
  const [editValue, setEditValue] = useState("");
  const [grammarNotes, setGrammarNotes] = useState("");
  const [developerNotes, setDeveloperNotes] = useState("");
  const [citation, setCitation] = useState("");

  //Net Ninja Training Section
  const db = getFirestore();
  const colRef = collection(db, `Chapter ${4}`);
  const batch = writeBatch(db);

  //GRAB VERSE ID
  //Grab an ID from the DB and assign it to the id variable.
  function assignID(e) {
    e.preventDefault();
    setId(editValue);
  }
  useEffect(() => {
    if (editValue) console.log(`Got verse with the ID: ${id}`);
  });
  //FETCH VERSE
  //Using the above function, grab the verse for editing.
  //1. Tell the db what collection to search
  //2. Get the verse you want and log it to the console.
  //3. Reset the Add Verse ID input
  function fetchVerseForEdit() {
    const docRef = doc(db, `Chapter 2`, id.toString());
    getDoc(docRef)
      .then((doc) => {
        console.log(doc);
        const verseToEdit = doc.data();
        console.log(verseToEdit, `ID: ${doc.id}`, `For Chapter ${chapter}`);
      })
      .catch((error) => console.log("Error: ", error.message));
    setEditValue("");
  }

  //UPDATE VERSE
  //
  async function updateVerse() {
    const updatedVerse = {};
    if (sourcename) updatedVerse.sourcename = sourcename;
    if (book) updatedVerse.book = book;
    if (verse) updatedVerse.verse = verse;
    if (chapter) updatedVerse.chapter = chapter;
    if (sanskrit) updatedVerse.sanskrit = sanskrit;
    if (sktParsed) updatedVerse.sktParsed = sktParsed;
    if (prabhupada) updatedVerse.prabhupada = prabhupada;
    if (winthrop) updatedVerse.winthrop = winthrop;
    if (mitchell) updatedVerse.mitchell = mitchell;
    if (notes) updatedVerse.notes = notes;
    if (grammarNotes) updatedVerse.grammarNotes = grammarNotes;
    if (developerNotes) updatedVerse.developerNotes = developerNotes;
    if (citation) updatedVerse.citation = citation;

    try {
      //CHAPTER MUST BE SELECTED FOR THIS TO WORK.
      let docRef;
      if (!chapter || !id) {
        alert(
          "It appears you do not have a complete reference to the document you want to edit. Please make sure both the ID and the chapter are selected."
        );
      } else {
        docRef = await doc(db, `Chapter ${chapter}`, id.toString());
      }

      updateDoc(docRef, {
        ...updatedVerse,
      }).then(() => {
        setSkt("");
        setSktParsed("");
        setPrabh("");
        setWinth("");
        setMitch("");
        setNotes("");
        setGrammarNotes("");
        setDeveloperNotes("");
        setCitation("");
      });
    } catch (error) {
      alert("There was an issue updating the verse: ", error);
    }
  }

  function createList(newVerse) {
    return <VerseList verses={addTempData(newVerse)} />;
  }

  function deleteVerse(e) {
    const docRef = doc(db, `Chapter ${chapter}`, id.toString());
    deleteDoc(docRef).then(() => {
      setSkt("");
      setSktParsed("");
      setPrabh("");
      setWinth("");
      setMitch("");
      setNotes("");
      setGrammarNotes("");
      setDeveloperNotes("");
      setCitation("");
    });
  }
  function createVerse(e) {
    e.preventDefault();

    addDoc(colRef, {
      sourcename: sourcename,
      id: Date.now(),
      book: book === 0 ? book + 1 : book,
      chapter: chapter === 0 ? chapter + 1 : chapter,
      verse: verse === 0 ? verse + 1 : verse,
      sanskrit,
      sktParsed,
      prabhupada,
      winthrop,
      mitchell,
      notes,
      grammarNotes,
      developerNotes,
      citation,
    });
    const newVerse = {
      id: Date.now(),
      book: book === 0 ? book + 1 : book,
      chapter: chapter === 0 ? chapter + 1 : chapter,
      verse: verse === 0 ? verse + 1 : verse,
      sanskrit,
      sktParsed,
      prabhupada,
      winthrop,
      mitchell,
      notes,
      grammarNotes,
      developerNotes,
      citation,
    };
    //onAddVerse(newVerse);
    createList(newVerse);
    setSkt("");
    setSktParsed("");
    setPrabh("");
    setWinth("");
    setMitch("");
    setNotes("");
    setGrammarNotes("");
    setDeveloperNotes("");
    setCitation("");
    console.log(newVerse);
  }

  return (
    <div className="input-container">
      <div id="verse-input">
        <div className="generic-centering-div">
          <h3>Enter New Verse Data Here</h3>
        </div>
        <div className="verse-id generic-centering-div">
          <p>Add Verse ID:</p>
          <form id="edit-form">
            <input
              value={editValue}
              className="input verse-id-input"
              placeholder="***********************"
              onChange={(e) => {
                setEditValue(e.target.value);
              }}
            />
            <button className="edit-button" onClick={assignID}>
              Get ID
            </button>
          </form>
          <div>
            <button className="edit-button" onClick={fetchVerseForEdit}>
              Attach ID to Verse
            </button>
          </div>
        </div>
        {/* Note: I took out the createVerse function because the button below already has it.
        Replace if you lose functionality. */}
        <form id="verse-form">
          <div id="num-inputs">
            <div className="input-section">
              <p>Add Source Name: </p>
              <select
                className="input"
                value={sourcename}
                onChange={(e) => setSourcename(e.target.value)}
              >
                <option value={""}></option>
                <option key={sourcename}>Bhagavad-Gita</option>
              </select>
            </div>
            <div className="input-section">
              <p>Add Book Number: </p>
              <select
                className="input"
                value={book}
                onChange={(e) => setBook(Number(e.target.value))}
              >
                <option value={""}></option>
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
                  setChpt(Number(e.target.value));
                }}
              >
                <option value={""}></option>
                {Array.from({ length: 18 }, (_, i) => i + 1).map((num) => (
                  <option value={num} key={num}>
                    {num}
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
                <option value={""}></option>
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
          {/*Go back and figure out where to set up these variables again.*/}
          <div className="three-verses">
            <VerseInput
              inputType={"Grammar Assistance"}
              inputValue={grammarNotes}
              addText={(e) => setGrammarNotes(e.target.value)}
            />

            <VerseInput
              inputType={"Developer Notes"}
              inputValue={developerNotes}
              addText={(e) => setDeveloperNotes(e.target.value)}
            />

            <VerseInput
              inputType={"Citation"}
              inputValue={citation}
              addText={(e) => setCitation(e.target.value)}
            />
          </div>

          <div className="save-button-div">
            <button className="save-button" onClick={createVerse}>
              Save Verse
            </button>
          </div>
        </form>
        <div className="save-button-div">
          <button className="save-button" onClick={updateVerse}>
            Partial Verse Replace
          </button>
        </div>
        <div className="save-button-div">
          <button className="save-button" onClick={deleteVerse}>
            Delete Verse
          </button>
        </div>
      </div>
    </div>
  );
}

// const saveVerse = () => {
//   const db = getFirestore();
//   const chapterRef = ref(db, `Bhagavad-Gita`);

//   addDoc(chapterRef, {
//     sourcename: sourcename,
//     book: book === 0 ? book + 1 : book,
//     verse: verse === 0 ? verse + 1 : verse,
//     chapter: chapter,
//     sanskrit: sanskrit,
//     sktParsed: sktParsed,
//     prabhupada: prabhupada,
//     winthrop: winthrop,
//     mitchell: mitchell,
//     notes: notes,
//   });

//   updateDoc(docRef, newVerse);
// };

//This is actually a query function, which means it'll get you
//every single instance where the "id" matches the input. May need
//to change soon, but keep for website, which will have a query button
//for users.
// function getVerseForEdit() {
//   const q = query(colRef, where("id", "==", `${id}`));
//   onSnapshot(q, (snapshot) => {
//     let verses = [];
//     snapshot.docs.forEach((doc) => {
//       verses.push({ ...doc.data(), id: doc.id });
//     });
//     console.log(verses);
//   });
// }

// const addNewVerse = function () {
//   //const db = getFirestore();
//   const colRef = collection(db, `Chapter ${chapter}`);
//   const batch = writeBatch(db);

//   addDoc(colRef, {
//     ...chptData[0].verses[verse - 1],
//     id: crypto.randomUUID(),
//   });
// };
// getDocs(colRef)
//   .then((snapshot) => {
//     let verses = [];
//     snapshot.docs.forEach((doc) => {
//       verses.push({ ...doc.data(), id: doc.id });
//     });
//   })
//   .catch((err) => {
//     console.log(err.message);
//   });
// const addEmbeddedData = function () {
//   const db = getFirestore();
//   const docRef = doc(db, "Chapter 1", crypto.randomUUID());
//   const verse = { ...chptData[0].verses[9], id: crypto.randomUUID() };
//   setDoc(docRef, verse)
//     .then(() => console.log("Document Submitted"))
//     .catch((error) => console.log("Issue submitting: ", error));
// };

// set(newDocRef, {
//   sourcename: sourcename,
//   book: book === 0 ? book + 1 : book,
//   verse: verse === 0 ? verse + 1 : verse,
//   chapter: chapter === 0 ? chapter + 1 : chapter,
//   sanskrit: sanskrit,
//   sktParsed: sktParsed,
//   prabhupada: prabhupada,
//   winthrop: winthrop,
//   mitchell: mitchell,
//   notes: notes,
// })
//   .then(() => {
//     alert("Verse successfully saved");
//   })
//   .catch((error) => {
//     alert("error: ", error.message);
//   });
// };

// const saveData = async () => {
//   const db = getDatabase(app);
//   // const newDocRef = push(ref(db, `Bhagavad-Gita/books/chapters`));
//   const chapterRef = ref(db, `Bhagavad-Gita`);
//   get(chapterRef)
//     .then((snapshot) => {
//       if (snapshot.exists()) {
//         const selectedChapter = Object.values(snapshot.val())[0].books[0]
//           .chapters[chapter - 1];
//         console.log(selectedChapter);
//         const newChpt = [...selectedChapter, newVerse];
//         update(selectedChapter, newChpt);
//       }
//     })
//     .then(() => {
//       alert("Saved the data");
//     })
//     .catch((error) => {
//       alert("Nothing saved due to: ", error.message);
//     });
//   const newVerse = {
//     sourcename: sourcename,
//     book: book === 0 ? book + 1 : book,
//     verse: verse === 0 ? verse + 1 : verse,
//     chapter: chapter,
//     sanskrit: sanskrit,
//     sktParsed: sktParsed,
//     prabhupada: prabhupada,
//     winthrop: winthrop,
//     mitchell: mitchell,
//     notes: notes,
//   };
