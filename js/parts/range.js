// Range class and methods for this oject

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
    }

    initRange () {
        this.changeValuesData();
        this.rangeObject.addEventListener("change", this.changeValuesData.bind(this));
    }

    initCheckBox () {
        this.checkBox.addEventListener("change", this.changeValuesData.bind(this));
    }
}

function initRangeAndCheckboxWatcher () {
    let range = new Range();
    range.initRange();
    range.initCheckBox();
}

module.exports(initRangeAndCheckboxWatcher);