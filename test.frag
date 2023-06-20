precision mediump float;

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;

void main() {

    vec2 uv = ((gl_FragCoord.xy / u_resolution) - vec2(0.5)) * 2.0;
    uv.x *= u_resolution.x / u_resolution.y;

    uv = fract(uv * 2.);
    uv -= 0.5;
    // uv *= 4.;

    vec3 col = vec3(0.0);

    float d = length(uv);
    d = sin(d * 8. + u_time) / 8.;
    d = pow(step(0.1, d), 1.2);
    col += d;

    gl_FragColor = vec4(col, 1.0);
}