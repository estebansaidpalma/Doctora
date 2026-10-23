const initialData = {
  clinic: {
    name: "Sonrisa Perfecta, C.A.",
    doctor: "OD. Celenia Tovar",
    rif: "J407632507",
    specialty: "Odontología Integral, Estética & Cirugía Bucal",
    phone: "+58 414 1234567",
    address: "Centro Médico Dental, Consultorio 3-B",
    email: "sonrisaperfecta.dental@gmail.com",
    currencySymbol: "$"
  },
  treatments: [
    { id: "T1", name: "Profilaxis Ultrasónica & Pulido", category: "Prevención", defaultPrice: 30 },
    { id: "T2", name: "Resina Estética / Obturación (1 Superficie)", category: "Operatoria", defaultPrice: 35 },
    { id: "T3", name: "Resina Estética Compleja (2+ Superficies)", category: "Operatoria", defaultPrice: 50 },
    { id: "T4", name: "Exodoncia Simple", category: "Cirugía", defaultPrice: 40 },
    { id: "T5", name: "Cirugía de Cordal (Tercer Molar Erupcionado)", category: "Cirugía", defaultPrice: 70 },
    { id: "T6", name: "Cirugía de Cordal Retenido / Semi-impactado", category: "Cirugía", defaultPrice: 120 },
    { id: "T7", name: "Endodoncia Unirradicular (Conducto)", category: "Endodoncia", defaultPrice: 110 },
    { id: "T8", name: "Endodoncia Multirradicular (Molar)", category: "Endodoncia", defaultPrice: 160 },
    { id: "T9", name: "Corona de Porcelana / Zirconio", category: "Rehabilitación", defaultPrice: 220 },
    { id: "T10", name: "Blanqueamiento Dental LED en Consultorio", category: "Estética", defaultPrice: 90 },
    { id: "T11", name: "Aplicación de Sellantes y Flúor", category: "Prevención", defaultPrice: 20 },
    { id: "T12", name: "Control de Ortodoncia Mensual", category: "Ortodoncia", defaultPrice: 35 }
  ],
  patients: [
    {
      id: "P001",
      name: "Mariana Valentina Gómez",
      documentId: "V-24.890.123",
      phone: "+584149876543",
      email: "mariana.gomez@gmail.com",
      birthDate: "1997-06-14",
      age: 29,
      gender: "Femenino",
      occupation: "Diseñadora Gráfica",
      address: "Urbanización Los Naranjos, Edif. Cerezo, Apto 4A",
      emergencyContact: "Carlos Gómez (Hermano) - 0412-5551234",
      medicalAlerts: {
        allergies: "ALERGIA SEVERA A LA PENICILINA",
        systemicDiseases: "Ninguna",
        medications: "Anticonceptivos orales",
        bleedingRisk: false,
        pregnant: false
      },
      clinicalHistory: {
        historyNumber: "001",
        date: "2026-10-10",
        sex: "Femenino",
        profession: "Diseñadora Gráfica",
        city: "Caracas",
        state: "Miranda",
        workplace: "Estudio Creativo C.A.",
        consultationReason: "Dolor punzante en zona molar inferior derecha y chequeo general",
        currentIllness: "Paciente femenina de 29 años refiere molestia progresiva al masticar en zona posteroinferior de 4 días de evolución.",
        familyHistory: "Madre: Hipertensión arterial controlada. Padre: Aparentemente sano.",
        personalHistory: {
          alergias: true,
          diabetes: false,
          artritis: false,
          estres: true,
          depresion: false,
          anemia: false,
          cardiopatias: false,
          enfermedadesRenales: false,
          hipertension: false,
          hipotension: false,
          enfermedadesRespiratorias: false,
          enfermedadesGastricas: false,
          enfermedadesVirales: false,
          traumatismo: false,
          cirugias: false,
          altoRiesgo: false,
          higado: false,
          venereas: false,
          dolorCabeza: false,
          sinusitis: false,
          ulcerasGastricas: false
        },
        currentMedications: "Anticonceptivos orales",
        pulse: "72",
        bloodPressureHigh: "120",
        bloodPressureLow: "80",
        habits: "Bruxismo nocturno leve."
      },
      clinicalNotes: [
        {
          date: "2026-10-10",
          author: "Dra. Sofía Rodríguez",
          note: "Paciente acude a valoración general. Refiere dolor punzante en zona molar inferior derecha correspondiente al cordal 48 semi-incluido. Se toma radiografía panorámica de control. Se programa cirugía de cordales 48 y 18."
        }
      ],
      odontogram: {
        "48": {
          toothNumber: "48",
          name: "Tercer Molar Inferior Derecho (Cordal)",
          condition: "cirugia",
          surfaces: { oclusal: "caries", mesial: "sano", distal: "sano", vestibular: "sano", lingual: "sano" },
          notes: "Cordal semi-impactado mesioangulado. Pericoronaritis recurrente. Indicada exodoncia quirúrgica urgente.",
          procedurePlan: "Cirugía de Cordal Retenido / Semi-impactado",
          estimatedCost: 120
        },
        "18": {
          toothNumber: "18",
          name: "Tercer Molar Superior Derecho (Cordal)",
          condition: "cirugia",
          surfaces: { oclusal: "caries", mesial: "sano", distal: "sano", vestibular: "sano", lingual: "sano" },
          notes: "Erupcionado con caries oclusal activa sin antagonista funcional. Indicada extracción.",
          procedurePlan: "Cirugía de Cordal (Tercer Molar Erupcionado)",
          estimatedCost: 70
        },
        "16": {
          toothNumber: "16",
          name: "Primer Molar Superior Derecho",
          condition: "obturado",
          surfaces: { oclusal: "obturado", mesial: "sano", distal: "sano", vestibular: "sano", lingual: "sano" },
          notes: "Resina oclusal en excelente estado realizada en 2024.",
          procedurePlan: "",
          estimatedCost: 0
        },
        "26": {
          toothNumber: "26",
          name: "Primer Molar Superior Izquierdo",
          condition: "caries",
          surfaces: { oclusal: "caries", mesial: "caries", distal: "sano", vestibular: "sano", lingual: "sano" },
          notes: "Caries oclusomesial de profundidad media sin afectación pulpar.",
          procedurePlan: "Resina Estética Compleja (2+ Superficies)",
          estimatedCost: 50
        },
        "38": {
          toothNumber: "38",
          name: "Tercer Molar Inferior Izquierdo (Cordal)",
          condition: "sano",
          surfaces: { oclusal: "sano", mesial: "sano", distal: "sano", vestibular: "sano", lingual: "sano" },
          notes: "Completamente erupcionado en correcta posición, asintomático.",
          procedurePlan: "",
          estimatedCost: 0
        },
        "28": {
          toothNumber: "28",
          name: "Tercer Molar Superior Izquierdo (Cordal)",
          condition: "ausente",
          surfaces: { oclusal: "ausente", mesial: "ausente", distal: "ausente", vestibular: "ausente", lingual: "ausente" },
          notes: "Extraído en 2023 por ortodoncista previo.",
          procedurePlan: "",
          estimatedCost: 0
        }
      },
      budgets: [
        {
          id: "B001",
          date: "2026-10-10",
          items: [
            { treatmentId: "T6", tooth: "48", name: "Cirugía de Cordal Retenido #48", price: 120 },
            { treatmentId: "T5", tooth: "18", name: "Cirugía de Cordal Erupcionado #18", price: 70 },
            { treatmentId: "T3", tooth: "26", name: "Resina Compleja Ocluso-mesial #26", price: 50 },
            { treatmentId: "T1", tooth: "General", name: "Profilaxis y Limpieza Dental", price: 30 }
          ],
          subtotal: 270,
          discount: 20, // Descuento de $20 otorgado por la Dra. en consulta de control
          total: 250,
          payments: [
            { id: "PAY-1", date: "2026-10-10", amount: 100, method: "Transferencia Bancaria", reference: "REF-9921", note: "Abono inicial para separar quirófano" }
          ],
          balance: 150
        }
      ],
      gallery: [
        {
          id: "IMG-01",
          date: "2026-10-10",
          title: "Radiografía Panorámica Inicial",
          type: "Radiografía",
          notes: "Se observa angulación mesial del cordal 48 presionando la raíz del segundo molar 47.",
          src: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='260' viewBox='0 0 400 260'><rect width='400' height='260' fill='%230f172a'/><text x='50%25' y='45%25' fill='%2394a3b8' font-family='sans-serif' font-size='16' text-anchor='middle'>Radiograf%C3%ADa Panor%C3%A1mica</text><text x='50%25' y='60%25' fill='%2338bdf8' font-family='sans-serif' font-size='13' text-anchor='middle'>Paciente: Mariana G%C3%B3mez - Sonrisa Perfecta</text></svg>"
        }
      ]
    },
    {
      id: "P002",
      name: "Alejandro José Mendoza",
      documentId: "V-18.452.781",
      phone: "+584241239876",
      email: "alejandro.mendoza@hotmail.com",
      birthDate: "1988-11-03",
      age: 37,
      gender: "Masculino",
      occupation: "Ingeniero Civil",
      address: "Colinas de Bello Monte, Residencia Ávila",
      emergencyContact: "Elena de Mendoza (Esposa) - 0424-9988771",
      medicalAlerts: {
        allergies: "Ninguna conocida",
        systemicDiseases: "Hipertensión Arterial (controlado con medicación)",
        medications: "Enalapril 20mg / día",
        bleedingRisk: false,
        pregnant: false
      },
      clinicalHistory: {
        historyNumber: "002",
        date: "2026-10-11",
        sex: "Masculino",
        profession: "Ingeniero Civil",
        city: "Caracas",
        state: "Miranda",
        workplace: "Constructora Ávila",
        consultationReason: "Control de Ortodoncia y limpieza",
        currentIllness: "Paciente asintomático, acude a cita programada de mantenimiento.",
        familyHistory: "Padre con antecedentes de diabetes tipo 2.",
        personalHistory: {
          alergias: false,
          diabetes: false,
          artritis: false,
          estres: false,
          depresion: false,
          anemia: false,
          cardiopatias: false,
          enfermedadesRenales: false,
          hipertension: true,
          hipotension: false,
          enfermedadesRespiratorias: false,
          enfermedadesGastricas: false,
          enfermedadesVirales: false,
          traumatismo: false,
          cirugias: false,
          altoRiesgo: false,
          higado: false,
          venereas: false,
          dolorCabeza: false,
          sinusitis: false,
          ulcerasGastricas: false
        },
        currentMedications: "Enalapril 20mg diario",
        pulse: "68",
        bloodPressureHigh: "125",
        bloodPressureLow: "85",
        habits: "No fuma ni consume alcohol."
      },
      clinicalNotes: [
        {
          date: "2026-10-11",
          author: "Dra. Sofía Rodríguez",
          note: "Paciente en tratamiento de ortodoncia. Asiste a control mensual de cambio de arcos y ligas. Higiene bucal óptima."
        }
      ],
      odontogram: {},
      budgets: [
        {
          id: "B002",
          date: "2026-10-11",
          items: [
            { treatmentId: "T12", tooth: "General", name: "Control de Ortodoncia Octubre", price: 35 }
          ],
          subtotal: 35,
          discount: 0,
          total: 35,
          payments: [
            { id: "PAY-2", date: "2026-10-11", amount: 35, method: "Pago Móvil / Efectivo", reference: "PAG-004", note: "Pago completo" }
          ],
          balance: 0
        }
      ],
      gallery: []
    }
  ],
  appointments: [
    {
      id: "APT-101",
      patientId: "P001",
      patientName: "Mariana Valentina Gómez",
      phone: "+584149876543",
      date: new Date().toISOString().slice(0, 10),
      time: "09:30",
      duration: 60,
      reason: "Cirugía de Cordales #48 y #18",
      status: "confirmada",
      notes: "Preparar instrumental quirúrgico, anestesia al 2% con epinefrina. Paciente es alérgica a la penicilina."
    },
    {
      id: "APT-102",
      patientId: "P002",
      patientName: "Alejandro José Mendoza",
      phone: "+584241239876",
      date: new Date().toISOString().slice(0, 10),
      time: "11:00",
      duration: 30,
      reason: "Control mensual de Ortodoncia",
      status: "programada",
      notes: "Cambio de arcos superiores e inferiores."
    },
    {
      id: "APT-103",
      patientId: "P001",
      patientName: "Mariana Valentina Gómez",
      phone: "+584149876543",
      date: new Date(Date.now() + 86400000 * 1).toISOString().slice(0, 10),
      time: "10:00",
      duration: 30,
      reason: "Resina Estética #26 (Control de Caries)",
      status: "programada",
      notes: "Chequeo posoperatorio de extracción de cordal."
    },
    {
      id: "APT-104",
      patientId: "P002",
      patientName: "Alejandro José Mendoza",
      phone: "+584241239876",
      date: new Date().toISOString().slice(0, 10),
      time: "14:00",
      duration: 60,
      reason: "Limpieza Profunda y Detartraje",
      status: "confirmada",
      reassignedFrom: {
        originalPatientId: "P001",
        originalPatientName: "Mariana Valentina Gómez",
        cancelledAt: new Date().toISOString(),
        reason: "Paciente canceló por viaje imprevisto de trabajo. Se reasignó el turno a Alejandro Mendoza."
      },
      notes: "Cupo tomado por llamada de confirmación de la Doctora."
    }
  ]
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = initialData;
}
