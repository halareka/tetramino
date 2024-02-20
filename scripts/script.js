console.log('TEST  script');
function removeDuplicates(arr) {
    return [...new Set(arr)];
}
let grid = new Map([
    [1, [10 , 11 , 12 , 13 , 14 , 15 , 16 , 17 , 18 , 19]],
    [2, [20 , 21 , 22 , 23 , 24 , 25 , 26 , 27 , 28 , 29]],
    [3, [30 , 31 , 32 , 33 , 34 , 35 , 36 , 37 , 38 , 39]],
    [4, [40 , 41 , 42 , 43 , 44 , 45 , 46 , 47 , 48 , 49]],
    [5, [50 , 51 , 52 , 53 , 54 , 55 , 56 , 57 , 58 , 59]],
    [6, [60 , 61 , 62 , 63 , 64 , 65 , 66 , 67 , 68 , 69]],
    [7, [70 , 71 , 72 , 73 , 74 , 75 , 76 , 77 , 78 , 79]],
    [8, [80 , 81 , 82 , 83 , 84 , 85 , 86 , 87 , 88 , 89]],
    [9, [90 , 91 , 92 , 93 , 94 , 95 , 96 , 97 , 98 , 99]],
    [10,[100, 101, 102, 103, 104, 105, 106, 107, 108, 109]],
    [11,[110, 111, 112, 113, 114, 115, 116, 117, 118, 119]],
    [12,[120, 121, 122, 123, 124, 125, 126, 127, 128, 129]],
    [13,[130, 131, 132, 133, 134, 135, 136, 137, 138, 139]],
    [14,[140, 141, 142, 143, 144, 145, 146, 147, 148, 149]],
    [15,[150, 151, 152, 153, 154, 155, 156, 157, 158, 159]],
    [16,[160, 161, 162, 163, 164, 165, 166, 167, 168, 169]],
    [17,[170, 171, 172, 173, 174, 175, 176, 177, 178, 179]],
    [18,[180, 181, 182, 183, 184, 185, 186, 187, 188, 189]],
    [19,[190, 191, 192, 193, 194, 195, 196, 197, 198, 199]],
    [20,[200, 201, 202, 203, 204, 205, 206, 207, 208, 209]],

]);
//main variables
const shapes = [14,15,24,25]
const time = 100;
let intervalId;
let end = [180,181,182,183,184,185,186,187,188,189];
let colision = [];
let color = '#cf67c1';
let color__transparent = 'transparent';
let temp;
let temp_arr = [];
// color func

start_game(shapes)

function start_game(shape){
    get_color(shape);
    function get_color_trp(arr){
        for(let ex = 0;ex < 4;ex++){
            document.getElementById(arr[ex]).style.background = color__transparent;
        }
    }
    function get_color(arr){
        temp = arr; // сохраняем кэш для удаления 
        for(let ex = 0;ex < 4;ex++){
            document.getElementById(arr[ex]).style.background = color;
        }
    }
    function true_down(array){
        temp_arr = [];
        for(let ex = 0;ex < array.length ;ex++){
            temp_arr.push(temp[ex] + 10)
        }
        get_color_trp(temp);
        get_color(temp_arr);
    }
    function startInterval() {
        intervalId = setInterval(() => {
            true_down(shape);
            for(let ex = 0;ex < 4 ; ex++ ){
                if(end.includes(temp[ex] + 10) || colision.includes(temp[ex] + 10)) {
                    colision = removeDuplicates(colision.concat(temp))
                    clearInterval(intervalId);
                    grid_cond();
                    get_color(shape);
                    startInterval();
                }
            }
        }, time);
    }
    startInterval();

    document.addEventListener('keydown', function(event) {
        if (event.code === 'KeyD') {
            switch_rl(1);                                                                         
        }
        if (event.code === 'KeyA') {
            switch_rl(-1);                                                                         
        }
    });
    function switch_rl(i) {
        console.time('1')
        let temp_switch = [];
        let canMove = true;
        for (let ex = 0; ex < 4; ex++) {
            let nextCell = temp[ex] + i;
            let diagonalCell = temp[ex] + i + 10; 
            let currentLine = Math.floor(temp[ex] / 10); 
            let nextLine = Math.floor(nextCell / 10); 
            if (colision.includes(nextCell) || colision.includes(diagonalCell) || nextCell < currentLine * 10 || nextCell > (currentLine + 1) * 10|| nextLine !== currentLine) {
                canMove = false;
                break;
            }
            temp_switch.push(nextCell);
        }
        if (canMove) {
            get_color_trp(temp);
            get_color(temp_switch);
        }
        console.timeEnd('1')
    }  
}
function grid_cond(){
    const t_arr = [];
    for(let row = 17; row > 4 ; row--){
        let temp_bool = true;
        for (let ex = 0; ex < 10 ;ex++){
            if(document.getElementById(grid.get(row)[ex]).style.backgroundColor == color__transparent){
                temp_bool = false;
                break;
            }
        }
        if(temp_bool){
            t_arr.push(row);}
    }
    clear_line(t_arr);
}

function clear_line(array){
    let b_bd = false;
    // for(let ex = 0 ; ex < 2;ex++){
    for(let ex = 0 ; ex < array.length;ex++){
        grid.get(array[ex]).forEach((i) => {
            document.getElementById(i).style.backgroundColor = color__transparent;
            if(colision.includes(i)){
                colision.splice(colision.indexOf(i), 1);
                b_bd = true;
            }
            
        });
    }
    if(b_bd){
        console.log('линия отчистилас');
        alert(array)
        block_down();
    }
    // }
}
function block_down() {
    colision.sort((a, b) => b - a);
    for (let ex = 0; ex < colision.length; ex++) {
        if (document.getElementById(colision[ex]) != null) {
            if (colision.includes(colision[ex]+ 10)) {
                return;
            } else {
                document.getElementById(colision[ex]).style.backgroundColor = color__transparent;
            }
        }
    }
    for (let ex = 0; ex < colision.length; ex++) {
        colision[ex] += 10;
        if (document.getElementById(colision[ex]) != null) {
            if (colision.includes(colision[ex] + 10)) {
                return;
            } else {
                document.getElementById(colision[ex]).style.backgroundColor = color;
            }
        }
    }
}