import { Link } from 'react-router-dom'

export default function NotFound({ what = 'page' }: { what?: string }) {
  return (
    <section className="container-page py-28">
      <p className="font-mono text-sm text-accent">404</p>
      <h1 className="mt-2 text-4xl font-bold">This {what} doesn’t exist</h1>
      <p className="mt-3 max-w-md text-muted">The link may be mistyped or the {what} was moved.</p>
      <Link to="/" className="btn btn-primary mt-8">Back to home</Link>
    </section>
  )
}
