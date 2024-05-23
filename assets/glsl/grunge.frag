#version 300 es
precision highp float;

// 输入 UV 坐标
in vec2 v_uv;

// 输出颜色
out vec4 fragColor;

// Perlin 噪声函数
float pnoise(vec2 uv) {
    // 在此实现你自己的 Perlin 噪声函数
    return 0.0;
}

// 随机数函数
float random(vec2 uv) {
    return fract(sin(dot(uv, vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
    // 生成 Perlin 噪声
    float noise = pnoise(v_uv * 10.0);

    // 添加随机斑点
    float spots = random(v_uv * 20.0) * 0.5;

    // 模拟划痕效果
    float scratches = abs(sin(v_uv.x * 100.0) * 0.1) + 
                      abs(sin(v_uv.y * 50.0) * 0.2);

    // 将噪声、斑点和划痕效果混合
    float result = noise + spots + scratches;

    // 调整最终颜色
    vec3 color = vec3(result * 0.7, result * 0.5, result * 0.3);
    gl_FragColor = vec4(color, 1.0);
}