
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2    u_resolution;
uniform float   u_time;
uniform vec3    u_color;

#extension GL_GOOGLE_include_directive : enable
#include "/node_modules/lygia/generative/cnoise.glsl"

void main(void) {
    // vec4 color = vec4(vec3(0.0), 1.0);
    // vec2 pixel = 1.0/u_resolution.xy;
    // vec2 st = gl_FragCoord.xy * pixel;

    // float d2 = cnoise(vec2(st * 5. + u_time)) * 0.5 + 0.5;
    // float d3 = cnoise(vec3(st * 5., u_time)) * 0.5 + 0.5;
    
    // color += mix(d2, d3, step(0.5, st.x));

    // gl_FragColor = color;

    vec2 p = (gl_FragCoord.xy/u_resolution.y) * 2.0 - 1.0;

    vec3 xyz = vec3(p, 0);

    float n = cnoise(xyz.xy * 4.0 * 1.5);

    // gl_FragColor = vec4(vec3(0.5 + 0.5 * vec3(n, n, n)),1.0);
    gl_FragColor = vec4(vec3(0.5 + 0.5 * vec3(n, n, n))+u_color,1.0);
}