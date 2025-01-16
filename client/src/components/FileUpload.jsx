// FileUpload.js
import { ACTIONS } from '../App';
import React, { useState, useEffect, useRef } from 'react';

export default function FileUpload({ dispatch, status }) {
    const [file, setFile] = useState();
    const [full, setFull] = useState();
    const [name, setName] = useState();
    const [weight, setWeight] = useState();
    const [progress, setProgess] = useState(0);

    const el = useRef(); // accesing input element

    useEffect(() => {
        setProgess(status);
    }, [status]);

    const handleChangeFile = (e) => {
        setProgess(0);
        if (e.target.files[0]){
            setName(e.target.files[0].name.replaceAll('+', ' ').slice(21, -4));
            setFull(e.target.files[0].name)
        }
        else {
            setName('');
            setFull('')
        }
        setFile(e.target.files[0]);
    }
    const handleChangeNum = (e) => {
        setProgess(0);
        setWeight(e.target.value);
    }
    const handleChangeName = (e) => {
        setProgess(0);
        setName(e.target.value);
    } 

    return (
        <div className="FileUpload">
            <input className="FileForm" id="files"
                type="file" ref={el} onChange={handleChangeFile}
            />

            <label for="files">
                { full || "Select File" }
            </label>

            <input className='NameForm'
                type="text" ref={el} onChange={handleChangeName}
                placeholder={"Name"}
                value={name ?? ""}
            />
            <input className='WeightForm'
                type="number" ref={el} onChange={handleChangeNum}
                min="10"
                max="10000"
                step="10"
                placeholder="Weight"
            />
            <div className="ProgessBar" style={{ width: progress }}>
                <span>
                    Progress:{progress}
                </span>
            </div>
            <button className="Upload"
                onClick={() => dispatch({
                    type: ACTIONS.ADD_LESSONS,
                    payload: { file: file, name: name, weight: weight },
                    dispatch: dispatch
                })}
            >
                Upload
            </button>
        </div>
    );
}