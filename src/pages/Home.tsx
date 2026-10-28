import { Hero } from '../sections/Hero'
import { About } from '../sections/About'
import { Experience } from '../sections/Experience'
import { Portfolio } from '../sections/Portfolio'
import { Contact } from '../sections/Contact'

/** Single-page layout: Home → About → Experience → Portfolio → Contact, reached by scrolling or via the navbar anchors. */
export default function Home() {
  return (<><Hero /><About /><Experience /><Portfolio /><Contact /></>)
}
