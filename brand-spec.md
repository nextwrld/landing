# Next Wrld — Brand Spec (fuente de verdad visual)

Fuente: manual de marca + estrategia de color aprobada por el usuario
(turno actual). Cuatro niveles de superficie, un solo azul de marca.

## Tokens de marca

| Rol          | HEX     |
| ------------ | ------- |
| Warm White   | #FCFCFB |
| Cool Gray    | #F7F8FA |
| Surface Blue | #F2F5FB |
| Ink          | #111318 |
| Muted        | #667085 |
| Primary Blue | #2758D9 |
| Soft Blue    | #EAF0FF |
| Brand Navy   | #102654 |
| Deep Navy    | #0B1220 |
| Border       | #E3E7ED |
| Ink Soft     | #3E4655 |

Tokens extra: `--r-sm:8px; --r-md:12px; --r-lg:16px;`
`--shadow-soft:0 12px 30px rgba(16,38,84,.08);`
Ritmo: secciones 128px desktop / 72px mobile; filete superior
claro #5E85E3 en el cierre; footer compacto de alto contraste.

## Tokens del sistema (OKLch aprox.)

```css
--bg:           oklch(0.996 0.001 100); /* #FCFCFB — base cálida */
--surface:      oklch(1 0 0);           /* #FFFFFF */
--surface-gray: oklch(0.967 0.003 250); /* #F7F8FA */
--surface-blue: oklch(0.958 0.008 260); /* #F2F5FB — casi blanco */
--fg:           oklch(0.21 0.01 260);   /* #111318 */
--muted:        oklch(0.52 0.02 250);   /* #667085 */
--border:       oklch(0.91 0.008 250);  /* #E3E7ED */
--accent:       oklch(0.5 0.16 270);    /* #2758D9 */
--accent-soft:  oklch(0.9 0.03 270);    /* #DCE6FF */
--navy:         oklch(0.32 0.09 270);   /* #102654 */
--darkbg:       oklch(0.22 0.03 265);   /* #0B1220 */
```

## Mapa de capítulos

```text
Hero             #FCFCFB
Problem          #F5F7FA
Operational Cost #0B1220
Better Way       #EEF3FF
Capabilities     #FCFCFB
Framework        #F5F7FA
AION             #102654
Cases            #FCFCFB
Why Next Wrld    #F5F7FA
Diagnosis        #EEF3FF
FAQ              #FCFCFB
Final CTA        #102654
```

## Reglas observadas

1. Semántica: un único navy #102654 para Costo, AION y Final;
   la diferencia viene de la composición. Azul de marca reservado
   a CTAs, etapa activa, enlaces y pequeños detalles.
   Nunca azul brillante como fondo dominante.
2. Cyan fuera de la landing principal; queda como secundario
   opcional para diagramas o productos futuros.
3. Menos cajas: capacidades, casos, facts y puente van en
   composición editorial con hairlines o numeración CSS. El
   framework muestra nombre + pregunta corta por etapa, punto
   azul sólido sin halo, y el detalle como franja editorial con
   OUTPUT 01–05; titulares en tinta, azul solo en número, etapa,
   progreso y OUTPUT.
4. Serif itálica solo en momentos puntuales (hero, costo, AION,
   statement de criterio).
5. WhatsApp flotante: blanco con borde en reposo, verde oficial
   solo en hover.
6. El sticky header se adapta al capítulo: blanco translúcido
   sobre light, navy translúcido sobre dark.
7. AION es el gasto de capital visual: mock a ancho completo con
   overlap hacia el capítulo siguiente, sombra azul, UI blanca
   de alto contraste. Casos y Why con ritmo compacto, sin
   divisiones horizontales; Cases con numeración editorial 01–03,
   Why con numeración 01–04.
8. Capabilities lleva un mini-diagrama distinto por capacidad
   (capas / hub / flujo); el documento del diagnóstico flota con
   sombra navy; el cierre lleva filete superior azul.
```

Sistema: blanco cálido + gris frío + azul pálido + navy, un solo azul.

