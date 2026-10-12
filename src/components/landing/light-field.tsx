"use client";
import { useEffect, useRef } from "react";

const vertex = `attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}`;

// Domain-warped noise in the brand blues, kept dark on the copy side so the
// headline always reads against midnight.
const fragment = `precision mediump float;
uniform vec2 r;uniform float t;uniform vec2 m;
float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float n(vec2 p){vec2 i=floor(p),f=fract(p);vec2 u=f*f*(3.-2.*f);
return mix(mix(h(i),h(i+vec2(1.,0.)),u.x),mix(h(i+vec2(0.,1.)),h(i+vec2(1.,1.)),u.x),u.y);}
float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<5;i++){v+=a*n(p);p=p*2.03+vec2(1.7,9.2);a*=.5;}return v;}
void main(){
vec2 uv=gl_FragCoord.xy/r;vec2 p=uv*vec2(r.x/r.y,1.)*1.7;float s=t*.045;
vec2 q=vec2(fbm(p+s),fbm(p+vec2(5.2,1.3)-s));
vec2 w=vec2(fbm(p+3.*q+vec2(1.7,9.2)+s*1.3),fbm(p+3.*q+vec2(8.3,2.8)-s));
float f=fbm(p+2.6*w);
vec3 mid=vec3(.027,.047,.075),deep=vec3(.035,.15,.25),cyan=vec3(.098,.737,.898),pale=vec3(.545,.875,.965);
vec3 c=mix(mid,deep,smoothstep(.25,.85,f));
c=mix(c,cyan,smoothstep(.45,1.,f*length(w))*.62);
c+=pale*pow(smoothstep(.58,1.,f),3.)*.38;
float d=distance(uv,m);c+=cyan*.16*exp(-d*d*14.);
float side=smoothstep(.18,.75,uv.x);
c=mix(mid,c,.18+side*.82);
gl_FragColor=vec4(c,1.);}`;

// A slow light field behind the hero. It starts after the page is idle,
// renders at reduced resolution, pauses off screen or in a hidden tab, and
// never runs with reduced motion, Save-Data or very low core counts.
export function LightField() {
  const canvas = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const el = canvas.current;
    if (!el) return;
    const nav = navigator as Navigator & {
      connection?: { saveData?: boolean };
    };
    if (
      matchMedia("(prefers-reduced-motion: reduce)").matches ||
      nav.connection?.saveData ||
      (navigator.hardwareConcurrency ?? 4) < 3
    )
      return;
    let raf = 0;
    let visible = true;
    let stopped = false;
    let gl: WebGLRenderingContext | null = null;
    let observer: IntersectionObserver | undefined;
    const mouse = { x: 0.72, y: 0.55, tx: 0.72, ty: 0.55 };
    const start = performance.now();
    let last = 0;
    let uR: WebGLUniformLocation | null = null;
    let uT: WebGLUniformLocation | null = null;
    let uM: WebGLUniformLocation | null = null;
    const resize = () => {
      if (!gl) return;
      const scale = window.innerWidth < 760 ? 0.35 : 0.5;
      el.width = Math.max(1, Math.round(el.clientWidth * scale));
      el.height = Math.max(1, Math.round(el.clientHeight * scale));
      gl.viewport(0, 0, el.width, el.height);
    };
    const draw = (now: number) => {
      raf = 0;
      if (stopped || !gl) return;
      if (visible && !document.hidden && now - last > 33) {
        last = now;
        mouse.x += (mouse.tx - mouse.x) * 0.05;
        mouse.y += (mouse.ty - mouse.y) * 0.05;
        gl.uniform2f(uR, el.width, el.height);
        gl.uniform1f(uT, (now - start) / 1000);
        gl.uniform2f(uM, mouse.x, mouse.y);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      }
      raf = requestAnimationFrame(draw);
    };
    const onPointer = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      mouse.tx = (e.clientX - r.left) / r.width;
      mouse.ty = 1 - (e.clientY - r.top) / r.height;
    };
    const init = () => {
      if (stopped) return;
      gl = el.getContext("webgl", {
        antialias: false,
        alpha: false,
        powerPreference: "low-power",
      });
      if (!gl) return;
      const compile = (type: number, src: string) => {
        const s = gl!.createShader(type)!;
        gl!.shaderSource(s, src);
        gl!.compileShader(s);
        return s;
      };
      const program = gl.createProgram()!;
      gl.attachShader(program, compile(gl.VERTEX_SHADER, vertex));
      gl.attachShader(program, compile(gl.FRAGMENT_SHADER, fragment));
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
      gl.useProgram(program);
      const buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
        gl.STATIC_DRAW,
      );
      const loc = gl.getAttribLocation(program, "p");
      gl.enableVertexAttribArray(loc);
      gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
      uR = gl.getUniformLocation(program, "r");
      uT = gl.getUniformLocation(program, "t");
      uM = gl.getUniformLocation(program, "m");
      resize();
      observer = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
      });
      observer.observe(el);
      window.addEventListener("resize", resize);
      window.addEventListener("pointermove", onPointer, { passive: true });
      raf = requestAnimationFrame(draw);
      el.setAttribute("data-ready", "");
    };
    const idle = (cb: () => void) =>
      "requestIdleCallback" in window
        ? window.requestIdleCallback(cb, { timeout: 2000 })
        : globalThis.setTimeout(cb, 1200);
    const begin = () => idle(init);
    if (document.readyState === "complete") begin();
    else window.addEventListener("load", begin, { once: true });
    return () => {
      stopped = true;
      cancelAnimationFrame(raf);
      observer?.disconnect();
      window.removeEventListener("load", begin);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointer);
      gl?.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);
  return (
    <div className="f-hero-light" aria-hidden="true">
      <span className="f-hero-aurora is-one" />
      <span className="f-hero-aurora is-two" />
      <canvas ref={canvas} />
    </div>
  );
}
