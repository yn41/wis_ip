// 하위 브라우저 호환
document.createElement("article");
document.createElement("section");
document.createElement("aside");
document.createElement("nav");
document.createElement("header");
document.createElement("footer");
document.createElement("main");

// IE 하위 브라우저에 .ie_old 클래스 추가 => 프로젝트에 따라 변경될 수 있습니다.
getInternetExplorerVersion();
function getInternetExplorerVersion() {
	var rv = -1; // Return value assumes failure.
	if (navigator.appName != "Microsoft Internet Explorer"){
		return;
	}
	else {
		var ua = navigator.userAgent;
		var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
		if (re.exec(ua) != null)
			rv = parseFloat(RegExp.$1);
	}
	if(rv < 11){ // IE브라우저 8버전 이하 시 ie_old 추가
		rv = 10;
		$("html").addClass("ie_old");
	}
	$("html").addClass("ie"+rv);
}

$(function(){ 
	//header 스크롤 올리면 보이고 내리면 사라지고
	let prevScrollpos = $(document).scrollTop();
	let scrollPosition = 0;
	$(window).on('scroll', function(){
		var currentScrollPos = $(document).scrollTop();
		if (prevScrollpos > currentScrollPos) {
			$(".header").removeClass("hidden");
		} else {
			$(".header").addClass("hidden").removeClass("open");
		}
		prevScrollpos = currentScrollPos;
	});
	$(".btn_clear").click(function(){
		$(this).prev().val("").focus();
	});
	//menu
	$(".btn_menu").click(function(){
		$(".header").addClass("open");
		scrollPosition = $(document).scrollTop();
		$("body").css({"overflow":"hidden", "top": (scrollPosition*-1)});
	});
	$(".btn_menu_close").click(function(){
		$(".header").removeClass("open");
		$("body").css({"overflow":"", "top":""});
		scrollPosition = 0;
	});
	
	for (var i =0; i < $(".bx_slct").length; i++) {
		var target = $(".bx_slct").eq(i);
		if($.trim(target.find(".slct_tit").text()) === "")
		target.find(".slct_tit").text(target.find(".slct_cont .select").text());
	}
	$(".slct_tit").on("click", function (e) {
		if($(this).parent().hasClass("dis") !== true){
			if($(this).parent().hasClass("on") === true) {
				$(this).parent().removeClass("on");
			}else {
				$(".bx_slct").removeClass("on");
				$(this).parent().addClass("on");
			}
		}
	});
	$(".slct_cont li").on("click", function(){
		$(this).parents(".bx_slct").find(".slct_tit").text($(this).text());
		$(this).parent().find("li").removeClass("select");
		$(this).addClass("select");
		$(this).parents(".bx_slct").removeClass("on");
	});
	$(document).on("click", function(e){
		if(e.target.className === "bx_slct" || e.target.className === "slct_tit" || e.target.className === "slct_cont") {return false;}
		$(".bx_slct").removeClass("on");
	});
});
// S | v:pat2 - gnb 반응형 대응
$(window).resize(function(){
	if($( window ).width() > 1003 && $(".header").hasClass("open")){
		$(".header").removeClass("open");
		$("body").css({"overflow":"", "top":""});
		scrollPosition = 0;
	}
});
// E | v:pat2 -  gnb 반응형 대응