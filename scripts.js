document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Modal Handling
    const loginBtn = document.getElementById('loginBtn');
    const signupBtn = document.getElementById('signupBtn');
    const modals = document.querySelectorAll('.modal');
    const closeModalBtns = document.querySelectorAll('.close-modal');
    
    function openModal(modalId) {
        document.getElementById(modalId).style.display = 'flex';
    }
    
    function closeModals() {
        modals.forEach(modal => modal.style.display = 'none');
    }
    
    loginBtn.addEventListener('click', () => openModal('loginModal'));
    signupBtn.addEventListener('click', () => openModal('signupModal'));
    
    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', closeModals);
    });
    
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            closeModals();
        }
    });

    // Testimonial Slider
    let currentTestimonial = 0;
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.dot');
    
    function showTestimonial(index) {
        testimonials.forEach(testimonial => testimonial.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        testimonials[index].classList.add('active');
        dots[index].classList.add('active');
    }
    
    document.querySelector('.testimonial-next').addEventListener('click', () => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    });
    
    document.querySelector('.testimonial-prev').addEventListener('click', () => {
        currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
        showTestimonial(currentTestimonial);
    });
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentTestimonial = index;
            showTestimonial(index);
        });
    });

    // Scroll Animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.animate-on-scroll').forEach(element => {
        observer.observe(element);
    });

    // Category Filter
    const categoryTabs = document.querySelectorAll('.category-tab');
    const profilesGrid = document.querySelector('.profiles-grid');
    
    // Sample profiles data
    const profiles = [
        { category: 'contractors', name: 'John Construction', specialty: 'General Contractor', rating: 4.8 },
        { category: 'suppliers', name: 'Builders Depot', specialty: 'Material Supplier', rating: 4.5 },
        // Add more sample profiles
    ];
    
    function renderProfiles(category = 'all') {
        profilesGrid.innerHTML = '';
        const filtered = category === 'all' 
            ? profiles 
            : profiles.filter(profile => profile.category === category);
        
        filtered.forEach(profile => {
            const profileCard = document.createElement('div');
            profileCard.className = 'profile-card animate-on-scroll';
            profileCard.innerHTML = `
                <div class="profile-image">
                    <img src="https://via.placeholder.com/300" alt="${profile.name}">
                </div>
                <div class="profile-info">
                    <h3>${profile.name}</h3>
                    <div class="profile-rating">
                        ${'★'.repeat(Math.floor(profile.rating))}${'☆'.repeat(5 - Math.floor(profile.rating))}
                    </div>
                    <span class="profile-specialty">${profile.specialty}</span>
                </div>
            `;
            profilesGrid.appendChild(profileCard);
        });
    }
    
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            categoryTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            renderProfiles(tab.dataset.category);
        });
    });
    
    // Initial render
    renderProfiles();

    // Form Validations
    document.getElementById('loginForm').addEventListener('submit', (e) => {
        e.preventDefault();
        // Add login logic here
        alert('Login functionality coming soon!');
    });
    
    document.getElementById('signupForm').addEventListener('submit', (e) => {
        e.preventDefault();
        // Add signup logic here
        alert('Signup functionality coming soon!');
    });

    // Role Selection in Signup
    const roleButtons = document.querySelectorAll('.role-btn');
    const userRoleInput = document.getElementById('userRole');
    
    roleButtons.forEach(button => {
        button.addEventListener('click', () => {
            roleButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            userRoleInput.value = button.dataset.role;
        });
    });
});