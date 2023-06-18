precision mediump float;

uniform vec2 u_resolution;
uniform float u_time;

const int MAX_ITERATIONS = 100000;
const float ZOOM_FACTOR = 2.0;
const vec2 CAMERA_POSITION = vec2(-1.0, -1.0);
const vec2 JULIA_CONSTANT = vec2(-0.8, 0.156);

void main() {
    vec2 uv = (2.0 * gl_FragCoord.xy - u_resolution) / min(u_resolution.x, u_resolution.y);
    uv.x *= u_resolution.x / u_resolution.y;

  // Calculate the zoom level
    float zoom = pow(ZOOM_FACTOR, u_time);

  // Calculate the new camera position based on zoom
    vec2 cameraPosition = CAMERA_POSITION / zoom;

  // Calculate the zoomed coordinates
    vec2 zoomedUV = (uv + 1.0) / zoom + cameraPosition;

    vec2 z = vec2(zoomedUV.x, zoomedUV.y);

    float iterations = 0.0;

    for (int i = 0; i < MAX_ITERATIONS; i++) {
        if (z.x * z.x + z.y * z.y > 3.) {
            break;
        }

        vec2 temp = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y);
        z = temp + JULIA_CONSTANT;

        iterations = float(i);
        float brightness = iterations / float(MAX_ITERATIONS);
        brightness = pow(brightness, 0.4 / float(i / 60)); // Adjust brightness scaling factor

        gl_FragColor = vec4(vec3(brightness), 1.0);
    }

}
