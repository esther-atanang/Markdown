import React from 'react'
import { doc, sun, moon } from '../utils'

const Sidebar = ({ onSetTheme, isLight, notes, onCreateFile,onChangeFile }) => {
    return (
        <aside className='sidebar'>
            <div className='sidebar__container'>
                <div className='sidebar__name'>
                    <h1 className='sidebar__logo logo'>Markdown</h1>
                    <h2 className='sidebar__doc'>My Documents</h2>
                </div>
                <div className='sidebar__doc-items'>
                    <div><button className='btn sidebar__doc-btn btn--hover' onClick={onCreateFile}>+ New Document</button></div>
                    <div className='documents'>
                        {notes.map(note => {
                            return (
                                <div key={note.id} className='documents__doc-item'>
                                    <div className='documents__doc_Icon'>
                                        <img className='icon' src={doc} alt="file icon" />
                                    </div>
                                    <div className='documents__doc_detail'>
                                        <p className="documents__doc-item-date">{note.date}</p>
                                        <a href='#' onClick={() => onChangeFile(note.id)} className={note.currentFile ? "curr documents__doc-item-name" : "documents__doc-item-name"}>{note.fileName}</a>
                                    </div>
                                </div>
                            )
                        })}

                    </div>
                </div>
            </div>
            <div className={isLight ? 'sidebar__toggle light' : 'sidebar__toggle'}>
                <div id="darkmode"><img className='darkmode_icon' src={moon} alt='dark mode icon' /></div>
                {/* <button type='btn' onClick={onSetTheme} className='sidebar__toggle-switch'></button> */}
                    <input className='sidebar__toggle-switch' onClick={()=>onSetTheme(value=>!value)}  type="checkbox" />
                <div id='lightmode'><img className='lightmode_icon' src={sun} alt='light mode icon' /></div>
            </div>
        </aside>
    )
}

export default Sidebar;
