import { Cta } from './components/Cta'
import { Features } from './components/Features'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Showcase } from './components/Showcase'

export default function App() {
  return (
    <div className="min-h-screen bg-[#050816] text-white antialiased">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(109,122,156,0.18),transparent_28%),linear-gradient(180deg,#0a1021_0%,#050816_50%,#03050c_100%)]" />
      <div className="fixed inset-0 -z-10 opacity-40 [background-image:linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:96px_96px] [mask-image:radial-gradient(circle_at_center,black,transparent_85%)]" />
      <Header />
      <main>
        <Hero />
        <Features />
        <Showcase />
        <Cta />
      </main>
      <Footer />
    </div>
  )
}
