let score = 0;

function createBubble(type = 'random') {
    const bubble = document.createElement('div');

    // Определяем тип пузырька: либо случайный, либо тот, который был нажат
    if (type === 'random') {
        const bubbleType = Math.random();
        if (bubbleType < 0.33) {
            bubble.classList.add('bubble', 'whale');
        } else if (bubbleType < 0.66) {
            bubble.classList.add('bubble', 'cypherpepe');
        } else {
            bubble.classList.add('bubble', 'lastking');
        }
    } else {
        bubble.classList.add('bubble', type);
    }

    // Случайное начальное положение пузырька
    bubble.style.top = `${Math.random() * 80}vh`;
    bubble.style.left = `${Math.random() * 80}vw`;

    document.querySelector('.bubble-container').appendChild(bubble);

    // Добавляем случайное направление и скорость (уменьшили в 1.5 раза)
    let deltaX = (Math.random() * 1.33 + 0.67) * (Math.random() > 0.5 ? 1 : -1);
    let deltaY = (Math.random() * 1.33 + 0.67) * (Math.random() > 0.5 ? 1 : -1);

    function moveBubble() {
        let bubbleRect = bubble.getBoundingClientRect();
        let containerRect = document.querySelector('.bubble-container').getBoundingClientRect();
        const buffer = 10; // Буфер в пикселях, чтобы не касаться границ

        // Проверка столкновения с границами контейнера с учетом буфера
        if (bubbleRect.left <= containerRect.left + buffer || bubbleRect.right >= containerRect.right - buffer) {
            deltaX *= -1; // Меняем направление по X при столкновении с границей с буфером
        }
        if (bubbleRect.top <= containerRect.top + buffer || bubbleRect.bottom >= containerRect.bottom - buffer) {
            deltaY *= -1; // Меняем направление по Y при столкновении с границей с буфером
        }

        // Обновляем положение пузырька
        bubble.style.left = `${bubble.offsetLeft + deltaX}px`;
        bubble.style.top = `${bubble.offsetTop + deltaY}px`;

        // Продолжаем движение, если пузырек не лопнул
        if (!bubble.classList.contains('pop')) {
            requestAnimationFrame(moveBubble);
        }
    }

    // Запуск анимации движения пузырька
    moveBubble();

    // Добавляем событие на клик для лопания пузырька
    bubble.addEventListener('click', () => {
        bubble.classList.add('pop');

        // Определяем тип пузырька и добавляем очки и звук
        if (bubble.classList.contains('whale')) {
            playSound('whale_pop.mp3');
            score += 1;
        } else if (bubble.classList.contains('cypherpepe')) {
            playSound('cypherpepe_pop.mp3');
            score += 5;
        } else if (bubble.classList.contains('lastking')) {
            playSound('lastking_pop.mp3');
            score += 5;
        }

        document.getElementById('score').textContent = score;

        setTimeout(() => {
            bubble.remove();
            createBubble(type); // Создаем новый пузырек того же типа после клика
        }, 300);
    });
}

// Запускаем создание пузырьков (по 20 каждого типа)
for (let i = 0; i < 20; i++) {
    createBubble('whale');
    createBubble('cypherpepe');
    createBubble('lastking');
}

// Функция для воспроизведения звука
function playSound(soundFile) {
    const audio = new Audio(soundFile);
    audio.play();
}
