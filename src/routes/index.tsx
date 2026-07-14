import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { BackgroundMusic } from "@/components/BackgroundMusic";
import eye1 from "../assets/images/eye-1.png";
import eye2 from "../assets/images/eye-2.png";
import eye3 from "../assets/images/eye-3.png";
import eye4 from "../assets/images/eye-4.png";
import eye5 from "../assets/images/eye-5.png";
import eye6 from "../assets/images/eye-6.png";
import curlsPhoto from "../assets/images/vivi-curls.png";
import magnificaImg from "../assets/images/vivi-magnifica.png";
import pinkImg from "../assets/images/vivi-pink.png";
import starsImg from "../assets/images/vivi-stars.png";

const eyeImages = [eye1, eye2, eye3, eye4, eye5, eye6];

export const Route = createFileRoute("/")({
  component: Index,
});

// Small floating eye decorations scattered around the page
const eyePositions = [
  { top: "6%", left: "4%", size: 70, rotate: -12, delay: 0 },
  { top: "18%", right: "6%", size: 90, rotate: 8, delay: 0.4 },
  { top: "42%", left: "2%", size: 60, rotate: 15, delay: 0.8 },
  { top: "58%", right: "3%", size: 80, rotate: -6, delay: 1.2 },
  { top: "78%", left: "6%", size: 75, rotate: 10, delay: 0.6 },
  { top: "92%", right: "8%", size: 65, rotate: -14, delay: 1 },
];

function FloatingEyes() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {eyePositions.map((p, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 0.35, scale: 1 }}
          transition={{ duration: 1.4, delay: p.delay }}
          style={{
            position: "absolute",
            top: p.top,
            left: (p as any).left,
            right: (p as any).right,
            width: p.size,
            height: p.size,
            // @ts-expect-error css var
            "--r": `${p.rotate}deg`,
          }}
          className="animate-float-soft"
        >
          <div
            className="w-full h-full rounded-full overflow-hidden ring-2 ring-primary/30 shadow-[0_10px_30px_-10px_rgba(200,60,90,0.35)]"
            style={{
              backgroundImage: `url(${eyeImages[i % eyeImages.length]})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              transform: `rotate(${p.rotate}deg)`,
            }}
          />
        </motion.div>
      ))}
    </div>
  );
}

function Petals() {
  const petals = Array.from({ length: 14 });
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {petals.map((_, i) => {
        const left = Math.random() * 100;
        const dur = 12 + Math.random() * 14;
        const delay = Math.random() * 10;
        const size = 10 + Math.random() * 14;
        const drift = (Math.random() - 0.5) * 200;
        return (
          <span
            key={i}
            className="absolute animate-petal"
            style={{
              left: `${left}%`,
              width: size,
              height: size,
              // @ts-expect-error css var
              "--drift": `${drift}px`,
              animationDuration: `${dur}s`,
              animationDelay: `${delay}s`,
              background:
                "radial-gradient(circle at 30% 30%, oklch(0.9 0.09 15), oklch(0.7 0.16 10))",
              borderRadius: "60% 40% 60% 40% / 50% 60% 40% 50%",
              opacity: 0.65,
              filter: "blur(0.3px)",
            }}
          />
        );
      })}
    </div>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: "easeOut" as const } },
};


function Index() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.3]);

  return (
    <main className="relative min-h-screen overflow-x-hidden text-foreground">
      <BackgroundMusic />
      <Petals />

      {/* HERO — Cartinha de abertura */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center px-6 py-24">
        <FloatingEyes />
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 max-w-3xl text-center"
        >
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-sm md:text-base tracking-[0.4em] uppercase text-primary/70"
            style={{ fontFamily: "'Quicksand', sans-serif" }}
          >
            um cantinho pra
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4, delay: 0.2 }}
            className="mt-6 text-6xl md:text-8xl leading-none shimmer-text"
            style={{ fontFamily: "'Dancing Script', cursive", fontWeight: 700 }}
          >
            Vivizinha
          </motion.h1>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: 0.8 }}
            className="mx-auto mt-8 h-px w-40 origin-center bg-gradient-to-r from-transparent via-primary to-transparent"
          />

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ delay: 1 }}
            className="mt-8 text-lg md:text-2xl italic text-foreground/80 leading-relaxed"
          >
            Oi vivizinha — tudo bem? Espero que sim, neném.
            <br />
            Esse cantinho aqui é só teu.{" "}
            <span className="text-primary font-medium not-italic">Volta sempre que precisar.</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            className="mt-14 flex flex-col items-center gap-2 text-primary/60"
          >
            <span className="text-xs tracking-[0.3em] uppercase" style={{ fontFamily: "'Quicksand', sans-serif" }}>
              role com carinho
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-2xl"
            >
              ↓
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* SECTION 2 — Curls photo + text */}
      <section className="relative px-6 py-24 md:py-32">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2 md:items-center">
          <motion.div
            initial={{ opacity: 0, x: -60, rotate: -3 }}
            whileInView={{ opacity: 1, x: 0, rotate: -2 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-primary/20 to-accent/40 blur-2xl" />
            <img
              src={curlsPhoto}
              alt="Vivizinha"
              className="relative w-full rounded-[2rem] shadow-2xl ring-1 ring-primary/20"
              loading="lazy"
            />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute -top-6 -right-6 text-3xl"
            >
              ✿
            </motion.div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            <p className="text-xs tracking-[0.4em] uppercase text-primary/70" style={{ fontFamily: "'Quicksand', sans-serif" }}>
              cartinha nº 1
            </p>
            <h2 className="mt-4 text-4xl md:text-5xl text-foreground/90" style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic" }}>
              pra você, do jeitinho que você é
            </h2>
            <div className="mt-8 space-y-5 text-base md:text-lg leading-relaxed text-foreground/80 italic">
              <p>
                Eu espero que essa sua tristeza passe como se fosse nada. Eu te odeio ver triste, e me dói um pouquinho saber que eu não sou <em>tão assim</em> teu refúgio de coisas ruins e sentimentos ruins.
              </p>
              <p>
                Mas olha — pelo menos às vezes eu consigo tirar um sorrisinho lindo desse teu rostinho perfeito, não é meu bem?{" "}
                <span className="not-italic text-primary font-medium">Espero que sim, minha aphrodite.</span>
              </p>
              <p>
                Infelizmente não tenho muitas fotinhas suas — queria ter, mas você também não me ajuda. Então fiz com o que tenho, e espero muito que você goste, até porque eu mesmo amei. Só de ter visto teu sorriso e teus olhinhos em praticamente todas as fotos, já fez meu dia inteiro.
              </p>
              <p className="not-italic text-primary/90 font-medium">
                (Você é literalmente a minha mulher maravilha.) ✿
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 3 — Magnífica */}
      <section className="relative px-6 py-24 md:py-32">
        <div className="mx-auto max-w-5xl text-center">
          <motion.p
            initial={{ opacity: 0, letterSpacing: "0.1em" }}
            whileInView={{ opacity: 1, letterSpacing: "0.5em" }}
            viewport={{ once: true }}
            transition={{ duration: 1.6 }}
            className="text-xs uppercase text-primary/70"
            style={{ fontFamily: "'Quicksand', sans-serif" }}
          >
            olha só que magnífica
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1 }}
            className="mt-6 text-5xl md:text-7xl shimmer-text"
            style={{ fontFamily: "'Dancing Script', cursive", fontWeight: 700 }}
          >
            simplesmente ela
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 60 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto mt-16 max-w-2xl"
        >
          <div className="absolute -inset-8 rounded-[3rem] bg-gradient-to-tr from-primary/30 via-accent/40 to-primary/20 blur-3xl" />
          <div className="relative overflow-hidden rounded-[2.5rem] shadow-[0_30px_80px_-20px_rgba(200,60,90,0.4)] ring-1 ring-primary/30">
            <img
              src={magnificaImg}
              alt="Vivizinha, magnífica"
              className="w-full"
              loading="lazy"
            />
          </div>
          <motion.span
            animate={{ y: [0, -8, 0], rotate: [0, 10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute -top-4 -left-4 text-4xl drop-shadow"
          >
            ✧
          </motion.span>
          <motion.span
            animate={{ y: [0, 8, 0], rotate: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute -bottom-4 -right-4 text-4xl drop-shadow"
          >
            ✿
          </motion.span>
        </motion.div>
      </section>

      {/* GALLERY — restante das fotos */}
      <section className="relative px-6 py-24 md:py-32">
        <div className="mx-auto max-w-6xl">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center text-4xl md:text-5xl text-foreground/90"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic" }}
          >
            momentos da vivi
          </motion.h2>

          <div className="mt-16 grid gap-8 md:grid-cols-2">
            {[
              { src: pinkImg, rotate: -3, caption: "estrelinha rosa" },
              { src: starsImg, rotate: 3, caption: "cheia de estrelas" },
            ].map((it, i) => (
              <motion.figure
                key={i}
                initial={{ opacity: 0, y: 60, rotate: 0 }}
                whileInView={{ opacity: 1, y: 0, rotate: it.rotate }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 1, delay: i * 0.15 }}
                whileHover={{ rotate: 0, scale: 1.02 }}
                className="group relative"
              >
                <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-primary/25 to-accent/40 blur-2xl opacity-70 group-hover:opacity-100 transition-opacity" />
                <img
                  src={it.src}
                  alt={it.caption}
                  loading="lazy"
                  className="relative w-full rounded-[1.5rem] shadow-2xl ring-1 ring-primary/20"
                />
                <figcaption
                  className="mt-4 text-center text-primary/80 italic"
                  style={{ fontFamily: "'Dancing Script', cursive", fontSize: "1.5rem" }}
                >
                  {it.caption}
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      {/* RECADINHOS — cuida de você, cabesuda */}
      <section className="relative px-6 py-24 md:py-32">
        <div className="mx-auto max-w-4xl">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-xs tracking-[0.4em] uppercase text-primary/70"
            style={{ fontFamily: "'Quicksand', sans-serif" }}
          >
            recadinhos importantíssimos
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="mt-4 text-center text-4xl md:text-5xl shimmer-text"
            style={{ fontFamily: "'Dancing Script', cursive", fontWeight: 700 }}
          >
            se cuida, minha labubuzinha
          </motion.h2>

          <div className="mt-14 grid gap-5">
            {[
              "come direitinho — nada de miojo, isso aí é coisa de gente autista, e autista você não é não, minha labubuzinha boobiegoodies",
              "TOMA ÁGUA. não fica com pedra no rim não, louca — eu quero ainda dormir contigo em estado pleno",
              "e você não pode se levantar enquanto dorme não, cabesuda (isso é ordem ✿)",
            ].map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.8, delay: i * 0.08 }}
                className="rounded-2xl border border-primary/20 bg-card/60 backdrop-blur-sm p-5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all"
              >
                <div className="flex items-start gap-3">
                  <span className="mt-1 text-primary text-xl animate-heartbeat">♡</span>
                  <p className="italic text-foreground/80 leading-relaxed">{m}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            className="mx-auto mt-14 max-w-2xl space-y-5 text-center text-base md:text-lg leading-relaxed text-foreground/80 italic"
          >
            <p>
              Do fundo do meu coração — eu espero muito que você esteja bem.
              <br />
              Eu trocaria qualquer um pra estar do teu lado.
            </p>
            <p className="not-italic text-primary font-medium">
              (Do teu lado. Você é literalmente a segunda parte da minha alma.)
            </p>
          </motion.div>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            className="mx-auto mt-8 max-w-2xl text-center text-lg md:text-xl italic leading-relaxed text-foreground/80"
          >
            Eu te amo muito, viu?{" "}
            <span className="not-italic text-primary font-medium">
              E volta logo, tá?
            </span>{" "}
            Tô gostando disso não, você aí sumida não — tô aquelas coisas não.
          </motion.p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative px-6 py-16 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
          className="text-2xl md:text-3xl shimmer-text"
          style={{ fontFamily: "'Dancing Script', cursive", fontWeight: 700 }}
        >
          te amo, vivi ✿
        </motion.p>
        <p className="mt-4 text-xs tracking-[0.3em] uppercase text-primary/50" style={{ fontFamily: "'Quicksand', sans-serif" }}>
          feito com muito carinho
        </p>
      </footer>
    </main>
  );
}
