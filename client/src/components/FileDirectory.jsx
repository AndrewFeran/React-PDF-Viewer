// FileDirectory.js
import { ACTIONS } from '../App';
import React, { useState, useEffect } from 'react';

function FileList({ files, dispatch }) {
  const [page, setPage] = useState(1);
  const [content, setContent] = useState();

  let display = 15;
  let maxPages = Math.ceil(files?.length / display);

  let floor = (page*display)-display;
  let ceil = (page*display)-1;

  let visibleContent = [];

  for (let i = floor; i <= ceil; i++) {
    visibleContent.push(files?.[i] ?? undefined);
  }

  if (content?.[0] !== visibleContent?.[0]) setContent(visibleContent);

  return (
    <div className="FileList">
      <div className="NavBar">

        <button id="prev" title="prev"
        onClick={() => { 
          if (page <= 1) return;
          setPage(page-1);
        }}
        >↶</button>

        <h3>Page {page}/{maxPages}</h3>

        <button className="Refresh" title="Refresh"
          onClick={() => dispatch({ type: ACTIONS.REFRESH_LESSONS,
            payload: 'none', dispatch: dispatch })}
        >
          Refresh
        </button>

        <button id="next" title="next"
        onClick={() => {
          if (page >= maxPages) return;
          setPage(page+1);
        }}
        >↷</button>

      </div>
      {content?.length > 0  ? (
          <ul className="Directory">
            {
              content.map(file => {
                if (!file) return null;
                return (
                  <a className="FileLink"
                    href={"http://localhost:4500/"+file?.file}
                    target="Viewer"
                    rel="noreferrer"
                    title={file?.name}
                  >
                    {file?.weight/10}.0 {file?.name}
                  </a>
                );
              })
            }
          </ul>
        ) : (
          <div className="Empty">There is nothing here yet...</div>
        )}
    </div>
  );
}

export default function FileDirectory({ dispatch, lessons }) {
  const [files, setFiles] = useState();

  useEffect(() => {
    if (lessons === 'Loading...') return;
    setFiles(lessons);
  }, [lessons]);

  return (
    <div className="Explorer">
      <FileList files={files} dispatch={dispatch} />
    </div>
  );
}