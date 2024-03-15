import logo from './logo.svg';
//import './App.css';

import './App.css';
import { useEffect, useState } from 'react';
import Board from './components/Board/Board';
const emojiList = [...'🛸🦞🌸🐝🐇🦔'];

const App = () => {

  const [shuffledMemoBlocks, setShuffledMemoBlocks] = useState([]);
  const [selectedMemoBlock, setselectedMemoBlock] = useState(null);
  const [animating, setAnimating] = useState(false);


useEffect( () => {
  const shuffledEmojiList = shuffleArray([...emojiList, ...emojiList]);

  setShuffledMemoBlocks(shuffledEmojiList.map( (emoji, i) => ({ index: i, emoji, flipped: false})));
}, []);

  const shuffleArray = a => {
    for (let i = a.length - 1; i > 0; i--){
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  const handleMemoClick = memoBlock =>{
    //damos vuelta
      const flippedMemoBlock = { ...memoBlock, flipped: true };
      let shuffledMemoBlockCopy = [...shuffledMemoBlocks];
      shuffledMemoBlockCopy.splice(memoBlock.index, 1 , flippedMemoBlock);
      setShuffledMemoBlocks(shuffledMemoBlockCopy);
      if(selectedMemoBlock === null) {
        setselectedMemoBlock(memoBlock);
      }else if(selectedMemoBlock.emoji === memoBlock.emoji) {
        setselectedMemoBlock(null);
      }else{
        setAnimating(true);
        setTimeout(() => {
          shuffledMemoBlockCopy.splice(memoBlock.index, 1, memoBlock);
          shuffledMemoBlockCopy.splice(selectedMemoBlock.index, 1, selectedMemoBlock);
          setShuffledMemoBlocks(shuffledMemoBlockCopy);
          setselectedMemoBlock(null);
          setAnimating(false);
        }, 1000);
      }
  }

  return(
    <Board memoBlocks={shuffledMemoBlocks} animating={animating} handleMemoClick={handleMemoClick}/>
  );
  }
export default App;
