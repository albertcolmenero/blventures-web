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
      
      <div className="min-h-screen bg-gray-50 overflow-x-hidden">
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
              className="text-2xl font-bold text-gray-900"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              Blue Life Ventures
            </motion.div>

            <NavigationMenu className="hidden md:flex">
              <NavigationMenuList className="space-x-2">
                {["inicio", "sobre-nosotros", "proyectos", "la-aldea", "contacto"].map((section) => (
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
                         section === "la-aldea" ? "La Aldea" : "Contacto"}
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
        className="relative min-h-screen flex items-center justify-start overflow-hidden pt-20"
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
          <div className="max-w-6xl">
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
                  className="font-normal"
                  whileHover={{ scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  Blue Life
                </motion.span>
                <br />
                <motion.span 
                  className="font-bold text-emerald-600"
                  whileHover={{ scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  Ventures
                </motion.span>
                <br />
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
              className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl leading-relaxed font-light"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Un ecosistema de proyectos regenerativos que fusionan lo digital y lo presencial 
              para un <span className="text-emerald-600 font-medium">impacto real</span> en personas y comunidades.
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
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
                  className="text-lg px-10 py-6 bg-emerald-600 hover:bg-emerald-700 text-white border-0 shadow-sm group"
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
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="text-lg px-10 py-6 border-2 border-gray-300 text-gray-700 hover:bg-gray-50 group"
                  onClick={() => scrollToSection("sobre-nosotros")}
                >
                  Descubre Más
                  <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
            </motion.div>

            {/* Stats */}
            <motion.div 
              className="mt-20 grid grid-cols-3 gap-8 max-w-3xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              <div className="text-center py-6 border-r border-gray-200 last:border-r-0">
                <div className="text-4xl md:text-5xl font-light text-emerald-600 mb-2">
                  <AnimatedCounter end={5} />+
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
              <span className="font-normal">Quiénes</span>{" "}
              <span className="font-bold text-emerald-600">Somos</span>
            </motion.h2>
            <motion.p 
              className="text-xl md:text-2xl text-gray-600 leading-relaxed font-light max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              Blue Life Ventures es la creación de un{" "}
              <span className="text-emerald-600 font-medium">ecosistema regenerativo</span>{" "}
              que fusiona proyectos digitales y presenciales, con el objetivo de fundar{" "}
              <span className="text-blue-600 font-medium">La Aldea</span>, una comunidad 
              autosuficiente centrada en el desarrollo humano.
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-16 mb-24">
            {[
              { icon: Leaf, title: "Sostenibilidad", desc: "Vivir en equilibrio con la naturaleza", color: "emerald", delay: 0 },
              { icon: Users, title: "Cooperación", desc: "Construir una tribu basada en la ayuda mutua", color: "blue", delay: 0.2 },
              { icon: Heart, title: "Autenticidad", desc: "Vivir con honestidad y sin máscaras", color: "gray", delay: 0.4 }
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
                  className={`w-20 h-20 bg-${item.color === 'emerald' ? 'emerald-50' : item.color === 'blue' ? 'blue-50' : 'gray-100'} border border-${item.color === 'emerald' ? 'emerald-200' : item.color === 'blue' ? 'blue-200' : 'gray-200'} flex items-center justify-center mx-auto mb-8 group-hover:scale-105 transition-all duration-300`}
                  whileHover={{ rotate: 2 }}
                  style={{ borderRadius: '16px' }}
                >
                  <item.icon className={`h-10 w-10 ${item.color === 'emerald' ? 'text-emerald-600' : item.color === 'blue' ? 'text-blue-600' : 'text-gray-600'}`} />
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
              className="inline-block px-12 py-8 bg-gray-50 border border-gray-200"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
              style={{ borderRadius: '8px' }}
            >
              <p className="text-xl text-gray-700 font-light italic">
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
                <span className="font-bold text-emerald-600">La Aldea:</span>{" "}
                <span className="font-normal">Nuestra Visión</span>
              </motion.h2>
              <p className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-5xl mx-auto font-light">
                Una comunidad autosuficiente, conectada con la naturaleza y enfocada en el 
                desarrollo humano integral. La fusión perfecta de{" "}
                <span className="text-emerald-600 font-medium">vida ancestral</span> con{" "}
                <span className="text-blue-600 font-medium">comodidades modernas</span>.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-12 mb-20">
              {[
                { icon: Users, title: "Comunidad", desc: "Cooperación y eliminación de la soledad a través de conexiones auténticas.", color: "blue" },
                { icon: Heart, title: "Crecimiento Personal", desc: "Desarrollo integral como parte de la vida diaria.", color: "emerald" },
                { icon: Leaf, title: "Resiliencia", desc: "Preparación para desafíos globales con autonomía y sostenibilidad.", color: "gray" }
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  className="group"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <div className="bg-gray-50 p-10 border border-gray-200 hover:border-gray-300 transition-all duration-300 h-full"
                       style={{ borderRadius: '12px' }}>
                    <motion.div
                      className={`w-16 h-16 ${item.color === 'blue' ? 'bg-blue-100 border-blue-200' : 
                                                item.color === 'emerald' ? 'bg-emerald-100 border-emerald-200' : 
                                                'bg-gray-100 border-gray-200'} 
                                 border flex items-center justify-center mb-8 group-hover:scale-105 transition-transform`}
                      whileHover={{ rotate: 3 }}
                      style={{ borderRadius: '8px' }}
                    >
                      <item.icon className={`h-8 w-8 ${item.color === 'blue' ? 'text-blue-600' : 
                                                        item.color === 'emerald' ? 'text-emerald-600' : 
                                                        'text-gray-600'}`} />
                    </motion.div>
                    <h3 className="text-2xl font-light text-gray-900 mb-4">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-lg leading-relaxed font-light">
                      {item.desc}
                    </p>
                  </div>
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
              <motion.p 
                className="text-xl text-gray-600 mb-10 font-light"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                viewport={{ once: true }}
              >
                Únete a nosotros en el{" "}
                <span className="text-emerald-600 font-medium">Encuentro Fundacional</span>{" "}
                del <span className="text-blue-600 font-medium">4-6 de julio de 2025</span>
              </motion.p>
              <motion.div
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button 
                  size="lg" 
                  className="text-lg px-12 py-6 bg-emerald-600 hover:bg-emerald-700 text-white border-0 shadow-sm group"
                  onClick={() => scrollToSection("contacto")}
                >
                  <TreePine className="mr-3 h-5 w-5" />
                  Participa en La Aldea
                  <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Premium Contact Section */}
      <section id="contacto" className="py-32 bg-gradient-to-br from-black via-gray-900 to-slate-900 relative overflow-hidden">
        {/* Animated Background Grid */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.h2 
                className="text-5xl md:text-7xl font-bold text-white mb-8"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <span className="bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Únete
                </span>{" "}
                <span className="text-white">a Nuestra Visión</span>
              </motion.h2>
              <motion.p 
                className="text-xl md:text-2xl text-gray-300 leading-relaxed"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              >
                Participa como{" "}
                <span className="text-emerald-400 font-semibold">Aldeano</span>,{" "}
                <span className="text-blue-400 font-semibold">inversor</span> o{" "}
                <span className="text-purple-400 font-semibold">colaborador</span>.{" "}
                El futuro se construye juntos.
              </motion.p>
            </motion.div>

            <motion.div
              className="grid lg:grid-cols-2 gap-16 items-center"
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
            >
              {/* Contact Form */}
              <motion.div
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 shadow-2xl">
                  <div className="p-10">
                    <form onSubmit={handleSubmit} className="space-y-8">
                      <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                        viewport={{ once: true }}
                      >
                        <label htmlFor="name" className="block text-lg font-medium text-white mb-3">
                          Nombre
                        </label>
                        <Input
                          id="name"
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Tu nombre completo"
                          required
                          className="h-14 text-lg bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-emerald-400 focus:ring-emerald-400/20 transition-all"
                        />
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 1 }}
                        viewport={{ once: true }}
                      >
                        <label htmlFor="email" className="block text-lg font-medium text-white mb-3">
                          Correo Electrónico
                        </label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="tu@email.com"
                          required
                          className="h-14 text-lg bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-blue-400 focus:ring-blue-400/20 transition-all"
                        />
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 1.2 }}
                        viewport={{ once: true }}
                      >
                        <label htmlFor="message" className="block text-lg font-medium text-white mb-3">
                          Mensaje (opcional)
                        </label>
                        <Textarea
                          id="message"
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          placeholder="Cuéntanos cómo te gustaría participar en La Aldea..."
                          rows={5}
                          className="text-lg bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-400 focus:ring-purple-400/20 transition-all resize-none"
                        />
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1.4 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button 
                          type="submit" 
                          size="lg" 
                          className="w-full text-xl py-8 bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500 hover:from-emerald-600 hover:via-blue-600 hover:to-purple-600 border-0 shadow-2xl shadow-emerald-500/25 group"
                        >
                          <Mail className="mr-3 h-6 w-6 group-hover:rotate-12 transition-transform" />
                          Contáctanos
                          <motion.div
                            className="ml-3"
                            animate={{ x: [0, 5, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          >
                            <ArrowRight className="h-6 w-6" />
                          </motion.div>
                        </Button>
                      </motion.div>
                    </form>

                    <motion.div 
                      className="mt-10 pt-8 border-t border-white/10 text-center"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.8, delay: 1.6 }}
                      viewport={{ once: true }}
                    >
                      <p className="text-gray-400 mb-3 text-lg">
                        O escríbenos directamente a:
                      </p>
                      <motion.a 
                        href="mailto:info@bluelifeventures.com" 
                        className="text-emerald-400 hover:text-emerald-300 font-semibold text-xl transition-colors"
                        whileHover={{ scale: 1.05 }}
                      >
                        info@bluelifeventures.com
                      </motion.a>
                    </motion.div>
                  </div>
                </Card>
              </motion.div>

              {/* Contact Info */}
              <motion.div
                className="space-y-8"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="space-y-6">
                  <motion.div
                    className="flex items-center gap-6 p-6 bg-gradient-to-r from-emerald-500/10 to-emerald-600/10 backdrop-blur-xl border border-emerald-500/20 rounded-2xl"
                    whileHover={{ scale: 1.02, x: 10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="w-16 h-16 bg-emerald-500/20 rounded-2xl flex items-center justify-center">
                      <Mail className="h-8 w-8 text-emerald-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">Email</h3>
                      <p className="text-emerald-400 text-lg">info@bluelifeventures.com</p>
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex items-center gap-6 p-6 bg-gradient-to-r from-blue-500/10 to-blue-600/10 backdrop-blur-xl border border-blue-500/20 rounded-2xl"
                    whileHover={{ scale: 1.02, x: 10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center">
                      <TreePine className="h-8 w-8 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">Encuentro Fundacional</h3>
                      <p className="text-blue-400 text-lg">4-6 de julio de 2025</p>
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex items-center gap-6 p-6 bg-gradient-to-r from-purple-500/10 to-purple-600/10 backdrop-blur-xl border border-purple-500/20 rounded-2xl"
                    whileHover={{ scale: 1.02, x: 10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="w-16 h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center">
                      <Globe className="h-8 w-8 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">Comunidad Global</h3>
                      <p className="text-purple-400 text-lg">Conectando el mundo</p>
                    </div>
                  </motion.div>
                </div>

                {/* Call to Action */}
                <motion.div
                  className="p-8 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10 rounded-3xl text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 1.2 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                >
                  <h3 className="text-2xl font-bold text-white mb-4">
                    ¿Listo para ser parte del cambio?
                  </h3>
                  <p className="text-gray-300 text-lg mb-6">
                    Únete a una comunidad que está redefiniendo el futuro de la humanidad.
                  </p>
                  <div className="flex items-center justify-center gap-4">
                    {[0, 1, 2].map((i) => (
                      <FloatingElement key={i} delay={i * 0.5}>
                        <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${i === 0 ? 'from-emerald-400 to-emerald-500' : i === 1 ? 'from-blue-400 to-blue-500' : 'from-purple-400 to-purple-500'}`} />
                      </FloatingElement>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Premium Footer */}
      <footer className="bg-gradient-to-br from-black via-gray-950 to-slate-950 border-t border-white/10 py-20 relative overflow-hidden">
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
                className="text-3xl font-bold bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-6"
                whileHover={{ scale: 1.05 }}
              >
                Blue Life Ventures
              </motion.h3>
              <p className="text-gray-300 text-lg leading-relaxed mb-6 max-w-md">
                Construyendo La Aldea, la tribu del siglo 21. Un futuro donde{" "}
                <span className="text-emerald-400">vivir juntos</span> significa{" "}
                <span className="text-blue-400">crecer de verdad</span>.
              </p>
              <motion.div
                whileHover={{ scale: 1.02, rotateY: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Badge variant="outline" className="text-lg px-6 py-3 border-emerald-400/50 text-emerald-400 bg-transparent">
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
              <h4 className="font-bold text-white text-xl mb-6">Enlaces</h4>
              <div className="space-y-4">
                {[
                  { name: "Sobre Nosotros", section: "sobre-nosotros" },
                  { name: "Proyectos", section: "proyectos" },
                  { name: "La Aldea", section: "la-aldea" },
                  { name: "Contacto", section: "contacto" }
                ].map((link, index) => (
                  <motion.button
                    key={link.name}
                    onClick={() => scrollToSection(link.section)}
                    className="block text-gray-400 hover:text-white transition-colors text-lg group"
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
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <h4 className="font-bold text-white text-xl mb-6">Contacto</h4>
              <div className="space-y-4">
                <motion.a 
                  href="mailto:info@bluelifeventures.com"
                  className="flex items-center gap-3 text-gray-400 hover:text-emerald-400 transition-colors text-lg group"
                  whileHover={{ x: 5 }}
                >
                  <Mail className="h-5 w-5 group-hover:rotate-12 transition-transform" />
                  info@bluelifeventures.com
                </motion.a>
                <motion.div 
                  className="flex items-center gap-3 text-gray-400 text-lg"
                  whileHover={{ x: 5 }}
                >
                  <TreePine className="h-5 w-5 text-emerald-400" />
                  Encuentro Fundacional 2025
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
          >
            <Separator className="mb-8 bg-white/10" />
          </motion.div>
          
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            viewport={{ once: true }}
          >
            <p className="text-gray-500 text-lg">
              © 2025 Blue Life Ventures. Todos los derechos reservados.
            </p>
            <motion.p 
              className="text-gray-600 mt-2"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
              viewport={{ once: true }}
            >
              Diseñado con ❤️ para construir el futuro juntos
            </motion.p>
          </motion.div>
        </div>

        {/* Background Elements */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
      </footer>
    </div>
    </>
  )
}