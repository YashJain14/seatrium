// lib/data.ts
import { QuestionnaireData } from './types';

export const questionnaireData: QuestionnaireData = {
  "categories": [
    {
      "name": "Raw Material Extraction",
      "percentage": 40,
      "questions": [
        {
          "id": "raw_materials",
          "text": "What raw materials do you use in steel production? (Select all that apply)",
          "type": "checkbox",
          "options": [
            {
              "label": "Iron ore",
              "multiplier": 1
            },
            {
              "label": "Scrap steel",
              "multiplier": 0.5
            },
            {
              "label": "Coal",
              "multiplier": 1.2
            },
            {
              "label": "Limestone",
              "multiplier": 1.05
            },
            {
              "label": "DRI-Gas-Based",
              "multiplier": 0.9
            },
            {
              "label": "Other (please specify)",
              "multiplier": 1
            }
          ]
        },
        {
          "id": "material_source",
          "text": "Where do you source your iron ore or scrap steel material from? (Select one)",
          "type": "radio",
          "options": [
            {
              "label": "Domestic supplier (Singapore)",
              "multiplier": 1
            },
            {
              "label": "Imported",
              "multiplier": 1
            }
          ]
        },
        {
          "id": "import_country",
          "text": "Distance/Country of Import (to Singapore)",
          "type": "radio",
          "options": [
            {
              "label": "Malaysia (~300km)",
              "multiplier": 1.05
            },
            {
              "label": "Indonesia (~1000km)",
              "multiplier": 1.05
            },
            {
              "label": "Australia (~4000km)",
              "multiplier": 1.07
            },
            {
              "label": "China (~4500km)",
              "multiplier": 1.1
            },
            {
              "label": "India (~3500km)",
              "multiplier": 1.1
            },
            {
              "label": "Middle East (~6500km)",
              "multiplier": 1.12
            },
            {
              "label": "Brazil (~15000km)",
              "multiplier": 1.15
            },
            {
              "label": "Europe (~11000km)",
              "multiplier": 1.13
            },
            {
              "label": "North America (~16000km)",
              "multiplier": 1.2
            }
          ]
        },
        {
          "id": "transport_mode",
          "text": "Mode of Transport",
          "type": "radio",
          "options": [
            {
              "label": "Truck (Short-haul, <500 km)",
              "multiplier": 0.05
            },
            {
              "label": "Bulk Carrier (Long-haul shipping)",
              "multiplier": 0.05
            },
            {
              "label": "Container Ship (Intercontinental shipping)",
              "multiplier": 0.15
            }
          ]
        },
        {
          "id": "scrap_percentage",
          "text": "What percentage of your steel is from recycled scrap?",
          "type": "radio",
          "options": [
            {
              "label": "0–20%",
              "multiplier": 1
            },
            {
              "label": "21–50%",
              "multiplier": 0.9
            },
            {
              "label": "51–80%",
              "multiplier": 0.7
            },
            {
              "label": "81–100%",
              "multiplier": 0.4
            }
          ]
        },
        {
          "id": "supplier_certification",
          "text": "Do your raw material suppliers have sustainability certifications?",
          "type": "radio",
          "options": [
            {
              "label": "Yes (please specify)",
              "multiplier": 1
            },
            {
              "label": "No",
              "multiplier": 1
            },
            {
              "label": "Not sure",
              "multiplier": 1
            }
          ]
        }
      ]
    },
    {
      "name": "Material Processing",
      "percentage": 12,
      "questions": [
        {
          "id": "material_processing",
          "text": "How is your raw material processed before manufacturing? (Select one)",
          "type": "radio",
          "options": [
            {
              "label": "Pelletization",
              "multiplier": 1.05
            },
            {
              "label": "Sintering",
              "multiplier": 1.15
            },
            {
              "label": "Direct reduction (DRI - Gas)",
              "multiplier": 0.85
            },
            {
              "label": "Direct reduction (DRI - Hydrogen)",
              "multiplier": 0.4
            },
            {
              "label": "Other (please specify)",
              "multiplier": 1
            },
            {
              "label": "Unsure",
              "multiplier": 1.1
            }
          ]
        },
        {
          "id": "energy_source",
          "text": "What energy source is used for material processing? (Select all that apply)",
          "type": "checkbox",
          "options": [
            {
              "label": "Coal",
              "multiplier": 1.2
            },
            {
              "label": "Natural gas",
              "multiplier": 1.08
            },
            {
              "label": "Electricity (grid)",
              "multiplier": 1
            },
            {
              "label": "Renewable energy (solar, wind, hydro)",
              "multiplier": 0.5
            },
            {
              "label": "Other (please specify)",
              "multiplier": 1
            },
            {
              "label": "Unsure",
              "multiplier": 1.1
            }
          ]
        },
        {
          "id": "processing_country",
          "text": "Country of Material Processing",
          "type": "radio",
          "options": [
            {
              "label": "China",
              "multiplier": 1.1
            },
            {
              "label": "India",
              "multiplier": 1.2
            },
            {
              "label": "Vietnam",
              "multiplier": 1.1
            },
            {
              "label": "Indonesia",
              "multiplier": 1.2
            },
            {
              "label": "Others (Low Emission Grids (≤200 gCO₂/kWh))",
              "multiplier": 0.75
            },
            {
              "label": "Others (Medium Emission Grids (200 – 500 gCO₂/kWh))",
              "multiplier": 1
            },
            {
              "label": "Others (High Emission Grids (≥500 gCO₂/kWh))",
              "multiplier": 1.3
            }
          ]
        },
        {
          "id": "waste_handling",
          "text": "What happens to waste from material processing?",
          "type": "checkbox",
          "options": [
            {
              "label": "Recycled internally",
              "multiplier": 0.9
            },
            {
              "label": "Sold for reuse",
              "multiplier": 0.95
            },
            {
              "label": "Sent to landfill",
              "multiplier": 1.1
            },
            {
              "label": "Other (please specify)",
              "multiplier": 1
            },
            {
              "label": "Unsure",
              "multiplier": 1.1
            }
          ]
        }
      ]
    },
    {
      "name": "Manufacturing Processes",
      "percentage": 28,
      "questions": [
        {
          "id": "steelmaking_method",
          "text": "What steelmaking method do you use?",
          "type": "radio",
          "options": [
            {
              "label": "Blast Furnace-Basic Oxygen Furnace (BF-BOF)",
              "multiplier": 2
            },
            {
              "label": "Electric Arc Furnace (EAF)",
              "multiplier": 0.8
            },
            {
              "label": "Other (please specify)",
              "multiplier": 1
            }
          ]
        },
        {
          "id": "processing_steps",
          "text": "What additional processing steps are used?",
          "type": "checkbox",
          "options": [
            {
              "label": "Hot rolling",
              "multiplier": 0.2
            },
            {
              "label": "Cold rolling",
              "multiplier": 0.15
            },
            {
              "label": "Galvanizing",
              "multiplier": 0.1
            },
            {
              "label": "Coating",
              "multiplier": 0.1
            },
            {
              "label": "Other (please specify)",
              "multiplier": 1
            }
          ]
        },
        {
          "id": "emissions_types",
          "text": "What types of emissions are produced during manufacturing?",
          "type": "checkbox",
          "options": [
            {
              "label": "CO₂",
              "multiplier": 1.89
            },
            {
              "label": "NOₓ",
              "multiplier": 0.05
            },
            {
              "label": "SOₓ",
              "multiplier": 0.02
            },
            {
              "label": "Particulate matter",
              "multiplier": 1
            },
            {
              "label": "Other (please specify)",
              "multiplier": 1
            },
            {
              "label": "Not sure",
              "multiplier": 1
            }
          ]
        }
      ]
    },
    {
      "name": "Transportation of Materials",
      "percentage": 7,
      "questions": [
        {
          "id": "transport_methods",
          "text": "How are raw materials transported to your facility? (Select all that apply)",
          "type": "checkbox",
          "options": [
            {
              "label": "Truck",
              "multiplier": 1
            },
            {
              "label": "Ship",
              "multiplier": 1
            },
            {
              "label": "Rail",
              "multiplier": 1
            },
            {
              "label": "Pipeline",
              "multiplier": 1
            },
            {
              "label": "Other (please specify)",
              "multiplier": 1
            }
          ]
        },
        {
          "id": "truck_distance",
          "text": "Truck transport distance",
          "type": "radio",
          "options": [
            {
              "label": "<100 km",
              "multiplier": 0.0075
            },
            {
              "label": "100–500 km",
              "multiplier": 0.0377
            },
            {
              "label": "500–1,000 km",
              "multiplier": 0.0754
            }
          ]
        },
        {
          "id": "ship_distance",
          "text": "Ship transport distance",
          "type": "radio",
          "options": [
            {
              "label": "<100 km",
              "multiplier": 0.0013
            },
            {
              "label": "100–500 km",
              "multiplier": 0.0063
            },
            {
              "label": "500–1,000 km",
              "multiplier": 0.0127
            }
          ]
        },
        {
          "id": "rail_distance",
          "text": "Rail transport distance",
          "type": "radio",
          "options": [
            {
              "label": "<100 km",
              "multiplier": 0.0012
            },
            {
              "label": "100–500 km",
              "multiplier": 0.0060
            },
            {
              "label": "500–1,000 km",
              "multiplier": 0.0120
            }
          ]
        },
        {
          "id": "pipeline_distance",
          "text": "Pipeline transport distance",
          "type": "radio",
          "options": [
            {
              "label": "<100 km",
              "multiplier": 0.0015
            },
            {
              "label": "100–500 km",
              "multiplier": 0.0075
            },
            {
              "label": "500–1,000 km",
              "multiplier": 0.015
            }
          ]
        }
      ]
    },
    {
      "name": "Energy Consumption",
      "percentage": 7,
      "questions": [
        {
          "id": "energy_types",
          "text": "Which types of energy does your facility primarily use? (Select all that apply)",
          "type": "checkbox",
          "options": [
            {
              "label": "Electricity",
              "multiplier": 0.7
            },
            {
              "label": "Renewable Energy Sources (e.g., solar, wind)",
              "multiplier": 0.6
            },
            {
              "label": "Coal",
              "multiplier": 1.4
            },
            {
              "label": "Petroleum Products (e.g., diesel, gasoline)",
              "multiplier": 1.2
            },
            {
              "label": "Other (please specify)",
              "multiplier": 1.1
            }
          ]
        },
        {
          "id": "energy_management",
          "text": "How do you manage energy consumption in your operations?",
          "type": "radio",
          "options": [
            {
              "label": "We have a dedicated energy management team.",
              "multiplier": 0.8
            },
            {
              "label": "We follow a set of standard operating procedures that include energy management.",
              "multiplier": 1
            },
            {
              "label": "We occasionally review energy usage but do not have formal policies.",
              "multiplier": 1.2
            },
            {
              "label": "We do not actively manage energy consumption.",
              "multiplier": 1.4
            }
          ]
        },
        {
          "id": "energy_saving_tech",
          "text": "Has your company invested in any of the following energy-saving technologies in the past five years? (Select all that apply)",
          "type": "checkbox",
          "options": [
            {
              "label": "LED or other energy-efficient lighting",
              "multiplier": 0.8
            },
            {
              "label": "High-efficiency HVAC systems",
              "multiplier": 0.8
            },
            {
              "label": "Automation systems to optimize energy use",
              "multiplier": 0.7
            },
            {
              "label": "None of the above",
              "multiplier": 1.2
            }
          ]
        },
        {
          "id": "energy_intensive_processes",
          "text": "Which of the following energy-intensive processes are used in your operations? (Select all that apply)",
          "type": "checkbox",
          "options": [
            {
              "label": "Blast furnace (BF) process",
              "multiplier": 1.4
            },
            {
              "label": "Sintering",
              "multiplier": 1.2
            },
            {
              "label": "Coke making",
              "multiplier": 1.1
            },
            {
              "label": "Steel rolling",
              "multiplier": 1.4
            },
            {
              "label": "Coke making",
              "multiplier": 1.05
            }
          ]
        }
      ]
    },
    {
      "name": "Water Usage",
      "percentage": 2,
      "questions": [
        {
          "id": "water_usage",
          "text": "How much water is used in the steel manufacturing process?",
          "type": "radio",
          "options": [
            {
              "label": "<1 m³/ton of steel",
              "multiplier": 0.5
            },
            {
              "label": "1–5 m³/ton",
              "multiplier": 1.0
            },
            {
              "label": "5–10 m³/ton",
              "multiplier": 1.3
            },
            {
              "label": ">10 m³/ton",
              "multiplier": 1.8
            },
            {
              "label": "Not sure",
              "multiplier": 1.0
            }
          ]
        },
        {
          "id": "water_sources",
          "text": "What are the primary sources of water used (e.g., municipal, groundwater, surface water)?",
          "type": "checkbox",
          "options": [
            {
              "label": "Municipal supply",
              "multiplier": 1.0
            },
            {
              "label": "Groundwater",
              "multiplier": 1.1
            },
            {
              "label": "Surface water (lake, river)",
              "multiplier": 1.2
            },
            {
              "label": "Recycled water",
              "multiplier": 0.7
            }
          ]
        },
        {
          "id": "water_recycling",
          "text": "Do you have water recycling or wastewater treatment processes in place?",
          "type": "radio",
          "options": [
            {
              "label": "Yes",
              "multiplier": 0.8
            },
            {
              "label": "No",
              "multiplier": 1.5
            },
            {
              "label": "Not sure",
              "multiplier": 1.0
            }
          ]
        }
      ]
    },
    {
      "name": "Waste Generation & Management",
      "percentage": 3,
      "questions": [
        {
          "id": "waste_types",
          "text": "What types of waste are produced during manufacturing (e.g., steel scrap, slag, sludge, dust, packaging waste)?",
          "type": "checkbox",
          "options": [
            {
              "label": "Steel scrap",
              "multiplier": 0.8
            },
            {
              "label": "Slag",
              "multiplier": 1.2
            },
            {
              "label": "Dust/sludge",
              "multiplier": 1.3
            },
            {
              "label": "Packaging waste",
              "multiplier": 1.0
            },
            {
              "label": "Other (please specify)",
              "multiplier": 1.0
            }
          ]
        },
        {
          "id": "waste_management",
          "text": "How is manufacturing waste managed (e.g., recycling, landfill, repurposing)?",
          "type": "checkbox",
          "options": [
            {
              "label": "Recycled internally",
              "multiplier": 0.7
            },
            {
              "label": "Sold to recyclers",
              "multiplier": 0.8
            },
            {
              "label": "Sent to landfill",
              "multiplier": 1.8
            }
          ]
        },
        {
          "id": "scrap_reuse",
          "text": "What percentage of steel scrap generated is reused or sold for recycling?",
          "type": "radio",
          "options": [
            {
              "label": ">90%",
              "multiplier": 0.7
            },
            {
              "label": "75–90%",
              "multiplier": 0.9
            },
            {
              "label": "50–75%",
              "multiplier": 1.0
            },
            {
              "label": "25–50%",
              "multiplier": 1.3
            },
            {
              "label": "<25%",
              "multiplier": 1.8
            },
            {
              "label": "Not sure",
              "multiplier": 1.0
            }
          ]
        }
      ]
    },
    {
      "name": "Chemical Usage",
      "percentage": 1,
      "questions": [
        {
          "id": "chemical_usage",
          "text": "How are chemicals used in your processes?",
          "type": "checkbox",
          "options": [
            {
              "label": "As part of product formulations.",
              "multiplier": 1
            },
            {
              "label": "For cleaning and maintenance.",
              "multiplier": 1.2
            },
            {
              "label": "As catalysts or reactants in manufacturing processes.",
              "multiplier": 1.4
            },
            {
              "label": "For research and development.",
              "multiplier": 0.8
            },
            {
              "label": "Other (please specify)",
              "multiplier": 1.1
            }
          ]
        },
        {
          "id": "chemical_waste",
          "text": "How does your company manage chemical waste?",
          "type": "radio",
          "options": [
            {
              "label": "We follow a strict waste management protocol.",
              "multiplier": 0.8
            },
            {
              "label": "We contract waste management to a third party.",
              "multiplier": 1
            },
            {
              "label": "We recycle or reuse chemical waste where possible.",
              "multiplier": 0.6
            },
            {
              "label": "We have no specific waste management practices.",
              "multiplier": 1.4
            }
          ]
        },
        {
          "id": "chemical_impact",
          "text": "Has your company taken steps to reduce the environmental impact of its chemical usage?",
          "type": "radio",
          "options": [
            {
              "label": "Yes, we have implemented greener alternatives.",
              "multiplier": 0.7
            },
            {
              "label": "Yes, we have reduced the volume of hazardous chemicals used.",
              "multiplier": 0.8
            },
            {
              "label": "No, but we plan to assess impact and implement changes.",
              "multiplier": 1.1
            },
            {
              "label": "No, we have not considered environmental impact.",
              "multiplier": 1.5
            }
          ]
        }
      ]
    }
  ],
  "calculationLogic": {
    "formula": "For each category: CategoryEmission = CategoryPercentage * AverageOfSelectedMultipliers. Total EmissionFactor = Sum of all CategoryEmissions."
  }
}
