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
		$(".logo").slideUp();
		$("body").css({"overflow":"", "top":""});
		scrollPosition = 0;
	});
});