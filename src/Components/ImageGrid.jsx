import React from 'react';

export default class ImageGrid extends React.Component {
  componentDidMount() {
    this.ctx = this.ref.getContext("2d");
    this.frame = 0;
    this.doImperitiveStuff();
  }

  componentDidUpdate() {
    this.doImperitiveStuff();
  }

  doImperitiveStuff () {
    const { size, tokens, theme } = this.props;
    const ctx = this.ctx;
    let list = tokens;
    if(theme === "color-ranked") {
      const set = {};
      list = tokens.filter(w => {
        if(set[w]) {
          set[w]++;
          return false;
        }
        set[w] = 1;
        return true;
      }).sort((a,b) => set[a] < set[b] ? -1 : set[a] > set[b] ? 1 : 0);
    }

    for(let i = 0; i < size; i++) {
      for(let j = 0; j < size; j++) {
        ctx.fillStyle = tokens[i] === tokens[j] ? (
          theme !== "" ?
            getColour(getWordFrac(list, tokens[i]))
            : "#000000"
        ) : "#ffffff";
        ctx.fillRect(i, j, 1, 1);
      }
    }
  }

  render () {
    const { size, style } = this.props;
    return <canvas style={style} ref={node => this.ref = node} width={size} height={size} />
  }
}

function getWordFrac(list, word) {
  return list.indexOf(word) / list.length;
}

function getColour(index) {
  return `hsl(${Math.floor(index * 360)}, 100%, 50%)`;
}
