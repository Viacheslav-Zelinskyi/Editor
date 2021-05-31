import { useState, useEffect } from 'react';
import './App.css';
import { SelectInput, SimpleInput, TextareaInput } from './Components/input.js';
import calculateTimeCost from './CalculateTimeCost';

function App() {
	const [language, setLanguage] = useState(null);
	const [text, setText] = useState('');
	const [result, setResult] = useState({ Cost: 0 });
	const [filename, setFilename] = useState('.rtf');

	useEffect(() => {
		if (text.length > 0) {
			setResult(calculateTimeCost(text, filename, language === 'ua' || language === 'ru' ? false : true));
		}
	}, [text, language, filename]);

	return (
		<div className="App">
			<form className="form">
				<div className="formLeftPart">
					<h3 className="mediumTitle">Заказать редактирование</h3>
					<TextareaInput text={text} setFilename={setFilename} setText={setText} onChange={() => alert('lol')}></TextareaInput>
					<SimpleInput placeholder="Ваша эл.почта"></SimpleInput>
					<SimpleInput placeholder="Ваше имя"></SimpleInput>
					<SimpleInput placeholder="Коментарий к заказу или ссылка"></SimpleInput>
					<SelectInput setLanguage={setLanguage} language={language}></SelectInput>
				</div>
				<div className="formRightPart">
					<div className="submitContent">
						<div className="contentPrice">
							<div className="number">
								{text.length > 0 && language !== null ? result.Cost.toFixed(2) : 0}
							</div>
							<div className="currency">грн</div>
						</div>
						<div className="time">
							{text.length > 0 && language !== null
								? 'Дата сдачи: ' + result.Date + ' в ' + result.Time
								: null}
						</div>
						<button className="submitButton" disabled>
							Заказать
						</button>
					</div>
				</div>
			</form>
		</div>
	);
}

export default App;
