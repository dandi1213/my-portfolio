import { Link } from 'react-router-dom'
import { portfolio as p } from '../data/portfolio'
import { SafeLink } from '../components/SafeLink'

const Str = ({ children }: { children: string }) => <span className="text-accent">"{children}"</span>
const Key = ({ children }: { children: string }) => <span className="text-fg">{children}</span>

export function Hero() {
  return (
    <section id="home" aria-labelledby="hero-title" className="relative overflow-hidden border-b border-line">
      <div className="grid-bg absolute inset-0" aria-hidden="true" />
      <div className="container-page relative grid items-center gap-12 py-20 sm:py-28 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <p className="hero-in font-mono text-sm text-accent" style={{ '--i': 0 } as React.CSSProperties}>Hi, I’m</p>
          <h1 id="hero-title" className="hero-in mt-2 text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl" style={{ '--i': 1 } as React.CSSProperties}>{p.name}</h1>
          <p className="hero-in mt-3 text-xl text-muted sm:text-2xl" style={{ '--i': 2 } as React.CSSProperties}>{p.title}</p>
          <p className="hero-in mt-6 max-w-xl text-base leading-relaxed text-muted" style={{ '--i': 3 } as React.CSSProperties}>{p.intro}</p>
          <div className="hero-in mt-8 flex flex-wrap gap-3" style={{ '--i': 4 } as React.CSSProperties}>
            <Link to="/portfolio/projects" className="btn btn-primary">See my projects</Link>
            <SafeLink href={p.cvPath} openInNewTab className="btn btn-ghost" missingHint="CV not set yet — add a PDF to public/ and set cvPath">Curiculum Vitae</SafeLink>
          </div>
        </div>

        <div className="hero-in overflow-hidden rounded-panel border border-line bg-surface shadow-2xl shadow-black/20" style={{ '--i': 3 } as React.CSSProperties} aria-hidden="true">
          <div className="flex items-center gap-1.5 border-b border-line px-4 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-line" /><span className="h-2.5 w-2.5 rounded-full bg-line" /><span className="h-2.5 w-2.5 rounded-full bg-line" />
            <span className="ml-3 font-mono text-xs text-muted">developer.ts</span>
          </div>
          <pre className="overflow-x-auto whitespace-pre p-5 font-mono text-[13px] leading-7 text-muted">
            <code>
              <span className="text-accent">const</span> <Key>developer</Key> = {'{'}{'\n'}
              {'  '}<Key>name</Key>: <Str>{p.name}</Str>,{'\n'}
              {'  '}<Key>education</Key>: <Str>D4 Industrial Information Engineering Technology</Str>,{'\n'}
              {'  '}<Key>focus</Key>: [{p.focus.map((f, i) => <span key={f}>{i > 0 && ', '}<Str>{f}</Str></span>)}],{'\n'}
              {'  '}<Key>openTo</Key>: <Str>{p.openTo}</Str>,{'\n'}
              {'}'}<span className="caret ml-0.5 inline-block h-4 w-2 translate-y-0.5 bg-accent" />
            </code>
          </pre>
        </div>
      </div>
    </section>
  )
}
