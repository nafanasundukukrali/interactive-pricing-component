function changeElementsPositionByScreen () {
    let mobile = 375,
        tablet = 1000,
        mainContainer = document.querySelector('.container:nth-of-type(2)');

    if (window.innerWidth <= tablet && mainContainer.querySelectorAll('.row').length == 4) {

        // Change result price position
        let priceInfo = Array.prototype.slice.call(mainContainer.querySelectorAll('.row:nth-of-type(1) *')).slice(1, 3);

        let newRowContainer = document.createElement('div');

        newRowContainer.classList.add("row");
        newRowContainer.classList.add("d-flex");
        newRowContainer.classList.add("justify-content-center");
        newRowContainer.classList.add("align-items-center");

        priceInfo[0].classList.remove("col-4");
        priceInfo[1].classList.remove("col-2");
        priceInfo[0].classList.add("pe-2");
        priceInfo[0].style.cssText = "text-align: right;";
        priceInfo[1].style.cssText = "text-align: left;";
        priceInfo.forEach(el => {el.classList.add("col-6"); newRowContainer.appendChild(el)});

        mainContainer.insertBefore(newRowContainer, mainContainer.querySelector(".row:nth-of-type(3)"));

        // Change button position
        mainContainer.querySelectorAll(".row:nth-of-type(5) .col-6").forEach(el => {el.classList.remove("col-6"); el.classList.add("row")});
    } else if (window.innerWidth > tablet && mainContainer.querySelectorAll('.row').length > 4) {
        let infoAboutPrice = Array.prototype.slice.call(mainContainer.querySelectorAll(".row:nth-of-type(3) *"));

        infoAboutPrice.forEach(el => {el.classList.remove("col-6");});
        infoAboutPrice[0].classList.add("col-4");
        infoAboutPrice[1].classList.add("col-2");

        infoAboutPrice.forEach(el => {mainContainer.querySelector(".row").appendChild(el)});

        mainContainer.removeChild(mainContainer.querySelector(".row:nth-of-type(3)"));

        mainContainer.querySelectorAll(".row:nth-of-type(4) .row").forEach(el => {el.classList.remove("row"); el.classList.add("col-6");});
    }
}

function checkScreenState () {
    changeElementsPositionByScreen();

    let doit;

    window.addEventListener('resize', function () {
        clearTimeout(doit);
        doit = setTimeout(changeElementsPositionByScreen, 100);
    }, true);
}

module.exports(checkScreenState);