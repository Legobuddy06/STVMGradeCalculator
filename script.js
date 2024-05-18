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
        console.log(`Getting GPA for classType: ${classType}, percentGrade: ${percentGrade}`);
        const ranges = gpaTable[classType];
        for (let i = 0; i < ranges.length; i++) {
            if (percentGrade >= ranges[i].min && percentGrade <= ranges[i].max) {
                console.log(`Matched range: ${ranges[i].min} - ${ranges[i].max}, GPA: ${ranges[i].gpa}`);
                return ranges[i].gpa;
            }
        }
        return 0.0;
    }

    function calculateGPA() {
        let totalGPA = 0;
        let count = 0;
        for (let i = 1; i <= 8; i++) {
            const classTypeElement = document.getElementById(`classType${i}`);
            const gradeElement = document.getElementById(`grade${i}`);
            if (classTypeElement && gradeElement) {
                const classType = classTypeElement.value;
                const grade = parseFloat(gradeElement.value);
                console.log(`ClassType${i}: ${classType}, Grade${i}: ${grade}`);
                if (!isNaN(grade)) {
                    const gpa = getGPA(classType, grade);
                    totalGPA += gpa;
                    count++;
                    console.log(`GPA${i}: ${gpa}, Total GPA: ${totalGPA}, Count: ${count}`);
                }
            } else {
                console.error(`Element with id classType${i} or grade${i} not found`);
            }
        }
        const averageGPA = count > 0 ? (totalGPA / count).toFixed(2) : 0.00;
        document.getElementById('averageGPA').textContent = `Average GPA: ${averageGPA}`;
        console.log(`Average GPA: ${averageGPA}`);
        saveData();
    }

    function saveData() {
        for (let i = 1; i <= 8; i++) {
            const classTypeElement = document.getElementById(`classType${i}`);
            const gradeElement = document.getElementById(`grade${i}`);
            if (classTypeElement && gradeElement) {
                localStorage.setItem(`classType${i}`, classTypeElement.value);
                localStorage.setItem(`grade${i}`, gradeElement.value);
            }
        }
    }

    function loadData() {
        for (let i = 1; i <= 8; i++) {
            const classTypeElement = document.getElementById(`classType${i}`);
            const gradeElement = document.getElementById(`grade${i}`);
            if (classTypeElement && gradeElement) {
                classTypeElement.value = localStorage.getItem(`classType${i}`) || 'cp';
                gradeElement.value = localStorage.getItem(`grade${i}`) || '';
            }
        }
    }

    function resetData() {
        for (let i = 1; i <= 8; i++) {
            const classTypeElement = document.getElementById(`classType${i}`);
            const gradeElement = document.getElementById(`grade${i}`);
            if (classTypeElement && gradeElement) {
                classTypeElement.value = 'cp';
                gradeElement.value = '';
                localStorage.removeItem(`classType${i}`);
                localStorage.removeItem(`grade${i}`);
            }
        }
        document.getElementById('averageGPA').textContent = 'Average GPA: ';
    }

    document.getElementById('calculateButton').addEventListener('click', calculateGPA);
    document.getElementById('resetButton').addEventListener('click', resetData);

    loadData();
});
