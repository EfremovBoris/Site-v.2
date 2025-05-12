
    //сохраняем в переменную сессию
     var YoutubeIsOk;

    if (localStorage.getItem('YoutubeIsOk') !== null) {
        // Переменная существует
        YoutubeIsOk = localStorage.getItem('YoutubeIsOk') === 'true'; // Преобразуем строку в логическое значение
    } else {
        // Переменная не существует, устанавливаем значение по умолчанию

        //try to load smth...
        const youtubeLink = `https://www.youtube.com/embed/MNPKGNzlQE4`;

        const checkYouTubeAvailability = () => {
            const iframe = document.createElement('iframe');
            iframe.src = youtubeLink;
            iframe.width = '560';
            iframe.height = '315';
            iframe.style.display = 'none'; // Скрываем iframe
            document.getElementById('video-container').appendChild(iframe);

            iframe.onload = () => {
                YoutubeIsOk = true;
                console.log('Ютуб есть');
                localStorage.setItem('YoutubeIsOk', YoutubeIsOk);
            };

            iframe.onerror = () => {
                YoutubeIsOk = false;
                console.log('Ютуба нет');
                localStorage.setItem('YoutubeIsOk', YoutubeIsOk);
            };

        };

        checkYouTubeAvailability();

    }
