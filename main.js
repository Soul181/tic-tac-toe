	var all_mass = [];
	
	for (var m = 0; m <= 8; m++) //индексы массива с 1 по 9 массив ячеек
		{
		all_mass[m] = 'N';
		}	
	console.log(all_mass);	
	var sequence = 0; // номер последовательности совпадения
	var score_user = 0; // очки пользователя
	var score_pc = 0; // очки компьютера
	var score_draw = 0; // очки ничья
	var score = 0; // переменная для вывода счета на сайте
	var simvol = ''; // какой символ использовался
	var result_is = ''; // кто победил
	var who_score = ''; // переменная чей счёт
	var move = 0; // нечетне значит ход юзера, четные значит ход компьютера
	var random_cell = 0; // число для рандома
	var random_move = 0; // число для рандома выбора сложности
	var reset = document.getElementById('reset'); // переменная хранит id поля reset
	var area = document.getElementById('area'); // переменная хранит id поля area
	var winner = false; // есть ли победитель - состояние
	var found_X = 0; // переменная для подсчета количества совпадений в комбинации выйгрышной последовательности (найти два из трех знака для победы)
	var found_O = 0;
	
	if (area && result_is == '') {area.addEventListener('click', user_move);} //
	if (reset) {reset.addEventListener('click', reset_game);}  //
	
////////////////////////////////////////////////////////////////////////////////////////////////////
	function pc_move()  // какая сложность выбрана на сайте
		{
		if (document.getElementById('mode_1').checked) {pc_move_low();}
		if (document.getElementById('mode_2').checked) {pc_move_medium();}
		if (document.getElementById('mode_3').checked) {pc_move_hard();}
		}

////////////////////////////////////////////////////////////////////////////////////////////////////	
	function pc_move_medium()  // medium
	{
		console.log('ход средний уровень');
		random_move = Math.floor(Math.random() * 2);
		console.log('сложность '+random_move);
		if (random_move == 0){ pc_move_low(); } else
		if (random_move == 1){ pc_move_hard(); }
	}

////////////////////////////////////////////////////////////////////////////////////////////////////	
	function pc_move_hard()  // hard 
	{
		console.log('ход сложный уровень');
// ПЕРВОЕ условие. проверить, занята ли ячейка 5 крестиком, если нет, то вписать туда ноль. Только для второго хода
		if (move == 1 && all_mass[5-1] == 'N') 
			{
			move++;	// инкремент номера хода
			all_mass[5-1] = 'O';	// если не занято, то прописываем в ячейку 5 нолик
			sleep(100); //Время задержки типа он думает в миллисекундах
			document.getElementById(5).src='O.jpg'; // в эту ячейку рисуем нужную картинку
			simvol = 'O';
			who_score = 'score_pc';
			console.log('по алгоритму 1 пк выбирает ячейку 5');
			console.log('количество сделанных ходов '+move);
			// проверка победы не нужна, так как это второй ход
			} else if (move > 2) // если сделано больше 2 ходов, то в теории появятся 2 из 3
							{ 
// ВТОРОЕ. здесь проверяем 2 из 3 занятых крестиков в выйгрышной комбинации. Если занято 2 из 3, то в третий, если там не НОЛЬ, прописываем НОЛЬ.
								console.log('смотрю основной массив '+all_mass); // смотрю основной массив
								var win_num = [[0,1,2], // массив с перечнем совпадений, каждый элемент - это номер ячейки поля.
												[3,4,5],
												[6,7,8],
												[0,3,6],
												[1,4,7],
												[2,5,8],
												[0,4,8],
												[2,4,6]];
												
								var win_mass = [[all_mass[0],all_mass[1],all_mass[2]], // массив с перечнем совпадений, каждый элемент - это номер ячейки поля.
												[all_mass[3],all_mass[4],all_mass[5]],
												[all_mass[6],all_mass[7],all_mass[8]],
												[all_mass[0],all_mass[3],all_mass[6]],
												[all_mass[1],all_mass[4],all_mass[7]],
												[all_mass[2],all_mass[5],all_mass[8]],
												[all_mass[0],all_mass[4],all_mass[8]],
												[all_mass[2],all_mass[4],all_mass[6]]];	
												
								for (var n = 0; n<=7; n++) 
									{
									console.log('алгоритм 2. цикл. вход');
									found_X = 0;
									found_O = 0;
									found_X = win_mass[n].join('').split("X").length - 1; // число
									found_O = win_mass[n].join('').split("O").length - 1; // число
									console.log('проверяем последовательность № '+n);
									console.log('ноликов в последовательности присутствует '+found_O);
									console.log('крестиков в последовательности присутствует '+found_X);
									if (found_X == 2 && found_O == 0) 
										{
										console.log('если found_X == 2 && found_O == 0');
										sequence = n;
										console.log('найдено по массиву X '+found_X);
										console.log('найдено по массиву O '+found_O);
										console.log('2 из 3 найдено в последовательности '+sequence);	
										n=8; // для выхода из цикла
										}	
									}
								console.log('вышли из цикла с сохраненной последовательностью '+sequence);
								console.log('вышли из цикла на присвоеной последовательности n '+n);
								if (found_X == 2 && found_O == 0) // если в комбинации 2 крестика и нули отсутствуют, то ищем позицию пустой ячейки
									{
									var str = win_mass[sequence];
									for (var i=0; i<=2; i++) 
										{
										if (str[i] == 'N') 
											{
											var position_O = win_num[sequence][i];
											console.log('номер ячейки '+win_num[sequence][i]); // номер ячейки
											console.log('номер ячейки '+win_mass[sequence][i]); // символ в ней хранится
											move++;	// инкремент номера хода
											all_mass[win_num[sequence][i]] = 'O'; // записали значение O в массив по позиции
											sleep(100); //Время задержки типа он думает в миллисекундах
											document.getElementById(win_num[sequence][i]+1).src='O.jpg'; // в эту ячейку рисуем нужную картинку
											simvol = 'O';
											who_score = 'score_pc';
											console.log('ПК сделал ход '+move);
											check_winner();
											}
										}
									} else if (true) 
										{
											console.log('алгоритм 2. ничего не подошло. применяю рандом');
											do {random_cell = Math.floor(Math.random() * (10 - 1)) + 1;} while (all_mass[random_cell-1] != 'N'); // рандом число свободной ячейки
											if (all_mass[random_cell-1] == 'N') // если победителя еще нет, то
												{
												move++;	// инкремент номера хода
												all_mass[random_cell-1] = 'O'; // записали значение O в массив по позиции
												sleep(100); //Время задержки типа он думает в миллисекундах
												document.getElementById(random_cell).src='O.jpg'; // в эту ячейку рисуем нужную картинку
												simvol = 'O';
												who_score = 'score_pc';
												check_winner();
												} 
										}
							console.log('дошли до позиция 3');
// ТРЕТЬЕ. проверка на занятые углы. если свободен угол, то занять один.								
							} else if (all_mass[0] == 'N' && all_mass[1] != 'X' || all_mass[3] != 'X') 
										{
										move++;	// инкремент номера хода
										all_mass[0] = 'O'; // записали значение O в массив по позиции
										sleep(100); //Время задержки типа он думает в миллисекундах
										document.getElementById(1).src='O.jpg'; // в эту ячейку рисуем нужную картинку
										simvol = 'O';
										who_score = 'score_pc';
										console.log('по алгоритму 3 пк выбирает ячейку 1');
										check_winner();
										} else if (all_mass[2] == 'N' && all_mass[1] != 'X' || all_mass[5] != 'X') 
												{
												move++;	// инкремент номера хода
												all_mass[2] = 'O'; // записали значение O в массив по позиции
												sleep(100); //Время задержки типа он думает в миллисекундах
												document.getElementById(3).src='O.jpg'; // в эту ячейку рисуем нужную картинку
												simvol = 'O';
												who_score = 'score_pc';
												console.log('по алгоритму 3 пк выбирает ячейку 3');
												check_winner();
												} else if (all_mass[6] == 'N' && all_mass[3] != 'X' || all_mass[7] != 'X') 
														{
														move++;	// инкремент номера хода
														all_mass[6] = 'O'; // записали значение O в массив по позиции
														sleep(100); //Время задержки типа он думает в миллисекундах
														document.getElementById(7).src='O.jpg'; // в эту ячейку рисуем нужную картинку
														simvol = 'O';
														who_score = 'score_pc';
														console.log('по алгоритму 3 пк выбирает ячейку 7');
														check_winner();
														} else if (all_mass[8] == 'N' && all_mass[5] != 'X' || all_mass[7] != 'X') 
																{
																move++;	// инкремент номера хода
																all_mass[8] = 'O'; // записали значение O в массив по позиции
																sleep(100); //Время задержки типа он думает в миллисекундах
																document.getElementById(9).src='O.jpg'; // в эту ячейку рисуем нужную картинку
																simvol = 'O';
																who_score = 'score_pc';
																console.log('по алгоритму 3 пк выбирает ячейку 9');
																check_winner();
																} else if (all_mass[0] != 'N' && all_mass[2] != 'N' && all_mass[6] != 'N' && all_mass[8] != 'N') // или если все углы заняты, найти любое место и проверить на победу
																		{
																		do {random_cell = Math.floor(Math.random() * (10 - 1)) + 1;} while (all_mass[random_cell-1] != 'N'); // рандом число свободной ячейки
																		if (all_mass[random_cell-1] == 'N') // если победителя еще нет, то
																			{
																			console.log('по алгоритму 3 пк РАНДОМ ячейка '+(random_cell-1));
																			move++;	// инкремент номера хода
																			all_mass[random_cell-1] = 'O'; // записали значение O в массив по позиции
																			sleep(100); //Время задержки типа он думает в миллисекундах
																			document.getElementById(random_cell).src='O.jpg'; // в эту ячейку рисуем нужную картинку
																			simvol = 'O';
																			who_score = 'score_pc';
																			check_winner();
																			} 
																		}			
	}

/////////////////////////////////////////////////////////////////////////////////////////////////////////	
	function user_move () 
		{
		var cell = event.target.id;	// номер нажатой ячейки
		console.log('пользователь выбрал ячейку '+cell);	
		if (all_mass[cell-1] == 'N' && move <= 9) 
			{	
			move++; // инкремент счета хода
			all_mass[cell-1] = 'X'; // записали значение X в массив по позиции
			sleep(100); //Время задержки типа он думает в миллисекундах
			document.getElementById(cell).src='X.jpg'; // в эту ячейку рисуем нужную картинку
			simvol = 'X'; // для передачи в функцию проверки
			who_score = 'score_user'; // для передачи в функцию проверки
			console.log('печать массива '+all_mass);
			check_winner();
			if (move < 9 && winner == false) {pc_move();} // девятый ход в любом случае сделает игрок
			}
		}

//////////////////////////////////////////////////////////////////////////////////////////////////////////	
	function pc_move_low() // LOW
		{
		console.log('ход легкий уровень');
		do {random_cell = Math.floor(Math.random() * (10 - 1)) + 1;} while (all_mass[random_cell-1] != 'N'); // рандом число свободной ячейки
		if (all_mass[random_cell-1] == 'N') // если победителя еще нет, то
			{
			move++;	// инкремент номера хода
			all_mass[random_cell-1] = 'O'; // записали значение O в массив по позиции
			sleep(100); //Время задержки типа он думает в миллисекундах
			document.getElementById(random_cell).src='O.jpg'; // в эту ячейку рисуем нужную картинку
			simvol = 'O';
			who_score = 'score_pc';
			check_winner();
			} 
		}

//////////////////////////////////////////////////////////////////////////////////////////////////////////	
	function check_winner() 
		{
		if (all_mass[0]==simvol && all_mass[1]==simvol && all_mass[2]==simvol ||  // проверка совпадения трех (ЛИБО КРЕСТИК ЛИЮО НОЛИК) символов
			all_mass[3]==simvol && all_mass[4]==simvol && all_mass[5]==simvol || 
			all_mass[6]==simvol && all_mass[7]==simvol && all_mass[8]==simvol || 
			all_mass[0]==simvol && all_mass[3]==simvol && all_mass[6]==simvol || 
			all_mass[1]==simvol && all_mass[4]==simvol && all_mass[7]==simvol || 
			all_mass[2]==simvol && all_mass[5]==simvol && all_mass[8]==simvol || 
			all_mass[0]==simvol && all_mass[4]==simvol && all_mass[8]==simvol || 
			all_mass[2]==simvol && all_mass[4]==simvol && all_mass[6]==simvol ) 
			{
			winner = true; // победитель есть
			area.removeEventListener('click', user_move); // удаляем прослушиватель чтобы не нажимать на поле    
			// ЕСЛИ пришли в эту функцию после хода пользователя, крестик
			if (simvol == 'X') {result_is = 'Игрок победил!'; score_user++; score = 'Игрок '+score_user;  }
			// ЕСЛИ пришли в эту функцию после хода компьютера, нолик
			if (simvol == 'O') {result_is = 'Компьютер победил!'; score_pc++; score = 'Компьютер '+score_pc;  } 
			output_result(); // функция вывод результатов
			} else  {
					if (move == 9) // ничья если 9 ходов и нет побекдителя
						{
						score_draw++; // подсчет счета НИЧЬЯ
						score = 'Ничья '+score_draw; // для вывода результатов сколько очков
						result_is = 'Ничья'; // для вывода результатов Кто победил
						who_score = 'score_draw'; // куда выводить
						output_result(); // функция вывод результатов
						}
					}
		}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function sleep(millis) {
		var t = (new Date()).getTime();
		var w = 0;
		while (((new Date()).getTime() - t) < millis) {
			w++;
		}
	}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
	function reset_game() 
		{ 
		for (m = 1; m<=9; m++) // цикл очистки поля игры
			{
			all_mass[m-1] = 'N'; // обнуляю массив перед следующей игрой
			image=document.getElementById(m); // переменная с индексом ячейки для очистки
			image.src='none.jpg'; // вывод картинки без знака в ячейку по индексу
			}
		winner = false; // сброс состояния переменной. есть ли победитель.
		document.getElementById('out').innerHTML = 'Кто победит?'; // общая надпись кто победил?
		document.getElementById('score_user').innerHTML = 'Игрок '+score_user; // сохраняю очки пользователя
		document.getElementById('score_pc').innerHTML = 'Компьютер '+score_pc; // сохраняю очки компьютера
		document.getElementById('score_draw').innerHTML = 'Ничья '+score_draw; // сохраняю очки компьютера
		move = 0;	// обнуляю номер хода
		area.addEventListener('click', user_move); // добавляю прослушиватель события
		}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function output_result() 
		{
		document.getElementById('out').innerHTML = result_is;
		document.getElementById(who_score).innerHTML = score;
		}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////		
