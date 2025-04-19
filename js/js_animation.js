// js_animation.js - Tour animado para SSeek PC Connector

document.addEventListener('DOMContentLoaded', function() {
    // Elementos del tour
    const tourButton = document.createElement('button');
    tourButton.innerHTML = '<i class="fas fa-play-circle"></i> Ver demostración';
    tourButton.className = 'tour-button';
    document.querySelector('.hero-content').appendChild(tourButton);

    // Crear contenedor del tour
    const tourContainer = document.createElement('div');
    tourContainer.className = 'tour-container';
    tourContainer.style.display = 'none';
    document.body.appendChild(tourContainer);

    // Definir los pasos del tour
    const tourSteps = [
        {
            title: 'Conexión en segundos',
            description: 'Conecta tu dispositivo Android con tu PC escaneando un código QR.',
            image: 'img/tour/qr-scanning.png',
            animation: 'fadeInRight'
        },
        {
            title: 'Generación de código inteligente',
            description: 'Escribe lo que necesitas en lenguaje natural y obtén código funcional al instante.',
            image: 'img/tour/code-generation.png',
            animation: 'fadeInUp'
        },
        {
            title: 'Edición remota',
            description: 'Modifica tu código en tiempo real desde tu dispositivo móvil.',
            image: 'img/tour/remote-editing.png',
            animation: 'fadeInLeft'
        },
        {
            title: 'Integración con tu IDE',
            description: 'Trabaja directamente con Android Studio, VS Code u otros IDEs.',
            image: 'img/tour/ide-integration.png',
            animation: 'fadeInDown'
        },
        {
            title: 'Desarrollo multi-dispositivo',
            description: 'Prueba tu código en múltiples dispositivos simultáneamente.',
            image: 'img/tour/multi-device.png',
            animation: 'zoomIn'
        }
    ];

    let currentStep = 0;

    // Construir la estructura del tour
    function buildTourHTML() {
        tourContainer.innerHTML = `
            <div class="tour-overlay"></div>
            <div class="tour-modal">
                <button class="tour-close"><i class="fas fa-times"></i></button>
                <div class="tour-content">
                    <div class="tour-image-container">
                        <img src="${tourSteps[currentStep].image}" alt="${tourSteps[currentStep].title}" class="tour-image">
                    </div>
                    <div class="tour-info">
                        <h2>${tourSteps[currentStep].title}</h2>
                        <p>${tourSteps[currentStep].description}</p>
                    </div>
                    <div class="tour-navigation">
                        <button class="tour-prev" ${currentStep === 0 ? 'disabled' : ''}><i class="fas fa-arrow-left"></i> Anterior</button>
                        <div class="tour-dots">
                            ${tourSteps.map((_, index) => 
                                `<span class="tour-dot ${index === currentStep ? 'active' : ''}"></span>`
                            ).join('')}
                        </div>
                        <button class="tour-next">${currentStep === tourSteps.length - 1 ? 'Finalizar' : 'Siguiente <i class="fas fa-arrow-right"></i>'}</button>
                    </div>
                </div>
            </div>
        `;

        // Añadir eventos
        document.querySelector('.tour-close').addEventListener('click', closeTour);
        document.querySelector('.tour-prev').addEventListener('click', prevStep);
        document.querySelector('.tour-next').addEventListener('click', nextStep);
        
        // Añadir la clase de animación
        setTimeout(() => {
            document.querySelector('.tour-image').classList.add(tourSteps[currentStep].animation);
        }, 100);
    }

    // Iniciar el tour
    function startTour() {
        currentStep = 0;
        buildTourHTML();
        tourContainer.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Bloquear scroll
    }

    // Cerrar el tour
    function closeTour() {
        tourContainer.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restaurar scroll
    }

    // Paso anterior
    function prevStep() {
        if (currentStep > 0) {
            currentStep--;
            updateTour();
        }
    }

    // Paso siguiente
    function nextStep() {
        if (currentStep < tourSteps.length - 1) {
            currentStep++;
            updateTour();
        } else {
            closeTour();
        }
    }

    // Actualizar el contenido del tour
    function updateTour() {
        const tourImage = document.querySelector('.tour-image');
        const tourTitle = document.querySelector('.tour-info h2');
        const tourDescription = document.querySelector('.tour-info p');
        const tourPrev = document.querySelector('.tour-prev');
        const tourNext = document.querySelector('.tour-next');
        const tourDots = document.querySelectorAll('.tour-dot');
        
        // Quitar todas las clases de animación
        tourImage.className = 'tour-image';
        
        // Cambiar el contenido con una micro-animación de fade
        tourImage.style.opacity = 0;
        setTimeout(() => {
            tourImage.src = tourSteps[currentStep].image;
            tourImage.alt = tourSteps[currentStep].title;
            
            // Aplicar nueva animación
            setTimeout(() => {
                tourImage.classList.add(tourSteps[currentStep].animation);
                tourImage.style.opacity = 1;
            }, 50);
        }, 300);
        
        // Actualizar texto con animación
        tourTitle.style.opacity = 0;
        tourDescription.style.opacity = 0;
        
        setTimeout(() => {
            tourTitle.textContent = tourSteps[currentStep].title;
            tourDescription.textContent = tourSteps[currentStep].description;
            
            tourTitle.style.opacity = 1;
            tourDescription.style.opacity = 1;
        }, 300);
        
        // Actualizar botones
        tourPrev.disabled = currentStep === 0;
        tourNext.innerHTML = currentStep === tourSteps.length - 1 ? 'Finalizar' : 'Siguiente <i class="fas fa-arrow-right"></i>';
        
        // Actualizar indicadores
        tourDots.forEach((dot, index) => {
            dot.className = index === currentStep ? 'tour-dot active' : 'tour-dot';
        });
    }

    // Evento para iniciar el tour
    tourButton.addEventListener('click', startTour);

    // Permitir navegación con teclado cuando el tour está activo
    document.addEventListener('keydown', function(e) {
        if (tourContainer.style.display === 'none') return;
        
        if (e.key === 'ArrowRight' || e.key === ' ') {
            nextStep();
        } else if (e.key === 'ArrowLeft') {
            prevStep();
        } else if (e.key === 'Escape') {
            closeTour();
        }
    });

    // Añadir animación al botón para llamar la atención
    setTimeout(() => {
        tourButton.classList.add('pulse');
    }, 2000);
});