function setActiveMenu(selectedMenu){
	console.log(selectedMenu)
	$(".navbar-nav li").removeClass("active")
	$(selectedMenu).addClass("active")
}