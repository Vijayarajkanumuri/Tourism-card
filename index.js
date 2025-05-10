// Sample data for tourism destinations
const destinations = [
    {
        id: 1,
        title: "Bali Island",
        location: "Indonesia",
        description: "Famous for its forested volcanic mountains, iconic rice paddies, beaches and coral reefs.",
        price: "$1200",
        image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        category: "beach"
    },
    {
        id: 2,
        title: "Swiss Alps",
        location: "Switzerland",
        description: "Experience breathtaking mountain views and world-class skiing in the heart of Europe.",
        price: "$1800",
        image: "https://www.muchbetteradventures.com/magazine/content/images/2019/07/10083602/iStock-499263804.jpg",
        category: "mountain"
    },
    
    {
        id: 3,
        title: "Tokyo City",
        location: "Japan",
        description: "A vibrant mix of traditional and modern, with neon-lit skyscrapers and historic temples.",
        price: "$1500",
        image: "https://content.r9cdn.net/rimg/dimg/ca/7e/9ae1c4b2-city-21033-16374d0645f.jpg?crop=true&width=1020&height=498",
        category: "city"
    },
    {
        id: 4,
        title: "Rome",
        location: "Italy",
        description: "The Eternal City with nearly 3,000 years of globally influential art, architecture and culture.",
        price: "$1100",
        image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        category: "historical"
    },
    {
        id: 5,
        title: "Santorini",
        location: "Greece",
        description: "Famous for its whitewashed houses, blue domes, and stunning sunsets over the Aegean Sea.",
        price: "$1400",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTT39nFyuNxjb41iIPyQ3BhiVBZvrjWouCG4w&s",
        category: "beach"
    },
    {
        id: 6,
        title: "Machu Picchu",
        location: "Peru",
        description: "The 15th-century Inca citadel set high in the Andes Mountains, known for its sophisticated dry-stone walls.",
        price: "$1600",
        image: "https://images.unsplash.com/photo-1526397751294-331021109fbd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        category: "historical"
    },
    {
        id: 7,
        title: "New York City",
        location: "USA",
        description: "The city that never sleeps, with iconic landmarks like Times Square and Central Park.",
        price: "$1300",
        image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        category: "city"
    },
    {
        id: 8,
        title: "Banff National Park",
        location: "Canada",
        description: "Canada's oldest national park, known for its turquoise lakes and dramatic mountain scenery.",
        price: "$1700",
        image: "https://images.unsplash.com/photo-1500581276021-a4bbcd0050c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        category: "mountain"
    }
];

// DOM elements
const cardsContainer = document.getElementById('cards-container');
const filterBtns = document.querySelectorAll('.filter-btn');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');

// Display all destinations on page load
document.addEventListener('DOMContentLoaded', () => {
    displayDestinations(destinations);
});

// Function to display destinations
function displayDestinations(destinationsToDisplay) {
    cardsContainer.innerHTML = '';
    
    destinationsToDisplay.forEach(destination => {
        const card = document.createElement('div');
        card.className = `card ${destination.category}`;
        card.innerHTML = `
            <img src="${destination.image}" alt="${destination.title}" class="card-img">
            <div class="card-content">
                <h3 class="card-title">${destination.title}</h3>
                <p class="card-location"><i class="fas fa-map-marker-alt"></i> ${destination.location}</p>
                <p class="card-description">${destination.description}</p>
                <div class="card-footer">
                    <span class="card-price">${destination.price}</span>
                    <button class="card-btn">Book Now</button>
                </div>
            </div>
        `;
        cardsContainer.appendChild(card);
    });
}

// Filter destinations by category
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        
        const filter = btn.dataset.filter;
        
        if (filter === 'all') {
            displayDestinations(destinations);
        } else {
            const filteredDestinations = destinations.filter(destination => destination.category === filter);
            displayDestinations(filteredDestinations);
        }
    });
});

// Search functionality
searchBtn.addEventListener('click', searchDestinations);
searchInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        searchDestinations();
    }
});

function searchDestinations() {
    const searchTerm = searchInput.value.toLowerCase();
    
    if (searchTerm.trim() === '') {
        displayDestinations(destinations);
        return;
    }
    
    const filteredDestinations = destinations.filter(destination => 
        destination.title.toLowerCase().includes(searchTerm) || 
        destination.location.toLowerCase().includes(searchTerm) ||
        destination.description.toLowerCase().includes(searchTerm)
    );
    
    displayDestinations(filteredDestinations);
}

// Add event listeners to all "Book Now" buttons (using event delegation)
cardsContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('card-btn')) {
        const card = e.target.closest('.card');
        const title = card.querySelector('.card-title').textContent;
        alert(`You've selected ${title}. Booking functionality would be implemented here.`);
    }
});