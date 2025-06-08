const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const lines = [];

rl.on("line", (line) => {
  lines.push(line);
});

rl.on("close", () => {
  const S = parseInt(lines[0]);

  // word-bingoカードを表すSxSの二次元配列を作成
  const grid = new Array(S).fill(null).map(() => new Array(S));
  let row = [];
  for (let i = 0; i < S; i++) {
    row = lines[i + 1].split(" ");
    for (let j = 0; j < S; j++) {
      grid[i][j] = row[j];
    }
  }

  // 選ばれた単語の配列を作成
  const N = parseInt(lines[S + 1]);
  const selectedWords = [];
  for (let i = 0; i < N; i++) {
    selectedWords.push(lines[S + 2 + i]);
  }

  // 単語の合致判定結果を格納するSxSの二次元配列を作成
  const markedGrid = new Array(S).fill(null).map(() => new Array(S));
  for (let i = 0; i < S; i++) {
    for (let j = 0; j < S; j++) {
      markedGrid[i][j] = selectedWords.includes(grid[i][j]) ? true : false;
    }
  }

  // ビンゴの判定を行う関数群(行、列、対角線のチェック)
  function checkRow(row) {
    return markedGrid[row].includes(false) ? false : true;
  }

  function checkCol(col) {
    let column = markedGrid.map((row) => row[col]);
    return column.includes(false) ? false : true;
  }

  function checkDiagonal1() {
    // 左上から右下の対角線チェック([0][0], [1][1], ..., [S-1][S-1])
    let diagonal = markedGrid.map((row, index) => row[index]);
    return diagonal.includes(false) ? false : true;
  }

  function checkDiagonal2() {
    // 右上から左下の対角線チェック([0][S-1], [1][S-2], ..., [S-1][0])
    let diagonal = markedGrid.map((row, index) => row[S - 1 - index]);
    return diagonal.includes(false) ? false : true;
  }

  // ビンゴの判定を行う
  let isBingo = false;
  for (let i = 0; i < S; i++) {
    if (checkRow(i)) {
      isBingo = true;
      break;
    }
  }
  if (!isBingo) {
    for (let j = 0; j < S; j++) {
      if (checkCol(j)) {
        isBingo = true;
        break;
      }
    }
  }
  if (!isBingo) {
    if (checkDiagonal1() || checkDiagonal2()) {
      isBingo = true;
    }
  }

  console.log(isBingo ? "yes" : "no");
});
