
    Название сайта: Пиксель Хантер.
    Описание: Пиксель Хантер — онлайн-игра в которой игроку предлагается отличать фотографии от фотореалистичных изображений.

Описание функциональности
1. Экраны приложения

    1.1. Приложение состоит из нескольких последовательно переключающихся экранов. В ходе игры пользователь переходит от первого экрана к последнему.
    1.2. Часть экранов отвечает за игровой процесс: экран начала игры, где пользователь вводит своё имя, и экран игрового шага.
    1.3. Другая часть экранов отвечает за вспомогательные сценарии, такие как сравнение результатов игрока с его предыдущими играми.

2. Экран загрузки

    2.1. Экран загрузки показывает приветственное Лого и загружает данные для новой игры. При нажатии на красную * (звёздочку) происходит переход на следующий экран.

Дополнительно

    2.2. Сначала должны загрузиться все изображения, которые будут показаны в процессе игры. В течение их загрузки пользователь видит экран загрузки.
    2.3. После завершения загрузки всех изображений автоматически совершается переход к приветственному экрану (без нажатия на * (звёздочку)).
    2.4. Если во время загрузки игры, статистики или изображений возникают ошибки, то эти ошибки отображаются в специальном окне с ошибками.

3. Приветственный экран

    3.1. Приветственный экран содержит краткие правила игры. После ознакомления пользователь переходит на экран начала игры.

Дополнительно

    3.2. Переход на этот экран осуществляется кроссфейдом: пока фон предыдущего экрана плавно скрывается, фон этого экрана плавно показывается.

4. Начало игры

    4.1. Перед тем как начать игру пользователь ещё раз читает правила, на этот раз более подробные, и вводит своё имя. После нажатия на кнопку Go, начинается сама игра.
    4.2. Начиная с этого экрана в левом верхнем углу страницы появляется ссылка на приветственный экран. Нажатие на эту ссылку возвращает пользователя на этот экран. Если в этот момент была запущена игра, пользователю сначала показывается диалоговое окно с предупреждением, что вся его игра будет потеряна.
    4.3. При повторе игры должны использоваться те же самые вопросы и картинки, что были загружены во время старта игры.

5. Игровые экраны

    5.1. В течение игры пользователь видит поочерёдно 10 игровых экранов.
    5.2. По ходу игры, пользователю нужно ответить на все предложенные ему вопросы. Ошибиться можно трижды за всю игру. Четвёртая ошибка приводит к окончанию игры.
    5.3. Количество возможных ошибок показывается в правом верхнем углу по ходу игры.
    5.4. Время, отведённое на каждый из ответов ограничено 30 секундами. Если игрок не успевает ответить на вопрос за отведённое времени, за этот ответ ему засчитывается ошибка и происходит переход к следующему шагу.
    5.5. Оставшееся время показывается индикатором в верхней части экрана.
    5.6. Когда у пользователя остаётся 5 секунд на ответ, индикатор начинает мигать.

Виды игровых экранов

    5.7. Два изображения:
        Для каждого из изображений пользователь должен указать картина это или фотография.
        Переход к следующему шагу осуществляется после того, как будут указаны типы для обоих изображений.
        Правильный ответ засчитывается, если верно указаны оба типа для всех изображений.
        Ошибка хотя бы в одном из вариантов приводит к неправильному ответу.
    5.8. Одно изображение: в этом режиме пользователь должен определить картина это или фотография.
    5.9. Три изображения: пользователю показывается три изображения, из которых ему нужно выбрать одно по определённому принципу — либо из трёх изображений нужно выбрать единственную фотографию, либо единственную картину.

Виды ответов

    5.10. Снизу, на игровом экране показан индикатор прохождения игры. Каждый из ответов кодируется определённым символом и означает свой вид ответа:
        Если игрок ещё не ответил на вопрос, отображается серый индикатор.
        Правильно отвеченный вопрос отмечается зелёным цветом.
        Если пользователь отвечает на вопрос быстрее чем за 10 секунд, ответ считается быстрым (индикатор правильного ответа с иконкой молнии).
        Если ответ на вопрос занял дольше 20 секунд, такой ответ считается медленным (индикатор правильного ответа с иконкой черепахи).
        Неправильно отвеченный вопрос отображается чёрным индикатором.

Дополнительно

    5.11. Реализуйте механизм корректного кадрирования изображений. Таким образом, что изображение всегда должно быть корректно вписано в прямоугольный блок контейнера с сохранением пропорций и без обрезки контента.
    5.12. Реализуйте механизм отладки. Таким образом, что открыв приложение в режиме отладки можно увидеть визуально правильные ответы, чтобы было проще проверять работу приложения.

6. Экран с результатами

    6.1. По ходу игры пользователю начисляются очки в зависимости от того, как он ответил на вопросы. На экране с результатами игры, показывается результат пользователя — победа или поражение и сравнение его результата с прошлыми играми.
    6.2. В списке результатов показывается индикатор, аналогичный индикатору прохождения игры. Справа от индикатора показывается количество баллов, заработанное пользователем или надпись «Fail», если он проиграл.
    6.3. Под индикатором находится расшифровка, какие бонусы и штрафы пользователь получил по ходу игры: за каждый из быстрых или медленных ответов, за неиспользованные ошибки начисляется бонус или штраф.
    6.4. Расчёт очков производится по следующему принципу:
        За каждый правильный ответ даётся 100 очков.
        За каждый быстрый ответ дополнительно начисляется 50 очков. Таким образом, быстрый ответ приносит игроку 150 очков.
        За каждый медленный ответ с игрока снимается 50 очков. Таким образом, каждый медленный ответ приносит игроку 50 очков.
        За каждое неиспользованное право на ошибку добавляется 50 очков.
    6.5. В конце игры результаты пользователя отправляются на сервер для обновления результатов.
    6.6. Неуспешные прохождения игры тоже сохраняются.
    6.7. В левом верхнем углу страницы появляется ссылка на приветственный экран. Нажатие на эту ссылку возвращает пользователя на этот экран в соответствии с правилом 4.2.

