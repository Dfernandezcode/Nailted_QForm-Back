import { CategoryEnum } from "./domain/entities/category-entity";
import { TypeInput } from "./domain/entities/form-entity";

export const questionsList = {
  financial: [
    {
      type: TypeInput.Text,
      question_text: "¿Cúal es el nombre de tu empresa?",
      placeholder: "Introduce el nombre de tu empresa, por favor."
    },
    {
      type: TypeInput.Number,
      question_text: "¿Cuál es el volúmen de negocio de tu empresa?",
      optionsNumber: [
        { min: 0, max: 10, points: 1 },
        { min: 11, max: 30, points: 2 },
        { min: 31, max: 1000, points: 3 }
      ],
      placeholder: "Introduce el volúmen"
    },
    {
      type: TypeInput.Checkbox,
      question_text: "¿En que sectores trabaja tu empresa?",
      options: [
        { name: "Automovilistico", points: -1 },
        { name: "Comercio electrónico", points: 2 },
        { name: "Servicios", points: 2 }
      ],
    },
    {
      type: TypeInput.Radio,
      question_text: "¿Cúantos líneas de crédito tiene tu empresa?",
      options: [
        { name: "de 0 a 2", points: 3 },
        { name: "de 3 a 5", points: 2 },
        { name: "más de 5", points: 1 }
      ],
    },
  ],
  operations: [
    {
      type: TypeInput.Text,
      question_text: "¿Dónde se situa la sede de tu empresa?",
      placeholder: "Escribe la ciudad y el país, por favor."
    },
    {
      type: TypeInput.Number,
      question_text: "¿Cuántas operaciones realizas al año?",
      optionsNumber: [
        { min: 0, max: 10, points: 1 },
        { min: 11, max: 20, points: 2 },
        { min: 21, max: 1000, points: 3 }
      ],
      placeholder: "Escribe el número"
    },
    {
      type: TypeInput.Checkbox,
      question_text: "¿Con qué bancos trabajas?",
      options: [
        { name: "BBVA", points: -1 },
        { name: "La Caixa", points: 2 },
        { name: "ING", points: 2 }
      ],
    },
    {
      type: TypeInput.Radio,
      question_text: "¿Cúantas operaciones de inversión realizaste con estos bancos en el último año?",
      options: [
        { name: "de 0 a 20", points: 1 },
        { name: "de 21 a 50", points: 2 },
        { name: "más de 50", points: 3 }
      ],
    },
  ],
  rrhh: [
    {
      type: TypeInput.Text,
      question_text: "¿Nombre del jefe de RRHH?",
      placeholder: "Introduce nombre completo."
    },
    {
      type: TypeInput.Number,
      question_text: "¿Cuántos empleados tiene tu empresa?",
      optionsNumber: [
        { min: 0, max: 10, points: 1 },
        { min: 11, max: 30, points: 2 },
        { min: 31, max: 1000, points: 3 }
      ],
      placeholder: "Introduce el número."
    },
    {
      type: TypeInput.Checkbox,
      question_text: "¿Qué medidas de conciliación tenéis implementadas?",
      options: [
        { name: "TRABAJO HÍBRIDO", points: 0 },
        { name: "TELETRABAJO", points: 2 },
        { name: "CHEQUE GUARDERÍA", points: 2 }
      ],
    },
    {
      type: TypeInput.Radio,
      question_text: "¿Cúantos departamentos tiene tu empresa?",
      options: [
        { name: "de 0 a 2", points: 3 },
        { name: "de 3 a 5", points: 2 },
        { name: "más de 5", points: 1 }
      ],
    },
  ],
  tecnology: [
    {
      type: TypeInput.Text,
      question_text: "¿Cuál es el nombre del software de gestión que utiliza tu empresa?",
      placeholder: "Introduce el nombre del software.",
    },
    {
      type: TypeInput.Number,
      question_text: "¿Cuántos empleados de tu empresa tienen acceso a la red de la compañía?",
      optionsNumber: [
        { min: 0, max: 10, points: 1 },
        { min: 11, max: 50, points: 2 },
        { min: 51, max: 1000, points: 3 },
      ],
      placeholder: "Introduce el número.",
    },
    {
      type: TypeInput.Checkbox,
      question_text: "¿Qué medidas de seguridad implementa tu empresa para proteger los datos de clientes y empleados?",
      options: [
        { name: "Encriptación", points: 1 },
        { name: "Protocolos", points: 1 },
        { name: "Auditorías", points: 2 },
      ],
    },
    {
      type: TypeInput.Radio,
      question_text: "¿En qué medida la tecnología ha ayudado a tu empresa a mantenerse competitiva en el mercado?",
      options: [
        { name: "Fundamental", points: 3 },
        { name: "No determinante", points: 2 },
        { name: "Sin impacto", points: 1 },
      ],
    },
  ],
}

export const categoriesList = [
  {
    name: CategoryEnum.RRHH,
    feedback: [
      {
        min: 0,
        max: 3,
        shortFeedback: ["Mejora la conciliación laboral!", "Integra mejor a los trabajadores"],
        longFeedback: ["Implementa mejores póliticas de conciliación laboral para tus trabajadores", "Desarrolla nuevos planes de formación específicos para los empleados."]
      },
      {
        min: 4,
        max: 7,
        shortFeedback: ["Tienes que realizar mejoras", "Es un buen principio"],
        longFeedback: ["Puedes mejorar en ciertos aspectos pero por lo general, vas bien encaminado.", "Intenta seguir dearrollando nuevos planes y políticas y obtendrás grandes resultados"]
      },
      {
        min: 8,
        max: 10,
        shortFeedback: ["Muy buen trabajo", "Sigue por este camino"],
        longFeedback: ["Estás haciendo las cosas muy bien, no pierdas la perspectiva y sigue este camino", "En relación a RRHH estás realizando las cosas muy bien continua así"]
      }
    ]
  },
  {
    name: CategoryEnum.Operations,
    feedback: [
      {
        min: 0,
        max: 3,
        shortFeedback: ["Todo tiene un principio!", "No te desanimes"],
        longFeedback: ["La clave es seguir trabajando en mejorar día a día", "Investiga otras opciones de inversión, Intenta diversificar tu capital."]
      },
      {
        min: 4,
        max: 7,
        shortFeedback: ["No está mal", "Es un buen principio"],
        longFeedback: ["Todavía puedes mejorar en ciertos aspectos en relación a tus operaciones.", "Intenta reducir un poco los costes añadidos y obtendrás grandes resultados"]
      },
      {
        min: 8,
        max: 10,
        shortFeedback: ["Grandes resultados", "Estás haciendo muy bien las cosas."],
        longFeedback: ["Sigue este camino, no pierdas la perspectiva.", "Estás diversificando bien las inversiones y las líneas de crédito."]
      }
    ]
  },
  {
    name: CategoryEnum.Finance,
    feedback: [
      {
        min: 0,
        max: 3,
        shortFeedback: ["Hay oportunidades de mejora.", "Sigue explorando opciones."],
        longFeedback: ["Con las políticas adecuadas, puedes mejorar mucho más en poco tiempo.", "Si continúas invirtiendo en tecnología y capacitando a tu equipo, obtendrás mejores resultados."]
      },
      {
        min: 4,
        max: 7,
        shortFeedback: ["Puedes avanzar más.", "Persiste en tus esfuerzos."],
        longFeedback: ["Sigue trabajando en la implementación de proyectos tecnológicos.", "Implementando buenas políticas y optimizando tus procesos, conseguirás aún mejores resultados."]
      },
      {
        min: 8,
        max: 10,
        shortFeedback: ["Excelente trabajo.", "Sigue así, vas por buen camino."],
        longFeedback: ["Tus decisiones tecnológicas son acertadas, mantén la perspectiva y sigue este camino.", "En el ámbito tecnológico, estás llevando a cabo un excelente trabajo, continua así."]
      }
    ]
  },
  {
    name: CategoryEnum.Tecnology,
    feedback: [
      {
        min: 0,
        max: 3,
        shortFeedback: ["Es un comienzo.", "Sigue esforzándote."],
        longFeedback: ["Con las políticas adecuadas, puedes mejorar mucho más en poco tiempo.", "Si continúas invirtiendo en tecnología y capacitando a tu equipo, obtendrás mejores resultados."]
      },
      {
        min: 4,
        max: 7,
        shortFeedback: ["Puedes mejorar.", "No te rindas."],
        longFeedback: ["Sigue trabajando en la implementación de proyectos tecnológicos.", "Implementando buenas políticas y optimizando tus procesos, conseguirás aún mejores resultados."]
      },
      {
        min: 8,
        max: 10,
        shortFeedback: ["Gran trabajo.", "Continúa trabajando así."],
        longFeedback: ["Tus decisiones tecnológicas son acertadas, mantén la perspectiva y sigue este camino.", "En el ámbito tecnológico, estás llevando a cabo un excelente trabajo, continua así."]
      }
    ]
  },
]

export const answerList = [
  // Finance
  {
    answer: ["Nailted"],
    question_text: "¿Cúal es el nombre de tu empresa?",
  },
  {
    answer: ["11"],
    question_text: "¿Cuál es el volúmen de negocio de tu empresa?",
  },
  {
    answer: ["Comercio electrónico", "Servicios"],
    question_text: "¿En que sectores trabaja tu empresa?",
  },
  {
    answer: ["de 0 a 2"],
    question_text: "¿Cúantos líneas de crédito tiene tu empresa?",
  },
  // Operations
  {
    answer: ["Madrid, España"],
    question_text: "¿Dónde se situa la sede de tu empresa?",
  },
  {
    answer: ["22"],
    question_text: "¿Cuántas operaciones realizas al año?",
  },
  {
    answer: ["BBVA", "ING"],
    question_text: "¿Con qué bancos trabajas?",
  },
  {
    answer: ["de 21 a 50"],
    question_text: "¿Cúantas operaciones de inversión realizaste con estos bancos en el último año?",
  },
  // RRHH
  {
    answer: ["Antoni Rosi"],
    question_text: "¿Nombre del jefe de RRHH?",
  },
  {
    answer: ["12"],
    question_text: "¿Cuántos empleados tiene tu empresa?",
  },
  {
    answer: ["TELETRABAJO", "CHEQUE GUARDERÍA"],
    question_text: "¿Qué medidas de conciliación tenéis implementadas?",
  },
  {
    answer: ["de 3 a 5"],
    question_text: "¿Cúantos departamentos tiene tu empresa?",
  },
  // Tecnology
  {
    answer: ["SistemaERP123"],
    question_text: "¿Cuál es el nombre del software de gestión que utiliza tu empresa?",
  },
  {
    answer: ["85"],
    question_text: "¿Cuántos empleados de tu empresa tienen acceso a la red de la compañía?",
  },
  {
    answer: ["Encriptación de datos", "Protocolos de seguridad"],
    question_text: "¿Qué medidas de seguridad implementa tu empresa para proteger los datos de clientes y empleados?",
  },
  {
    answer: ["Ha sido útil pero no determinante"],
    question_text: "¿En qué medida la tecnología ha ayudado a tu empresa a mantenerse competitiva en el mercado?",
  },
]
