import G6 from '@antv/g6'


const nodes = {
    init() {
        G6.registerNode('route', {
            draw(cfg, group) {
                const shape = group.addShape('image', {
                    attrs: {
                        x: 0,
                        y: 0,
                        img: require('../../assets/images/route.png'),
                        width: cfg.size,
                        height: cfg.size
                    },
                    name: 'img-shape',
                    visiable : false
                });
                if (cfg.label) {
                    group.addShape('text', {
                        attrs: {
                            fill: '#000000',
                            textBaseline: 'bottom',
                            text: cfg.label,
                            //textAlign: 'center',
                            fontSize: 12
                        }, name: 'text-shape'
                    });
                }
                return shape;
            },
            setState(name, value, node) {
                const group = node.getContainer();
                //const children = group.get('children');
                const labelShape = group.find(e => e.get('name') === 'text-shape');
                //console.log(labelShape);
                if (name === 'changed') {
                    if (value) {
                        labelShape.attr('fill',"#0000FF")
                    }
                    else{
                        labelShape.attr('fill',"#000000")
                    }
                }
            }
        });

        G6.registerNode('pc', {
            draw(cfg, group) {
                const shape = group.addShape('image', {
                    attrs: {
                        x: 0,
                        y: 0,
                        img: require('../../assets/images/pc.png'),
                        width: cfg.size,
                        height: cfg.size
                    },
                    name: 'img-shape',
                    visiable : false
                });
                if (cfg.label) {
                    group.addShape('text', {
                        attrs: {
                            fill: '#000000',
                            textBaseline: 'bottom',
                            text: cfg.label,
                            //textAlign: 'center',
                            fontSize: 12
                        }, name: 'text-shape'
                    });
                }
                return shape;
            }
        })
    }
}

export default nodes