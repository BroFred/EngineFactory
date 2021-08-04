import React, { useEffect, useRef, useState } from 'react';
import { map, addIndex } from 'ramda';
import { DndProvider, useDrag, useDrop } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { insert, remove } from 'ramda';

const baseWith = 920;
const Draggable = ({ children, dragId, onChange, ratio }) => {
  const dropRef = useRef(null);
  const dragRef = useRef(null);
  const [h, setH] =useState(100*ratio);
  const [w, setW] =useState(400*ratio);
  const [{ isDragging }, drag] = useDrag(() => ({
    item: { itemID: dragId },
    type: 'child',
    canDrag: true,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }), []);
  const [collectedProps, drop] = useDrop(() => ({
    drop: (item, monitor) => {
      onChange(monitor.getItem().itemID, dragId)
    },
    accept: 'child'
  }))
  drop(dragRef);
  drag(dragRef);
  useEffect(()=>{
    setH(100*ratio);
    setW(400*ratio);
  },[ratio])
  useEffect(()=>{
    if(dropRef.current){
      new ResizeObserver((entries)=>console.log(entries[0].borderBoxSize[0])).observe(dropRef.current)
    }
  },[dropRef.current])

  return<div style={{
    resize: 'both',
    height: h,
    width: w,
    overflow: 'auto',
  }} ref={dragRef}>{children}</div>
}
const replace = (index, elem, arr) => insert(index, elem, remove(index, 1, arr));

export default class BasicLayout extends React.PureComponent {
  static defaultProps = {
    className: "layout",
    items: 20,
    rowHeight: 100,
    onLayoutChange: function () { },
    cols: 12
  };

  constructor(props) {
    super(props);

    const layout = this.generateLayout();
    this.state = { layout, childrenRerange: this.props.children, ratio: window.innerWidth/920 };
  }

  onChange = (from, to) => {
    const source = this.state.childrenRerange[from];
    const target = this.state.childrenRerange[to];
    const newChild = replace(to, source, replace(from, target, this.state.childrenRerange));
    this.setState({ childrenRerange: newChild })
  }
  onResize = () =>{
    this.setState({ratio: window.innerWidth/920 })
  }
  componentDidMount(){
    window.addEventListener('resize', this.onResize);

  }
  generateDOM() {
    return addIndex(map)((elem, i) => {
      return (
        <div key={i} style={{
          resize: 'both',
          height: 100,
          width: 400,
          overflow: 'auto',
        }}>
          {
            elem
          }
        </div>
      );
    }, this.props.children);
  }

  generateLayout() {
    const p = this.props;
    return addIndex(map)(function (item, i) {
      const y = p.y || Math.ceil(Math.random() * 4) + 1;
      return {
        x: (i * 2) % 12,
        y: Math.floor(i / 6) * y,
        w: 2,
        h: y,
        i: i.toString()
      };
    }, new Array(p.items));
  }

  onLayoutChange(layout) {
    this.props.onLayoutChange(layout);
  }

  render() {
    console.log(this.state.ratio)
    return (
      <DndProvider backend={HTML5Backend}>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap'
          }}
        >
          {addIndex(map)((elem, i) => {
            return (
                <Draggable key={i} dragId={i} onChange={this.onChange} ratio={this.state.ratio}>
                  {
                    elem
                  }
                </Draggable>
            );
          }, this.state.childrenRerange)}
        </div>
      </DndProvider>
    );
  }
}