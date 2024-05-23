import REGL from "regl";
import CNoise from "./src/cnoise";
// import frag from './assets/glsl/generative_random.frag';
import * as dat from 'dat.gui';

const gui = new dat.GUI();

window.onload = async () => {
    let canvas = document.getElementById('canvas');
    canvas.width = 4096;
    canvas.height = 4096;
    let { width, height } = canvas;
    // 创建一个 regl 实例
    const regl = REGL({canvas,attributes: {preserveDrawingBuffer: true}});

    let shader = new CNoise(regl);
    
    shader.update();

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
        const imgUrl = canvas.toDataURL({multiplier: 4}); // 图像的DataURL

        console.log(imgUrl); // 输出图像的DataURL
    }
}
