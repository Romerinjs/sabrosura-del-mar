import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const meta = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/meta' }),
  schema: z.object({
    title: z.string(),
    shortTitle: z.string(),
    tagline: z.string(),
    description: z.string(),
    themeColor: z.string(),
    canonicalUrl: z.string().url(),
    ogImage: z.string(),
    locale: z.string(),
    social: z.object({
      whatsapp: z.string(),
      phone: z.string(),
      phoneFormatted: z.string(),
      landlineFormatted: z.string(),
    }),
    nav: z.array(
      z.object({
        label: z.string(),
        href: z.string(),
      })
    ),
    horarios: z.object({
      general: z.string(),
      apertura: z.string(),
      cierre: z.string(),
      dias: z.string(),
    }),
    politicaReservas: z.string(),
  }),
});

const sedes = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/sedes' }),
  schema: z.object({
    id: z.string(),
    nombre: z.string(),
    badge: z.object({
      texto: z.string(),
      tipo: z.enum(['gold', 'teal']),
    }),
    descripcion: z.string(),
    direccion: z.string(),
    sector: z.string().optional(),
    ciudad: z.string(),
    horario: z.object({
      texto: z.string(),
      detalle: z.string(),
    }),
    telefonos: z.array(
      z.object({
        numero: z.string(),
        tipo: z.string(),
        href: z.string(),
      })
    ),
    domicilios: z.boolean(),
    parqueadero: z.boolean(),
    detalleParqueadero: z.string().optional(),
    mapsUrl: z.string().url(),
    whatsapp: z.object({
      phone: z.string(),
      mensaje: z.string(),
    }),
    imagen: z.string().optional(),
  }),
});

const landing = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/landing' }),
});

const carta = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/carta' }),
});

export const collections = { meta, sedes, landing, carta };
