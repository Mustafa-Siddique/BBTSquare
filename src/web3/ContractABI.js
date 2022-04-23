export const ABI = [
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: "bytes12", name: "_id", type: "bytes12" },
      {
        indexed: false,
        internalType: "uint256",
        name: "_checkpointIndex",
        type: "uint256",
      },
    ],
    name: "CheckpointCompleted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: "bytes12", name: "_id", type: "bytes12" },
    ],
    name: "OfferRejected",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: "bytes12", name: "_id", type: "bytes12" },
      {
        indexed: false,
        internalType: "address",
        name: "_clientAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "projectHash",
        type: "string",
      },
    ],
    name: "ProjectAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: "bytes12", name: "_id", type: "bytes12" },
    ],
    name: "ProjectAssigned",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: "bytes12", name: "_id", type: "bytes12" },
    ],
    name: "ProjectDeleted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: "bytes12", name: "_id", type: "bytes12" },
      {
        indexed: false,
        internalType: "address",
        name: "_assigneeAddress",
        type: "address",
      },
    ],
    name: "ProjectOffered",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: "bytes12", name: "_id", type: "bytes12" },
    ],
    name: "ProjectUnassigned",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: "bytes12", name: "_id", type: "bytes12" },
    ],
    name: "ProposalAccepted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: "bytes12", name: "_id", type: "bytes12" },
      { indexed: false, internalType: "string", name: "hash", type: "string" },
    ],
    name: "ProposalCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: "bytes12", name: "_id", type: "bytes12" },
    ],
    name: "ProposalRejected",
    type: "event",
  },
  {
    inputs: [{ internalType: "bytes12", name: "_id", type: "bytes12" }],
    name: "acceptOffer",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "bytes12", name: "_id", type: "bytes12" },
      { internalType: "string", name: "_projectHash", type: "string" },
      {
        internalType: "uint256[]",
        name: "_checkpointRewards",
        type: "uint256[]",
      },
    ],
    name: "addProject",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "bytes12", name: "_id", type: "bytes12" },
      { internalType: "bool", name: "response", type: "bool" },
    ],
    name: "assigneeResponse",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "bytes12", name: "_id", type: "bytes12" },
      { internalType: "uint256", name: "index", type: "uint256" },
    ],
    name: "checkpointCompleted",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "bytes12", name: "_id", type: "bytes12" },
      {
        internalType: "uint256[]",
        name: "_checkpointRewards",
        type: "uint256[]",
      },
      { internalType: "bool[]", name: "_checkpointsCompleted", type: "bool[]" },
      { internalType: "string", name: "_newProjectHash", type: "string" },
    ],
    name: "createProposal",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [{ internalType: "bytes12", name: "_id", type: "bytes12" }],
    name: "deleteProject",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "bytes12", name: "_id", type: "bytes12" }],
    name: "deleteProposal",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_from", type: "uint256" }],
    name: "get20Projects",
    outputs: [{ internalType: "bytes12[20]", name: "", type: "bytes12[20]" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getAllProjects",
    outputs: [{ internalType: "bytes12[]", name: "", type: "bytes12[]" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getAssigneeProjects",
    outputs: [{ internalType: "bytes12[]", name: "", type: "bytes12[]" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_assigneeAddress", type: "address" },
    ],
    name: "getAssigneeProjects",
    outputs: [{ internalType: "bytes12[]", name: "", type: "bytes12[]" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_clientAddress", type: "address" },
    ],
    name: "getClientProjects",
    outputs: [{ internalType: "bytes12[]", name: "", type: "bytes12[]" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getClientProjects",
    outputs: [{ internalType: "bytes12[]", name: "", type: "bytes12[]" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getOffers",
    outputs: [{ internalType: "bytes12[]", name: "", type: "bytes12[]" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "bytes12", name: "_id", type: "bytes12" }],
    name: "getProject",
    outputs: [
      { internalType: "address", name: "", type: "address" },
      { internalType: "address", name: "", type: "address" },
      { internalType: "string", name: "", type: "string" },
      { internalType: "uint256[]", name: "", type: "uint256[]" },
      { internalType: "bool[]", name: "", type: "bool[]" },
      { internalType: "uint256", name: "", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "bytes12", name: "_id", type: "bytes12" }],
    name: "getProposal",
    outputs: [
      { internalType: "string", name: "", type: "string" },
      { internalType: "uint256", name: "", type: "uint256" },
      { internalType: "uint256[]", name: "", type: "uint256[]" },
      { internalType: "bool[]", name: "", type: "bool[]" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "bytes12", name: "_id", type: "bytes12" },
      {
        internalType: "address payable",
        name: "assigneeAddress",
        type: "address",
      },
    ],
    name: "offer",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [{ internalType: "bytes12", name: "_id", type: "bytes12" }],
    name: "revokeOffer",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "bytes12", name: "_id", type: "bytes12" }],
    name: "unassign",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
];
