import { getDatabase,ref,set } from "firebase/database"
import { app } from "./firebase";
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Authdemo from "./page/Authdemo";
import DemoTable from "./page/DemoTable"
import AddData from './page/AddData';
import Update from "./page/Update"

function App() {

  // const db= getDatabase(app)

  // const addData=()=>{
  //   set(ref(db,"user/ragistration"),{
  //     id:1,
  //     name:"kkeri",
  //     salary:30000
  //   })
  // }

  return (
    <div className="App">
      {/* <button className=""  onClick={addData}>add data</button> */}

      {/* create account with email and password */}

      {/* <Authdemo/> */}

     <Routes>
      <Route path="/" element={<DemoTable/>}/>
      <Route path="/add" element={<AddData/>}/>
      <Route path="/upadte/:id" element={<Update/>}/>
     </Routes>
      
    </div>
  );
}

export default App;
