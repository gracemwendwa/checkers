let cellsMap = {};
let blackMove = true;
let whiteMove = false;

let cells = [];

let startCell = '32';
let nextCells = {};

let rows = [1, 2, 3, 4, 5, 6, 7, 8];
let columns = rows;

const showPieces = () => {
    document.getElementById("checkers_container").innerHTML = cells.join("");
}

const init = () => {
    let initialCells = [];
    let initialCellsMap = {};

    for (let i = 0; i < rows.length; i++) {
        const y = rows[i];
        for (let j = 0; j < columns.length; j++) {
            const x = rows[j];
            const id = `${x}${y}`;
            const dark = (((y % 2) == 0 || (x % 2) == 0) && !(((y % 2) == 0 && (x % 2) == 0)));
            const colorClassname = dark ? 'dark' : 'light';
            const piece = dark && (y < 4 || y > 5) ? `<div class="piece ${y < 4 ? "black" : "white"}"></div>` : '';
            const cell = `<div onclick="cellClick(this)" class=\"cell ${colorClassname}\" id=${id}>
           ${piece}
            </div>`;
            initialCells.push(cell);
            initialCellsMap[id] = ({
                cell,
                black: (dark && y < 4),
                white: (dark && y > 5),
                dark,
                id
            });
        }
    }
    cells = initialCells;
    cellsMap = initialCellsMap;
    showPieces();
}


const cellClick = (element) => {
    let updatedCells = [];
    let updatedCellsMap = [];

    const id = element.id;
    const x = Number(id.split("")[0]);
    const y = Number(id.split("")[1]);

    const cell = cellsMap[id];

    if (cell.black && blackMove) {
        nextCells["black"] = [((x - 1) < 1 || (y + 1) > 8) ? undefined : `${x - 1}${y + 1}`, ((x + 1) > 8 || (y + 1) > 8) ? undefined : `${x + 1}${y + 1}`].filter(Boolean);
        nextCells["white"] = [];
        startCell = id;
        blackMove = true;
    } else if (cell.white && whiteMove) {
        nextCells["white"] = [((x - 1) < 1 || (y - 1) < 1) ? undefined : `${x - 1}${y - 1}`, ((x + 1) > 8 || (y - 1) < 1) ? undefined : `${x + 1}${y - 1}`].filter(Boolean);
        nextCells["black"] = [];
        startCell = id;
        whiteMove = true;
    } else if (!cell.white && !cell.black) {
        if (blackMove && nextCells.black.includes(id)) {
            const celli = `<div onclick="cellClick(this)" class=\"cell dark\" id=${startCell}>
         </div>`;

            cellsMap[startCell] = ({
                cell: celli,
                black: false,
                white: false,
                dark: true,
                id: startCell
            });
            const nextCell = `<div onclick="cellClick(this)" class=\"cell dark\" id=${id}>
            <div class="piece black"></div>       
             </div>`;
            cellsMap[id] = ({
                cell: nextCell,
                black: true,
                white: false,
                dark: true,
                id
            });
            blackMove = false;
            whiteMove = true;
        }
        if (whiteMove && nextCells.white.includes(id)) {
            const celli = `<div onclick="cellClick(this)" class=\"cell dark\" id=${startCell}>
         </div>`;

            cellsMap[startCell] = ({
                cell: celli,
                black: false,
                white: false,
                dark: true,
                id: startCell
            });
            const nextCell = `<div onclick="cellClick(this)" class=\"cell dark\" id=${id}>
            <div class="piece white"></div>       
             </div>`;
            cellsMap[id] = ({
                cell: nextCell,
                black: false,
                white: true,
                dark: true,
                id
            });
            whiteMove = false;
            blackMove = true;
        }

    }


    for (let i = 0; i < rows.length; i++) {
        const yy = rows[i];
        for (let j = 0; j < columns.length; j++) {
            const xx = rows[j];
            const idd = `${xx}${yy}`;
            updatedCells.push(cellsMap[idd].cell)

        }
    }

    cells = updatedCells;
    showPieces();
}

const switchPieces = () => {

}

init();


