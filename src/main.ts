import './style.css'

// Navigation functionality
const navToggle = document.getElementById('nav-toggle')
const navMenu = document.getElementById('nav-menu')

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active')
    navToggle.classList.toggle('active')
  })

  // Close mobile menu when clicking on links
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active')
      navToggle.classList.remove('active')
    })
  })

  // Add scroll effect to navigation
  window.addEventListener('scroll', () => {
    const nav = document.querySelector('.nav')
    if (nav) {
      if (window.scrollY > 100) {
        nav.classList.add('scrolled')
      } else {
        nav.classList.remove('scrolled')
      }
    }
  })
}

// Smooth scrolling
function scrollToSection(sectionId: string) {
  const element = document.getElementById(sectionId)
  element?.scrollIntoView({ behavior: 'smooth' })
}

// Project modal functionality
function openProjectModal(projectId: string) {
  const modal = document.getElementById('project-modal')
  const modalBody = document.getElementById('modal-body')
  
  const projects: Record<string, any> = {
    sudoku: {
      title: 'Sudoku Game',
      description: 'A responsive Sudoku application built with vanilla JavaScript and TailwindCSS. Features include difficulty levels, timer, hints, and a clean, intuitive interface.',
      tech: ['JavaScript', 'TailwindCSS', 'HTML5', 'CSS3'],
      features: ['Multiple difficulty levels', 'Timer functionality', 'Hint system', 'Responsive design', 'Clean UI/UX'],
      links: {
        github: 'https://github.com/vinay/sudoku',
        demo: 'https://vinay-sudoku.netlify.app'
      }
    },
    minesweeper: {
      title: 'Minesweeper',
      description: 'A modern take on the classic Minesweeper game built with React. Features include customizable board sizes, difficulty levels, and a sleek interface.',
      tech: ['React', 'JavaScript', 'CSS3', 'HTML5'],
      features: ['Customizable board sizes', 'Multiple difficulty levels', 'Modern UI design', 'Responsive layout', 'Smooth animations'],
      links: {
        github: 'https://github.com/vinay/minesweeper',
        demo: 'https://vinay-minesweeper.netlify.app'
      }
    }
  }

  const project = projects[projectId]
  if (project && modal && modalBody) {
    modalBody.innerHTML = `
      <h2>${project.title}</h2>
      <p class="project-description">${project.description}</p>
      <div class="project-features">
        <h3>Features:</h3>
        <ul>
          ${project.features.map((feature: string) => `<li>${feature}</li>`).join('')}
        </ul>
      </div>
      <div class="project-tech-stack">
        <h3>Tech Stack:</h3>
        <div class="tech-tags">
          ${project.tech.map((tech: string) => `<span class="tech-tag">${tech}</span>`).join('')}
        </div>
      </div>
      <div class="project-links">
        <a href="${project.links.github}" target="_blank" class="btn btn-primary">View Code</a>
        <a href="${project.links.demo}" target="_blank" class="btn btn-secondary">Live Demo</a>
      </div>
    `
    modal.style.display = 'block'
  }
}

function closeProjectModal() {
  const modal = document.getElementById('project-modal')
  if (modal) {
    modal.style.display = 'none'
  }
}

// Close modal when clicking outside
window.addEventListener('click', (event) => {
  const modal = document.getElementById('project-modal')
  if (event.target === modal && modal) {
    modal.style.display = 'none'
  }
})

// Make functions globally available
;(window as any).scrollToSection = scrollToSection
;(window as any).openProjectModal = openProjectModal
;(window as any).closeProjectModal = closeProjectModal
