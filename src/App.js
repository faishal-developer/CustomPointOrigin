import React,{useEffect} from "react";
import logo from './logo.svg';
import './scss/global.scss';
import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment } from "./Store/testSlice";
import CategorySkeleton from "./Components/skeleton/CategorySkeleton.view";
import SubCatSkeleton from "./Components/skeleton/subCatSkeleton.view";
import CardSkeleton from "./Components/skeleton/CardSkeleton.view";
import SProductImageSkeleton from "./Components/skeleton/SProductImageSkeleton.view";

function App() {
  const myTemporaryData = useSelector((state) => state.testSlice);
  const dispatch= useDispatch();
  return (
    <div className="black">
      {/* <div className='temporary'>
        <button onClick={()=>dispatch(increment())}>+</button>
        { }
        <button onClick={() => dispatch(decrement())}>-</button>
      </div>
      <div className='permanent'>
        <button>+</button>
        { myTemporaryData.value}
        <button>-</button>
      </div> */}
      <SProductImageSkeleton/>
    </div>
  );
}

export default App;
