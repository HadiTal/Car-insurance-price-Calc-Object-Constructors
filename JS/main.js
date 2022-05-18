//==========================variables============================
//Variables

let errorStatus = false;

const html = new HTMUI();
const factor = new FactorProject();

//variable element
const tagSelectyear = document.getElementById("year");
const form = document.querySelector("form");
const tagSelectCar = document.getElementById("select");
const contianerResult = document.querySelector(".container-result");
const factorContainer = document.querySelector('.factor-container');
const containerFrom = document.querySelector('.container-form');
const nameCar = document.getElementById('neameCar');
const yearCreateCar = document.getElementById('yearCreate');
const typeBime = document.getElementById('typeBime');
const priceTotal = document.getElementById('piceElement');
const constinerSpinner = document.querySelector(".conatiner-spiner");
const btnClose = document.querySelector('.btn-close-tittle');
const yearElement = document.getElementById("year");


//========================eventListners=============================
//eventListner
eventLisyner();

function eventLisyner() {
    //Viewed twenty years ago when the browser loaded
    document.addEventListener("DOMContentLoaded", lodedIfo);

    //Execute the function when the submit button is clicked to calculate the insurance price
    form.addEventListener("submit", submitFrom);

    //Execute the function of closing the car insurance invoice summary form
    btnClose.addEventListener('click', closePopup)
}

//========================constructor function==========================
//Object

//constructor function For the project interface
function HTMUI() {}

//constructure function for car insurance price invoice
function FactorProject() {}


//constructor function To calculate car insurance
function CalculateBime(valueCarModel, valueYearCreate, valueTypeBime) {
    this.valueCarModel = valueCarModel;
    this.valueYearCreate = valueYearCreate;
    this.valueTypeBime = valueTypeBime;
}

//=========constructor function for the project interface(HTMUI)===========


//Produce this year up to twenty years ago in the show element of the year
HTMUI.prototype.displayYears = function() {
    const years = solarYear();
    const lastYears = years - 20;

    for (let i = years; i >= lastYears; i--) {
        const optionTah = document.createElement("option");
        optionTah.value = i;
        optionTah.innerText = i;
        tagSelectyear.appendChild(optionTah);
    }
};

//Error display function if fields are selected incorrectly
HTMUI.prototype.displayError = function(passageError) {
    //If the error message is not displayed, show it to the user
    if (errorStatus === false) {
        const divError = document.createElement("div");
        divError.classList = "error";
        divError.innerText = passageError;
        form.insertBefore(divError, document.querySelector(".content-car"));
        errorStatus = true;
    }

    //Hide error message after 3 seconds
    setTimeout(() => {
        const errorElement = document.querySelector(".error");
        errorElement.remove();
        errorStatus = false;
    }, 3000);
};

//Run the spinner display function to show us the invoice
HTMUI.prototype.displaySpinner = function() {

    constinerSpinner.classList.remove("hide-spiner");
    factorContainer.classList.add("continer-height-form-spinner");

    setTimeout(() => {

        constinerSpinner.classList.add("hide-spiner");
        factorContainer.classList.remove("continer-height-form-spinner");

    }, 3000);

}

//Show or hide items when the invoice is closed
HTMUI.prototype.statuesElementClosing = function() {
    factorContainer.classList.remove("display-factor-container");
    contianerResult.classList.remove("display-container-result");
    factorContainer.classList.add("hide-factor-container");
    contianerResult.classList.add("hide-container-result");
    containerFrom.classList.remove("hide-form-main");
}

//Default values of the elements when we return to the car insurance price calculation form
HTMUI.prototype.defaultValueElement = function() {

    //read value model car and  year create car

    const optionCar = (document.getElementById("select").value = "");

    const radio = document.querySelectorAll("input[name=bime]");

    if (radio[0].checked === true) {} else {
        radio[1].checked = false;
        radio[0].checked = true;
    }

    const firstIteam = yearElement.children[0].value;
    yearElement.innerText = firstIteam;

    //Execution of this year's production function up to twenty years ago
    html.displayYears();

}


//=====================fuctions for object calulateBime===============
//Car insurance calculation function
CalculateBime.prototype.calculatePriceBime = function(informationCar) {
    //Calculate car insurance price based on car model

    const BasicinsuranceValue = 2000000;
    const modelCar = informationCar.valueCarModel;

    const priceBimeModelCar = this.calcBimeModelCar(
        BasicinsuranceValue,
        modelCar
    );

    //Calculate year difference to calculate car insurance
    const nowYear = solarYear();
    const selectYear = informationCar.valueYearCreate;
    const calcYearDifference = this.calcYearDifference(nowYear, selectYear);

    //Calculate insurance based on the number of years the car has been insured
    const priceBimeYear = this.calcBimeBasedYears(
        calcYearDifference,
        priceBimeModelCar
    );

    //Calculate car insurance based on the type of insurance
    const priceTypeBime = this.calcBimeType(
        informationCar.valueTypeBime,
        priceBimeYear
    );

    return priceTypeBime

};

//The function of calculating the insurance price based on the car model
CalculateBime.prototype.calcBimeModelCar = function(
    BasicinsuranceValue,
    modelCar
) {
    let result;

    /*
      ModelPride (value=1)==>1.15
      ModelCar=>Optima (value=2)==>1.30
      ModelCar=>Porsche(value=3)==>1.80
       */

    switch (modelCar) {
        case "1":
            result = BasicinsuranceValue * 1.15;
            break;
        case "2":
            result = BasicinsuranceValue * 1.3;
            break;
        case "3":
            result = BasicinsuranceValue * 1.8;
            break;
    }

    return result;
};

//Year difference calculation function
CalculateBime.prototype.calcYearDifference = function(yearNow, SelctYear) {
    return yearNow - SelctYear;
};

//The function of calculating car insurance based on the number of years of insurance history
CalculateBime.prototype.calcBimeBasedYears = function(
    calcYearDifference,
    priceBimeModelCar
) {
    priceBimeModelCar =
        priceBimeModelCar - ((calcYearDifference * 3) / 100) * priceBimeModelCar;
    return priceBimeModelCar;
};

//Car insurance calculation function based on the type of insurance
CalculateBime.prototype.calcBimeType = function(typeBime, priceBasedYears) {
    /*
       basic insurance==>30%
       complete insurance==>50%
      */

    return typeBime == "basic" ?
        (priceTypeBime = priceBasedYears * 1.3) :
        (priceTypeBime = priceBasedYears * 1.5);
};

//===========================================================

//================functions for object FactorProjects========

//Display insurance calculation invoice
FactorProject.prototype.displayFactor = function(calcBime, info) {

    //Execute spinner display function
    html.displaySpinner();

    //Display invoice summary after three seconds
    setTimeout(() => {
        //Popup display  to show results
        this.displayPopup();

        //Show manufacturing series in car insurance price invoice
        yearCreateCar.innerText = calcBime.valueYearCreate

        //View the total cost of insurance paid
        priceTotal.innerText = info

        //Show car model name in invoice
        const nameModelCar = this.displayModelCar(calcBime.valueCarModel);
        nameCar.innerText = nameModelCar

        //Show the type of insurance in the invoice
        const nameBime = this.displayTypeBime(calcBime.valueTypeBime);
        typeBime.innerText = nameBime;

    }, 3000);

}

//Popup display function to show results
FactorProject.prototype.displayPopup = function() {
    containerFrom.classList.add('hide-form-main');
    factorContainer.classList.add('display-factor-container');
    contianerResult.classList.add('display-container-result');
    factorContainer.classList.remove('hide-factor-container');
    contianerResult.classList.remove('hide-container-result');
}

//Function to display car model name in invoice
FactorProject.prototype.displayModelCar = function(model) {
    let result;
    switch (model) {

        case '1':
            result = 'پراید';
            break;
        case '2':
            result = 'اپتیما';
            break;
        case '3':
            result = 'پورشه';
            break
    }
    return result
}

//Insurance type display function
FactorProject.prototype.displayTypeBime = function(nameBime) {
    return (nameBime == 'basic') ? 'ساده' : 'کامل';
}


//===============Typical functions for project parts========
//functions

//Execute the function of what should happen in the browser load
function lodedIfo() {
    //Show the construction series in the project
    html.displayYears();

    //Show or hide elements when loading
    elementLoad();
}

//Produce the year in solar form
function solarYear() {
    let today = new Date().toLocaleDateString("fa-IR");
    let year = today.slice(0, 4);
    let persianNumbers = [
            /۰/g,
            /۱/g,
            /۲/g,
            /۳/g,
            /۴/g,
            /۵/g,
            /۶/g,
            /۷/g,
            /۸/g,
            /۹/g,
        ],
        arabicNumbers = [
            /٠/g,
            /١/g,
            /٢/g,
            /٣/g,
            /٤/g,
            /٥/g,
            /٦/g,
            /٧/g,
            /٨/g,
            /٩/g,
        ],
        fixNumbers = function(str) {
            if (typeof str === "string") {
                for (var i = 0; i < 10; i++) {
                    str = str.replace(persianNumbers[i], i).replace(arabicNumbers[i], i);
                }
            }
            return str;
        };

    const resultYear = Number(fixNumbers(year));
    return resultYear;
}

//click submit form
function submitFrom(e) {
    const typeBime = document.querySelector("input[name=bime]:checked").value;

    e.preventDefault();

    //Display value of car models
    const valueCar = tagSelectCar.value;

    //Display value of car manufacturing series
    const valueYear = tagSelectyear.value;

    //Display value type Bime
    const valueBime = typeBime;

    if (valueCar == "" || valueYear == "" || valueBime === "") {
        html.displayError("کاربر گرامی : مقادیر فیلد ها را به درستی وارد کنید");
    } else {
        //Submit field values to the calcBime object to calculate car insurance price
        const calcBime = new CalculateBime(valueCar, valueYear, valueBime);

        //Call the car insurance calculation function and send the car information to it
        const priceTotal = calcBime.calculatePriceBime(calcBime);


        //Execute the invoice function to display the insurance invoice to the customer
        factor.displayFactor(calcBime, priceTotal);
    }
}


//Show elements, or do not display elements when the browser loads
function elementLoad() {
    factorContainer.classList.remove("display-factor-container");
    contianerResult.classList.remove("display-container-result");
    factorContainer.classList.add("hide-factor-container");
    contianerResult.classList.add("hide-container-result");
    containerFrom.classList.remove("hide-form-main");
    constinerSpinner.classList.add("hide-spiner");
    constinerSpinner.classList.add("hide-spiner");
    factorContainer.classList.remove("continer-height-form-spinner");
}

//Function closing function invoice summary
function closePopup(e) {

    //Execute the display function or not display elements when closing the invoice
    html.statuesElementClosing();

    //Execute the function to return the values of the elements to their default value
    html.defaultValueElement();

}