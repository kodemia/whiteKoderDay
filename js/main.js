function setActiveMenu(selectedMenu) {
    console.log(selectedMenu)
    var sectionUrl = $(selectedMenu).data("section-url")
    console.log(sectionUrl)
    $(".navbar-nav li").removeClass("active")
    $(selectedMenu).addClass("active")
    $(".main-wrapper").load(sectionUrl)
}