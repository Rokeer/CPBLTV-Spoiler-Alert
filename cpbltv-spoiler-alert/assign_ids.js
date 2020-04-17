function assign_ids() {
	var scores = document.getElementsByClassName("score");
	for (var i = 0; i < scores.length; i++) {
		var score = scores.item(i);
		score.id = "score_" + i;
	}

	var tbl = document.getElementsByClassName('vod_table'); // table reference
	if (tbl.length > 0) {
		tbl = tbl.item(0);

		for (var i = 0; i < tbl.rows.length; i++) {
			var row = tbl.rows[i];
			if (i == 0) {
				var th = document.createElement('th');
				th.innerHTML = "<div class=\"shscores\">顯示/隱藏分數</div><label class=\"switch\"><input id=\"switch_all\" type=\"checkbox\"><span class=\"slider round\"></span></label>";
				row.appendChild(th);
				var toggle = document.getElementById("switch_all");
				toggle.onclick = function(){toggleAll()};
			} else {
				createCell(tbl.rows[i].insertCell(tbl.rows[i].cells.length), i-1, 'stadium');
			}
		}
	}
}

function createCell(cell, id, style) {
	cell.setAttribute('class', style);
	cell.innerHTML = "<label class=\"switch\"><input id=\"switch_" + id + "\" type=\"checkbox\"><span class=\"slider round\"></span></label>";
	var toggle = document.getElementById("switch_" + id);
	toggle.onclick = function(){toggleSwitch(id)};
}

function toggleAll() {
	var scores = document.getElementsByClassName("score");
	for (var i = 0; i < scores.length; i++) {
		var score = scores.item(i);
		if (document.getElementById("switch_all").checked) {
			score.setAttribute("style", "visibility: visible;");
			document.getElementById("switch_" + i).checked = true;
		} else {
			score.setAttribute("style", "visibility: hidden;");
			document.getElementById("switch_" + i).checked = false;
		}
	}
}

function toggleSwitch(id) {
	var score = document.getElementById("score_" + id);
	if (document.getElementById("switch_" + id).checked) {
		score.setAttribute("style", "visibility: visible;");
	} else {
		score.setAttribute("style", "visibility: hidden;");
	}
	
}