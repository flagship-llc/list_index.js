// list_index.js 1.0.0
//  jQuery 1.3での動作確認
//  http://www.coneco.net/widget/indexjs/list_index.html
//  
var arrInitialIndices = [];
var katakana2roman = {};
var hash50Indices = {};
//var timerSelectInitial = false;
//var timerSelectInitial2 = false;
var hashDefaultIndexLabel = {};
function createLinkIndexBox(group_id,panel_id,panel_list_id){
	if($("#"+panel_id).size()==0){
		return false;
	}

	if(arrInitialIndices.length == 0){

		katakana2roman = {
		  'ア':'a',  'イ':'i',  'ウ':'u',  'エ':'e',  'オ':'o',
		  'カ':'ka', 'キ':'ki', 'ク':'ku', 'ケ':'ke', 'コ':'ko',
		  'サ':'sa', 'シ':'si', 'ス':'su', 'セ':'se', 'ソ':'so',
		  'タ':'ta', 'チ':'ti', 'ツ':'tu', 'テ':'te', 'ト':'to',
		  'ナ':'na', 'ニ':'ni', 'ヌ':'nu', 'ネ':'ne', 'ノ':'no',
		  'ハ':'ha', 'ヒ':'hi', 'フ':'hu', 'ヘ':'he', 'ホ':'ho',
		  'マ':'ma', 'ミ':'mi', 'ム':'mu', 'メ':'me', 'モ':'mo',
		  'ヤ':'ya', 'ユ':'yu', 'ヨ':'yo',
		  'ラ':'ra', 'リ':'ri', 'ル':'ru', 'レ':'re', 'ロ':'ro',
		  'ワ':'wa', 'ヲ':'wo', 'ン':'n'
		};

		hash50Indices = {
			 'ア':['ア','イ','ウ','エ','オ','','','ヴ','','']
			,'カ':['カ','キ','ク','ケ','コ','ガ','ギ','グ','ゲ','ゴ']
			,'サ':['サ','シ','ス','セ','ソ','ザ','ジ','ズ','ゼ','ゾ','','','ヅ','','']
			,'タ':['タ','チ','ツ','テ','ト','ダ','ヂ','ヅ','デ','ド','','','ズ','','']
			,'ナ':['ナ','ニ','ヌ','ネ','ノ']
			,'ハ':['ハ','ヒ','フ','ヘ','ホ','バ','ビ','ブ','ベ','ボ','パ','ピ','プ','ペ','ポ','ヴァ','ヴィ','ヴ','ヴェ','ヴォ']
			,'マ':['マ','ミ','ム','メ','モ']
			,'ヤ':['ヤ','ユ','ヨ']
			,'ラ':['ラ','リ','ル','レ','ロ']
			,'ワ':['ワ','ヲ','ン']
		};

		for(key in hash50Indices){
			arrInitialIndices.push(key);
		}

	}

	var arr = [];
	arr.push("<div class='initials' id='"+group_id+"_initials'>");
	arr.push("<ul class='initialIdxs'>");
	if(hashDefaultIndexLabel[group_id]){
		arr.push("<li class='initialIdx itemexistsTrue initialIdxDef currentIdx'>" + hashDefaultIndexLabel[group_id] + "</li>");
	}
	var strInitial = "";
	for(var i=0;i<arrInitialIndices.length;i++){
		arr.push("<li class='initialIdx'>"+arrInitialIndices[i]+"</li>");
		strInitial += "<ul class='initialRow initialRow-"+katakana2roman[arrInitialIndices[i]]+"'>";
		var arrRow = hash50Indices[arrInitialIndices[i]];
		for(var j=0;j<Math.min(arrRow.length,5);j++){
			strInitial += "<li class='initial'>"+arrRow[j]+"</li>";
		}
		strInitial += "</ul>\n";
	}
	arr.push("</ul>");
	arr.push("<div class='initial50'>");
	arr.push(strInitial);
	arr.push("</div>");
	arr.push("</div>");
//	var res = "<div class='item_result_area'>(<span class='item_result_count'></span>/<span class='item_all_count'></span>)</div>";
	$("#"+panel_id).append(""+arr.join("\n"));
//	if($(".initialIdxDef",$("#"+panel_id)).size()>0){
//		$("#"+panel_id+" .initial50").css("float","right");
//	}
	//50音イベント設定
	$(".initial",$("#"+panel_id+" .initial50")
	).click(
		function(){
//			if(timerSelectInitial2){
//				clearTimeout(timerSelectInitial2);
//			}
			(function(iid,pid,gid,obj){
				if($(obj).hasClass("itemexistsTrue")){
					selectSSInitial($(".item_part_box:visible",$("#"+pid)),"ini_"+katakana2roman[$(obj).text()],false,obj,gid,iid);
				}
			})(panel_id,panel_list_id,group_id,this);
		}
	).dblclick(
		function(){
//			if(timerSelectInitial2){
//				clearTimeout(timerSelectInitial2);
//			}
			(function(iid,pid,gid,obj){
				selectSSInitial($(".item_part_box:visible",$("#"+pid)),"ini_"+katakana2roman[$(obj).text()],false,obj,gid,iid);
			})(panel_id,panel_list_id,group_id,this);
		}
	);

	$(".item_list",$("#"+panel_list_id)).addClass("item_part_def");

	return true;
}

function selectSSInitialBox(Idx,obj,gid,iid,pid){
//	if(timerSelectInitial){
//		clearTimeout(timerSelectInitial);
//	}
	var $initials = $("#"+iid);
	$(".initialIdx",$initials).removeClass("currentIdx");
	$(obj).addClass("currentIdx");
	$(".initialRow:visible",$(obj).parent().next()).hide(0);
	$(".initialRow:contains('"+Idx+"')",$(obj).parent().next()).show(0);

	$(".item_list:visible",$("#"+pid)).hide(0);
	$(".item_result_count",$("#"+iid)).text(obj.title.replace(/[^\d]/g,""));
	if(String(katakana2roman[Idx]) != "undefined"){
		$("#"+gid+"_part_"+katakana2roman[Idx]).show(0).find("li").show(0);
		$(".initialRow-"+katakana2roman[Idx]+" .itemexistsTrue",$initials).addClass("currentInitail");
	} else {
		$(".item_part_def",$("#"+pid)).show(0);
	}
}
function selectSSInitial($ul,ini,blnAll,objLabel,gid,panel_id){
//	if(timerSelectInitial2){
//		clearTimeout(timerSelectInitial2);
//	}
	var $initials = $("#"+gid+"_initials");
	var $title = $("#"+panel_id);
	if(blnAll){
		$("li",$ul).show(0
			,function(){
				$(".item_result_count",$title).text($("li",$ul).size());
			}
		);
		return;
	}

	$(".initial.currentInitail",$initials).removeClass("currentInitail");
	$(objLabel).addClass("currentInitail");
	$("li:visible",$ul).hide(0);
	$(".item_result_count",$title).text("0");
	$("li."+ini,$ul).show(0
		,function(){
			$(".item_result_count",$title).text(objLabel.title.replace(/[^\d]/g,""));
		}
	);
}

//JSON形式のタグリストから絞込み用BOXを生成
function addListItems(group_id,idx_id,panel_id,data){
	var $tagbox = $("#"+panel_id);
//	var $initials = $("#"+group_id+"_initials");
	var $indexies = $("#"+idx_id);
	var len = data.length;
	var hashIdxCnt = {};
	var hashRows = {};
data.sort(
	function(a,b){
		if(a.japanese_index == b.japanese_index){
			return (a.name > b.name);
		}
		return (a.japanese_index > b.japanese_index);
	}
);
	for(var i=0;i<arrInitialIndices.length;i++){
		hashRows[katakana2roman[arrInitialIndices[i]]] = [];
		hashIdxCnt[i] = 0;
	}
	$(".item_all_count",$("#"+idx_id)).text(arrInitialIndices.length);
	for(var i=0;i<arrInitialIndices.length;i++){
		var arrRow = hash50Indices[arrInitialIndices[i]];
		var jLen = arrRow.length;
		for(var j=0;j<jLen;j++){
			var cnt = 0;
			if(arrRow[j]==""){
				continue;
			}
			for(var k=0;k<len;k++){
				if(String(data[k]) == "undefined"){
					continue;
				}
				if(data[k].url != "" && $("a[href='"+data[k].url+"']",$("#"+panel_id)).size() > 0){
					continue;
				}
				var strTag = data[k].japanese_index;
				if(strTag.indexOf(arrRow[j]) == 0){
					if(arrInitialIndices[i] == 'ハ' && arrRow[j] == "ヴ"){
						if(strTag.indexOf("ヴァ") == 0
							|| strTag.indexOf("ヴィ") == 0
							|| strTag.indexOf("ヴェ") == 0
							|| strTag.indexOf("ヴォ") == 0){
							continue;
						}
					}
					var strClassSel = "";
					if(data[k].selected){
						strClassSel = "selected";
					}
					var arrItemStr = [];
					arrItemStr.push("<li class='ini_no_"+(j%5)+" ini_"+katakana2roman[arrRow[j%5]]+" gyou_"+katakana2roman[arrInitialIndices[i]]+" "+strClassSel+"'>");
					arrItemStr.push("<a title='"+data[k].japanese_index+"' href='"+data[k].url+"'>");
					arrItemStr.push(data[k].name);
					arrItemStr.push('</a>');
					arrItemStr.push('</li>');
					hashRows[katakana2roman[arrInitialIndices[i]]].push(arrItemStr.join("\n"));
				}
			}
		}
//		//japanese_index基準でソート
//		hashRows[katakana2roman[arrInitialIndices[i]]].sort();
	}
	var allCnt = 0;
	for(var i=0;i<arrInitialIndices.length;i++){
		
		//行ごとのBOXを作成
		if($("#"+group_id+"_part_"+katakana2roman[arrInitialIndices[i]]).size() == 0){
			createInitialPartDiv(group_id,panel_id,katakana2roman[arrInitialIndices[i]]);
		}
		$("#"+group_id+"_part_"+katakana2roman[arrInitialIndices[i]]).append(hashRows[katakana2roman[arrInitialIndices[i]]].join("\n"));

		var arrRow = hash50Indices[arrInitialIndices[i]];
		for(var j=0;j<5;j++){
			if(String(arrRow[j]) != "undefined"){
				var intSize = $("li.ini_"+katakana2roman[arrRow[j]],$("#"+panel_id)).size();
				hashIdxCnt[i]+=intSize;
				var strClass = (intSize>0)?"itemexistsTrue":"itemexistsFalse";
				$(".initial:contains('"+arrRow[j]+"')",$indexies).removeClass("itemexistsFalse").addClass(strClass).attr("title",intSize+"件");
			}
		}

		allCnt += hashIdxCnt[i];
		var strClass = (hashIdxCnt[i]>0)?"itemexistsTrue":"itemexistsFalse";

		$(".initialIdx:contains('"+arrInitialIndices[i]+"')",$indexies).removeClass("itemexistsFalse").addClass(strClass).attr("title",hashIdxCnt[i]+"件");

	}
	var intDefCnt = $(".item_part_def li",$("#"+panel_id)).size();

	$(".item_all_count",$indexies).text(Math.max(allCnt,intDefCnt));
	$(".item_result_count",$indexies).text(intDefCnt);
	$(".initialIdxDef",$indexies).attr("title",intDefCnt+"件");

}

function createInitialPartDiv(gid,pid,ridx){
	var $tagbox = $("#"+pid);

	var part_part_box = "<ul id='"+gid+"_part_"+ridx+"' class='item_part_box item_list'>";
	part_part_box += "</ul>";
	$tagbox.append(part_part_box);
}
function addListIndexEvent(group_id,index_id,panel_id){
	//行イベント設定
	$(".initialIdx",$("#"+index_id)
	).click(
		function(){
			var Idx = $(this).text();
			if(Idx == hashDefaultIndexLabel[group_id]){
				(function(gid,iid,pid,obj){
					selectSSInitialBox(Idx,obj,gid,iid,pid);
				})(group_id,index_id,panel_id,this);
				return true;
			} else {
				(function(gid,iid,pid,obj){
					if($(obj).hasClass("itemexistsTrue")){
						selectSSInitialBox(Idx,obj,gid,iid,pid);
					}
				})(group_id,index_id,panel_id,this);
			}
			return false;
		}
	).mouseout(
		function(){
//			if(timerSelectInitial){
//				clearTimeout(timerSelectInitial);
//			}
		}
	).mousedown(
		function(){
			return false;
		}
	);
}
function createListIndexies(id,panel_idx,panel_lst,data,strDefListLabel){
	if(strDefListLabel){
		hashDefaultIndexLabel[id] = strDefListLabel;
	}
	if(createLinkIndexBox(id,panel_idx,panel_lst)){
		if(data){
			addListItems(id,panel_idx,panel_lst,data);
		}
		addListIndexEvent(id,panel_idx,panel_lst);

		$(".initialIdxs .itemexistsTrue:first",$("#"+panel_idx)).click();
	}
}

