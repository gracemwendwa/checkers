const init = () => {
    const rows = [1, 2, 3, 4, 5, 6, 7, 8];
    const columns = rows;
    const cells = [];
    for (let i = 0; i < rows.length; i++) {
        const x = rows[i];
        for (let j = 0; j < columns.length; j++) {
            const y = rows[j];
            const colorClassname = (((y % 2) == 0 || (x % 2) == 0) && !(((y % 2) == 0 && (x % 2) == 0))) ? 'dark' : 'light'
            const cell = `<div class=\"cell ${colorClassname}\" id=\"${x}${y}\"></div>`;
            cells.push(cell);
        }
    }
    document.getElementById("checkers_container").innerHTML = cells.join("");
}

init()
