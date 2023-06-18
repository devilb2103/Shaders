#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

/* Color palette */
#define BLACK           vec3(0.0, 0.0, 0.0)
#define WHITE           vec3(1.0, 1.0, 1.0)
#define RED             vec3(1.0, 0.0, 0.0)
#define GREEN           vec3(0.0, 1.0, 0.0)
#define BLUE            vec3(0.65, 0.85, 1.0)
#define YELLOW          vec3(1.0, 1.0, 0.0)
#define CYAN            vec3(0.0, 1.0, 1.0)
#define MAGENTA         vec3(1.0, 0.0, 1.0)
#define ORANGE          vec3(0.9, 0.6, 0.3)
#define PURPLE          vec3(1.0, 0.0, 0.5)
#define LIME            vec3(0.5, 1.0, 0.0)
#define ACQUA           vec3(0.0, 1.0, 0.5)
#define VIOLET          vec3(0.5, 0.0, 1.0)
#define AZUR            vec3(0.0, 0.5, 1.0)

float SDF_Circle(vec2 pos, float radius) {
    return length(pos) - radius;
}

void main() {
    vec2 uv = ((gl_FragCoord.xy / u_resolution) - vec2(0.5)) * 16.0;
    uv.x *= u_resolution.x / u_resolution.y;

    float radius = 2.5;
    vec2 centre = vec2(0.0);

    float d = SDF_Circle(uv - centre, radius);
    vec3 col = vec3(0.0);
    col = d < 0.0 ? BLUE : ORANGE;
    col *= pow(1.0 - exp(-2.0 * abs(d)), 0.3);
    col *= sin(d * 100.0 + (u_time * 2.0)) - 0.1;

    gl_FragColor = vec4(col, 1.2);
}