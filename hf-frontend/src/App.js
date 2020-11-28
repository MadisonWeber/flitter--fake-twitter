import React, { useContext } from 'react';
import Auth from './components/Auth';
import { GlobalContext } from './context/globalContext';
import Home from './components/Home';
import UploadPic from './components/UploadPic';
import "./css/App.css"
import Comment from './components/Comment'


function App() {

  const { currentUser, uploadFileOpen, addCommentOpen } = useContext(GlobalContext)



  return (
    <div className="App">
      {!currentUser &&<Auth />}
      {currentUser && <Home /> }
      {currentUser && uploadFileOpen && <UploadPic />}
      {currentUser && addCommentOpen && <Comment />}
   
    </div>
  );
}

export default App;
