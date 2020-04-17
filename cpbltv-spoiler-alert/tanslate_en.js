function translate_en() {

	var titles = document.getElementsByTagName('span');
	for (var i = 0; i < titles.length; i++) {
		var title = titles[i];
		if ("影音直播 一軍" == title.innerText) {
			title.innerText = "Major League";
		}

		if ("影音直播 二軍" == title.innerText) {
			title.innerText = "Minor League";
		}

		if ("完整賽事" == title.innerText) {
			title.innerText = "Playback";
		}
	}

	status_ori_text = [
		"尚未開戰"
	]

	status_rep_text = [
		"Not started"
	]

	replaceText("now blue", status_ori_text, status_rep_text);

	button_ori_text = [
		"一軍 Major",
		"二軍 Minor",
		"一軍",
		"二軍"
	];
	button_rep_text = [
		"Major League",
		"Minor League",
		"Major League",
		"Minor League"
	];
	replaceText("tab_gray_btn tab_gray_btn_focus", button_ori_text, button_rep_text);
	replaceText("tab_gray_btn", button_ori_text, button_rep_text);

	team_ori_texts = [
		"中信兄弟二軍",
		"兄弟二軍",
		"統一二軍",
		"富邦二軍",
		"樂天二軍",
		"統一7-ELEVEn",
		"統一",
		"中信兄弟",
		"兄弟",
		"富邦悍將",
		"樂天桃猿",
		"味全龍隊"
	];

	team_rep_texts = [
		"Brothers",
		"Brothers",
		"Lions",
		"Guardians",
		"Monkeys",
		"Lions",
		"Lions",
		"Brothers",
		"Brothers",
		"Guardians",
		"Monkeys",
		"Gragons"
	]
	replaceText("vs", team_ori_texts, team_rep_texts);
	replaceText("team", team_ori_texts, team_rep_texts);

	day_ori_texts = [
		"熱身賽",
		"例行賽",
		"日",
		"一",
		"二",
		"三",
		"四",
		"五",
		"六"
	];
	day_rep_texts = [
		"Training",
		"Regular",
		"Sun",
		"Mon",
		"Tue",
		"Wed",
		"Thu",
		"Fri",
		"Sat"
	];
	replaceText("day", day_ori_texts, day_rep_texts)

	venue_ori_text = [
		"洲際",
		"桃園",
		"新莊",
		"台南",
		"斗六",
		"園區",
		"嘉義縣",
		"澄清湖"
	]
	venue_rep_text = [
		"Taichung",
		"Taoyuan",
		"Xinzhuang",
		"Tainan",
		"Douliu",
		"CTBC",
		"Chiayi",
		"Chengcing Lake",

	]

	replaceText("stadium", venue_ori_text, venue_rep_text);

	shscores_ori_text = [
		"顯示/隱藏分數"
	]

	shscores_rep_text = [
		"Show/Hide Scores"
	]
	replaceText("shscores", shscores_ori_text, shscores_rep_text);
}

function replaceText(classNmae, ori_texts, rep_texts) {
	var class_items = document.getElementsByClassName(classNmae);
	for (var i = 0; i < class_items.length; i++) {
		var class_item = class_items.item(i);

		for (var j = 0; j < ori_texts.length; j++) {
			class_item.innerHTML = class_item.innerHTML.replace(ori_texts[j], rep_texts[j]);
		}
	}
}
