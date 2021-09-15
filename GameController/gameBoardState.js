const beep = require('beepbeep');
const Table = require('cli-table');

const Board = require('./gameBoard');

class GameBoardState extends Board {

  ALPHABET = ['', 'A', 'B', 'C', 'D', 'E', 'F', 'G'];
  constructor() {
    super();
    //this.addShips(ships);
    this.setRenderBoard();
  }

  addShip(ship) {
    //console.log(ship)
      ship.positions.forEach(({ column, row }) => {
        // if (row !== EMPTY) {
        //     beep();
        //     throw new Error('That space is off the board!');
        // }
        // if (row === OCCUPIED) {
        //     beep();
        //     throw new Error('A ship already occupies that space!');
        // }
        this.board[column][row] = ship;


      });
    this.setRenderBoard()
  }

  setRenderBoard() {
    this.renderBoard = {};
    Object.keys(this.board)
      .forEach(k => {
        this.renderBoard[k] = { ...this.board[k] };
        Object.keys(this.board[k])
          .forEach(kk => {
            const vv = this.board[k][kk];
            if (vv && vv.icon) {
              this.renderBoard[k][kk] = vv.icon;
            }
          })
      })
  }

  shipsEndingCoordinate(pos,len) {
    const row = pos.charAt(0)
    const col = parseInt(pos.charAt(1));
    var options = []

    // Make sure the opening move is valid
    if (this.board[row][col] === ' ') {
      options.push(this.checkLeft(row,col,len))
      options.push(this.checkRight(row,col,len))
      options.push(this.checkDown(row,col,len))
      options.push(this.checkUp(row,col,len))
    }
    return options.filter( el => el !== '')
  }
  checkLeft(row,col,len) {
    const start_at = col
    if(col-len < 1)
      return '';
    for(col;col > start_at-len;col--) {
      if(this.board[row][col] !== ' ')
        return '';
    }
    return(`${row}${col}`);
  }
  checkRight(row,col,len) {
    const start_at = col
    if(col+len > 8)
      return '';
    for(col;col < len+start_at;col++) {
      if(this.board[row][col] !== ' ')
        return '';
    }
    return(`${row}${col}`);
  }
  checkUp(row,col,len) {
    var row_as_number = this.ALPHABET.indexOf(row)
    if(row_as_number - len < 1)
      return '';
    for(row_as_number;row_as_number > this.ALPHABET.indexOf(row)-len;row_as_number--) {
      if(this.board[this.ALPHABET[row_as_number]][col] !== ' ')
        return '';
    }
    return(this.ALPHABET[row_as_number]+col)
  }
  checkDown(row,col,len) {
    var row_as_number = this.ALPHABET.indexOf(row)
    if(row_as_number + len > 8)
      return '';
    for(row_as_number;row_as_number < this.ALPHABET.indexOf(row)+len;row_as_number++) {
      if(this.board[this.ALPHABET[row_as_number]][col] !== ' ')
        return '';
    }
    return(this.ALPHABET[row_as_number] + col)
  }

  render() {
    const head = ['', ...Object.values(this.LETTERS)]
    const table = new Table({ colAligns: head.map(() => 'middle'), colWidths: head.map(() => 4), head });

    Object.keys(this.renderBoard)
      .forEach(k => {
        table.push({ [k]: Object.values(this.renderBoard[k]) });
      });

    console.log(table.toString());
  }
}

module.exports = GameBoardState;
