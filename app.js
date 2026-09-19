const dogs = [
    { name: "Max", breed: "Labrador Retriever", image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400" },
    { name: "Bella", breed: "Golden Retriever", image: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=400" },
    { name: "Charlie", breed: "Pastor Aleman", image: "https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=400" },
    { name: "Luna", breed: "Husky Siberiano", image: "https://images.unsplash.com/photo-1605568427561-40dd23c2acea?w=400" },
    { name: "Cooper", breed: "Bulldog Frances", image: "https://images.unsplash.com/photo-1583337130417-13104dec14c2?w=400" },
    { name: "Daisy", breed: "Beagle", image: "https://images.unsplash.com/photo-1505628346881-b72b27e84530?w=400" },
    { name: "Rocky", breed: "Rottweiler", image: "https://images.unsplash.com/photo-1567752881298-894bb81f9379?w=400" },
    { name: "Coco", breed: "Caniche", image: "https://images.unsplash.com/photo-1616149602028-20e3c9002f3e?w=400" },
    { name: "Bear", breed: "Chow Chow", image: "https://images.unsplash.com/photo-1535930749574-1399327ce78f?w=400" },
    { name: "Sadie", breed: "Dalmata", image: "https://images.unsplash.com/photo-1541599540903-216a46ab5b18?w=400" },
    { name: "Tucker", breed: "Border Collie", image: "https://images.unsplash.com/photo-1503256207526-0d5d80fa2f47?w=400" },
    { name: "Molly", breed: "Shiba Inu", image: "https://images.unsplash.com/photo-1587559070757-f72a388edbba?w=400" }
];

let currentIndex = 0;
let matches = [];
let startX = 0;
let currentX = 0;
let isDragging = false;

const card = document.getElementById('currentCard');
const dogImage = document.getElementById('dogImage');
const dogName = document.getElementById('dogName');
const dogBreed = document.getElementById('dogBreed');
const btnLike = document.getElementById('btnLike');
const btnNope = document.getElementById('btnNope');
const btnShowMatches = document.getElementById('btnShowMatches');
const matchesSection = document.getElementById('matchesSection');
const matchesList = document.getElementById('matchesList');
const matchCount = document.getElementById('matchCount');
const cardsContainer = document.getElementById('cardsContainer');

function loadDog() {
    if (currentIndex >= dogs.length) {
        cardsContainer.innerHTML = '<div class="no-cards">No hay mas perros!</div>';
        return;
    }
    const dog = dogs[currentIndex];
    dogImage.src = dog.image;
    dogName.textContent = dog.name;
    dogBreed.textContent = dog.breed;
    card.style.transform = '';
    card.style.opacity = '1';
}

function swipe(direction) {
    if (currentIndex >= dogs.length) return;
    card.classList.add(direction === 'left' ? 'swipe-left' : 'swipe-right');
    if (direction === 'right') {
        matches.push(dogs[currentIndex]);
        updateMatches();
    }
    setTimeout(() => {
        card.classList.remove('swipe-left', 'swipe-right');
        currentIndex++;
        loadDog();
    }, 300);
}

function updateMatches() {
    matchCount.textContent = matches.length;
    matchesList.innerHTML = matches.map(dog =>
        '<div class="match-item"><img src="' + dog.image + '" alt="' + dog.name + '"><span>' + dog.name + '</span></div>'
    ).join('');
}

function handleDragStart(e) {
    isDragging = true;
    startX = e.type === 'mousedown' ? e.clientX : e.touches[0].clientX;
    card.style.transition = 'none';
}

function handleDragMove(e) {
    if (!isDragging) return;
    currentX = e.type === 'mousemove' ? e.clientX : e.touches[0].clientX;
    const diff = currentX - startX;
    const rotation = diff * 0.1;
    card.style.transform = 'translateX(' + diff + 'px) rotate(' + rotation + 'deg)';
}

function handleDragEnd() {
    if (!isDragging) return;
    isDragging = false;
    card.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
    const diff = currentX - startX;
    if (diff > 100) {
        swipe('right');
    } else if (diff < -100) {
        swipe('left');
    } else {
        card.style.transform = '';
    }
}

card.addEventListener('mousedown', handleDragStart);
card.addEventListener('mousemove', handleDragMove);
card.addEventListener('mouseup', handleDragEnd);
card.addEventListener('mouseleave', handleDragEnd);

card.addEventListener('touchstart', handleDragStart);
card.addEventListener('touchmove', handleDragMove);
card.addEventListener('touchend', handleDragEnd);

btnLike.addEventListener('click', function() { swipe('right'); });
btnNope.addEventListener('click', function() { swipe('left'); });

btnShowMatches.addEventListener('click', function() {
    matchesSection.style.display = matchesSection.style.display === 'none' ? 'block' : 'none';
});

loadDog();
