var Component = React.createClass(
{
  getInitialState: function()
  { // 表計算アプリのマス目に相当する
    return {
      a: undefined,
      b: undefined
    };
  },
  handleChange: function(event)
  {
    var a = event.target.value * 1; // aのマス目の値
    this.setState({b: a * 5});      // bのマス目の値は、aのマス目の値の5倍と等しい
  },
  render: function()
    { // aのマス目の値を監視すると同時に
      return <div>
        <input type = "text" onChange = {this.handleChange} />
        <input type = "text" value = {this.state.b} />
        </div>;
    } // bのマス目はリアクティブに再計算され
});

var react1 = React.render( <Component/> , document.body);
// 宣言する。リアクティブに自動的にスクリーンに再描画される!!
