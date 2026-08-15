export interface ModuleDetail {
  title: string;
  description: string;
  architecture: string;
  logic: string;
  example: string;
}

export const moduleDetailsData: Record<string, ModuleDetail> = {
  // === ETAPA 1 ===
  "Inventario Maestro (UI)": {
    title: "Inventario Maestro (UI)",
    description: "Es el panel centralizado ('Single Source of Truth') que reemplaza los múltiples archivos de Excel. Permite visualizar todo el catálogo de productos, existencias globales y estados de abastecimiento en tiempo real.",
    architecture: "Frontend en React consumiendo una API REST (Node.js). La data se hidrata mediante WebSockets o Polling optimizado desde el motor de estado central para garantizar consistencia sin fricción (< 100ms).",
    logic: "InventarioDisponible = (StockFisicoBase - Apartados) + TránsitoConfirmado\n\nEl sistema unifica los SKU (Stock Keeping Units) y mapea las equivalencias entre las distintas bodegas usando un índice Hash para búsquedas O(1).",
    example: "Si un operario busca 'Ácido Sulfúrico', el buscador instantáneo filtra 24,000 registros en <50ms y muestra que hay 50L en Bogotá, pero 10L están 'Apartados' para una orden, dejando 40L Disponibles reales."
  },
  "Control de Inventario Profundo (UI)": {
    title: "Control de Inventario Profundo (UI)",
    description: "Permite una gestión granular: múltiples bodegas, ubicaciones de estantes (pasillos/racks), caducidad de productos y movimientos internos invisibles para el nivel de facturación.",
    architecture: "Estructura de Base de Datos Relacional/Documental mixta. Utiliza un esquema de transacciones ACID (Atomicity, Consistency, Isolation, Durability) para evitar que dos usuarios muevan la misma unidad física simultáneamente.",
    logic: "MovimientoFísico(Item, Origen, Destino) {\n  Begin Transaction;\n  Update Origen = Origen - 1;\n  Update Destino = Destino + 1;\n  Commit;\n}\n*Si hay colisión, se hace Rollback automático.*",
    example: "Se transfiere mercancía desde la 'Bodega Principal' a la 'Bodega de Mostrador'. El sistema registra quién lo hizo, a qué hora y el ID del lote exacto transferido, trazando el ciclo de vida del producto."
  },
  "Producción y Lotes (UI)": {
    title: "Producción y Lotes (UI)",
    description: "Gestiona la transformación de materia prima en producto terminado. Controla las 'recetas' (BOM - Bill of Materials) y asigna números de lote para trazabilidad y calidad.",
    architecture: "Motor de transformación de inventario. El backend procesa las fórmulas de ensamble restando las materias primas proporcionales y generando un nuevo SKU de producto terminado con un UUID único de lote.",
    logic: "Para Producir P(x):\nPor cada Ingrediente I(i) en Receta(P):\n  Consumir: I(i).cantidad * x\nGenerar: NuevoLote(P) con Cantidad = x y FechaVencimiento = min(I(i).vencimiento)",
    example: "Para producir 100 litros de desinfectante, el módulo descuenta automáticamente 5kg de químico base y 95 litros de agua destilada, generando el 'Lote 2026-X' que hereda la caducidad del químico base."
  },
  "ATP y Asignación Explicable (UI)": {
    title: "ATP y Asignación Explicable (UI)",
    description: "El ATP es el cálculo en tiempo real que le dice al vendedor exactamente cuánto puede prometerle a un cliente sin romper stock ni afectar órdenes previas.",
    architecture: "Algoritmo de cálculo en memoria (In-Memory Compute) que lee el flujo de oferta (inventario físico + órdenes de compra en camino) contra la demanda (órdenes de venta pendientes).",
    logic: "ATP(Semana N) = \n[StockFísico + EntradasProgramadas(1 a N)] \n- [VentasComprometidas(1 a N) + StockDeSeguridad]\n\nSe recalcula dinámicamente con cada inserción en el Event Log.",
    example: "Un vendedor quiere vender 500 botellas. Físicamente hay 200, pero el ATP le avisa que llegarán 400 el viernes. El vendedor puede 'Prometer' la entrega total para el próximo lunes con 100% de certeza matemática."
  },
  "UI Operativa (Punto de Venta)": {
    title: "UI Operativa (Punto de Venta)",
    description: "La interfaz rápida e intuitiva para que los asesores de mostrador facturen y despachen con la menor fricción posible, pensada para velocidad.",
    architecture: "React Single Page Application (SPA) optimizada con atajos de teclado y escáneres de código de barras. Usa LocalStorage para evitar pérdida de datos si hay micro-cortes de internet.",
    logic: "Flujo de Caja: \n1. Escaneo (Búsqueda de SKU en <20ms) \n2. Validación ATP síncrona \n3. Bloqueo temporal (Pessimistic Lock) \n4. Liquidación (Taxes + Descuentos) \n5. Emisión SIIGO.",
    example: "El cliente llega a mostrador. El vendedor pistolea 3 ítems, el sistema aplica la regla de precios mayoristas por volumen instantáneamente y reserva el stock mientras el cliente paga en datáfono."
  },
  "Event Log / Activity Stream (UI)": {
    title: "Event Log / Activity Stream (UI)",
    description: "Un registro inmutable (tipo Blockchain interno) que graba cada acción en el sistema: quién, cuándo y qué cambió, permitiendo auditorías forenses.",
    architecture: "Patrón de diseño 'Event Sourcing'. En vez de guardar solo el estado final, se guardan todos los deltas (incrementos/decrementos). La base de datos es un Append-Only Log.",
    logic: "EstadoActual = EstadoInicial + SUM(EventosDesdeT0)\n\nCada evento es un JSON inmutable con:\n{ UserID, Timestamp, TipoEvento, Payload, HashAnterior }",
    example: "Se nota un descuadre de 5 unidades. Se consulta el Event Log y se ve que el usuario 'Juan' hizo un ajuste manual a las 4:30 PM justificando 'merma', con trazabilidad perfecta."
  },
  "Arquitectura Serverless y Base de Datos": {
    title: "Arquitectura Serverless y Base de Datos",
    description: "El núcleo tecnológico del proyecto que garantiza que el sistema nunca se caiga y escale automáticamente sin tener que gestionar servidores físicos.",
    architecture: "Uso de Funciones Lambda/Cloud Functions y bases de datos NoSQL escalables (ej. Firebase/MongoDB). Computación bajo demanda que factura por milisegundos de uso.",
    logic: "Auto-Scaling Model:\nSi Carga(N) > Umbral(T) => Generar Instancia(N+1)\n\nTolerancia a Fallos: Replicación multi-zona. Si un nodo cae, la API Gateway enruta al siguiente nodo en <10ms.",
    example: "Día sin IVA: El tráfico se multiplica por 10x de repente. El servidor Serverless clona la base de datos de lectura y levanta 50 instancias del backend automáticamente sin que nadie apriete un botón."
  },
  "Núcleo Operativo (State Engine)": {
    title: "Núcleo Operativo (State Engine)",
    description: "El 'Cerebro' invisible. Es la máquina de estados que valida las reglas de negocio estrictas antes de dejar que cualquier cambio pase a la base de datos.",
    architecture: "State Machine (Máquina de Estados Finita). Las órdenes de venta o producción solo pueden transicionar por caminos válidos (ej. Borrador -> Aprobada -> Empacada -> Facturada).",
    logic: "Validación de Transición T(x->y):\nSi Estado = 'Aprobada' y Condición = 'PagoValidado', entonces NextState = 'Empacada'.\nSi Condición falla = Throw RuleEngineException.",
    example: "Un empleado intenta pasar un pedido a 'Facturado' pero no hay comprobante de pago. El State Engine bloquea la transacción a nivel de servidor, haciendo imposible saltarse el proceso financiero."
  },
  "DIAN Adapter (Integración SIIGO)": {
    title: "DIAN Adapter (Integración SIIGO)",
    description: "El puente de comunicación entre nuestro ecosistema ágil y el software contable rígido (SIIGO), para que la contabilidad y facturación electrónica ocurra sin doble digitación.",
    architecture: "Microservicio tipo Middleware / Cola de Mensajes (Message Broker). Encola las facturas y usa un retry-policy exponencial si la API de SIIGO responde lento o falla.",
    logic: "Payload Builder:\nTransformar Order(Avalon) -> Factura(SIIGO_JSON)\nSi SIIGO.Status == 500 (Caído):\n  Retry después de 2^x segundos (Max 5 intentos).\n  Almacenar en Dead Letter Queue para revisión manual.",
    example: "Se concreta una venta. El sistema despacha los productos localmente y en segundo plano (asíncrono) envía el JSON a SIIGO, el cual emite el XML a la DIAN. El empleado nunca vio a SIIGO."
  },

  // === ETAPA 2 ===
  "Forecast & Planning": {
    title: "Forecast & Planning",
    description: "El módulo que predice qué vas a vender mañana basándose en la historia. Calcula la demanda esperada para que compres materia prima justo a tiempo.",
    architecture: "Modelos de series de tiempo (Ej. ARIMA o Exponential Smoothing). Recoge la data histórica del 'Event Log' y proyecta la estacionalidad.",
    logic: "DemandaProyectada(t) = (Alpha * VentasReales(t-1)) + ((1 - Alpha) * DemandaProyectada(t-1))\n\nAplica filtros de picos anómalos para no sesgar el algoritmo por una venta inusual gigante.",
    example: "El sistema nota que en Octubre siempre hay un pico de desinfectantes. En Agosto, te sugiere comprar 30% extra de químicos anticipándose a la tendencia, evitando rupturas de inventario."
  },
  "Planning Operativo": {
    title: "Planning Operativo",
    description: "Traduce las proyecciones en una preparación concreta. Te permite jugar a 'qué pasaría si' aislando la operación real.",
    architecture: "Motor de simulaciones en memoria. Utiliza una copia en sombra (shadow database) para procesar simulaciones de estrés en el inventario.",
    logic: "Simulación(Escenario) {\n  Clonar EstadoActual;\n  Aplicar Modificadores(Escenario.demanda_extra);\n  Retornar (Proyección_Inventario);\n}",
    example: "Simulas qué pasaría si un gran cliente hace un pedido imprevisto del 20% más sobre lo habitual. El Planning Operativo calcula exactamente a qué día se quedarían sin inventario."
  },
  "Purchasing Intelligence": {
    title: "Purchasing Intelligence",
    description: "La IA sugiere a quién comprarle, cuándo comprarle y qué cantidades pedir (Lote Económico de Compras - EOQ), equilibrando el costo de pedir contra el costo de almacenar.",
    architecture: "Algoritmos de optimización matemática que analizan las reglas de MOQ (Minimum Order Quantity), Lead Times de los proveedores y costos logísticos.",
    logic: "CantidadOptima (EOQ) = Raíz Cuadrada de (2 * DemandaAnual * CostoPorOrden / CostoDeMantenerInventario)\n\nPunto de Reorden (ROP) = (DemandaDiaria * TiempoEntregaProveedor) + StockSeguridad.",
    example: "Para un empaque plástico, el ROP determina que si llegas a 5,000 unidades debes comprar. El EOQ te dice que debes pedirle 20,000 exactas al Proveedor porque ofrecen el mejor flete por ese volumen."
  },
  "Inventory Drain": {
    title: "Inventory Drain",
    description: "Te permite viajar al futuro. Simula a qué velocidad se va a 'drenar' (vaciar) la bodega basándose en las órdenes actuales y el forecast.",
    architecture: "Motor de cálculo Montecarlo y Proyección Lineal. Simula el inventario iterativamente día por día sumando entradas y restando salidas.",
    logic: "DrenajeInventario(Día_x) = Inventario(Día_x-1) + LlegadasProyectadas(Día_x) - DemandaProyectada(Día_x)\n\nSi DrenajeInventario(Día_x) <= 0 => Alerta Crítica (Stockout inminente).",
    example: "Pones en el simulador '¿Qué pasa si ganamos la licitación de 500 litros de jabón?'. El sistema dibuja la gráfica y te muestra que en 12 días te quedarás en cero, permitiéndote tomar acción hoy."
  },
  "Impacto Financiero Proyectado": {
    title: "Impacto Financiero Proyectado",
    description: "Traduce las decisiones operativas a Dólares y Pesos. Calcula el capital inmovilizado en bodega y las ventas en riesgo.",
    architecture: "Motor analítico de inteligencia de negocios (BI). Cruza las métricas de Costo de Bienes Vendidos (COGS) con las métricas de días de inventario.",
    logic: "CapitalInmovilizado = SUM(StockActual(SKU) * CostoPromedioPonderado(SKU))\nVentasEnRiesgo = ProbabilidadQuiebreStock * DemandaEsperada * MargenBruto",
    example: "El Dashboard rojo te avisa: Tienes $15 Millones inmovilizados en mercancía que lleva 6 meses sin moverse, y tienes en riesgo $5 Millones de ganancia porque te vas a quedar sin cajas la próxima semana."
  },
  "IA Contextual y Explainability": {
    title: "IA Contextual y Explainability",
    description: "Implementación de Modelos de Lenguaje Natural (LLMs) dentro de la herramienta para que interactúes con el sistema haciéndole preguntas en lenguaje humano.",
    architecture: "Integración vía API REST con Google Gemini (u otro LLM). Usa RAG (Retrieval-Augmented Generation) para que la IA entienda el estado actual de TU base de datos y no invente información.",
    logic: "1. Usuario Pregunta: '¿Qué falta por llegar?'\n2. Sistema hace Query a BD -> Saca JSON de Órdenes Pendientes.\n3. Se inyecta (Prompt Engineering): 'Con esta data [JSON], responde al usuario de forma ejecutiva'.\n4. Gemini devuelve un resumen en lenguaje natural.",
    example: "Le preguntas al chat integrado: '¿Por qué cayeron las ventas de resina en abril?'. La IA analiza el Event Log, cruza el dato de inventario y responde: 'Porque tuvimos un quiebre de stock de 15 días entre el 5 y el 20 de Abril'."
  },
  "Auto-Insights y Alertas Proactivas": {
    title: "Auto-Insights y Alertas Proactivas",
    description: "Alertas diseñadas para interrumpir solo cuando importa. Advierte proactivamente sobre combinaciones de pedidos peligrosas o capital inmovilizado sin rotación efectiva.",
    architecture: "Job Scheduler / Event-Driven Architecture. Ejecuta scripts de análisis cada hora (Cron Jobs) que evalúan umbrales (Thresholds) y disparan notificaciones mediante WebSockets o Push.",
    logic: "Si (Rotación(SKU) == 0 AND DiasEnBodega > 60) -> Trigger Alert(CapitalInmovilizado).\nSi (Score(Alerta) > 0.8) -> NotificarUsuario(AltaPrioridad).",
    example: "A las 8:00 AM, el director recibe una alerta proactiva en pantalla indicando que, si no cancela la compra en tránsito de 'Reactivo Z', tendrán un exceso de $10M inmovilizados el próximo mes."
  },
  "Decision Memory y Gobierno": {
    title: "Decision Memory y Gobierno",
    description: "Memoria histórica de recomendaciones. Registra si una recomendación de IA fue aceptada o rechazada por el humano, permitiendo auditar y mejorar el modelo constantemente.",
    architecture: "Feedback Loop Database. Guarda la decisión sugerida por la IA versus la decisión humana, y ejecuta una evaluación automática en T+30 días para calcular quién tuvo la razón financieramente.",
    logic: "Log de Decisión:\n[Recomendación: Comprar 100u | Realidad: Humano compró 50u]\nEvaluación(T+30): Stock agotado y 20 ventas perdidas.\nActualizar Modelo: Aumentar 'Trust Score' de la predicción algorítmica.",
    example: "El algoritmo recomendó no abastecerse de un producto estacional, el humano decidió comprar igual. Tres meses después el stock sigue inmóvil; el sistema se 'acuerda' y usa este caso de estudio para la siguiente predicción."
  }
};
