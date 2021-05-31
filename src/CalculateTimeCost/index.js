export default function calculateTimeCost(text, fileName, isEnglish, currentDate = new Date()) {
	let costUkrRus = 0.05,
		costUkrRusMin = 50,
		costEnglish = 0.12,
		costEnglishMin = 120,
		charPerHourUkrRus = 1333,
		charPerHourEnglish = 333,
		charPerHour = isEnglish ? charPerHourEnglish : charPerHourUkrRus,
		textLength = text.replace(/\s/g, '').length,
		hourOfWork = Math.max(Math.ceil((textLength / charPerHour) * 2) / 2 + 0.5, 1),
		resultCost = (textLength * (isEnglish ? costEnglish : costUkrRus)).toFixed(2);

	(function checkLanguage() {
		if (isEnglish && resultCost < costEnglishMin) {
			resultCost = costEnglishMin;
		} else if (resultCost < costUkrRusMin) {
			resultCost = costUkrRusMin;
		}
	})();

	(function checkFileType() {
		if (
			fileName.slice(fileName.lastIndexOf('.')) !== '.doc' &&
			fileName.slice(fileName.lastIndexOf('.')) !== '.dockx' &&
			fileName.slice(fileName.lastIndexOf('.')) !== '.rtf'
		) {
			resultCost = (resultCost * 1.2).toFixed(2);
			hourOfWork = Math.ceil(hourOfWork * 1.2);
		}
	})();

	if (hourOfWork >= 1) {
		(function getResultDate() {
			if (currentDate.getDay() < 6 && currentDate.getDay() !== 0 && hourOfWork > 0) {
				if (currentDate.getHours() < 19) {
					if (hourOfWork > 20 - (currentDate.getHours() + 1)) {
						hourOfWork -= 20 - (currentDate.getHours() + 1);
						currentDate.setHours(10, 0, 0);
						currentDate.setDate(currentDate.getDate() + 1);
						getResultDate();
					} else {
						currentDate.setHours(currentDate.getHours() + hourOfWork, (hourOfWork % 1) * 60);
						hourOfWork = 0;
					}
				} else {
					currentDate.setDate(currentDate.getDate() + 1);
					currentDate.setHours(10);
					currentDate.setMinutes(0);
					getResultDate();
				}
			} else if (hourOfWork > 0) {
				currentDate.setDate(currentDate.getDate() + 1);
				currentDate.setHours(10);
				currentDate.setMinutes(0);
				getResultDate();
			}
		})();
	}

	return {
		Cost: +resultCost,
		Date:
			(currentDate.getDate().toString().length === 2 ? currentDate.getDate() : '0' + currentDate.getDate()) +
			'.' +
			((currentDate.getMonth() + 1).toString().length === 2
				? currentDate.getMonth() + 1
				: '0' + (currentDate.getMonth() + 1)) +
			'.' +
			currentDate.getFullYear(),
		Time: (
			currentDate.getHours() +
			':' +
			(currentDate.getMinutes().toString().length === 2
				? currentDate.getMinutes()
				: '0' + currentDate.getMinutes())),
	};
}
