document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('measurementForm');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const gender = document.getElementById('gender').value;
        const age = parseInt(document.getElementById('age').value);
        const height = parseInt(document.getElementById('height').value);
        const weight = parseInt(document.getElementById('weight').value);
        if (!isNaN(age) && !isNaN(height) && !isNaN(weight)) {
            const result = calculateBalance(gender, age, height, weight);
            displayResult(result);
        } else {
            alert('Please enter valid age, height, and weight.');
        }
    });
});

function calculateBalance(gender, age, height, weight) {
    const idealWeight = calculateIdealWeight(gender, height);
    const bmi = calculateBMI(weight, height);
    let message = `Your balanced weight: ${idealWeight} kg.<br>`;
    if (weight === idealWeight) {
        message += "Congratulations! Your weight is balanced.";
    } else if (weight < idealWeight) {
        message += "You are underweight. Aim to reach your balanced weight.";
    } else {
        message += "You are overweight. Consider reducing your weight to reach balance.";
    }
    message += `<br>Your BMI: ${bmi.toFixed(2)} (${interpretBMI(bmi)})`;
    return message;
}

function calculateIdealWeight(gender, height) {
    if (gender === 'male') {
        return height - 100;
    } else if (gender === 'female') {
        return height - 110;
    }
}

function calculateBMI(weight, height) {
    const heightMeters = height / 100;
    return weight / (heightMeters * heightMeters);
}

function interpretBMI(bmi) {
    if (bmi < 18.5) {
        return "Underweight";
    } else if (bmi >= 18.5 && bmi < 25) {
        return "Normal weight";
    } else if (bmi >= 25 && bmi < 30) {
        return "Overweight";
    } else {
        return "Obese";
    }
}

function displayResult(message) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = message;
}
