"use client"

import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu"
import { Leaf, Users, Heart, TreePine, Target, Lightbulb, Mail, ArrowRight, Star, Globe } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion"
import LoadingAnimation from "@/components/LoadingAnimation"
import Image from "next/image"

// Animated Counter Component
const AnimatedCounter = ({ end, duration = 2 }: { end: number; duration?: number }) => {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref)

  useEffect(() => {
    if (isInView) {
      let start = 0
      const increment = end / (duration * 60)
      const timer = setInterval(() => {
        start += increment
        if (start >= end) {
          setCount(end)
          clearInterval(timer)
        } else {
          setCount(Math.floor(start))
        }
      }, 1000 / 60)
      return () => clearInterval(timer)
    }
  }, [isInView, end, duration])

  return <span ref={ref}>{count}</span>
}

// Floating Element Component
const FloatingElement = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  return (
    <motion.div
      animate={{
        y: [0, -10, 0],
        rotate: [0, 1, 0],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        delay: delay,
        ease: "easeInOut"
      }}
    >
      {children}
    </motion.div>
  )
}

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  })
  const [navVisible, setNavVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  const { scrollY } = useScroll()
  const textParallax = useTransform(scrollY, [0, 1000], [0, 200])

  // Hide/show navigation on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setNavVisible(currentScrollY < lastScrollY || currentScrollY < 100)
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
  }

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <>
      <AnimatePresence>
        <LoadingAnimation />
      </AnimatePresence>
      
      <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Refined Navigation */}
      <motion.nav 
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        animate={{
          y: navVisible ? 0 : -100,
          backgroundColor: scrollY.get() > 100 ? "rgba(249, 250, 251, 0.95)" : "rgba(255, 255, 255, 0)"
        }}
        style={{
          backdropFilter: scrollY.get() > 100 ? "blur(20px)" : "none"
        }}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div 
              className="flex items-center"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <div className="h-[70px] overflow-hidden flex items-center">
                <Image
                  src="/BV_NOFONDO.png"
                  alt="Blue Life Ventures"
                  width={180}
                  height={50}
                  className="w-auto"
                  priority
                />
              </div>
            </motion.div>

            <NavigationMenu className="hidden md:flex">
              <NavigationMenuList className="space-x-2">
                {["inicio", "sobre-nosotros", "proyectos", "la-aldea", ""].map((section) => (
                  <NavigationMenuItem key={section}>
                    <motion.div
                      whileHover={{ y: -2 }}
                      whileTap={{ y: 0 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <NavigationMenuLink 
                        className={`${navigationMenuTriggerStyle()} text-gray-700 hover:text-gray-900 bg-transparent hover:bg-gray-100`}
                        onClick={() => scrollToSection(section)}
                      >
                        {section === "inicio" ? "Inicio" : 
                         section === "sobre-nosotros" ? "Sobre Nosotros" :
                         section === "proyectos" ? "Proyectos" :
                         section === "la-aldea" ? "La Aldea" : ""}
                      </NavigationMenuLink>
                    </motion.div>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                onClick={() => scrollToSection("contacto")}
                className="hidden sm:inline-flex bg-gray-900 hover:bg-gray-800 text-white border-0 shadow-sm"
              >
                Contáctanos
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.nav>

      {/* Refined Hero Section */}
      <section 
        id="inicio" 
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
      >
        {/* Sophisticated Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-blue-50/30 z-10" />
          
          {/* Subtle Pattern Overlay */}
          <div className="absolute inset-0 z-5 opacity-30">
            <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-emerald-100 rounded-full blur-3xl" />
            <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-blue-100 rounded-full blur-3xl" />
          </div>
          
          {/* Grid Pattern */}
          <div className="absolute inset-0 z-5 opacity-[0.02]">
            <div className="w-full h-full" style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)`,
              backgroundSize: '40px 40px'
            }} />
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 z-30 pointer-events-none">
          <FloatingElement delay={0}>
            <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-emerald-400 rounded-full opacity-60" />
          </FloatingElement>
          <FloatingElement delay={1}>
            <div className="absolute top-1/2 left-1/5 w-1 h-1 bg-blue-400 rounded-full opacity-80" />
          </FloatingElement>
          <FloatingElement delay={2}>
            <div className="absolute bottom-1/3 right-1/3 w-3 h-3 bg-purple-400 rounded-full opacity-40" />
          </FloatingElement>
        </div>
        
        <motion.div 
          className="container mx-auto px-6 py-20 relative z-30"
          style={{ y: textParallax }}
        >
          <div className="max-w-6xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <motion.h1 
                className="text-6xl md:text-7xl lg:text-8xl font-light text-gray-900 leading-[0.9] mb-8 tracking-tight"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
              >
                <motion.span 
                  className="text-4xl md:text-5xl lg:text-6xl font-light text-gray-600 tracking-wide"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  La Tribu del Siglo 21
                </motion.span>
              </motion.h1>
            </motion.div>

            <motion.p 
              className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl leading-relaxed font-light mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Impulsamos bienestar y desarrollo personal y profesional con mentoring, coaching, experiencias y formaciones.
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <motion.div
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <Button 
                  size="lg" 
                  className="text-lg px-10 py-6 text-white border-0 shadow-sm group bg-gradient-to-r from-[#2a4dbf] via-[#7840d5] to-[#17bbc7] hover:from-[#1f3da3] hover:via-[#6a38c0] hover:to-[#15a8b3] transition-all duration-300"
                  onClick={() => scrollToSection("la-aldea")}
                >
                  <Users className="mr-3 h-5 w-5" />
                  Únete al Movimiento
                  <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <div className="relative inline-block rounded-md">
                  <div 
                    className="absolute inset-0 rounded-md"
                    style={{
                      background: 'linear-gradient(to right, #2a4dbf, #7840d5, #17bbc7)',
                      padding: '2px'
                    }}
                  />
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="text-lg px-10 py-6 text-gray-700 hover:bg-gray-50 group relative z-10 bg-white border-0 rounded-md"
                    onClick={() => scrollToSection("sobre-nosotros")}
                    style={{
                      margin: '2px',
                      transform: 'translateY(0px)'
                    }}
                  >
                    Descubre Más
                    <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </motion.div>
            </motion.div>

            {/* Stats */}
            <motion.div 
              className="mt-20 grid grid-cols-3 gap-8 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              <div className="text-center py-6 border-r border-gray-200 last:border-r-0">
                <div className="text-4xl md:text-5xl font-light text-emerald-600 mb-2">
                  <AnimatedCounter end={4} />+
                </div>
                <div className="text-gray-500 text-sm md:text-base font-light">Proyectos Activos</div>
              </div>
              <div className="text-center py-6 border-r border-gray-200 last:border-r-0">
                <div className="text-4xl md:text-5xl font-light text-gray-900 mb-2">
                  <AnimatedCounter end={2025} />
                </div>
                <div className="text-gray-500 text-sm md:text-base font-light">Encuentro Fundacional</div>
              </div>
              <div className="text-center py-6">
                <div className="text-4xl md:text-5xl font-light text-blue-600 mb-2">
                  <AnimatedCounter end={100} />%
                </div>
                <div className="text-gray-500 text-sm md:text-base font-light">Regenerativo</div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse" />
          </div>
        </motion.div>
      </section>

      {/* About Us Section */}
      <section id="sobre-nosotros" className="py-32 bg-white relative overflow-hidden">
        {/* Subtle Background */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gray-100 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-50 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            className="max-w-5xl mx-auto text-center mb-24"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.h2 
              className="text-5xl md:text-6xl font-light text-gray-900 mb-8 tracking-tight"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <span className="font-bold text-emerald-600">Quiénes somos</span>
            </motion.h2>
            <motion.p 
              className="text-xl md:text-2xl text-gray-600 leading-relaxed font-light max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              
              Bluelife es un <span className="text-emerald-600 font-medium">ecosistema de negocios</span> que fomentan el <span className="text-blue-600 font-medium">bienestar</span> y el <span className="text-blue-600 font-medium">desarrollo personal y profesional</span>, ofreciendo mentoring digital, experiencias de ocio y wellness, coaching, eventos, retiros y formaciones.
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-16 mb-24">
            {[
              { image: "/sostenibilidad.png", title: "Sostenibilidad", desc: "Vivir en equilibrio con la naturaleza", color: "emerald", delay: 0 },
              { image: "/cooperacion.png", title: "Cooperación", desc: "Construir una tribu basada en la ayuda mutua", color: "blue", delay: 0.2 },
              { image: "/autenticidad.png", title: "Autenticidad", desc: "Vivir con honestidad y sin máscaras", color: "gray", delay: 0.4 }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                className="group text-center"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: item.delay }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <motion.div 
                  className="flex justify-center mb-0 group-hover:scale-105 transition-all duration-300"
                  whileHover={{ rotate: 2 }}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={120}
                    height={120}
                    className="w-50 h-50 object-contain"
                  />
                </motion.div>
                <h3 className="text-2xl font-light text-gray-900 mb-4">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed font-light">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="inline-block px-12 py-8 text-white shadow-sm"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
              style={{ 
                borderRadius: '8px',
                background: 'linear-gradient(to right, #2a4dbf, #7840d5, #17bbc7)'
              }}
            >
              <p className="text-xl font-light italic">
                &ldquo;La tribu del siglo 21. Vivir juntos, crecer de verdad.&rdquo;
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="proyectos" className="py-32 bg-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-emerald-100 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-blue-100 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            className="max-w-5xl mx-auto text-center mb-20"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.h2 
              className="text-5xl md:text-6xl font-light text-gray-900 mb-8 tracking-tight"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              Nuestros{" "}
              <span className="font-bold text-blue-600">Proyectos</span>
            </motion.h2>
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed font-light">
              Cada proyecto está diseñado para apoyar nuestra visión de{" "}
              <span className="text-emerald-600 font-medium">La Aldea</span> y crear un 
              impacto real en las comunidades.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {[
              { icon: TreePine, title: "Colmena Experience", desc: "Coliving y retiros para nómadas digitales y buscadores de propósito.", color: "emerald", active: true },
              { icon: Target, title: "Nexawork", desc: "Reinventar habilidades humanas y profesionales para el futuro del trabajo.", color: "blue", active: true },
              { icon: Lightbulb, title: "Jotadealuja", desc: "Comunicación y formación disruptiva para el desarrollo personal.", color: "gray", active: true },
              { icon: Globe, title: "BlueGrowth", desc: "Consultoría estratégica para proyectos regenerativos.", color: "orange", active: false },
              { icon: Star, title: "Boostcamp", desc: "Programas transformadores de crecimiento personal.", color: "pink", active: false }
            ].map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Card className={`h-full bg-white border border-gray-200 hover:border-gray-300 transition-all duration-300 ${!project.active ? 'border-dashed opacity-70' : ''}`}
                      style={{ borderRadius: '12px' }}>
                  <CardHeader className="p-8">
                    <div className="flex items-center gap-4 mb-6">
                      <motion.div 
                        className={`w-14 h-14 ${project.color === 'emerald' ? 'bg-emerald-100 border-emerald-200' : 
                                                  project.color === 'blue' ? 'bg-blue-100 border-blue-200' : 
                                                  project.color === 'gray' ? 'bg-gray-100 border-gray-200' :
                                                  project.color === 'orange' ? 'bg-orange-100 border-orange-200' :
                                                  'bg-pink-100 border-pink-200'} 
                                 border flex items-center justify-center group-hover:scale-105 transition-transform`}
                        whileHover={{ rotate: 3 }}
                        style={{ borderRadius: '8px' }}
                      >
                        <project.icon className={`h-7 w-7 ${project.color === 'emerald' ? 'text-emerald-600' : 
                                                            project.color === 'blue' ? 'text-blue-600' : 
                                                            project.color === 'gray' ? 'text-gray-600' :
                                                            project.color === 'orange' ? 'text-orange-600' :
                                                            'text-pink-600'}`} />
                      </motion.div>
                      {!project.active && (
                        <Badge variant="outline" className="bg-gray-50 text-gray-500 border-gray-300">
                          Próximamente
                        </Badge>
                      )}
                    </div>
                    <CardTitle className={`text-2xl font-light ${project.active ? 'text-gray-900' : 'text-gray-500'} mb-4`}>
                      {project.title}
                    </CardTitle>
                    <CardDescription className="text-gray-600 text-lg leading-relaxed font-light">
                      {project.desc}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <motion.div
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button 
                variant="outline" 
                size="lg"
                className="text-lg px-10 py-6 border-2 border-gray-300 text-gray-700 hover:bg-gray-50 group"
              >
                Conoce más sobre nuestros proyectos
                <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* La Aldea Section */}
      <section id="la-aldea" className="py-32 bg-white relative overflow-hidden">
        {/* Subtle Background */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-50 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-50 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-6xl mx-auto">
            <motion.div 
              className="text-center mb-20"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <motion.h2 
                className="text-5xl md:text-6xl font-light text-gray-900 mb-8 tracking-tight"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <span className="font-bold text-blue-600">La Aldea:</span>{" "}
                <span className="font-normal">Nuestra Visión</span>
              </motion.h2>
              <p className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-5xl mx-auto font-light">
                Una comunidad autosuficiente, conectada con la naturaleza y enfocada en el 
                desarrollo humano integral. La fusión perfecta de{" "}
                <span className="text-emerald-600 font-medium">vida ancestral con
                comodidades modernas</span>.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-16 mb-24">
            {[
              { image: "/comunidad.png", title: "Comunidad", desc: "Cooperación y eliminación de la soledad a través de conexiones auténticas.", color: "blue", delay: 0 },
              { image: "/crecimientopersonal.png", title: "Crecimiento Personal", desc: "Desarrollo integral como parte de la vida diaria.", color: "emerald", delay: 0.2 },
              { image: "/resiliencia.png", title: "Resiliencia", desc: "Preparación para desafíos globales con autonomía y sostenibilidad.", color: "gray", delay: 0.4 }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                className="group text-center"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: item.delay }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <motion.div 
                  className="flex justify-center mb-0 group-hover:scale-105 transition-all duration-300"
                  whileHover={{ rotate: 2 }}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={120}
                    height={120}
                    className="w-50 h-50 object-contain"
                  />
                </motion.div>
                <h3 className="text-2xl font-light text-gray-900 mb-4">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed font-light">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>

           

            
          </div>
        </div>
      </section>

      
      {/* Premium Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 py-20 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.15)_1px,transparent_0)] bg-[size:50px_50px]" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            className="grid md:grid-cols-4 gap-12 mb-16"
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Brand Section */}
            <motion.div 
              className="md:col-span-2"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <motion.h3 
                className="text-3xl font-bold text-gray-900 mb-6"
                whileHover={{ scale: 1.05 }}
              >
                Blue Life Ventures
              </motion.h3>
              <p className="text-gray-600 text-lg leading-relaxed mb-6 max-w-md">
                Construyendo La Aldea, la tribu del siglo 21. Un futuro donde{" "}
                <span className="text-emerald-600">vivir juntos</span> significa{" "}
                <span className="text-blue-600">crecer de verdad</span>.
              </p>
              <motion.div
                whileHover={{ scale: 1.02, rotateY: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Badge variant="outline" className="text-lg px-6 py-3 border-emerald-500 text-emerald-600 bg-transparent">
                  &ldquo;La tribu del siglo 21. Vivir juntos, crecer de verdad.&rdquo;
                </Badge>
              </motion.div>
            </motion.div>

            {/* Links Section */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <h4 className="font-bold text-gray-900 text-xl mb-6">Enlaces</h4>
              <div className="space-y-4">
                {[
                  { name: "Sobre Nosotros", section: "sobre-nosotros" },
                  { name: "Proyectos", section: "proyectos" },
                  { name: "La Aldea", section: "la-aldea" },
                ].map((link, index) => (
                  <motion.button
                    key={link.name}
                    onClick={() => scrollToSection(link.section)}
                    className="block text-gray-600 hover:text-gray-900 transition-colors text-lg group"
                    whileHover={{ x: 5 }}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <ArrowRight className="inline h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.name}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Contact Section */}
           
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
          >
            <Separator className="mb-8 bg-gray-200" />
          </motion.div>
          
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            viewport={{ once: true }}
          >
            <p className="text-gray-600 text-lg">
              © 2025 Blue Life Ventures. Todos los derechos reservados.
            </p>
            <motion.p 
              className="text-gray-500 mt-2"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
              viewport={{ once: true }}
            >
              Diseñado con ❤️ para construir el futuro juntos
            </motion.p>
          </motion.div>
        </div>


      </footer>
    </div>
    </>
  )
}