import React, { useState, useEffect } from 'react'
import { MdDone } from "react-icons/md";




export function AddLabelEdit({ label, updateLabel, removeLabel }) {
    const [labelName, setLabelName] = useState(label.title)
    const [colorChoose, setColorChoose] = useState(label.color)


    const colors = [
        '#61bd4f',
        '#f2d600',
        '#ff9e1a',
        '#eb5a46',
        '#c277e0',
        '#0279bf',
        '#52e898',
        '#ff78cb',
        '#334563',
        '#b3bac5',
    ]

    useEffect(() => {
    }, [])

    const onChooseColor = (color) => {
        if (color === colorChoose) {
            setColorChoose('')
        } else setColorChoose(color);
    }

    const onSaveUpdates = () => {
        const newLabel = {
            "id": label.id,
            "title": labelName,
            "color": colorChoose
        }
        updateLabel(newLabel)
    }
    const onRemoveLabel = () => {
        removeLabel(label)
    }

    return (
        <div className="add-label-preview">
            <div className="add-title">Name</div>
            <input className='input-name-label' type="text" required="" aria-required="true" value={labelName} onChange={e => setLabelName(e.target.value)}></input>

            <div className="add-title">Select color</div>
            <div className="color-palette">
                {colors.map((color, idx) =>
                    <div className="pick-color" key={idx} style={{ backgroundColor: color }} onClick={() => onChooseColor(color)}>
                        {colorChoose === color && <MdDone style={{ color: 'white' }} className='label-done' />}
                    </div>
                )}
            </div>
            <div className="btns-container">
                <button className='create-label-btn' onClick={onSaveUpdates}>Update</button>
                <button className='remove-label-btn' onClick={onRemoveLabel}>Remove</button>
            </div>
        </div>

    )
}
