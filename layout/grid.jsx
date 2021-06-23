import RGL, { WidthProvider } from "react-grid-layout";
import { map, addIndex } from 'ramda';
import React from 'react';
const ReactGridLayout = RGL;

export default class BasicLayout extends React.PureComponent {
    static defaultProps = {
      className: "layout",
      items: 20,
      rowHeight: 100,
      onLayoutChange: function() {},
      cols: 12
    };
  
    constructor(props) {
      super(props);
  
      const layout = this.generateLayout();
      this.state = { layout };
    }
  
    generateDOM() {
      return addIndex(map)((elem, i)=>{
        return (
          <div key={i}>
            {
                elem
            }
          </div>
        );
      },this.props.children);
    }
  
    generateLayout() {
      const p = this.props;
      return addIndex(map)(function(item, i ) {
        const y = p.y || Math.ceil(Math.random() * 4) + 1;
        return {
          x: (i * 2) % 12,
          y: Math.floor(i / 6) * y,
          w: 2,
          h: y,
          i: i.toString()
        };
      },new Array(p.items) );
    }
  
    onLayoutChange(layout) {
      this.props.onLayoutChange(layout);
    }
  
    render() {
      return (
        <ReactGridLayout
          layout={this.state.layout}
          onLayoutChange={this.onLayoutChange}
          {...this.props}
          style={{
            height: "100%"
          }}
        >
          {this.generateDOM()}
        </ReactGridLayout>
      );
    }
  }