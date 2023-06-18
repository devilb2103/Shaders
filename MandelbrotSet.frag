// #ifdef GL_ES
precision mediump float;
// #endif

uniform vec2 u_resolution;
uniform float u_time;

const float iterations = 30.0;

vec2 cpow(vec2 z, float p) {
    float angle = p * atan(z.y, z.x);
    float len = pow(length(z), p);
    return len * vec2(cos(angle), sin(angle));
}

void main() {
    vec2 uv = ((gl_FragCoord.xy / u_resolution) - vec2(0.5)) * 4.0;
    uv.x *= u_resolution.x / u_resolution.y;
    uv.x -= 0.75;
    vec2 z = vec2(0.0, 0.0);

    float q = 0.0;

    for (float i = 0.0; i < iterations; i++) {
        z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + uv;
        q = i;
        if (length(z) > 2.0) {
            break;
        }
    }

    vec3 col;
    if (q == iterations) {
        col = vec3(0.0);
    } else {
        col = vec3(float(q) / float(iterations));
    }

    gl_FragColor = vec4(col, 1.0);
}
