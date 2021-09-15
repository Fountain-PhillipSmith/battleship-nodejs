Position = require('./position')
class Ship {
    constructor(name, size, color, icon) {
      this.color = color;
      this.icon = icon;
      this.name = name;
      this.positions = [];
      this.size = size;
    }

    addPosition(position) {
        // todo: add validation to prevent putting in place not on board, stacking vertically, etc
        this.positions.push(position);
    }

    addPositions(start,end){
      //console.log(start,end)
      const start_row = start.charAt(0)
      const start_col = parseInt(start.charAt(1))
      const end_row = end.charAt(0)
      const end_col = parseInt(end.charAt(1));

      if(start_row === end_row){
        for(var i = start_col; i < end_col+1;i++) {
          this.addPosition(new Position(start_row, i))
        //  console.log(start_row, i)
        }
      } else {
        for(var i = start_row; i < end_row+1;i++) {
          this.addPosition(new Position(i,start_col))
        }
      }
    }

    isSunk() {
        return this.positions.every(position => position.isHit);
    }
}

module.exports = Ship;
