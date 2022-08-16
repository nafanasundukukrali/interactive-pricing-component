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

        // Change list width
        // mainContainer.querySelector(".row:last-of-type div:first-of-type").classList.remove("col-6");
        // mainContainer.querySelector(".row:last-of-type div:first-of-type").classList.add("col-12");

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

        // Change list width
        // mainContainer.querySelector(".row:last-of-type div:first-of-type").classList.remove("col-12");
        // mainContainer.querySelector(".row:last-of-type div:first-of-type").classList.add("col-6");
    }

    // Check if logo need to be hidden

    // let logo = document.querySelector('.container:first-of-type .logo-wrap'); //.container:first-of-type .logo-wrap
    // let logoBottomPosition = logo.clientHeight + 5;
    // let mainContainerTopPosition = mainContainer.getBoundingClientRect().y;

    // console.log(logoBottomPosition);
    // console.log(mainContainerTopPosition);

    // if (mainContainerTopPosition - logoBottomPosition <= 0) {
    //     document.querySelector('svg').setAttribute('viewBox', `0 0 150 ${logo.clientHeight - Math.abs(mainContainerTopPosition - logoBottomPosition)}`);
    // } else {
    //     document.querySelector('svg').setAttribute('viewBox', `0 0 150 ${clientHeight}`)
    // }
}


// Range class and methonds for this oject

class Range {
    constructor () {
        this.rangeObject = document.querySelector(".form-range");
        this.viewsObject = document.querySelector(".pageviews-count");
        this.priceObject = document.querySelector('[data-type="price-value"]');
        this.checkBox = document.querySelector('.form-check-input');
        this.styleNew = document.createElement("style");
        this.styleNew.appendChild(document.createTextNode(""));
        document.head.appendChild(this.styleNew);

        this.viewsCostValue = {
            0: ["10K", 8],
            1: ["50K", 12],
            2: ["100K", 16],
            3: ["500K", 24],
            4: ["1M", 36],
        };
    }

    changeValuesData () {
        let actualValue = Math.round(this.rangeObject.value / 100), 
            coefficient = 1.00;

        this.rangeObject.value = actualValue * 100;

        if (this.checkBox.checked) {
            coefficient = 0.75;
        }

        this.viewsObject.innerHTML = `${this.viewsCostValue[actualValue][0]} Pageviews`;
        this.priceObject.innerHTML = `$${((this.viewsCostValue[actualValue][1]  + Number.EPSILON) * coefficient).toFixed(2)}`;

        if (!(window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1)) {
            if (this.styleNew.sheet.cssRules.length){
                this.styleNew.sheet.deleteRule(0);
            }
            
            this.styleNew.sheet.insertRule(`.form-range::-webkit-slider-runnable-track {background: linear-gradient(90deg, hsl(174, 77%, 80%) ${Math.round(+actualValue / 4 * 100)}%, hsl(224, 65%, 95%) ${Math.round(+actualValue / 4 * 100)}%);}`);
        }

        // localStorage.setItem("checkboxValue", String(this.checkBox.checked));
        // localStorage.setItem("rangeValue", actualValue);
    }

    // checkLocalStorage() {
    //     if (localStorage.getItem("checkboxValue") || localStorage.getItem("rangeValue")) {
    //         if (localStorage.getItem("checkboxValue")) {
    //             this.checkBox.checked = localStorage.getItem("checkboxValue") === "false" ? false : true;
    //         }

    //         this.changeValuesData(localStorage.getItem("rangeValue"));
    //     } else {
    //         this.changeValuesData();
    //     }
    // }

    initRange () {
        this.changeValuesData();
        this.rangeObject.addEventListener("change", this.changeValuesData.bind(this));
    }

    initCheckBox () {
        this.checkBox.addEventListener("change", this.changeValuesData.bind(this));
    }
}


window.addEventListener('DOMContentLoaded',  function () {
    'use strict';

    changeElementsPositionByScreen();

    let doit;

    window.addEventListener('resize', function () {
        clearTimeout(doit);
        doit = setTimeout(changeElementsPositionByScreen, 100);
    }, true);

    let range = new Range();
    range.initRange();
    range.initCheckBox();
});