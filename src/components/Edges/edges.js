import G6 from '@antv/g6'
import { compare } from '@antv/g6/lib/util/math';
import { transform, mat3 } from '@antv/matrix-util';

const edges = {
  init() {
    G6.registerEdge('circle-running', {
      options: {
        style: {
          stroke: '#000',
        },
      },
      update: undefined,
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
            lineAppendWidth: 5
          },
          name: 'path-shape',
        });
        return shape;
      },
      setState(name, value, item) {
        const group = item.getContainer()
        const shape = item.get('keyShape');
        const startPoint = shape.getPoint(0);
        const endPoint = shape.getPoint(1);
        var uniq = Date.now().toString(36);
        if (name === 'ICMP_0' && value) {
          const tri = group.addShape('marker', {
            attrs: {
              id: uniq,
              x: startPoint.x,
              y: startPoint.y,
              symbol: 'triangle',
              fill: startPoint.x < endPoint.x ? 'red' : "blue",
              r: 5
            }
          });
          tri.animate({
            repeat: false,
            onFrame(ratio) {
              const tmpPoint = shape.getPoint(ratio);
              return {
                x: tmpPoint.x,
                y: tmpPoint.y
              };
            }
          }, 3000);
          setTimeout(function () {
            const children = group.get('children');
            children.forEach(child => {
              if (child["attrs"]["id"] === uniq) {
                group.removeChild(child);
              }
            });
          }, 3000);
        }
        if (name === 'ICMP_1' && value) {
          console.log(startPoint.x);
          console.log(endPoint.x);
          const tri = group.addShape('marker', {
            attrs: {
              id: uniq,
              x: endPoint.x,
              y: endPoint.y,
              symbol: 'triangle',
              fill: startPoint.x > endPoint.x ? 'red' : "blue",
              r: 5
            }
          });
          tri.animate({
            repeat: false,
            onFrame(ratio) {
              const tmpPoint = shape.getPoint(1 - ratio);
              return {
                x: tmpPoint.x,
                y: tmpPoint.y
              };
            }
          }, 3000);
          setTimeout(function () {
            const children = group.get('children');
            children.forEach(child => {
              if (child["attrs"]["id"] === uniq) {
                group.removeChild(child);
              }
            });
          }, 3000);
        }
        if (name === 'BGP_0' && value) {
          const circle = group.addShape('circle', {
            attrs: {
              id: uniq,
              x: startPoint.x,
              y: startPoint.y,
              fill: startPoint.x < endPoint.x ? 'red' : "blue",
              r: 5
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
          }, 3000);
          setTimeout(function () {
            const children = group.get('children');
            children.forEach(child => {
              if (child["attrs"]["id"] === uniq) {
                group.removeChild(child);
              }
            });
          }, 3000);
        }
        if (name === 'BGP_1' && value) {
          const circle = group.addShape('circle', {
            attrs: {
              id: uniq,
              x: endPoint.x,
              y: endPoint.y,
              fill: startPoint.x > endPoint.x ? 'red' : "blue",
              r: 5
            }
          });
          circle.animate({
            repeat: false,
            onFrame(ratio) {
              const tmpPoint = shape.getPoint(1 - ratio);
              return {
                x: tmpPoint.x,
                y: tmpPoint.y
              };
            }
          }, 3000);
          setTimeout(function () {
            const children = group.get('children');
            children.forEach(child => {
              if (child["attrs"]["id"] === uniq) {
                group.removeChild(child);
              }
            });
          }, 3000);
        }
      },

    });
  }
}

export default edges