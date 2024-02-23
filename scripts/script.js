console.log('TEST  script');
function removeDuplicates(arr) {
    return [...new Set(arr)];
}
function iter_spape_func(){
    ++count;
    if(count == 8){count = 1};
    t_shapes =  shape.get(count);
    temp_color = color[count];
    return t_shapes;
}
function generateArray(start, rows, cols) {
    const grid = new Map();
    let count = start;
    for (let i = 1; i < rows; i++) {
        const row = [];
        for (let j = 0; j < cols; j++) {
            row.push(count++);
        }
        grid.set(i, row);
    }
    return grid;
}
const grid = generateArray(10, 21, 10);
const shape = new Map([[1,[14,24,34,44]], [2,[14,24,23,25]],[3,[14,24,34,35]],[4,[14,24,34,33]],[5,[14,15,25,26]],[6,[14,15,24,23]],[7,[14,15,24,25]],]);
const color = ['transparent','#C9F600','#04859D','#751c5a','#FF9840','#E038AD','#FF4040','#59EA3A','#8243D6'];
const time = 150;
let count = 0;
let t_shapes = [14,15,24,25]
let intervalId;
let end = [210,211,212,213,214,215,216,217,218,219];
let colision = [];
let temp;
let temp_color = color[7];
let temp_arr = [];

start_game(t_shapes)
function start_game(shape){
    get_color(shape);
    function get_color_trp(arr){
        for(let ex = 0;ex < 4;ex++){
            document.getElementById(arr[ex]).style.background = color[0];
        }
    }
    function get_color(arr){
        temp = arr;
        for(let ex = 0;ex < 4;ex++){
            document.getElementById(arr[ex]).style.background = temp_color;
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
                    get_color(iter_spape_func());
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
        if (event.code === 'KeyE') {
            rotate_shape();
        }
    });
    function switch_rl(i) {
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
    }
    
}
function grid_cond(){
    const t_arr = [];
    for(let row = 20; row > 4 ; row--){
        let temp_bool = true;
        for (let ex = 0; ex < 10 ;ex++){
            if(document.getElementById(grid.get(row)[ex]).style.backgroundColor == color[0]){
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
    for(let ex = 0 ; ex < array.length;ex++){
        grid.get(array[ex]).forEach((i) => {
            document.getElementById(i).style.backgroundColor = color[0];
            if(colision.includes(i)){
                colision.splice(colision.indexOf(i), 1);
                b_bd = true;
        }});
    }
    if(b_bd){line_down();}
}
function line_down() {
    let count = 0;
    let temp_arr_color = [];
    let temp_var_math = 200;
    let temp_switch_lines = [];
    let temp_colision  = [];
    let temp_grid = new Map([[1,[]],[2,[]],[3,[]],[4,[]],[5,[]],[6,[]],[7,[]],[8,[]],[9,[]],[10,[]],[11,[]],[12,[]],[13,[]],[14,[]],[15,[]],[16,[]],[17,[]],[18,[]],[19,[]],[20,[]],]);
    colision.forEach((i)=>{
        for(let count = 20;count > 1;count--){
            if(Math.floor(i / 10) == count){
                temp_grid.get(count).push(i);
                temp_switch_lines.push(Math.floor(i/10))
                break;
            }
        }
        temp_arr_color.push(document.getElementById(i).style.backgroundColor)
        document.getElementById(i).style.backgroundColor = color[0];
    });
    const tsl = Array.from(new Set(temp_switch_lines.sort((a,b)=> b - a)))
    for (let i = 0; i < tsl.length; i++) {
        for (let ex = 0; ex < temp_grid.get(tsl[i]).length; ex++) {
            temp_colision.push(temp_grid.get(tsl[i])[ex] + temp_var_math - Math.floor(temp_grid.get(tsl[i])[ex] / 10) * 10); // Corrected collision calculation
        }
        temp_var_math -= 10;
    }
    colision = Array.from(new Set(temp_colision));
    colision.forEach((i)=>{document.getElementById(i).style.backgroundColor = temp_arr_color[count];count++;})
}
