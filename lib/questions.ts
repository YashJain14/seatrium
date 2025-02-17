// enums and interfaces for the decision tree
export enum NodeType {
    QUESTION = "question",
    LEAF = "leaf",
  }
  
  export interface ChatbotNodeBase {
    id: string;
    type: NodeType;
  }
  
  export interface Option {
    text: string;
    // The next node after selecting this option
    next?: ChatbotNode;
  }
  
  export interface QuestionNode extends ChatbotNodeBase {
    type: NodeType.QUESTION;
    text: string;
    options: Option[];
  }
  
  export interface LeafNode extends ChatbotNodeBase {
    type: NodeType.LEAF;
    // Final list of table column names for this branch
    columns: string[];
  }
  
  export type ChatbotNode = QuestionNode | LeafNode;
  
  export interface Category {
    id: string;
    title: string;
    root: ChatbotNode;
  }
  
  /* ==========================================================================
     RAW MATERIAL EXTRACTION
     ========================================================================== */
  export const rawMaterialExtraction: Category = {
    id: "rawMaterialExtraction",
    title: "Raw Material Extraction",
    root: {
      id: "raw1",
      type: NodeType.QUESTION,
      text: "What raw materials do you use in steel production?",
      options: [
        {
          text: "Iron Ore",
          next: {
            id: "raw2",
            type: NodeType.QUESTION,
            text: "Where do you source your Iron Ore?",
            options: [
              {
                text: "Domestic supplier",
                next: {
                  id: "rawCert",
                  type: NodeType.QUESTION,
                  text: "Do your raw material suppliers have sustainability certifications?",
                  options: [
                    {
                      text: "Yes (please specify)",
                      next: {
                        id: "rawCertDetail",
                        type: NodeType.QUESTION,
                        text: "Please list the certifications provided by your suppliers.",
                        options: [
                          {
                            text: "User provided answer",
                            next: {
                              id: "rawLeaf1",
                              type: NodeType.LEAF,
                              columns: ["raw1_IronOre", "raw2_Domestic", "raw_certifications_Yes", "raw_certificationDetails"],
                            },
                          },
                        ],
                      },
                    },
                    {
                      text: "No",
                      next: {
                        id: "rawLeaf2",
                        type: NodeType.LEAF,
                        columns: ["raw1_IronOre", "raw2_Domestic", "raw_certifications_No"],
                      },
                    },
                    {
                      text: "Not sure",
                      next: {
                        id: "rawLeaf3",
                        type: NodeType.LEAF,
                        columns: ["raw1_IronOre", "raw2_Domestic", "raw_certifications_NotSure"],
                      },
                    },
                  ],
                },
              },
              {
                text: "Imported (please specify country)",
                next: {
                  id: "rawCertImp",
                  type: NodeType.QUESTION,
                  text: "Do your raw material suppliers have sustainability certifications?",
                  options: [
                    {
                      text: "Yes (please specify)",
                      next: {
                        id: "rawCertDetailImp",
                        type: NodeType.QUESTION,
                        text: "Please list the certifications provided by your suppliers.",
                        options: [
                          {
                            text: "User provided answer",
                            next: {
                              id: "rawLeaf4",
                              type: NodeType.LEAF,
                              columns: ["raw1_IronOre", "raw2_Imported", "raw_certifications_Yes", "raw_certificationDetails"],
                            },
                          },
                        ],
                      },
                    },
                    {
                      text: "No",
                      next: {
                        id: "rawLeaf5",
                        type: NodeType.LEAF,
                        columns: ["raw1_IronOre", "raw2_Imported", "raw_certifications_No"],
                      },
                    },
                    {
                      text: "Not sure",
                      next: {
                        id: "rawLeaf6",
                        type: NodeType.LEAF,
                        columns: ["raw1_IronOre", "raw2_Imported", "raw_certifications_NotSure"],
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
        {
          text: "Scrap Steel",
          next: {
            id: "raw3",
            type: NodeType.QUESTION,
            text: "What percentage of your steel is from recycled scrap?",
            options: [
              {
                text: "0–20%",
                next: {
                  id: "rawCertScrap1",
                  type: NodeType.QUESTION,
                  text: "Do your raw material suppliers have sustainability certifications?",
                  options: [
                    {
                      text: "Yes (please specify)",
                      next: {
                        id: "rawCertDetailScrap1",
                        type: NodeType.QUESTION,
                        text: "Please list the certifications provided by your suppliers.",
                        options: [
                          {
                            text: "User provided answer",
                            next: {
                              id: "rawLeaf7",
                              type: NodeType.LEAF,
                              columns: ["raw1_ScrapSteel", "raw3_0-20", "raw_certifications_Yes", "raw_certificationDetails"],
                            },
                          },
                        ],
                      },
                    },
                    {
                      text: "No",
                      next: {
                        id: "rawLeaf8",
                        type: NodeType.LEAF,
                        columns: ["raw1_ScrapSteel", "raw3_0-20", "raw_certifications_No"],
                      },
                    },
                    {
                      text: "Not sure",
                      next: {
                        id: "rawLeaf9",
                        type: NodeType.LEAF,
                        columns: ["raw1_ScrapSteel", "raw3_0-20", "raw_certifications_NotSure"],
                      },
                    },
                  ],
                },
              },
              {
                text: "21–50%",
                next: {
                  id: "rawLeaf10",
                  type: NodeType.LEAF,
                  columns: ["raw1_ScrapSteel", "raw3_21-50"],
                },
              },
              {
                text: "51–80%",
                next: {
                  id: "rawLeaf11",
                  type: NodeType.LEAF,
                  columns: ["raw1_ScrapSteel", "raw3_51-80"],
                },
              },
              {
                text: "81–100%",
                next: {
                  id: "rawLeaf12",
                  type: NodeType.LEAF,
                  columns: ["raw1_ScrapSteel", "raw3_81-100"],
                },
              },
            ],
          },
        },
        {
          text: "Coal",
          next: {
            id: "rawLeafCoal",
            type: NodeType.LEAF,
            columns: ["raw1_Coal"],
          },
        },
        {
          text: "Limestone",
          next: {
            id: "rawLeafLimestone",
            type: NodeType.LEAF,
            columns: ["raw1_Limestone"],
          },
        },
        {
          text: "Other (please specify)",
          next: {
            id: "rawOther",
            type: NodeType.QUESTION,
            text: "Please specify the other raw materials you use.",
            options: [
              {
                text: "User provided answer",
                next: {
                  id: "rawLeafOther",
                  type: NodeType.LEAF,
                  columns: ["raw1_Other"],
                },
              },
            ],
          },
        },
      ],
    },
  };
  
  /* ==========================================================================
     MATERIAL PROCESSING
     ========================================================================== */
  export const materialProcessing: Category = {
    id: "materialProcessing",
    title: "Material Processing",
    root: {
      id: "matProc1",
      type: NodeType.QUESTION,
      text: "How is your raw material processed before manufacturing?",
      options: [
        {
          text: "Pelletization",
          next: {
            id: "matProc2",
            type: NodeType.QUESTION,
            text: "What energy source is used for material processing?",
            options: [
              {
                text: "Coal",
                next: {
                  id: "matProc3",
                  type: NodeType.QUESTION,
                  text: "What happens to waste from material processing?",
                  options: [
                    {
                      text: "Recycled internally",
                      next: {
                        id: "matProcLeaf1",
                        type: NodeType.LEAF,
                        columns: ["matProc1_Pelletization", "matProc2_Coal", "matProc3_Recycled"],
                      },
                    },
                    {
                      text: "Sold for reuse",
                      next: {
                        id: "matProcLeaf2",
                        type: NodeType.LEAF,
                        columns: ["matProc1_Pelletization", "matProc2_Coal", "matProc3_Sold"],
                      },
                    },
                    {
                      text: "Sent to landfill",
                      next: {
                        id: "matProcLeaf3",
                        type: NodeType.LEAF,
                        columns: ["matProc1_Pelletization", "matProc2_Coal", "matProc3_Landfill"],
                      },
                    },
                    {
                      text: "Other (please specify)",
                      next: {
                        id: "matProc3a",
                        type: NodeType.QUESTION,
                        text: "Please specify what happens to the waste.",
                        options: [
                          {
                            text: "User provided answer",
                            next: {
                              id: "matProcLeaf4",
                              type: NodeType.LEAF,
                              columns: ["matProc1_Pelletization", "matProc2_Coal", "matProc3_Other"],
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
              {
                text: "Natural gas",
                next: {
                  id: "matProc3_ng",
                  type: NodeType.QUESTION,
                  text: "What happens to waste from material processing?",
                  options: [
                    {
                      text: "Recycled internally",
                      next: {
                        id: "matProcLeaf5",
                        type: NodeType.LEAF,
                        columns: ["matProc1_Pelletization", "matProc2_NaturalGas", "matProc3_Recycled"],
                      },
                    },
                    {
                      text: "Sold for reuse",
                      next: {
                        id: "matProcLeaf6",
                        type: NodeType.LEAF,
                        columns: ["matProc1_Pelletization", "matProc2_NaturalGas", "matProc3_Sold"],
                      },
                    },
                    {
                      text: "Sent to landfill",
                      next: {
                        id: "matProcLeaf7",
                        type: NodeType.LEAF,
                        columns: ["matProc1_Pelletization", "matProc2_NaturalGas", "matProc3_Landfill"],
                      },
                    },
                    {
                      text: "Other (please specify)",
                      next: {
                        id: "matProc3a_ng",
                        type: NodeType.QUESTION,
                        text: "Please specify what happens to the waste.",
                        options: [
                          {
                            text: "User provided answer",
                            next: {
                              id: "matProcLeaf8",
                              type: NodeType.LEAF,
                              columns: ["matProc1_Pelletization", "matProc2_NaturalGas", "matProc3_Other"],
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
              {
                text: "Electricity (grid)",
                next: {
                  id: "matProc3_grid",
                  type: NodeType.QUESTION,
                  text: "What happens to waste from material processing?",
                  options: [
                    {
                      text: "Recycled internally",
                      next: {
                        id: "matProcLeaf9",
                        type: NodeType.LEAF,
                        columns: ["matProc1_Pelletization", "matProc2_Electricity", "matProc3_Recycled"],
                      },
                    },
                    {
                      text: "Sold for reuse",
                      next: {
                        id: "matProcLeaf10",
                        type: NodeType.LEAF,
                        columns: ["matProc1_Pelletization", "matProc2_Electricity", "matProc3_Sold"],
                      },
                    },
                    {
                      text: "Sent to landfill",
                      next: {
                        id: "matProcLeaf11",
                        type: NodeType.LEAF,
                        columns: ["matProc1_Pelletization", "matProc2_Electricity", "matProc3_Landfill"],
                      },
                    },
                    {
                      text: "Other (please specify)",
                      next: {
                        id: "matProc3a_grid",
                        type: NodeType.QUESTION,
                        text: "Please specify what happens to the waste.",
                        options: [
                          {
                            text: "User provided answer",
                            next: {
                              id: "matProcLeaf12",
                              type: NodeType.LEAF,
                              columns: ["matProc1_Pelletization", "matProc2_Electricity", "matProc3_Other"],
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
              {
                text: "Renewable energy (solar, wind, hydro)",
                next: {
                  id: "matProc3_renew",
                  type: NodeType.QUESTION,
                  text: "What happens to waste from material processing?",
                  options: [
                    {
                      text: "Recycled internally",
                      next: {
                        id: "matProcLeaf13",
                        type: NodeType.LEAF,
                        columns: ["matProc1_Pelletization", "matProc2_Renewable", "matProc3_Recycled"],
                      },
                    },
                    {
                      text: "Sold for reuse",
                      next: {
                        id: "matProcLeaf14",
                        type: NodeType.LEAF,
                        columns: ["matProc1_Pelletization", "matProc2_Renewable", "matProc3_Sold"],
                      },
                    },
                    {
                      text: "Sent to landfill",
                      next: {
                        id: "matProcLeaf15",
                        type: NodeType.LEAF,
                        columns: ["matProc1_Pelletization", "matProc2_Renewable", "matProc3_Landfill"],
                      },
                    },
                    {
                      text: "Other (please specify)",
                      next: {
                        id: "matProc3a_renew",
                        type: NodeType.QUESTION,
                        text: "Please specify what happens to the waste.",
                        options: [
                          {
                            text: "User provided answer",
                            next: {
                              id: "matProcLeaf16",
                              type: NodeType.LEAF,
                              columns: ["matProc1_Pelletization", "matProc2_Renewable", "matProc3_Other"],
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
              {
                text: "Other (please specify)",
                next: {
                  id: "matProc2a",
                  type: NodeType.QUESTION,
                  text: "Please specify the energy source used for material processing.",
                  options: [
                    {
                      text: "User provided answer",
                      next: {
                        id: "matProc3_other",
                        type: NodeType.QUESTION,
                        text: "What happens to waste from material processing?",
                        options: [
                          {
                            text: "Recycled internally",
                            next: {
                              id: "matProcLeaf17",
                              type: NodeType.LEAF,
                              columns: ["matProc1_Pelletization", "matProc2_Other", "matProc3_Recycled"],
                            },
                          },
                          {
                            text: "Sold for reuse",
                            next: {
                              id: "matProcLeaf18",
                              type: NodeType.LEAF,
                              columns: ["matProc1_Pelletization", "matProc2_Other", "matProc3_Sold"],
                            },
                          },
                          {
                            text: "Sent to landfill",
                            next: {
                              id: "matProcLeaf19",
                              type: NodeType.LEAF,
                              columns: ["matProc1_Pelletization", "matProc2_Other", "matProc3_Landfill"],
                            },
                          },
                          {
                            text: "Other (please specify)",
                            next: {
                              id: "matProc3a_other",
                              type: NodeType.QUESTION,
                              text: "Please specify what happens to the waste.",
                              options: [
                                {
                                  text: "User provided answer",
                                  next: {
                                    id: "matProcLeaf20",
                                    type: NodeType.LEAF,
                                    columns: ["matProc1_Pelletization", "matProc2_Other", "matProc3_Other"],
                                  },
                                },
                              ],
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
        {
          text: "Sintering",
          next: {
            id: "matProc1_sintering",
            type: NodeType.QUESTION,
            text: "What energy source is used for material processing?",
            options: [
              {
                text: "Coal",
                next: {
                  id: "matProc3_sinter_coal",
                  type: NodeType.QUESTION,
                  text: "What happens to waste from material processing?",
                  options: [
                    {
                      text: "Recycled internally",
                      next: {
                        id: "matProcLeaf_sinter1",
                        type: NodeType.LEAF,
                        columns: ["matProc1_Sintering", "matProc2_Coal", "matProc3_Recycled"],
                      },
                    },
                    {
                      text: "Sold for reuse",
                      next: {
                        id: "matProcLeaf_sinter2",
                        type: NodeType.LEAF,
                        columns: ["matProc1_Sintering", "matProc2_Coal", "matProc3_Sold"],
                      },
                    },
                    {
                      text: "Sent to landfill",
                      next: {
                        id: "matProcLeaf_sinter3",
                        type: NodeType.LEAF,
                        columns: ["matProc1_Sintering", "matProc2_Coal", "matProc3_Landfill"],
                      },
                    },
                    {
                      text: "Other (please specify)",
                      next: {
                        id: "matProc3a_sinter_coal",
                        type: NodeType.QUESTION,
                        text: "Please specify what happens to the waste.",
                        options: [
                          {
                            text: "User provided answer",
                            next: {
                              id: "matProcLeaf_sinter4",
                              type: NodeType.LEAF,
                              columns: ["matProc1_Sintering", "matProc2_Coal", "matProc3_Other"],
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
              {
                text: "Other (please specify)",
                next: {
                  id: "matProc2a_sinter",
                  type: NodeType.QUESTION,
                  text: "Please specify the energy source used for material processing.",
                  options: [
                    {
                      text: "User provided answer",
                      next: {
                        id: "matProc3_other_sinter",
                        type: NodeType.QUESTION,
                        text: "What happens to waste from material processing?",
                        options: [
                          {
                            text: "Recycled internally",
                            next: {
                              id: "matProcLeaf_sinter5",
                              type: NodeType.LEAF,
                              columns: ["matProc1_Sintering", "matProc2_Other", "matProc3_Recycled"],
                            },
                          },
                          {
                            text: "Sold for reuse",
                            next: {
                              id: "matProcLeaf_sinter6",
                              type: NodeType.LEAF,
                              columns: ["matProc1_Sintering", "matProc2_Other", "matProc3_Sold"],
                            },
                          },
                          {
                            text: "Sent to landfill",
                            next: {
                              id: "matProcLeaf_sinter7",
                              type: NodeType.LEAF,
                              columns: ["matProc1_Sintering", "matProc2_Other", "matProc3_Landfill"],
                            },
                          },
                          {
                            text: "Other (please specify)",
                            next: {
                              id: "matProc3a_other_sinter",
                              type: NodeType.QUESTION,
                              text: "Please specify what happens to the waste.",
                              options: [
                                {
                                  text: "User provided answer",
                                  next: {
                                    id: "matProcLeaf_sinter8",
                                    type: NodeType.LEAF,
                                    columns: ["matProc1_Sintering", "matProc2_Other", "matProc3_Other"],
                                  },
                                },
                              ],
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
        {
          text: "Direct reduction",
          next: {
            id: "matProc1_direct",
            type: NodeType.QUESTION,
            text: "What energy source is used for material processing?",
            options: [
              {
                text: "Coal",
                next: {
                  id: "matProc3_direct_coal",
                  type: NodeType.QUESTION,
                  text: "What happens to waste from material processing?",
                  options: [
                    {
                      text: "Recycled internally",
                      next: {
                        id: "matProcLeaf_direct1",
                        type: NodeType.LEAF,
                        columns: ["matProc1_DirectReduction", "matProc2_Coal", "matProc3_Recycled"],
                      },
                    },
                    {
                      text: "Sold for reuse",
                      next: {
                        id: "matProcLeaf_direct2",
                        type: NodeType.LEAF,
                        columns: ["matProc1_DirectReduction", "matProc2_Coal", "matProc3_Sold"],
                      },
                    },
                    {
                      text: "Sent to landfill",
                      next: {
                        id: "matProcLeaf_direct3",
                        type: NodeType.LEAF,
                        columns: ["matProc1_DirectReduction", "matProc2_Coal", "matProc3_Landfill"],
                      },
                    },
                    {
                      text: "Other (please specify)",
                      next: {
                        id: "matProc3a_direct_coal",
                        type: NodeType.QUESTION,
                        text: "Please specify what happens to the waste.",
                        options: [
                          {
                            text: "User provided answer",
                            next: {
                              id: "matProcLeaf_direct4",
                              type: NodeType.LEAF,
                              columns: ["matProc1_DirectReduction", "matProc2_Coal", "matProc3_Other"],
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
              {
                text: "Other (please specify)",
                next: {
                  id: "matProc2a_direct",
                  type: NodeType.QUESTION,
                  text: "Please specify the energy source used for material processing.",
                  options: [
                    {
                      text: "User provided answer",
                      next: {
                        id: "matProc3_other_direct",
                        type: NodeType.QUESTION,
                        text: "What happens to waste from material processing?",
                        options: [
                          {
                            text: "Recycled internally",
                            next: {
                              id: "matProcLeaf_direct5",
                              type: NodeType.LEAF,
                              columns: ["matProc1_DirectReduction", "matProc2_Other", "matProc3_Recycled"],
                            },
                          },
                          {
                            text: "Sold for reuse",
                            next: {
                              id: "matProcLeaf_direct6",
                              type: NodeType.LEAF,
                              columns: ["matProc1_DirectReduction", "matProc2_Other", "matProc3_Sold"],
                            },
                          },
                          {
                            text: "Sent to landfill",
                            next: {
                              id: "matProcLeaf_direct7",
                              type: NodeType.LEAF,
                              columns: ["matProc1_DirectReduction", "matProc2_Other", "matProc3_Landfill"],
                            },
                          },
                          {
                            text: "Other (please specify)",
                            next: {
                              id: "matProc3a_other_direct",
                              type: NodeType.QUESTION,
                              text: "Please specify what happens to the waste.",
                              options: [
                                {
                                  text: "User provided answer",
                                  next: {
                                    id: "matProcLeaf_direct8",
                                    type: NodeType.LEAF,
                                    columns: ["matProc1_DirectReduction", "matProc2_Other", "matProc3_Other"],
                                  },
                                },
                              ],
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
        {
          text: "Other (please specify)",
          next: {
            id: "matProc1_other",
            type: NodeType.QUESTION,
            text: "Please specify your processing method.",
            options: [
              {
                text: "User provided answer",
                next: {
                  id: "matProc2_other",
                  type: NodeType.QUESTION,
                  text: "What energy source is used for material processing?",
                  options: [
                    {
                      text: "User provided answer",
                      next: {
                        id: "matProc3_other_final",
                        type: NodeType.QUESTION,
                        text: "What happens to waste from material processing?",
                        options: [
                          {
                            text: "User provided answer",
                            next: {
                              id: "matProcLeaf_other",
                              type: NodeType.LEAF,
                              columns: ["matProc1_Other", "matProc2_Other", "matProc3_Other"],
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
      ],
    },
  };
  
  /* ==========================================================================
     MANUFACTURING PROCESSES
     ========================================================================== */
  export const manufacturingProcesses: Category = {
    id: "manufacturingProcesses",
    title: "Manufacturing Processes",
    root: {
      id: "manuf1",
      type: NodeType.QUESTION,
      text: "What steelmaking method do you use?",
      options: [
        {
          text: "Blast Furnace-Basic Oxygen Furnace (BF-BOF)",
          next: {
            id: "manuf2",
            type: NodeType.QUESTION,
            text: "What additional processes do you use?",
            options: [
              {
                text: "Hot rolling",
                next: {
                  id: "manuf3",
                  type: NodeType.QUESTION,
                  text: "What emissions are produced during manufacturing?",
                  options: [
                    {
                      text: "CO₂",
                      next: {
                        id: "manufLeaf1",
                        type: NodeType.LEAF,
                        columns: ["manuf1_BF-BOF", "manuf2_HotRolling", "manuf3_CO2"],
                      },
                    },
                    {
                      text: "NOₓ",
                      next: {
                        id: "manufLeaf2",
                        type: NodeType.LEAF,
                        columns: ["manuf1_BF-BOF", "manuf2_HotRolling", "manuf3_NOx"],
                      },
                    },
                    {
                      text: "SOₓ",
                      next: {
                        id: "manufLeaf3",
                        type: NodeType.LEAF,
                        columns: ["manuf1_BF-BOF", "manuf2_HotRolling", "manuf3_SOx"],
                      },
                    },
                    {
                      text: "Particulate matter",
                      next: {
                        id: "manufLeaf4",
                        type: NodeType.LEAF,
                        columns: ["manuf1_BF-BOF", "manuf2_HotRolling", "manuf3_Particulates"],
                      },
                    },
                    {
                      text: "Other (please specify)",
                      next: {
                        id: "manuf3a",
                        type: NodeType.QUESTION,
                        text: "Please specify the emissions produced.",
                        options: [
                          {
                            text: "User provided answer",
                            next: {
                              id: "manufLeaf5",
                              type: NodeType.LEAF,
                              columns: ["manuf1_BF-BOF", "manuf2_HotRolling", "manuf3_Other"],
                            },
                          },
                        ],
                      },
                    },
                    {
                      text: "Not sure",
                      next: {
                        id: "manufLeaf6",
                        type: NodeType.LEAF,
                        columns: ["manuf1_BF-BOF", "manuf2_HotRolling", "manuf3_NotSure"],
                      },
                    },
                  ],
                },
              },
              {
                text: "Cold rolling",
                next: {
                  id: "manuf2_cold",
                  type: NodeType.QUESTION,
                  text: "What emissions are produced during manufacturing?",
                  options: [
                    {
                      text: "CO₂",
                      next: {
                        id: "manufLeaf7",
                        type: NodeType.LEAF,
                        columns: ["manuf1_BF-BOF", "manuf2_ColdRolling", "manuf3_CO2"],
                      },
                    },
                    {
                      text: "NOₓ",
                      next: {
                        id: "manufLeaf8",
                        type: NodeType.LEAF,
                        columns: ["manuf1_BF-BOF", "manuf2_ColdRolling", "manuf3_NOx"],
                      },
                    },
                    {
                      text: "Other (please specify)",
                      next: {
                        id: "manuf3a_cold",
                        type: NodeType.QUESTION,
                        text: "Please specify the emissions produced.",
                        options: [
                          {
                            text: "User provided answer",
                            next: {
                              id: "manufLeaf9",
                              type: NodeType.LEAF,
                              columns: ["manuf1_BF-BOF", "manuf2_ColdRolling", "manuf3_Other"],
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
              {
                text: "Galvanizing",
                next: {
                  id: "manuf2_galvanizing",
                  type: NodeType.QUESTION,
                  text: "What emissions are produced during manufacturing?",
                  options: [
                    {
                      text: "CO₂",
                      next: {
                        id: "manufLeaf10",
                        type: NodeType.LEAF,
                        columns: ["manuf1_BF-BOF", "manuf2_Galvanizing", "manuf3_CO2"],
                      },
                    },
                    // Additional options can be added here...
                  ],
                },
              },
              {
                text: "Coating",
                next: {
                  id: "manuf2_coating",
                  type: NodeType.QUESTION,
                  text: "What emissions are produced during manufacturing?",
                  options: [
                    {
                      text: "CO₂",
                      next: {
                        id: "manufLeaf11",
                        type: NodeType.LEAF,
                        columns: ["manuf1_BF-BOF", "manuf2_Coating", "manuf3_CO2"],
                      },
                    },
                    // Additional options can be added here...
                  ],
                },
              },
              {
                text: "Other (please specify)",
                next: {
                  id: "manuf2_other",
                  type: NodeType.QUESTION,
                  text: "Please specify the additional process.",
                  options: [
                    {
                      text: "User provided answer",
                      next: {
                        id: "manuf3_other",
                        type: NodeType.QUESTION,
                        text: "What emissions are produced during manufacturing?",
                        options: [
                          {
                            text: "User provided answer",
                            next: {
                              id: "manufLeaf12",
                              type: NodeType.LEAF,
                              columns: ["manuf1_BF-BOF", "manuf2_Other", "manuf3_Other"],
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
        {
          text: "Electric Arc Furnace (EAF)",
          next: {
            id: "manuf1_eaf",
            type: NodeType.QUESTION,
            text: "What additional processes do you use?",
            options: [
              {
                text: "Hot rolling",
                next: {
                  id: "manuf2_eaf_hot",
                  type: NodeType.QUESTION,
                  text: "What emissions are produced during manufacturing?",
                  options: [
                    {
                      text: "CO₂",
                      next: {
                        id: "manufLeaf_eaf1",
                        type: NodeType.LEAF,
                        columns: ["manuf1_EAF", "manuf2_HotRolling", "manuf3_CO2"],
                      },
                    },
                    {
                      text: "NOₓ",
                      next: {
                        id: "manufLeaf_eaf2",
                        type: NodeType.LEAF,
                        columns: ["manuf1_EAF", "manuf2_HotRolling", "manuf3_NOx"],
                      },
                    },
                    // Additional options as needed...
                  ],
                },
              },
              {
                text: "Other (please specify)",
                next: {
                  id: "manuf2_eaf_other",
                  type: NodeType.QUESTION,
                  text: "Please specify additional processes.",
                  options: [
                    {
                      text: "User provided answer",
                      next: {
                        id: "manuf3_eaf_other",
                        type: NodeType.QUESTION,
                        text: "What emissions are produced during manufacturing?",
                        options: [
                          {
                            text: "User provided answer",
                            next: {
                              id: "manufLeaf_eaf_other",
                              type: NodeType.LEAF,
                              columns: ["manuf1_EAF", "manuf2_Other", "manuf3_Other"],
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
        {
          text: "Other (please specify)",
          next: {
            id: "manuf1_other",
            type: NodeType.QUESTION,
            text: "Please specify your steelmaking method.",
            options: [
              {
                text: "User provided answer",
                next: {
                  id: "manuf2_other2",
                  type: NodeType.QUESTION,
                  text: "What additional processes do you use?",
                  options: [
                    {
                      text: "User provided answer",
                      next: {
                        id: "manuf3_other2",
                        type: NodeType.QUESTION,
                        text: "What emissions are produced during manufacturing?",
                        options: [
                          {
                            text: "User provided answer",
                            next: {
                              id: "manufLeaf_other2",
                              type: NodeType.LEAF,
                              columns: ["manuf1_Other", "manuf2_Other", "manuf3_Other"],
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
      ],
    },
  };
  
  /* ==========================================================================
     TRANSPORTATION OF MATERIALS
     ========================================================================== */
  export const transportation: Category = {
    id: "transportation",
    title: "Transportation of Materials",
    root: {
      id: "trans1",
      type: NodeType.QUESTION,
      text: "How are raw materials transported to your facility?",
      options: [
        {
          text: "Truck",
          next: {
            id: "trans2",
            type: NodeType.QUESTION,
            text: "What is the estimated distance raw materials travel?",
            options: [
              {
                text: "<100 km",
                next: {
                  id: "transLeaf1",
                  type: NodeType.LEAF,
                  columns: ["trans1_Truck", "trans2_<100km"],
                },
              },
              {
                text: "100–500 km",
                next: {
                  id: "transLeaf2",
                  type: NodeType.LEAF,
                  columns: ["trans1_Truck", "trans2_100-500km"],
                },
              },
              {
                text: "500–1,000 km",
                next: {
                  id: "transLeaf3",
                  type: NodeType.LEAF,
                  columns: ["trans1_Truck", "trans2_500-1000km"],
                },
              },
              {
                text: ">1,000 km",
                next: {
                  id: "transLeaf4",
                  type: NodeType.LEAF,
                  columns: ["trans1_Truck", "trans2_>1000km"],
                },
              },
            ],
          },
        },
        {
          text: "Rail",
          next: {
            id: "trans2_rail",
            type: NodeType.QUESTION,
            text: "What is the estimated distance raw materials travel?",
            options: [
              {
                text: "<100 km",
                next: {
                  id: "transLeaf5",
                  type: NodeType.LEAF,
                  columns: ["trans1_Rail", "trans2_<100km"],
                },
              },
              {
                text: "100–500 km",
                next: {
                  id: "transLeaf6",
                  type: NodeType.LEAF,
                  columns: ["trans1_Rail", "trans2_100-500km"],
                },
              },
            ],
          },
        },
        {
          text: "Ship",
          next: {
            id: "transLeaf7",
            type: NodeType.LEAF,
            columns: ["trans1_Ship"],
          },
        },
        {
          text: "Pipeline",
          next: {
            id: "transLeaf8",
            type: NodeType.LEAF,
            columns: ["trans1_Pipeline"],
          },
        },
        {
          text: "Other (please specify)",
          next: {
            id: "transOther",
            type: NodeType.QUESTION,
            text: "Please specify the transport mode.",
            options: [
              {
                text: "User provided answer",
                next: {
                  id: "transLeaf9",
                  type: NodeType.LEAF,
                  columns: ["trans1_Other"],
                },
              },
            ],
          },
        },
      ],
    },
  };
  
  /* ==========================================================================
     ENERGY CONSUMPTION
     ========================================================================== */
  export const energyConsumption: Category = {
    id: "energyConsumption",
    title: "Energy Consumption",
    root: {
      id: "energy1",
      type: NodeType.QUESTION,
      text: "What are your primary energy sources for production?",
      options: [
        {
          text: "Grid electricity",
          next: {
            id: "energy2",
            type: NodeType.QUESTION,
            text: "What is your estimated total energy consumption per ton of steel produced?",
            options: [
              {
                text: "<5 GJ/ton",
                next: {
                  id: "energy3",
                  type: NodeType.QUESTION,
                  text: "Have you implemented energy efficiency improvements?",
                  options: [
                    {
                      text: "Yes",
                      next: {
                        id: "energyLeaf1",
                        type: NodeType.LEAF,
                        columns: ["energy1_GridElectricity", "energy2_<5GJ", "energy3_Yes"],
                      },
                    },
                    {
                      text: "No",
                      next: {
                        id: "energyLeaf2",
                        type: NodeType.LEAF,
                        columns: ["energy1_GridElectricity", "energy2_<5GJ", "energy3_No"],
                      },
                    },
                    {
                      text: "Not sure",
                      next: {
                        id: "energyLeaf3",
                        type: NodeType.LEAF,
                        columns: ["energy1_GridElectricity", "energy2_<5GJ", "energy3_NotSure"],
                      },
                    },
                  ],
                },
              },
              {
                text: "5–10 GJ/ton",
                next: {
                  id: "energy3_5to10",
                  type: NodeType.QUESTION,
                  text: "Have you implemented energy efficiency improvements?",
                  options: [
                    {
                      text: "Yes",
                      next: {
                        id: "energyLeaf4",
                        type: NodeType.LEAF,
                        columns: ["energy1_GridElectricity", "energy2_5-10GJ", "energy3_Yes"],
                      },
                    },
                    {
                      text: "No",
                      next: {
                        id: "energyLeaf5",
                        type: NodeType.LEAF,
                        columns: ["energy1_GridElectricity", "energy2_5-10GJ", "energy3_No"],
                      },
                    },
                    {
                      text: "Not sure",
                      next: {
                        id: "energyLeaf6",
                        type: NodeType.LEAF,
                        columns: ["energy1_GridElectricity", "energy2_5-10GJ", "energy3_NotSure"],
                      },
                    },
                  ],
                },
              },
              // Additional consumption ranges can be added here...
            ],
          },
        },
        {
          text: "Other (please specify)",
          next: {
            id: "energy1_other",
            type: NodeType.QUESTION,
            text: "Please specify your energy source.",
            options: [
              {
                text: "User provided answer",
                next: {
                  id: "energy2_other",
                  type: NodeType.QUESTION,
                  text: "What is your estimated total energy consumption per ton of steel produced?",
                  options: [
                    {
                      text: "<5 GJ/ton",
                      next: {
                        id: "energy3_other",
                        type: NodeType.QUESTION,
                        text: "Have you implemented energy efficiency improvements?",
                        options: [
                          {
                            text: "Yes",
                            next: {
                              id: "energyLeaf_other1",
                              type: NodeType.LEAF,
                              columns: ["energy1_Other", "energy2_<5GJ", "energy3_Yes"],
                            },
                          },
                          {
                            text: "No",
                            next: {
                              id: "energyLeaf_other2",
                              type: NodeType.LEAF,
                              columns: ["energy1_Other", "energy2_<5GJ", "energy3_No"],
                            },
                          },
                          {
                            text: "Not sure",
                            next: {
                              id: "energyLeaf_other3",
                              type: NodeType.LEAF,
                              columns: ["energy1_Other", "energy2_<5GJ", "energy3_NotSure"],
                            },
                          },
                        ],
                      },
                    },
                    // Additional consumption ranges can be added here...
                  ],
                },
              },
            ],
          },
        },
      ],
    },
  };
  
  /* ==========================================================================
     WATER USAGE
     ========================================================================== */
  export const waterUsage: Category = {
    id: "waterUsage",
    title: "Water Usage",
    root: {
      id: "water1",
      type: NodeType.QUESTION,
      text: "How much water is used in the steel manufacturing process?",
      options: [
        {
          text: "<1 m³/ton",
          next: {
            id: "water2",
            type: NodeType.QUESTION,
            text: "What is your primary water source?",
            options: [
              {
                text: "Municipal supply",
                next: {
                  id: "water3",
                  type: NodeType.QUESTION,
                  text: "Do you have water recycling or wastewater treatment?",
                  options: [
                    {
                      text: "Yes",
                      next: {
                        id: "waterLeaf1",
                        type: NodeType.LEAF,
                        columns: ["water1_<1", "water2_Municipal", "water3_Yes"],
                      },
                    },
                    {
                      text: "No",
                      next: {
                        id: "waterLeaf2",
                        type: NodeType.LEAF,
                        columns: ["water1_<1", "water2_Municipal", "water3_No"],
                      },
                    },
                    {
                      text: "Not sure",
                      next: {
                        id: "waterLeaf3",
                        type: NodeType.LEAF,
                        columns: ["water1_<1", "water2_Municipal", "water3_NotSure"],
                      },
                    },
                  ],
                },
              },
              {
                text: "Groundwater",
                next: {
                  id: "water3_ground",
                  type: NodeType.QUESTION,
                  text: "Do you have water recycling or wastewater treatment?",
                  options: [
                    {
                      text: "Yes",
                      next: {
                        id: "waterLeaf4",
                        type: NodeType.LEAF,
                        columns: ["water1_<1", "water2_Groundwater", "water3_Yes"],
                      },
                    },
                    {
                      text: "No",
                      next: {
                        id: "waterLeaf5",
                        type: NodeType.LEAF,
                        columns: ["water1_<1", "water2_Groundwater", "water3_No"],
                      },
                    },
                    {
                      text: "Not sure",
                      next: {
                        id: "waterLeaf6",
                        type: NodeType.LEAF,
                        columns: ["water1_<1", "water2_Groundwater", "water3_NotSure"],
                      },
                    },
                  ],
                },
              },
              // Additional water source options can be added here...
            ],
          },
        },
        {
          text: "1–5 m³/ton",
          next: {
            id: "water2_1to5",
            type: NodeType.QUESTION,
            text: "What is your primary water source?",
            options: [
              {
                text: "Municipal supply",
                next: {
                  id: "waterLeaf7",
                  type: NodeType.LEAF,
                  columns: ["water1_1-5", "water2_Municipal", "water3_Yes"],
                },
              },
              // Additional options for water source...
            ],
          },
        },
        // Additional options for "5–10 m³/ton", ">10 m³/ton", and "Not sure" can be added similarly...
      ],
    },
  };
  
  /* ==========================================================================
     WASTE MANAGEMENT
     ========================================================================== */
  export const wasteManagement: Category = {
    id: "wasteManagement",
    title: "Waste Generation & Management",
    root: {
      id: "waste1",
      type: NodeType.QUESTION,
      text: "What types of waste are generated?",
      options: [
        {
          text: "Steel scrap",
          next: {
            id: "waste2",
            type: NodeType.QUESTION,
            text: "How is steel scrap managed?",
            options: [
              {
                text: "Recycled internally",
                next: {
                  id: "wasteLeaf1",
                  type: NodeType.LEAF,
                  columns: ["waste1_SteelScrap", "waste2_Recycled"],
                },
              },
              {
                text: "Sold to recyclers",
                next: {
                  id: "wasteLeaf2",
                  type: NodeType.LEAF,
                  columns: ["waste1_SteelScrap", "waste2_Sold"],
                },
              },
              {
                text: "Sent to landfill",
                next: {
                  id: "wasteLeaf3",
                  type: NodeType.LEAF,
                  columns: ["waste1_SteelScrap", "waste2_Landfill"],
                },
              },
            ],
          },
        },
        {
          text: "Slag",
          next: {
            id: "wasteLeaf4",
            type: NodeType.LEAF,
            columns: ["waste1_Slag"],
          },
        },
        {
          text: "Dust/sludge",
          next: {
            id: "wasteLeaf5",
            type: NodeType.LEAF,
            columns: ["waste1_DustSludge"],
          },
        },
        {
          text: "Packaging waste",
          next: {
            id: "wasteLeaf6",
            type: NodeType.LEAF,
            columns: ["waste1_Packaging"],
          },
        },
        {
          text: "Other (please specify)",
          next: {
            id: "wasteOther",
            type: NodeType.QUESTION,
            text: "Please specify other waste types.",
            options: [
              {
                text: "User provided answer",
                next: {
                  id: "wasteLeaf7",
                  type: NodeType.LEAF,
                  columns: ["waste1_Other"],
                },
              },
            ],
          },
        },
      ],
    },
  };
  
  /* ==========================================================================
     CHEMICAL USAGE
     ========================================================================== */
  export const chemicalUsage: Category = {
    id: "chemicalUsage",
    title: "Chemical Usage",
    root: {
      id: "chem1",
      type: NodeType.QUESTION,
      text: "What chemicals are used in the manufacturing process?",
      options: [
        {
          text: "Lubricants",
          next: {
            id: "chem2",
            type: NodeType.QUESTION,
            text: "Are any hazardous chemicals used?",
            options: [
              {
                text: "Yes (please specify)",
                next: {
                  id: "chem3",
                  type: NodeType.QUESTION,
                  text: "How is chemical waste managed?",
                  options: [
                    {
                      text: "Treated onsite",
                      next: {
                        id: "chemLeaf1",
                        type: NodeType.LEAF,
                        columns: ["chem1_Lubricants", "chem2_Yes", "chem3_Onsite"],
                      },
                    },
                    {
                      text: "Sent to specialized waste disposal",
                      next: {
                        id: "chemLeaf2",
                        type: NodeType.LEAF,
                        columns: ["chem1_Lubricants", "chem2_Yes", "chem3_Specialized"],
                      },
                    },
                    {
                      text: "Other (please specify)",
                      next: {
                        id: "chem3a",
                        type: NodeType.QUESTION,
                        text: "Please specify chemical waste management.",
                        options: [
                          {
                            text: "User provided answer",
                            next: {
                              id: "chemLeaf3",
                              type: NodeType.LEAF,
                              columns: ["chem1_Lubricants", "chem2_Yes", "chem3_Other"],
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
              {
                text: "No",
                next: {
                  id: "chem3_no",
                  type: NodeType.QUESTION,
                  text: "How is chemical waste managed?",
                  options: [
                    {
                      text: "Treated onsite",
                      next: {
                        id: "chemLeaf4",
                        type: NodeType.LEAF,
                        columns: ["chem1_Lubricants", "chem2_No", "chem3_Onsite"],
                      },
                    },
                    {
                      text: "Sent to specialized waste disposal",
                      next: {
                        id: "chemLeaf5",
                        type: NodeType.LEAF,
                        columns: ["chem1_Lubricants", "chem2_No", "chem3_Specialized"],
                      },
                    },
                    {
                      text: "Other (please specify)",
                      next: {
                        id: "chem3a_no",
                        type: NodeType.QUESTION,
                        text: "Please specify chemical waste management.",
                        options: [
                          {
                            text: "User provided answer",
                            next: {
                              id: "chemLeaf6",
                              type: NodeType.LEAF,
                              columns: ["chem1_Lubricants", "chem2_No", "chem3_Other"],
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
              {
                text: "Not sure",
                next: {
                  id: "chem3_notsure",
                  type: NodeType.QUESTION,
                  text: "How is chemical waste managed?",
                  options: [
                    {
                      text: "Treated onsite",
                      next: {
                        id: "chemLeaf7",
                        type: NodeType.LEAF,
                        columns: ["chem1_Lubricants", "chem2_NotSure", "chem3_Onsite"],
                      },
                    },
                    {
                      text: "Sent to specialized waste disposal",
                      next: {
                        id: "chemLeaf8",
                        type: NodeType.LEAF,
                        columns: ["chem1_Lubricants", "chem2_NotSure", "chem3_Specialized"],
                      },
                    },
                    {
                      text: "Other (please specify)",
                      next: {
                        id: "chem3a_notsure",
                        type: NodeType.QUESTION,
                        text: "Please specify chemical waste management.",
                        options: [
                          {
                            text: "User provided answer",
                            next: {
                              id: "chemLeaf9",
                              type: NodeType.LEAF,
                              columns: ["chem1_Lubricants", "chem2_NotSure", "chem3_Other"],
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
        {
          text: "Coatings (e.g., zinc, chrome)",
          next: {
            id: "chemLeaf10",
            type: NodeType.LEAF,
            columns: ["chem1_Coatings"],
          },
        },
        {
          text: "Acids (e.g., pickling)",
          next: {
            id: "chemLeaf11",
            type: NodeType.LEAF,
            columns: ["chem1_Acids"],
          },
        },
        {
          text: "Fluxes",
          next: {
            id: "chemLeaf12",
            type: NodeType.LEAF,
            columns: ["chem1_Fluxes"],
          },
        },
        {
          text: "Other (please specify)",
          next: {
            id: "chem1_other",
            type: NodeType.QUESTION,
            text: "Please specify the chemicals used.",
            options: [
              {
                text: "User provided answer",
                next: {
                  id: "chemLeaf13",
                  type: NodeType.LEAF,
                  columns: ["chem1_Other"],
                },
              },
            ],
          },
        },
        {
          text: "Not sure",
          next: {
            id: "chemLeaf14",
            type: NodeType.LEAF,
            columns: ["chem1_NotSure"],
          },
        },
      ],
    },
  };
  
  /* ==========================================================================
     EXPORT ALL CATEGORIES
     ========================================================================== */
  export const categories: Category[] = [
    rawMaterialExtraction,
    materialProcessing,
    manufacturingProcesses,
    transportation,
    energyConsumption,
    waterUsage,
    wasteManagement,
    chemicalUsage,
  ];
  