const ageCalculator = () => {
    const inputDay = parseInt(document.getElementById("day").value, 10);
    const labelDay = document.querySelector('.label-day');
    const inputMonth = parseInt(document.getElementById("month").value, 10);
    const labelMonth = document.querySelector('.label-month');
    const inputYear = parseInt(document.getElementById("year").value, 10);
    const labelYear = document.querySelector('.label-year');

    const errorTextDay = document.querySelector('.error-text-day');
    const errorTextMonth = document.querySelector('.error-text-month');
    const errorTextYear = document.querySelector('.error-text-year');

    const errorInputDay = document.querySelector('.error-input-day');
    const errorInputMonth = document.querySelector('.error-input-month');
    const errorInputYear = document.querySelector('.error-input-year');

    // Obtenir la date actuelle
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // Janvier est 0
    const currentDay = currentDate.getDate();

    const testField = () => {
        let isValid = true;

        // Fonction pour vérifier et afficher les erreurs
        const checkField = (input, errorText, label, errorInput, min, max, errorMessage) => {
            if (input === '' || isNaN(input)) {
                errorText.textContent = "This field is required";
                isValid = false;
            } else if (input < min || input > max) {
                errorText.textContent = errorMessage;
                isValid = false;
            } else {
                errorText.textContent = "";
                errorText.classList.remove("error-text");
                label.classList.remove("label-error");
                errorInput.classList.remove("input-error");
                return;
            }
            errorText.classList.add("error-text");
            label.classList.add("label-error");
            errorInput.classList.add("input-error");
        };

        // Vérification du jour
        checkField(inputDay, errorTextDay, labelDay, errorInputDay, 1, 31, "Must be a valid day");

        // Vérification du mois
        checkField(inputMonth, errorTextMonth, labelMonth, errorInputMonth, 1, 12, "Must be a valid month");

        // Vérification de l'année
        checkField(inputYear, errorTextYear, labelYear, errorInputYear, 1, currentYear, "Must be in the past");

        return isValid;
    };

    if (testField()) {
        // Calculer l'âge
        let ageYears = currentYear - inputYear;
        let ageMonths = currentMonth - inputMonth;
        let ageDays = currentDay - inputDay;

        // Ajuster les mois et jours si nécessaire
        if (ageDays < 0) {
            ageMonths -= 1;
            const lastMonth = new Date(currentYear, currentMonth - 1, 0);
            ageDays += lastMonth.getDate();
        }

        if (ageMonths < 0) {
            ageYears -= 1;
            ageMonths += 12;
        }

        // Afficher les résultats
        document.querySelector(".result-days").textContent = ageDays;
        document.querySelector(".result-months").textContent = ageMonths;
        document.querySelector('.result-years').textContent = ageYears;
    }
};

const button = document.querySelector(".rond");
button.addEventListener('click', ageCalculator);