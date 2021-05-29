	var all_mass = new Array('N','N','N','N','N','N','N','N','N'); // создали массив для значений ячеек
	var score_user = 0; // очки пользователя
	var score_pc = 0; // очки компьютера
	var score_draw = 0; // очки ничья
	var score = 0; // переменная для вывода счета на сайте
	var simvol = ''; // какой символ использовался
	var result_is = ''; // кто победил
	var who_score = ''; // переменная чей счёт
	var move = 0; // нечетне значит ход юзера, четные значит ход компьютера
	var random_cell = 0; // число для рандома
	var reset = document.getElementById('reset'); // переменная хранит id поля reset
	var area = document.getElementById('area'); // переменная хранит id поля area
	var winner = false; // есть ли победитель - состояние
	if (area && result_is == '') {area.addEventListener('click', user_move);} //
	if (reset) {reset.addEventListener('click', reset_game);}  //
	
/////////////////////////////////////////////////////////////////////////////////////////////////////////	
	function user_move () 
		{
		var cell = event.target.id;	// номер нажатой ячейки
		if (all_mass[cell-1] == 'N' && move <= 9) 
			{	
			move++; // инкремент счета хода
			all_mass[cell-1] = 'X'; // записали значение X в массив по позиции
			document.getElementById(cell).src='X.jpg'; // в эту ячейку рисуем нужную картинку
//console.log('нажали ячейку '+cell); // вывод позиции ячейки
//console.log('юзер нажал на '+cell);
//console.log('порядковый номер хода (юзер сделал ход) '+cell);
			simvol = 'X'; // для передачи в функцию проверки
			who_score = 'score_user' // для передачи в функцию проверки
			check_winner();
			if (move < 9 && winner == false) {pc_move();} // девятый ход в любом случае сделает игрок
			}
		}
//////////////////////////////////////////////////////////////////////////////////////////////////////////	
	function pc_move() 
		{
		do {random_cell = Math.floor(Math.random() * (10 - 1)) + 1;} while (all_mass[random_cell-1] != 'N'); // рандом число свободной ячейки
		
		if (all_mass[random_cell-1] == 'N') // если победителя еще нет, то
			{
			move++;	// инкремент номера хода
// console.log('рандомное число '+random_cell);
			all_mass[random_cell-1] = 'O'; // записали значение O в массив по позиции
// console.log('нажали ячейку '+random_cell); // вывод позиции ячейки
			document.getElementById(random_cell).src='O.jpg'; // в эту ячейку рисуем нужную картинку
// console.log('pc нажал на '+random_cell);
// console.log('порядковый номер хода (pc сделал ход) '+random_cell);
			simvol = 'O';
			who_score = 'score_pc'
// console.log('сообщение после пк');
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
			if (simvol == 'X') {result_is = 'Игрок победил!'; score_user++; score = 'Игрок '+score_user;  }// ЕСЛИ пришли в эту функцию после хода пользователя, крестик
			if (simvol == 'O') {result_is = 'Компьютер победил!'; score_pc++; score = 'Компьютер '+score_pc;  } // ЕСЛИ пришли в эту функцию после хода компьютера, нолик
// console.log(simvol); 
// console.log(score);
			output_result(); // функция вывод результатов
			} else  {
					if (move == 9) 
						{
// console.log(' НИЧЬЯ ');
						score_draw++; // подсчет счета НИЧЬЯ
						score = 'Ничья '+score_draw; // для вывода результатов сколько очков
						result_is = 'Ничья'; // для вывода результатов Кто победил
						who_score = 'score_draw'; // куда выводить
						output_result(); // функция вывод результатов
						}
					}
		}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
	function reset_game() 
		{ 
		for (var k=1; k<10; k++) // цикл очистки поля игры
			{
			all_mass = ['N','N','N','N','N','N','N','N','N']; // обнуляю массив перед следующей игрой
			image=document.getElementById(k); // переменная с индексом массива
			image.src='none.jpg'; // вывод картинки без знака в ячейку по индексу
			}
		winner = false; // сброс состояния переменной. есть ли победитель.
		document.getElementById('out').innerHTML = 'Кто победит?'; // общая надпись кто победил?
		document.getElementById('score_user').innerHTML = 'Игрок '+score_user; // сохраняю очки пользователя
		document.getElementById('score_pc').innerHTML = 'Компьютер '+score_pc; // сохраняю очки компьютера
		document.getElementById('score_draw').innerHTML = 'Ничья '+score_draw; // сохраняю очки компьютера
		move = 0;	// обнуляю номер хода
		area.addEventListener('click', user_move); // добавляю прослушиватель события
// console.log(' Очистка поля ');
		}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function output_result() 
		{
		document.getElementById('out').innerHTML = result_is;
		document.getElementById(who_score).innerHTML = score;
		}
		
		/*
		
		
		рабочая функция рандом заполнения (наверно самый легкий уровень)
		сложный уровень, это алгоритм просчета следущего шага
		средний, получается, среднее между легким и средним. наверно это будет 
		рандомный вызов либо легкого либо сложного решения во время хода пк.
		
		написать функцию сложного уровня и протестировать
		написать выбор уровня через кнопки на сайте
		
	
			if(e.target.className = 'box' && move <= 9)
				{ // если нажали по какой-то ячейке, то						
				switch (e.target.id) 	{
										  case '1':
											user_move();
											break;				
										  case '2':
											user_move();
											break;
										  case '3':
											user_move();
											break;
										  case '4':
											user_move();
											break;
										  case '5':
											user_move();
											break;
										  case '6':
											user_move();
											break;
										  case '7':
											user_move();
											break;
										  case '8':
											user_move();
											break;
										  case '9':
											user_move();
											break;
										}	

	function user_move() {
						// добавить проверку своего нажатия
							
							while (all_mass[e.target.id-1] == 'N') 
									{
									all_mass[e.target.id-1] = view; // записали значение в массив по позиции
									console.log('Press-'+e.target.id); // вывод позиции ячейки
									var image=document.getElementById(e.target.id); // возвращает ссылку на элемент
									
										image.src=imgs[i]; // в эту позицию выводим нужную картинку
										console.log(e.target.id+'юзер нажал');
										console.log(move+'номер хода общий юзер сделал ход');
										move++; 
									
									break;
									}
								if (all_mass[0]==view && all_mass[1]==view && all_mass[2]==view || 
									all_mass[3]==view && all_mass[4]==view && all_mass[5]==view || 
									all_mass[6]==view && all_mass[7]==view && all_mass[8]==view || 
									all_mass[0]==view && all_mass[3]==view && all_mass[6]==view || 
									all_mass[1]==view && all_mass[4]==view && all_mass[7]==view || 
									all_mass[2]==view && all_mass[5]==view && all_mass[8]==view || 
									all_mass[0]==view && all_mass[4]==view && all_mass[8]==view || 
									all_mass[2]==view && all_mass[4]==view && all_mass[6]==view) 
										{
										winner = document.getElementById('out').innerHTML = "PLAYER is WIN!";
										score_user++;
										document.getElementById('score_user').innerHTML = score_user;
										} else {pc_move();}
						}
	 
	function pc_move()	{
						while (move < 9) 
							{
							
							var random_cell = Math.floor(Math.random() * (10 - 1)) + 1;
							if (all_mass[random_cell-1] == 'N') 
								{
								var image=document.getElementById(random_cell); // возвращает ссылку на элемент
								image.src=imgs[y]; // в эту позицию выводим нужную картинку
								all_mass[random_cell-1] = view2;
								console.log(random_cell+'рандом позиция');
								console.log(move+'номер хода общий пк сделал ход');
								move++;
								break;
								}
							} 
							if (all_mass[0]==view2 &&all_mass[1]==view2 &&all_mass[2]==view2 || 
								all_mass[3]==view2 &&all_mass[4]==view2 &&all_mass[5]==view2 || 
								all_mass[6]==view2 &&all_mass[7]==view2 &&all_mass[8]==view2 || 
								all_mass[0]==view2 &&all_mass[3]==view2 &&all_mass[6]==view2 || 
								all_mass[1]==view2 &&all_mass[4]==view2 &&all_mass[7]==view2 || 
								all_mass[2]==view2 &&all_mass[5]==view2 &&all_mass[8]==view2 || 
								all_mass[0]==view2 &&all_mass[4]==view2 &&all_mass[8]==view2 || 
								all_mass[2]==view2 &&all_mass[4]==view2 &&all_mass[6]==view2) 
									{
									winner = document.getElementById('out').innerHTML = "PC is WIN!";
									score_pc++;									
									document.getElementById('score_pc').innerHTML = score_pc;
									}	
						}
				}						
			
							*/


