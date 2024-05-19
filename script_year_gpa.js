document.addEventListener('DOMContentLoaded', function () {
    const gpaTable = {
        cp: [
            { min: 98.5, max: 1000000000, gpa: 4.3 },
            { min: 94.5, max: 98.5, gpa: 4.0 },
            { min: 92.5, max: 94.5, gpa: 3.7 },
            { min: 90.5, max: 92.5, gpa: 3.3 },
            { min: 86.5, max: 90.5, gpa: 3.0 },
            { min: 84.5, max: 86.5, gpa: 2.7 },
            { min: 82.5, max: 84.5, gpa: 2.3 },
            { min: 78.5, max: 82.5, gpa: 2.0 },
            { min: 76.5, max: 78.5, gpa: 1.7 },
            { min: 74.5, max: 76.5, gpa: 1.3 },
            { min: 71.5, max: 74.5, gpa: 1.0 },
            { min: 69.5, max: 71.5, gpa: 0.7 },
            { min: 0, max: 69.5, gpa: 0.0 }
        ],
        ap: [
            { min: 98.5, max: 1000000000, gpa: 5.3 },
            { min: 94.5, max: 98.5, gpa: 5.0 },
            { min: 92.5, max: 94.5, gpa: 4.7 },
            { min: 90.5, max: 92.5, gpa: 4.3 },
            { min: 86.5, max: 90.5, gpa: 4.0 },
            { min: 84.5, max: 86.5, gpa: 3.7 },
            { min: 82.5, max: 84.5, gpa: 3.3 },
            { min: 78.5, max: 82.5, gpa: 3.0 },
            { min: 76.5, max: 78.5, gpa: 2.7 },
            { min: 74.5, max: 76.5, gpa: 1.3 },
            { min: 71.5, max: 74.5, gpa: 1.0 },
            { min: 69.5, max: 71.5, gpa: 0.7 },
            { min: 0, max: 69.5, gpa: 0.0 }
        ],
        honors: [
            { min: 98.5, max: 1000000000, gpa: 4.8 },
            { min: 94.5, max: 98.5, gpa: 4.5 },
            { min: 92.5, max: 94.5, gpa: 4.2 },
            { min: 90.5, max: 92.5, gpa: 3.8 },
            { min: 86.5, max: 90.5, gpa: 3.5 },
            { min: 84.5, max: 86.5, gpa: 3.2 },
            { min: 82.5, max: 84.5, gpa: 2.8 },
            { min: 78.5, max: 82.5, gpa: 2.5 },
            { min: 76.5, max: 78.5, gpa: 2.2 },
            { min: 74.5, max: 76.5, gpa: 1.3 },
            { min: 71.5, max: 74.5, gpa: 1.0 },
            { min: 69.5, max: 71.5, gpa: 0.7 },
            { min: 0, max: 69.5, gpa: 0.0 }
        ]
    };

    function getGPA(classType, percentGrade) {
        const ranges = gpaTable[classType];
        for (let i = 0; i < ranges.length; i++) {
            if (percentGrade >= ranges[i].min && percentGrade <= ranges[i].max) {
                return ranges[i].gpa;
            }
        }
        return 0.0;
    }

    function calculateGPA(semesterIds) {
        let totalGPA = 0;
        let count = 0;
        for (let i of semesterIds) {
            const classTypeElement = document.getElementById(`classType${i}`);
            const gradeElement = document.getElementById(`grade${i}`);
            if (classTypeElement && gradeElement) {
                const classType = classTypeElement.value;
                const grade = parseFloat(gradeElement.value);
                if (!isNaN(grade)) {
                    const gpa = getGPA(classType, grade);
                    totalGPA += gpa;
                    count++;
                }
            }
        }
        return count > 0 ? (totalGPA / count).toFixed(2) : 0.00;
    }

    function updateGPAResult(averageGPA, resultElementId) {
        document.getElementById(resultElementId).textContent = `Average Year GPA: ${averageGPA}`;
    }

    function saveData() {
        for (let i = 1; i <= 36; i++) {
            const classTypeElement = document.getElementById(`classType${i}`);
            const gradeElement = document.getElementById(`grade${i}`);
            if (classTypeElement && gradeElement) {
                localStorage.setItem(`classType${i}`, classTypeElement.value);
                localStorage.setItem(`grade${i}`, gradeElement.value);
            }
        }
    }

    function loadData() {
        for (let i = 1; i <= 36; i++) {
            const classTypeElement = document.getElementById(`classType${i}`);
            const gradeElement = document.getElementById(`grade${i}`);
            if (classTypeElement && gradeElement) {
                const classType = localStorage.getItem(`classType${i}`);
                const grade = localStorage.getItem(`grade${i}`);
                if (classType !== null) classTypeElement.value = classType;
                if (grade !== null) gradeElement.value = grade;
            }
        }
    }

    function clearData() {
        for (let i = 1; i <= 36; i++) {
            localStorage.removeItem(`classType${i}`);
            localStorage.removeItem(`grade${i}`);
        }
    }

    document.getElementById('calculateButton1').addEventListener('click', function() {
        const averageGPA1 = calculateGPA([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]);
        updateGPAResult(averageGPA1, 'averageGPA');
        saveData();
    });

    document.getElementById('calculateButton2').addEventListener('click', function() {
        const averageGPA2 = calculateGPA([19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36]);
        updateGPAResult(averageGPA2, 'averageGPA');
        saveData();
    });

    document.getElementById('resetButton').addEventListener('click', function() {
        for (let i = 1; i <= 32; i++) {
            const classTypeElement = document.getElementById(`classType${i}`);
            const gradeElement = document.getElementById(`grade${i}`);
            if (classTypeElement) classTypeElement.value = 'cp';
            if (gradeElement) gradeElement.value = '';
        }
        document.getElementById('averageGPA').textContent = 'Average Year GPA: ';
        clearData();
    });

    loadData();
});
