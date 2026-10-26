import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { site, skills, projects } from "@/content/site";
import { NetworkBackground } from "@/components/NetworkBackground";
import { Button } from "@/components/ui/button";

const TITLE = "Vipin Saket Portfolio";
const DESC =
  "Vipin Saket, B.Tech CSE-AIML student at RGPV: Python, machine learning and data analysis skills and projects.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const nav = ["About", "Skills", "Projects", "Education", "Learning", "Contact"];

async function downloadResume(e: React.MouseEvent) {
  e.preventDefault();
  try {
    const r = await fetch(site.resumePath, { method: "HEAD" });
    const type = r.headers.get("content-type") ?? "";
    if (!r.ok || !type.includes("pdf")) throw new Error();
    const a = document.createElement("a");
    a.href = site.resumePath;
    a.download = "Vipin-Saket-Resume.pdf";
    a.click();
  } catch {
    alert("Resume will be available soon. Please contact me by email meanwhile.");
  }
}

const btn =
  "inline-flex items-center justify-center rounded-lg px-5 py-3 text-sm font-medium transition hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-ring";
const btnPrimary = `${btn} bg-gradient-brand text-primary-foreground shadow-glow`;
const btnGhost = `${btn} border border-border bg-card/60 hover:border-primary`;

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mx-auto max-w-6xl scroll-mt-20 px-5 py-20">
      <h2 className="mb-10 text-3xl font-bold md:text-4xl">
        <span className="text-gradient">{title}</span>
      </h2>
      {children}
    </section>
  );
}

function Index() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const ids = nav.map((n) => n.toLowerCase());
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        // Active = last section whose top has crossed just below the sticky header.
        let current = "";
        // At the very bottom of the page, force the last section active
        // (it may never cross the reference line otherwise).
        if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
          current = ids[ids.length - 1] ?? "";
        } else {
          const y = window.scrollY + 140;
          for (const id of ids) {
            const el = document.getElementById(id);
            if (el && el.offsetTop <= y) current = id;
          }
        }
        setActive(current);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="bg-grid min-h-screen">
      <NetworkBackground />
      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4" aria-label="Main">
          <a href="#top" className="font-display text-lg font-bold">
            Vipin<span className="text-gradient">.ai</span>
          </a>
          <Button variant="ghost" size="icon" className="md:hidden" aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen(!open)}>
            ☰
          </Button>
          <ul className={`${open ? "flex" : "hidden"} absolute left-0 right-0 top-full flex-col gap-4 border-b border-border bg-background p-5 md:static md:flex md:flex-row md:border-0 md:bg-transparent md:p-0`}>
            {nav.map((n) => (
              <li key={n}>
                <a
                  href={`#${n.toLowerCase()}`}
                  onClick={() => setOpen(false)}
                  aria-current={active === n.toLowerCase() ? "true" : undefined}
                  className={`relative text-sm transition-colors hover:text-foreground ${
                    active === n.toLowerCase()
                      ? "font-semibold text-primary after:absolute after:-bottom-1.5 after:left-0 after:right-0 after:h-0.5 after:rounded-full after:bg-gradient-brand"
                      : "text-muted-foreground"
                  }`}
                >
                  {n}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main id="top" className="relative z-10">
        <section className="mx-auto flex min-h-[min(680px,76svh)] max-w-6xl flex-col justify-center border-b border-border/60 px-5 py-14 sm:py-16">
          <p className="animate-fade-up mb-5 flex items-center gap-3 text-sm font-medium text-primary"><span className="h-px w-8 bg-primary" aria-hidden="true" />Hello, I'm</p>
          <h1 className="animate-fade-up text-5xl font-bold leading-tight sm:text-6xl md:text-7xl lg:text-8xl">{site.name}</h1>
          <p className="animate-fade-up mt-3 font-display text-xl text-gradient sm:text-2xl md:text-3xl">{site.title}</p>
          <p className="animate-fade-up mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">{site.intro}</p>
          <div className="animate-fade-up mt-8 flex flex-wrap items-center gap-3">
            <Button asChild size="lg" className="h-12 bg-gradient-brand text-primary-foreground"><a href="#projects">View Projects <span aria-hidden="true">↗</span></a></Button>
            <Button asChild variant="outline" size="lg" className="h-12 bg-background/80 hover:bg-secondary"><a href={site.resumePath} onClick={downloadResume}>Download Resume <span aria-hidden="true">↓</span></a></Button>
            <Button asChild variant="link" className="h-12 text-foreground"><a href="#contact">Contact Me <span aria-hidden="true">→</span></a></Button>
          </div>
          <p className="animate-fade-up mt-9 text-sm text-muted-foreground">B.Tech CSE · AI & ML <span className="mx-2 text-primary" aria-hidden="true">/</span> Class of 2027</p>
        </section>

        <Section id="about" title="About Me">
          <p className="max-w-3xl text-lg leading-relaxed text-muted-foreground">
            I'm a B.Tech Computer Science (AI & ML) student at Rajiv Gandhi Proudyogiki Vishwavidyalaya Bhopal, Madhya Pradesh.
            I'm interested in <strong className="text-foreground">Python</strong>,{" "}
            <strong className="text-foreground">Machine Learning</strong>,{" "}
            <strong className="text-foreground">Artificial Intelligence</strong> and{" "}
            <strong className="text-foreground">Data Analysis</strong>, and I enjoy turning raw data into insights and working models.
          </p>
        </Section>

        <Section id="skills" title="Skills">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {skills.map((s) => (
              <div key={s.group} className="rounded-xl border border-border bg-card/70 p-6">
                <h3 className="mb-4 font-semibold">{s.group}</h3>
                <ul className="flex flex-wrap gap-2">
                  {s.items.map((i) => (
                    <li key={i} className="rounded-full bg-secondary px-3 py-1 text-sm text-secondary-foreground">{i}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        <Section id="projects" title="Projects">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((p) => (
              <article key={p.title} className="group flex flex-col rounded-xl border border-border bg-card/70 p-6 transition hover:-translate-y-1 hover:border-primary hover:shadow-glow">
                <span className="mb-4 w-fit rounded-full border border-accent/50 px-3 py-1 text-xs text-accent">● {p.status}</span>
                <h3 className="text-xl font-semibold">{p.title}</h3>
                <p className="mt-3 flex-1 text-muted-foreground">{p.overview}</p>
                <ul className="mt-5 flex flex-wrap gap-2" aria-label="Technologies">
                  {p.tech.map((t) => (
                    <li key={t} className="rounded-md bg-secondary px-2 py-1 text-xs">{t}</li>
                  ))}
                </ul>
                <a href={p.link} target="_blank" rel="noreferrer" className="mt-6 text-sm font-medium text-primary hover:underline">
                  View on GitHub →
                </a>
              </article>
            ))}
          </div>
        </Section>

        <Section id="education" title="Education">
          <div className="rounded-xl border border-border bg-card/70 p-6 md:p-8">
            <h3 className="text-xl font-semibold">B.Tech in Computer Science & Engineering (AI & ML)</h3>
            <p className="mt-2 text-muted-foreground">Rajiv Gandhi Proudyogiki Vishwavidyalaya Bhopal, Madhya Pradesh</p>
            <div className="mt-4 flex flex-wrap gap-6 text-sm">
              <span>Expected graduation: <strong>2027</strong></span>
              <span>CGPA: <strong>6.7/10</strong></span>
            </div>
          </div>
        </Section>

        <Section id="learning" title="Experience & Learning">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Hands-on ML practice", "Practising ML workflows in Jupyter Notebook and Google Colab."],
              ["Data cleaning", "Handling missing values and preparing datasets with Pandas and NumPy."],
              ["Visualization", "Exploring data with Matplotlib, Seaborn and Power BI."],
              ["Model building", "Training and evaluating models with Scikit-learn."],
            ].map(([t, d]) => (
              <div key={t} className="rounded-xl border border-border bg-card/70 p-6">
                <h3 className="font-semibold">{t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{d}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section id="contact" title="Contact">
          <div className="grid gap-8 md:grid-cols-2">
            <ul className="space-y-4">
              <li>Email: <a className="text-primary hover:underline" href={`mailto:${site.email}`}>{site.email}</a></li>
              <li>Phone: <a className="text-primary hover:underline" href={`tel:${site.phone.replace(/-/g, "")}`}>{site.phone}</a></li>
              <li>LinkedIn: <a className="text-primary hover:underline" href={site.linkedin} target="_blank" rel="noreferrer">linkedin.com/in/VipinSaket</a></li>
              <li>GitHub: <a className="text-primary hover:underline" href={site.github} target="_blank" rel="noreferrer">GitHub profile</a></li>
            </ul>
            <ContactForm />
          </div>
        </Section>
      </main>

      <footer className="relative z-10 border-t border-border py-8 text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} {site.name}</p>
        <p className="mt-2 flex justify-center gap-4">
          <a href={site.linkedin} target="_blank" rel="noreferrer" className="hover:text-foreground">LinkedIn</a>
          <a href={site.github} target="_blank" rel="noreferrer" className="hover:text-foreground">GitHub</a>
          <a href={`mailto:${site.email}`} className="hover:text-foreground">Email</a>
        </p>
      </footer>
    </div>
  );
}

function ContactForm() {
  const [err, setErr] = useState("");
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const name = String(f.get("name")).trim().slice(0, 100);
    const email = String(f.get("email")).trim().slice(0, 255);
    const msg = String(f.get("message")).trim().slice(0, 1000);
    if (!name || !msg || !/^\S+@\S+\.\S+$/.test(email)) return setErr("Please fill in all fields with a valid email.");
    setErr("");
    const body = encodeURIComponent(`${msg}\n\n— ${name} (${email})`);
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(`Portfolio inquiry from ${name}`)}&body=${body}`;
  }
  const input = "w-full rounded-lg border border-input bg-card px-4 py-3 text-sm focus:border-primary focus:outline-none";
  return (
    <form onSubmit={submit} className="space-y-4" noValidate>
      <label className="block text-sm">Name<input name="name" maxLength={100} className={`${input} mt-1`} required /></label>
      <label className="block text-sm">Email<input name="email" type="email" maxLength={255} className={`${input} mt-1`} required /></label>
      <label className="block text-sm">Message<textarea name="message" rows={4} maxLength={1000} className={`${input} mt-1`} required /></label>
      {err && <p role="alert" className="text-sm text-destructive">{err}</p>}
      <button type="submit" className={btnPrimary}>Send Message</button>
    </form>
  );
}
