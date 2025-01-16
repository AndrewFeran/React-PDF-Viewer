import React, { useEffect, useReducer } from "react";
import axios from 'axios';

import './styles.scss'
import './card.scss'

import FileUpload from './components/FileUpload';
import FileDirectory from './components/FileDirectory';

export const ACTIONS = {
  REFRESH_LESSONS: 'refresh:Lessons',
  ASSIGN_LESSONS: 'assignLessons',
  ADD_LESSONS: 'addLessons',
  SET_PROGRESS: 'setProgress',
}

function reducer(state, { type, payload, dispatch }) {
  switch (type) {
    case ACTIONS.REFRESH_LESSONS:
      getLessons(dispatch, Math.floor(Math.random()*10000+1));
      return {
        ...state,
        lessons: 'Loading...',
        uuid: 0
      };
    case ACTIONS.ASSIGN_LESSONS:
      return{
        ...state,
        lessons: payload.entries,
        uuid: payload.uuid
      };
    case ACTIONS.ADD_LESSONS:
      uploadFile(payload, dispatch);
      return {
        ...state,
        progress: 0
      };
    case ACTIONS.SET_PROGRESS:
      return {
        ...state,
        progress: payload
      };
    default: return state;
  }
}

const getLessons = async (dispatch, myNum) => {
  let entries = await axios.post('http://localhost:4500/entries')
  .then(res => {
    return res.data.entries;
  })
  .catch(err => console.error('Error: ', err));

  return dispatch({ type: ACTIONS.ASSIGN_LESSONS, payload: { entries: entries, uuid: myNum } });
}

const uploadFile = async ({ file, name, weight }, dispatch) => {
  if (!file || !name || !weight) {
      alert('Cannot upload without:' +
      (!(file || undefined) ? ' File':'') +
      (!(name || undefined) ? ' Name':'') +
      (!(weight || undefined) ? ' Weight':'')
      );
      return;
  }
  const formData = new FormData();
  formData.append('file', file); // appending file
  formData.append('name', name); // appending name
  formData.append('weight', weight); // appending weight

  let upload = await axios.post('http://localhost:4500/upload', formData, {
    onUploadProgress: (ProgressEvent) => {
      let progress = Math.round(
      ProgressEvent.loaded / ProgressEvent.total * 100);
      dispatch({ type: ACTIONS.SET_PROGRESS, payload: progress });
    }
  })
  .then(res => {
    if (res.status === 200) {
      return true;
    }
    else {
      console.log('There was a problem uploading');
      return false;
    }
  })
  .catch(err => console.error('Error: ', err));
  
  return !upload || dispatch({ type: ACTIONS.REFRESH_LESSONS, dispatch: dispatch });
}

export default function App() {
  const [{ lessons, uuid, progress }, dispatch] = useReducer(reducer, {});

  useEffect(() => {
    dispatch({ type: ACTIONS.REFRESH_LESSONS, payload: 'none', dispatch: dispatch });
  }, []);

  return (
    <div className="App">

      <div className="Menu">
     
        <div className="Left">

          <h1>Music Appreciation</h1>

          <div className="card">
            <iframe className="Viewer" title="Viewer" name="Viewer"/>
            <span className="top"></span>
            <span className="right"></span>
            <span className="bottom"></span>
            <span className="left"></span>
          </div>

        </div>

        <div className="Right">
          
          <FileUpload dispatch={dispatch} status={progress} />

          <FileDirectory dispatch={dispatch} lessons={lessons} />

        </div>

      </div>

      <div className="Bottom"></div>
    </div>
  )
}