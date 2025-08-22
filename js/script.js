
////////////////////////////////text/////////////////////////////
var typed = new Typed(".text", {
    strings: ["SOC Analyst", "Malware Analyst", "Reverse Engineer"],
    typeSpeed:100,
    backSpeed:100,
    backDelay:1000,
    loop:true 
});
////////////////////////////////text/////////////////////////////



////////////////////////////skills//////////////////////////////
const circles = document.querySelectorAll('.circle');
circles.forEach(elem => {
    var dots = elem.getAttribute("data-dots");
    var marked = elem.getAttribute("data-percent");
    var percent = Math.floor(dots * marked / 100);
    var points = "";
    var rotate = 360 / dots;

    for (let i = 0; i < dots; i++) {
        points += `<div class="points" style="--i:${i}; --rot:${rotate}deg"></div>`;
    }
    elem.innerHTML = points;
    const pointsMarked = elem.querySelectorAll('.points');
    for (let i = 0; i < percent; i++) {
        pointsMarked[i].classList.add('marked');
    }
});

////////////////////////////skills//////////////////////////////



////////////////////////go top///////////////////////////////
//////////////////////// this for go to top///////////////////////////////////
// Get the button
let mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
} 
////////////////////////go top///////////////////////////////





// Enhanced project filtering with single card fix
document.addEventListener("DOMContentLoaded", () => {
    const filterButtons = document.querySelectorAll(".project-filter-buttons .btn");
    const projects = document.querySelectorAll(".project-card");
    const projectsGrid = document.querySelector(".projects-grid");

    // Set first button as active by default
    filterButtons[0].classList.add('active');

    // Function to check and apply single card class
    function checkSingleCard() {
        const visibleProjects = document.querySelectorAll(".project-card:not(.hide)");
        
        if (visibleProjects.length === 1) {
            projectsGrid.classList.add('single-card');
        } else {
            projectsGrid.classList.remove('single-card');
        }
    }

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const filter = button.getAttribute("data-filter");

            projects.forEach(project => {
                if (filter === "all" || project.classList.contains(filter)) {
                    project.style.display = "block";
                    setTimeout(() => {
                        project.classList.remove("hide");
                        // Check for single card after transition
                        setTimeout(() => {
                            checkSingleCard();
                        }, 50);
                    }, 10);
                } else {
                    project.classList.add("hide");
                    setTimeout(() => {
                        if (project.classList.contains("hide")) {
                            project.style.display = "none";
                            // Check for single card after hiding
                            checkSingleCard();
                        }
                    }, 400); // Match the transition duration
                }
            });
        });
    });

    // Initial check on page load
    checkSingleCard();
});

// Alternative solution using CSS :has() detection
function supportsCSSHas() {
    try {
        return CSS.supports('selector(:has(a))');
    } catch (e) {
        return false;
    }
}

// If browser doesn't support :has(), use JavaScript fallback
if (!supportsCSSHas()) {
    console.log('Using JavaScript fallback for single card detection');
    // The above JavaScript will handle it
} else {
    console.log('Browser supports CSS :has() - using pure CSS solution');
}









    // Hamburger menu functionality
const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector('.navbar .menu');
const navbar = document.querySelector('.navbar');

hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
});

function toggleMenu() {
    menu.classList.toggle('active');
    const icon = hamburger.querySelector('i');
    if (menu.classList.contains('active')) {
        icon.classList.remove('bx-menu');
        icon.classList.add('bx-x');
        document.body.style.overflow = 'hidden';
    } else {
        icon.classList.remove('bx-x');
        icon.classList.add('bx-menu');
        document.body.style.overflow = 'auto';
    }
}

// Close menu when clicking on a link (mobile)
document.querySelectorAll('.menu li a').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768 && menu.classList.contains('active')) {
            menu.classList.remove('active');
            const icon = hamburger.querySelector('i');
            icon.classList.remove('bx-x');
            icon.classList.add('bx-menu');
            document.body.style.overflow = 'auto';
        }
    });
});

// Close menu when clicking outside (mobile)
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768 && 
        !navbar.contains(e.target) && 
        menu.classList.contains('active')) {
        menu.classList.remove('active');
        const icon = hamburger.querySelector('i');
        icon.classList.remove('bx-x');
        icon.classList.add('bx-menu');
        document.body.style.overflow = 'auto';
    }
});

// Handle window resize - close mobile menu if screen becomes large
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        menu.classList.remove('active');
        const icon = hamburger.querySelector('i');
        icon.classList.remove('bx-x');
        icon.classList.add('bx-menu');
        document.body.style.overflow = 'auto';
    }
});

// Smooth scrolling enhancement for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        
        if (target) {
            const navbarHeight = navbar.offsetHeight;
            const targetPosition = target.offsetTop - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Add active link highlighting based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar .menu li a[href^="#"]');
    
    let current = '';
    const navbarHeight = navbar.offsetHeight;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - navbarHeight - 50;
        const sectionHeight = section.offsetHeight;
        
        if (window.pageYOffset >= sectionTop && 
            window.pageYOffset < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Enhanced scroll performance
let ticking = false;

function updateOnScroll() {
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateOnScroll);
        ticking = true;
    }
});