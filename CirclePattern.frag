#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

vec3 palette(float t) {

    vec3 a = vec3(0.5, 0.5, 0.5);
    vec3 b = vec3(0.5, 0.5, 0.5);
    vec3 c = vec3(1, 1, 1);
    vec3 d = vec3(0.263, 0.416, 0.557);

    return a + b * cos(6.28318 * (c * t * d));
}

void main() {
    // converts 2d space into the range -1.0 to 1.0 and centre is 0.0
    vec2 uv = ((gl_FragCoord.xy / u_resolution) - vec2(.5)) * 2.0;
    // maintains aspect ratio and prevents scaling of shader
    uv.x *= u_resolution.x / u_resolution.y;
    vec2 uv0 = uv;
    vec3 finalCol = vec3(0.0);

    for (float i = 0.0; i < 3.; i++) {
        // uv *= 2.;
        // uv = fract(uv);
        // uv -= 0.5;
        uv = fract(uv * 1.5) - 0.5;

        //calculates distance of each uv pixel from the origin
        float d = length(uv) * exp(-length(uv0));

        // gives different color wrt time slowed by 40%
        vec3 col = palette(length(uv0) + i * 0.4 + u_time * 0.4);

        d = sin(d * 8. + u_time) / 8.;
        d = abs(d);

        d = pow(0.01 / d, 1.2);

        finalCol += col * d;
    }

    gl_FragColor = vec4(finalCol, 1.2);
    // gl_FragColor = vec4(uv, 0.0, 1.0);
}