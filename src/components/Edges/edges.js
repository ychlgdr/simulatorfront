import G6 from '@antv/g6'


const edges = {
  init() {
    G6.registerEdge('circle-running', {
      labelAutoRotate: true,
      options: {
        style: {
          stroke: '#000',
        },
      },
      draw(cfg, group) {
        const startPoint = cfg.startPoint;
        const endPoint = cfg.endPoint;
        const stroke = (cfg.style && cfg.style.stroke) || this.options.style.stroke;
    
        const shape = group.addShape('path', {
          attrs: {
            stroke,
            path: [
              ['M', startPoint.x, startPoint.y],
              ['L', endPoint.x, endPoint.y],
            ],
          },
          name: 'path-shape',
        });
        if (cfg.label && cfg.label.length) {
          // the left label
          group.addShape('text', {
            attrs: {
              text: cfg.label[0],
              fill: '#595959',
              textAlign: 'start',
              textBaseline: 'middle',
              x: startPoint.x - 60,
              y: startPoint.y - 10,
            },
            name: 'left-text-shape',
          });
          if (cfg.label.length > 1) {
            // the right label
            group.addShape('text', {
              attrs: {
                text: cfg.label[1],
                fill: '#595959',
                textAlign: 'end',
                textBaseline: 'middle',
                x: endPoint.x + 60,
                y: endPoint.y - 10,
              },
              name: 'right-text-shape',
            });
          }
        }
        // return the keyShape
        return shape;
      },
      setState(name, value, item) {
        console.log("changing..............")
        const group = item.getContainer()
        const shape = item.get('keyShape');
        const startPoint = shape.getPoint(0);
        if (name === 'val1') {
          if (value) {
            var uniq = Date.now().toString(36);
            const circle = group.addShape('circle', {
              attrs: {
                id: uniq,
                x: startPoint.x,
                y: startPoint.y,
                fill: 'red',
                r: 3
              }
            });
            circle.animate({
              repeat: false,
              onFrame(ratio) {
                const tmpPoint = shape.getPoint(ratio);
                return {
                  x: tmpPoint.x,
                  y: tmpPoint.y
                };
              }
            }, 300);
            setTimeout(function () {
              const children = group.get('children');
              //console.log(children[1]["attrs"]["id"])
              children.forEach(child => {
                if (child["attrs"]["id"] === uniq) {
                  group.removeChild(child);
                }
              });
            }, 300);
          } else {
           /* const children = group.get('children');
            children.forEach(child => {
              if (child["attrs"]["id"] === "redball") {
                group.removeChild(child);
              }
            });*/
          }
        }
        else if (name === 'val2') {
          if (value) {
            var uniq = Date.now().toString(36);
            const circle = group.addShape('circle', {
              attrs: {
                id: uniq,
                x: startPoint.x,
                y: startPoint.y,
                fill: 'blue',
                r: 3
              }
            });
            circle.animate({
              // 动画重复
              repeat: false,
              // 每一帧的操作，入参 ratio：这一帧的比例值（Number）。返回值：这一帧需要变化的参数集（Object）。
              onFrame(ratio) {
                // 根据比例值，获得在边 path 上对应比例的位置。
                const tmpPoint = shape.getPoint(ratio);
                // 返回需要变化的参数集，这里返回了位置 x 和 y
                return {
                  x: tmpPoint.x,
                  y: tmpPoint.y
                };
              }
            }, 3000); // 一次动画的时间长度
            setTimeout(function () {
              const children = group.get('children');
              //console.log(children[1]["attrs"]["id"])
              children.forEach(child => {
                if (child["attrs"]["id"] === uniq ){
                  group.removeChild(child);
                }
              });
            }, 3000);
          } else {
           /* const children = group.get('children');
            //console.log(children[1]["attrs"]["id"])
            children.forEach(child => {
              if (child["attrs"]["id"] === "blueball") {
                group.removeChild(child);
              }
            });*/
          }
        }
      },

    });
  }
}

export default edges