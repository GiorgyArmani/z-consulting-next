import type { SiteData } from './types';

/**
 * All site copy, bilingual (EN/ES). Swap `ph` placeholders and the contact
 * email for real assets when you have them.
 */
export const DATA: SiteData = {
  nav: {
    links: [
      { id: 'industries', en: 'Industries', es: 'Industrias' },
      { id: 'work', en: 'Work', es: 'Proyectos' },
      { id: 'process', en: 'Process', es: 'Proceso' },
      { id: 'services', en: 'Services', es: 'Servicios' },
    ],
    cta: { en: 'Start a project', es: 'Empecemos' },
  },

  hero: {
    tag: { en: 'Tailor-made software studio', es: 'Estudio de software a medida' },
    typePhrases: {
      en: ['Solutions from the A to the Z', 'From your dreams to an app'],
      es: ['Soluciones de la A a la Z', 'De tus sueños a una app'],
    },
    sub: {
      en: "Z. Consulting is a software studio. We don't sell one product — we design and engineer the exact thing each client needs, from an art collective's site to a full lending platform.",
      es: 'Z. Consulting es un estudio de software. No vendemos un producto — diseñamos y construimos exactamente lo que cada cliente necesita, desde el sitio de un colectivo de arte hasta una plataforma de crédito completa.',
    },
    primary: { en: 'Start a project', es: 'Empecemos' },
    secondary: { en: 'See our work', es: 'Ver proyectos' },
    meta: [
      { num: 'A–Z', en: 'Every kind of problem, one studio', es: 'Cada tipo de problema, un estudio' },
      { num: '100%', en: 'Custom-built — no templates', es: 'Hecho a medida — sin plantillas' },
      { num: '5+', en: 'Industries served and counting', es: 'Industrias atendidas y sumando' },
    ],
  },

  marquee: [
    { en: 'Web apps', es: 'Apps web' },
    { en: 'Lending platforms', es: 'Plataformas de crédito' },
    { en: 'Design systems', es: 'Sistemas de diseño' },
    { en: 'Brand sites', es: 'Sitios de marca' },
    { en: 'Dashboards', es: 'Paneles' },
    { en: 'Integrations', es: 'Integraciones' },
    { en: 'Internal tools', es: 'Herramientas internas' },
    { en: 'E-commerce', es: 'Comercio' },
  ],

  industries: {
    tag: { en: 'What we build', es: 'Lo que construimos' },
    h2: { en: 'One studio. Every kind of problem.', es: 'Un estudio. Cada tipo de problema.' },
    lead: {
      en: "The thread isn't an industry — it's craft. Here's the range of clients we build for.",
      es: 'El hilo no es una industria — es el oficio. Este es el rango de clientes para los que construimos.',
    },
    cards: [
      { icon: '✕', en_t: 'Art & Culture', es_t: 'Arte y Cultura',
        en: 'Collective sites, galleries and portfolios where the design is the product.',
        es: 'Sitios de colectivos, galerías y portafolios donde el diseño es el producto.',
        tags: { en: ['Brand sites', 'CMS', 'Portfolios'], es: ['Sitios', 'CMS', 'Portafolios'] } },
      { icon: '$', en_t: 'Lending & Fintech', es_t: 'Crédito y Fintech',
        en: 'Origination, scoring and servicing platforms with the rigor money demands.',
        es: 'Plataformas de originación, scoring y administración con el rigor que el dinero exige.',
        tags: { en: ['Platforms', 'Compliance', 'Data'], es: ['Plataformas', 'Cumplimiento', 'Datos'] } },
      { icon: '+', en_t: 'Healthcare', es_t: 'Salud',
        en: 'Scheduling, HR and coordination tools built for the pace and stakes of clinical teams.',
        es: 'Herramientas de programación, RR.HH. y coordinación hechas para el ritmo y la exigencia de los equipos clínicos.',
        tags: { en: ['Scheduling', 'HR', 'Real-time'], es: ['Programación', 'RR.HH.', 'Tiempo real'] } },
      { icon: '↗', en_t: 'Startups', es_t: 'Startups',
        en: 'MVPs and v1 products built fast, but built to grow with you.',
        es: 'MVPs y productos v1 construidos rápido, pero hechos para crecer contigo.',
        tags: { en: ['MVP', 'Product', 'Speed'], es: ['MVP', 'Producto', 'Velocidad'] } },
      { icon: '▢', en_t: 'Enterprise', es_t: 'Corporativo',
        en: 'Internal tools and customer portals that fit into systems already in place.',
        es: 'Herramientas internas y portales que encajan en sistemas ya existentes.',
        tags: { en: ['Portals', 'Tools', 'Integrations'], es: ['Portales', 'Herramientas', 'Integraciones'] } },
      { icon: '◦', en_t: 'Small Business', es_t: 'Pequeña Empresa',
        en: 'Sites, booking and storefronts that punch above their weight.',
        es: 'Sitios, reservas y tiendas que rinden más de lo que aparentan.',
        tags: { en: ['Sites', 'Booking', 'Commerce'], es: ['Sitios', 'Reservas', 'Comercio'] } },
      { icon: '→', en_t: '...and yours', es_t: '...y la tuya',
        en: "Have a problem that doesn't fit a box? That's exactly what we're for.",
        es: '¿Tienes un problema que no entra en una casilla? Para eso existimos.',
        tags: { en: ['Tell us'], es: ['Cuéntanos'] } },
    ],
  },

  work: {
    tag: { en: 'Selected work', es: 'Proyectos seleccionados' },
    h2: { en: 'Real clients. Real solutions.', es: 'Clientes reales. Soluciones reales.' },
    lead: { en: "A few of the platforms we've designed and shipped end to end.", es: 'Algunas de las plataformas que hemos diseñado y lanzado de principio a fin.' },
    filters: [
      { id: 'all', en: 'All', es: 'Todos' },
      { id: 'fintech', en: 'Lending & Fintech', es: 'Crédito y Fintech' },
      { id: 'healthcare', en: 'Healthcare', es: 'Salud' },
    ],
    items: [
      { ind: 'healthcare', dark: true, year: '2025', en_t: 'MediClock', es_t: 'MediClock',
        en: 'An HR & shift-management platform for clinics and hospitals of any size — scheduling, an internal communication channel, and real-time notifications and events to coordinate the whole medical team.',
        es: 'Una plataforma de RR.HH. y gestión de guardias para clínicas y hospitales de cualquier tamaño — programación, un canal de comunicación interno y notificaciones y eventos en tiempo real para coordinar a todo el equipo médico.',
        img: '/projects/mediclock.png',
        alt: { en: 'MediClock shift-management dashboard showing staffing stats and weekly schedule charts', es: 'Panel de gestión de guardias de MediClock con estadísticas de personal y gráficos del calendario semanal' },
        url: '#' },
      { ind: 'fintech', dark: true, year: '2025', en_t: 'Credit Banc — Vault', es_t: 'Credit Banc — Vault',
        en: "A lending-brokerage platform that securely collects clients' business and personal documents end to end, qualifies them, and presents tailored working-capital solutions.",
        es: 'Una plataforma de corretaje de crédito que recopila de forma segura los documentos empresariales y personales de los clientes de principio a fin, los califica y presenta soluciones de capital de trabajo a la medida.',
        img: '/projects/creditbanc-vault.png',
        alt: { en: 'Credit Banc Vault admin command center showing the funding pipeline and KPIs', es: 'Centro de mando de administración de Credit Banc Vault con el pipeline de financiamiento y KPIs' },
        url: '#' },
      { ind: 'fintech', year: '2025', en_t: 'Credit Banc — Site', es_t: 'Credit Banc — Sitio',
        en: 'A high-conversion marketing site for the working-capital brokerage — fast, clear, and built to turn visitors into qualified applicants.',
        es: 'Un sitio de marketing de alta conversión para el corretaje de capital de trabajo — rápido, claro y hecho para convertir visitantes en solicitantes calificados.',
        img: '/projects/creditbanc-landing.png',
        alt: { en: 'Credit Banc marketing landing page with the headline "Funding Is Our Favorite F Word"', es: 'Página de inicio de marketing de Credit Banc con el titular "Funding Is Our Favorite F Word"' },
        url: '#' },
    ],
  },

  process: {
    tag: { en: 'How we work', es: 'Cómo trabajamos' },
    h2: { en: 'A clear path, every time.', es: 'Un camino claro, siempre.' },
    lead: { en: "Same rigor whether it's a one-page site or a regulated platform.", es: 'El mismo rigor, sea un sitio de una página o una plataforma regulada.' },
    steps: [
      { n: '01', en_t: 'Discover', es_t: 'Descubrir', en: 'We learn the business, the users and the constraints before a pixel.', es: 'Entendemos el negocio, los usuarios y las restricciones antes de un solo píxel.' },
      { n: '02', en_t: 'Design', es_t: 'Diseñar', en: 'Interfaces and systems mapped to the real problem, prototyped early.', es: 'Interfaces y sistemas diseñados al problema real, con prototipos tempranos.' },
      { n: '03', en_t: 'Build', es_t: 'Construir', en: 'Production-grade engineering — typed, tested, and built to last.', es: 'Ingeniería de producción — tipada, probada y hecha para durar.' },
      { n: '04', en_t: 'Scale', es_t: 'Escalar', en: 'We ship, measure and keep iterating alongside your team.', es: 'Lanzamos, medimos y seguimos iterando junto a tu equipo.' },
    ],
  },

  services: {
    tag: { en: 'Capabilities', es: 'Capacidades' },
    h2: { en: 'Everything between the idea and the launch.', es: 'Todo lo que hay entre la idea y el lanzamiento.' },
    items: {
      en: ['Web apps', 'Product design', 'Design systems', 'Lending platforms', 'Dashboards', 'Brand sites', 'Integrations & APIs', 'Internal tools', 'E-commerce', 'Maintenance'],
      es: ['Apps web', 'Diseño de producto', 'Sistemas de diseño', 'Plataformas de crédito', 'Paneles', 'Sitios de marca', 'Integraciones & APIs', 'Herramientas internas', 'Comercio', 'Mantenimiento'],
    },
  },

  cta: {
    h2: { en: ['Have something to ', 'build', '?'], es: ['¿Tienes algo que ', 'construir', '?'] },
    p: { en: "Tell us the problem. We'll figure out the solution — from the A to the Z.", es: 'Cuéntanos el problema. Nosotros encontramos la solución — de la A a la Z.' },
    btn: { en: 'Start a project', es: 'Empecemos' },
    email: 'hello@zconsulting.dev',
  },

  footer: {
    tagline: { en: 'Solutions from the A to the Z.', es: 'Soluciones de la A a la Z.' },
    cols: [
      { h: { en: 'Studio', es: 'Estudio' }, links: [
        { en: 'Industries', es: 'Industrias' }, { en: 'Work', es: 'Proyectos' },
        { en: 'Process', es: 'Proceso' }, { en: 'Services', es: 'Servicios' }] },
      { h: { en: 'Connect', es: 'Contacto' }, links: [
        { en: 'Email', es: 'Correo' }, { en: 'LinkedIn', es: 'LinkedIn' },
        { en: 'Instagram', es: 'Instagram' }, { en: 'GitHub', es: 'GitHub' }] },
    ],
    rights: { en: '© 2026 Z. Consulting. All rights reserved.', es: '© 2026 Z. Consulting. Todos los derechos reservados.' },
  },
};
