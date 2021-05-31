import './input.css';
import arrowIcon from '../Icons/downArrow.png';
import { useState, useRef } from 'react';

export function TextareaInput({ text, setText, setFilename }) {
	const [file, setFile] = useState(false);
	const inputFile = useRef(null);
	return (
		<div>
			<textarea
				className="textarea"
				onChange={(event) => setText(event.target.value)}
				disabled={file !== false ? true : false}
			></textarea>
			{file === false ? null : (
				<p className="uploadSuccess">
					Файл загружен <br />
					Количество символов: {text.replace(/\s/g, '').length}
				</p>
			)}
			{text === '' && file === false ? (
				<div className="textareaPlaceholder">
					Вставьте текст или{' '}
					<span className="linkUpload" onClick={() => inputFile.current.click()}>
						загрузите файл
					</span>
					<input
						type="file"
						ref={inputFile}
						className="uploadFile"
						accept=".doc, .docx, .rtf, .txt, .pdf"
						onChange={(event) => fileRead(event, setText, setFile, setFilename)}
					></input>
				</div>
			) : null}
		</div>
	);
}

export function SimpleInput({ placeholder }) {
	return <input placeholder={placeholder} className="simpleInput"></input>;
}

export function SelectInput({ setLanguage, language }) {
	const [open, setOpen] = useState(false);
	return (
		<div>
			<fieldset
				className={open === false ? 'selectInput' : 'selectInputOpened'}
				id="language"
				onClick={() => setOpen(!open)}
			>
				{language == null ? (
					<p className="languagePlaceholder">Язык</p>
				) : (
					<label className="languageSelected">
						{language === 'ua' ? 'Украинский' : null}
						{language === 'ru' ? 'Русский' : null}
						{language === 'us' ? 'Английский' : null}
					</label>
				)}
				<img src={arrowIcon} width="10px" alt="arrow" className={open ? 'arrowIconOpen' : 'arrowIcon'}></img>
			</fieldset>
			{open ? (
				<div className="selectList">
					<div
						className="listItem"
						onClick={() => {
							setLanguage('ua');
							setOpen(false);
						}}
					>
						Украинский
					</div>
					<div
						className="listItem"
						onClick={() => {
							setLanguage('ru');
							setOpen(false);
						}}
					>
						Русский
					</div>
					<div
						className="listItem"
						onClick={() => {
							setLanguage('us');
							setOpen(false);
						}}
					>
						Английский
					</div>
				</div>
			) : null}
		</div>
	);
}

function fileRead(event, setText, setFile, setFilename) {
	var file = event.target.files[0];
	var reader = new FileReader();
	setFilename(file.name);
	if (
		file.name.slice(file.name.lastIndexOf('.')) === '.rtf' ||
		file.name.slice(file.name.lastIndexOf('.')) === '.txt'
	) {
		reader.onload = function (event) {
			setText(event.target.result);
			setFile(true);
		};
	}
	if (file.name.slice(file.name.lastIndexOf('.')) === '.pdf') {
		reader.onload = function (event) {
			console.log(event.target.result);
		};
	}

	reader.readAsText(file);
}
