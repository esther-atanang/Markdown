import React, { useRef } from 'react';
import { bin, doc, menu, save } from '../utils';
import { NAVBAR } from '../constants'
import { useEffect } from 'react';
const Navbar = ({ onClick, onDelete, currID, fileName, onSave, onChangeFileName }) => {
    //Find the height of the navbarrr
    return (
        <nav className="navbar">
        <div className="navbar__menu">
          <button onClick={onClick} className="btn navbar__menu-btn" type="button">
            <img className="icon navbar__menu-icon" src={menu} alt="Menu" />
          </button>
        </div>
      
        <div className="navbar__content">
          <div className="navbar__file-desc">
            <h1 className="logo">Markdown</h1> {/* Visible on desktop only */}
            <img src={doc} className="icon navbar__icon" alt="Document" />
      
            <div className="navbar__file-name-container">
              <p className="navbar__file-name-placeholder">Document Name</p>
              <input
                className="navbar__file-name"
                onChange={(e) => onChangeFileName(e, currID)}
                value={fileName}
              />
            </div>
          </div>
      
          <div className="navbar__btns">
            <button
              className="btn navbar__btn--delete"
              type="button"
              onClick={() => onDelete(currID)}
              disabled={currID === -1}
            >
              <img className="icon icon--hover navbar__btn-icon" src={bin} alt="Delete" />
            </button>
            <button
              className="btn btn--hover navbar__btn--save"
              onClick={onSave}
              type="button"
              disabled={currID === -1}
            >
              <img className="icon navbar__btn-icon" src={save} alt="Save" />
              <p>Save changes</p> {/* Visible on desktop and tablet */}
            </button>
          </div>
        </div>
      </nav>
      
    )
}

export default Navbar
