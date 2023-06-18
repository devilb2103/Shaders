precision mediump float;

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

uniform sampler2D u_texture_2;

vec2 N(float angle) {
    return vec2(sin(angle), cos(angle));
}

void main() {
    // normalizing uv cooridnates, mouse cooridenates and seting aspect ratio
    vec2 uv = ((gl_FragCoord.xy / u_resolution) - vec2(.5)) * 2.0;
    uv.x *= u_resolution.x / u_resolution.y;
    vec2 mouse = u_mouse.xy / u_resolution;

    vec3 col = vec3(0);

    uv *= 0.75;
    uv.x = abs(uv.x);
    uv.y -= 0.28;

    vec2 n = N((.5 / .6) * 3.1418);
    uv -= n * max(0.0, dot(uv - vec2(0.5, 0), n)) * 2.;

    n = N((0.24 * u_time));
    uv.x += 0.5;
    float scale = 1.2;

    for (int i = 0; i < 6; i++) {

        // scale out uv and reposition it on x axis
        uv *= 3.0;
        scale *= 3.0;
        uv.x -= 1.5;

        // mirror the uv and move rhs rightby 0.5
        uv.x = abs(uv.x);
        uv.x -= 0.5;

        // mirroring code
        uv -= n * min(0.0, dot(uv, n)) * 2.;

    }
    // drawing line code
    float d = length(uv - vec2(clamp(uv.x * 0., -1.0, 1.0), 0));
    col += smoothstep(1. / u_resolution.y, 0.0, d / scale);
    col.rg += uv / scale;
    col += texture2D(u_texture_2, uv * 0.01 + u_time * 0.8).rgb;
    // texture2D

    // output color
    gl_FragColor = vec4(col, 1.0);
}