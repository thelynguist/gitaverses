import { useState, useEffect } from "react";
import "./gita.css";
import verses from "./gita_verses.json";
import Input from "./Input/Input";
import VerseList from "./VerseList/VerseList";

export default function Gita() {
  const [data, setData] = useState([]);
  const [tempData, setTempData] = useState([]);
  const [fullData, setFullData] = useState(verses.books[0].chapters);
  const [chapter, setChpt] = useState("");
  const [id, setId] = useState("");

  //--Set the chapter that is being manipulated--//
  function replaceChapter(newChapter) {
    setFullData((data) =>
      data.map((chapter) =>
        chapter.chapter === Number(newChapter[0].chapter)
          ? (chapter.verses = { chapter: chapter.chapter, verses: newChapter })
          : chapter
      )
    );
  }

  const verseIDs = data.forEach((verse) => {});

  const fullData2 = fullData.map((chapter) => {
    return chapter.verses.map((verse) => {
      return { ...verse, ID: crypto.randomUUID() };
    });
  });

  function logFullData() {
    console.log(
      fullData.map((chapter) => {
        return chapter.verses.map((verse) => {
          return { ...verse, ID: crypto.randomUUID() };
        });
      })
    );
  }
  function logData() {
    console.log(verses.books[0].chapters[0]);
  }

  //--Map through the verse and replace it with the new one--//
  function replaceVerse(newVerse) {
    setData((data) =>
      data.map((item) =>
        Number(item.verse) === newVerse.verse ? (item = newVerse) : item
      )
    );
  }

  function addToData(datum) {
    setData((data) => [...data, ...datum]);
  }

  function addTempData(datum) {
    setTempData((data) => [...data, datum]);
  }

  function clearTempData() {
    setTempData((data) => []);
  }

  function addVerse(verse) {
    setData((data) => [...data, verse]);
  }

  function changeChpt(num) {
    setChpt(num);
  }

  // useEffect(() => {
  //   setData(verses.books[0].chapters[chapter - 1].verses);
  // }, [chapter]);

  useEffect(() => {
    console.log(chapter);
  });

  return (
    <div>
      <Input
        verses={data}
        onAddVerse={addVerse}
        chapter={chapter}
        setChpt={setChpt}
        changeChpt={changeChpt}
        addTempData={addTempData}
        id={id}
        setId={setId}
      />
      <VerseList
        verses={tempData}
        clearData={clearTempData}
        addToData={addToData}
        logData={logData}
        replaceVerse={replaceVerse}
        logFullData={logFullData}
        replaceChapter={replaceChapter}
        fullData2={fullData2}
        data={data}
        chapter={chapter}
        id={id}
      />
    </div>
  );
}
