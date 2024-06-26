export default class Base {
    constructor(regl, vert, frag, uniform) {
        const uniforms = {
            u_time: regl.prop('u_time'),
            u_resolution: ({ viewportWidth, viewportHeight }) => [viewportWidth, viewportHeight]
        }
        for(let key in uniform){
            if(key.includes("u_")){
                uniforms[key] = regl.prop(key);
            }
        }
        // Object.assign(uniforms,uniform);
        this.uniforms = uniforms;
        this.regl = regl;
        this.draw = this.regl({
            vert,
            frag,
            // 属性
            attributes: {
                position: [
                    [-1.0, 1.0], // 左上角
                    [1.0, 1.0],  // 右上角
                    [-1.0, -1.0], // 左下角
                    [1.0, -1.0]  // 右下角
                ]
            },

            // 索引
            elements: [
                0, 1, 2,
                2, 1, 3
            ],
            uniforms
        });
    }

    update(uniforms) {
        this.regl.frame(({ u_time }) => {
            this.regl.clear({
                color: [0, 0, 0, 0],
                depth: 1
            })
            // Object.assign(this.uniforms,uniform);
            // console.log(uniforms.u_color)
            Object.assign(uniforms,{ u_time })
            this.draw(uniforms)
        })
    }
}

