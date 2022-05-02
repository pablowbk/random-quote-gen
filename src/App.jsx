// eslint-disable-next-line no-unused-vars
import { useEffect, useReducer } from 'react';
import Header from './components/header/Header';
import Quote from './components/quote/Quote';
import Pc from './pc.svg'
import './App.css';

function App() {
  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      quotes: [], 
      quote: {text: "", author: ""},
      loaded: false
    }
  );

  useEffect(() => {
    fetch('https://type.fit/api/quotes')
    .then(resp => resp.json())
    // .then(json => setQuotes(json))
    .then(json => setState({quotes: json}))
    return () => {
      // setQuotes([]);
      // setQuote("");
      setState({
        quotes: [], 
        quote: ""
      })
    }
  }, []);

  const getRandomQuote = () => {
    let randomIdx = Math.floor(Math.random() * (state.quotes.length + 1));
    setState({
      quote: state.quotes[randomIdx],
      loaded: true
    })
  }


  return (
    <div className="App">
      <Header getRandomQuote={getRandomQuote}/>
      <div className="pc_wrapper">
        <Quote quote={state.quote} loaded={state.loaded} />
        <img id="pcSvg" src={Pc} alt="pc"/>
        <button onClick={getRandomQuote}>get quote</button>
      </div>


      {/* <svg id="svgBg" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 700 700">
        <defs>
          <linearGradient gradientTransform="rotate(150, 0.5, 0.5)" x1="50%" y1="0%" x2="50%" y2="100%" id="ffflux-gradient">
            <stop stopColor="#0FD89C" stopOpacity="1" offset="0%"></stop>
            <stop stopColor="hsl(227, 100%, 50%)" stopOpacity="1" offset="100%"></stop>
          </linearGradient>
          <filter id="ffflux-filter" x="-20%" y="-20%" width="140%" height="140%" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feTurbulence type="fractalNoise" baseFrequency="0.005 0.003" numOctaves="1" seed="333" stitchTiles="stitch" x="0%" y="0%" width="100%" height="100%" result="turbulence"></feTurbulence>
            <feGaussianBlur stdDeviation="20 0" x="0%" y="0%" width="100%" height="100%" in="turbulence" edgeMode="duplicate" result="blur"></feGaussianBlur>
            <feBlend mode="color-dodge" x="0%" y="0%" width="100%" height="100%" in="SourceGraphic" in2="blur" result="blend"></feBlend>
          </filter>
        </defs>
        <rect width="700" height="700" fill="url(#ffflux-gradient)" filter="url(#ffflux-filter)"></rect>
      </svg> */}
    </div>
  );
}

export default App;
