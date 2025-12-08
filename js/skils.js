
async function loadSkillsData() {
    try {
        const response = await fetch('progressbar.json');
        const skillsData = await response.json();
        processData(skillsData);
    } catch (error) {
        console.log('Error loading data:', error);
    }
}

function processData(data) {
    const container = document.getElementById('skills-grid');
    
    for (const category in data) {
        // Buat section untuk setiap kategori
        const categorySection = document.createElement('div');
        categorySection.className = 'skill-category';
        categorySection.innerHTML = `<h3>${formatCategoryName(category)}</h3>`;

        const list = document.createElement('ul');

        
        for (const subCategory in data[category]) {
            const skill = data[category][subCategory];
            
            // Buat elemen untuk setiap skill
            const skillElement = createSkillElement(skill);
            list.appendChild(skillElement);
            categorySection.appendChild(list);
        }
        
        container.appendChild(categorySection);
    }
}

function createSkillElement(skill) {
    const skillDiv = document.createElement('div');

    skillDiv.innerHTML = `
        <li>
            <div class="skill_name">
                ${formatSkillName(skill.name)}
            </div>
            <progress value="${skill.point}" max="100"></progress>
        </li>
    `
    
    return skillDiv;
}

// Helper function untuk format nama
function formatCategoryName(category) {
    return category.split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

function formatSkillName(skillName) {
    return skillName.split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

// Jalankan function
loadSkillsData();