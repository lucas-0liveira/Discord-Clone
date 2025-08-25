document.addEventListener('DOMContentLoaded', function () {
    console.log("JS carregado com sucesso!");

    // Ripple Effect nos botões
    const botoes = document.querySelectorAll('.botao');
    botoes.forEach(botao => {
        botao.addEventListener('click', function (e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    const style = document.createElement('style');
    style.textContent = `
        .botao {
            position: relative;
            overflow: hidden;
        }

        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }

        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Animações de entrada das seções
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const funcionalidades = document.querySelectorAll('.funcionalidade');
    funcionalidades.forEach(funcionalidade => {
        funcionalidade.style.opacity = '0';
        funcionalidade.style.transform = 'translateY(50px)';
        funcionalidade.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(funcionalidade);
    });
});
