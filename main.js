import REGL from "regl";
import vert from './assets/glsl/common.vert';
import frag from './assets/glsl/generative_noised.frag';
// import frag from './assets/glsl/generative_cnoise.frag';
// import frag from './assets/glsl/generative_random.frag';

window.onload = async () => {
    let canvas = document.getElementById('canvas');
    let { width, height } = canvas;
    // 创建一个 regl 实例
    const regl = REGL({canvas,attributes: {preserveDrawingBuffer: true}});

    // var framebuffer = regl.framebuffer({
    //     width,
    //     height,
    //     colorFormat: 'rgba',
    //     colorType: 'float'
    // })

    // 定义一个绘制正方形的命令
    const drawSquare = regl({
        // preserveDrawingBuffer:true,
        // framebuffer,
        // 顶点着色器
        vert,

        // 片段着色器
        frag,
        //   frag: `
        //     precision highp float;
        //     void main() {
        //       gl_FragColor = vec4(1, 0, 0, 1);
        //     }
        //   `,

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

        uniforms: {
            // This defines the color of the triangle to be a dynamic variable
            u_time: regl.prop('u_time'),
            u_resolution: ({ viewportWidth, viewportHeight }) => [viewportWidth, viewportHeight]
        },
    });


    // 绘制正方形
    // drawSquare();
    regl.frame(({ time }) => {
        // clear contents of the drawing buffer
        regl.clear({
            color: [0, 0, 0, 0],
            depth: 1
        })

        // draw a triangle using the command defined above
        drawSquare({
            u_time: time,
            // u_resolution:[width, height]
        })
    })

    canvas.onclick = (e) => {
        // 读取帧缓冲的像素数据为图像
        const data = regl.read({
            // framebuffer,
            x: 0,
            y: 0,
            width,
            height,
        });

        // 导出图像
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        const imageData = new ImageData(new Uint8ClampedArray(data), width, height);
        ctx.putImageData(imageData, 0, 0);
        const imgUrl = canvas.toDataURL(); // 图像的DataURL

        console.log(imgUrl); // 输出图像的DataURL
    }
}
