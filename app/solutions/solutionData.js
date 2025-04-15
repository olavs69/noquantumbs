// Mock data for the quantum solutions
export const solutionData = [
  {
    id: 1,
    name: "QuantumML",
    slug: "quantumml",
    category: "Machine Learning",
    price: "Free + from $199/mo",
    commentCount: 13,
    isVerified: true,
    rating: 4.7,
    overview:
      "QuantumML harnesses quantum computing to revolutionize machine learning model training. By utilizing quantum parallelism, it accelerates complex calculations and enables the processing of datasets that were previously impossible to handle with classical methods. The platform provides an intuitive interface for data scientists to leverage quantum advantages without requiring expertise in quantum physics.",
    description:
      "QuantumML is a cutting-edge platform that combines quantum computing principles with machine learning algorithms. It offers significant speedup for complex ML tasks such as feature selection, clustering, and pattern recognition. The technology can process massive datasets in parallel, identifying correlations and patterns that traditional ML systems might miss. With both cloud and on-premises deployment options, QuantumML scales to meet enterprise needs while maintaining robust security protocols.",
    pros: [
      "10-100x faster training for complex models",
      "Can handle significantly larger datasets than classical ML",
      "Reduced energy consumption compared to traditional ML clusters",
      "Intuitive interface requiring minimal quantum knowledge",
      "Seamless integration with existing ML workflows",
    ],
    cons: [
      "Requires specialized hardware for optimal performance",
      "Higher cost than traditional ML solutions at scale",
      "Limited support for certain specialized algorithms",
      "Learning curve for optimizing quantum-specific parameters",
    ],
    applications: [
      "Drug discovery and pharmaceutical research",
      "Financial modeling and risk assessment",
      "Climate and weather prediction",
      "Supply chain optimization",
      "Material science research",
    ],
    testimonial:
      "QuantumML reduced our model training time from weeks to hours, enabling us to iterate much faster on our drug discovery pipeline. The quantum advantage is real and transformative for our research team.",
    logoColor: "#3B82F6",
  },
  {
    id: 2,
    name: "Q-Finance",
    slug: "q-finance",
    category: "Financial Analysis",
    price: "From $249/mo",
    commentCount: 7,
    isVerified: false,
    rating: 4.3,
    overview:
      "Q-Finance applies quantum algorithms to financial modeling, enabling institutions to perform complex risk assessments and portfolio optimizations at unprecedented speeds. The platform specializes in Monte Carlo simulations and option pricing models that run exponentially faster than traditional methods.",
    description:
      "Q-Finance leverages quantum computing to tackle the most computationally intensive challenges in financial services. From risk analysis to algorithmic trading strategies, the platform enables financial institutions to gain insights and make decisions with greater speed and accuracy. The solution specializes in quantum implementations of Monte Carlo simulations, portfolio optimization, and derivatives pricing models. Users can connect existing financial data sources and integrate with current financial software ecosystems.",
    pros: [
      "Real-time risk assessment capabilities",
      "Optimizes portfolios across thousands of assets simultaneously",
      "Identifies market opportunities traditional systems would miss",
      "SOC 2 Type II certified for financial data security",
      "Customizable dashboards for different organizational roles",
    ],
    cons: [
      "Expensive implementation costs for full feature set",
      "Requires specialized financial data formatting",
      "Limited historical backtesting capabilities",
      "Steeper learning curve than traditional financial software",
    ],
    applications: [
      "Asset pricing and derivatives valuation",
      "High-frequency trading optimization",
      "Portfolio risk management",
      "Fraud detection and prevention",
      "Credit scoring and loan approval automation",
    ],
    testimonial:
      "Q-Finance has transformed our risk assessment process. What used to take overnight batch processing now runs in minutes, giving us near real-time insight into our exposure across global markets.",
    logoColor: "#10B981",
  },
  {
    id: 3,
    name: "CryptoQuantum",
    slug: "cryptoquantum",
    category: "Cryptography",
    price: "Free + from $99/mo",
    commentCount: 21,
    isVerified: false,
    rating: 4.9,
    overview:
      "CryptoQuantum provides quantum-resistant encryption and secure communication channels for enterprises and government agencies. As quantum computers threaten to break traditional encryption methods, CryptoQuantum offers post-quantum cryptographic solutions that remain secure in the quantum era.",
    description:
      "CryptoQuantum is at the forefront of post-quantum cryptography, developing and implementing encryption algorithms that withstand attacks from both classical and quantum computers. The platform includes a comprehensive suite of quantum-resistant cryptographic tools, secure messaging systems, and authentication protocols. Organizations can audit their current security posture against quantum threats and implement hardened systems to protect sensitive data from the quantum threat landscape that's rapidly emerging.",
    pros: [
      "NIST-validated post-quantum encryption algorithms",
      "Seamless migration path from current encryption systems",
      "Regular updates as quantum computing advances",
      "Zero-knowledge proof implementation for ultimate privacy",
      "Hardware security module (HSM) integration",
    ],
    cons: [
      "Performance overhead compared to classical encryption",
      "Complex implementation for legacy systems",
      "Evolving standards require frequent updates",
      "Limited compatibility with some older systems",
    ],
    applications: [
      "Government and military communications",
      "Banking and financial data protection",
      "Healthcare record security",
      "Intellectual property protection",
      "Secure IoT device communications",
    ],
    testimonial:
      "As a government contractor handling classified information, CryptoQuantum gives us confidence that our communications will remain secure even as quantum computing becomes more accessible to potentially hostile actors.",
    logoColor: "#6366F1",
  },
  {
    id: 4,
    name: "OptimQ",
    slug: "optimq",
    category: "Optimization",
    price: "From $179/mo",
    commentCount: 5,
    isVerified: true,
    rating: 4.5,
    overview:
      "OptimQ solves complex optimization problems that are intractable for classical computers. From logistics and supply chain optimization to complex resource allocation challenges, OptimQ finds optimal or near-optimal solutions exponentially faster than traditional methods.",
    description:
      "OptimQ harnesses the power of quantum annealing and gate-based quantum algorithms to tackle NP-hard optimization problems that classical computers struggle with. The platform specializes in solving complex logistical challenges, scheduling problems, and resource allocation scenarios where the number of possible combinations makes classical computing approaches impractical. With both ready-made industry solutions and a framework for developing custom optimization applications, OptimQ serves industries ranging from manufacturing to healthcare, transportation, and energy.",
    pros: [
      "Solves previously intractable optimization problems",
      "Hybrid classical-quantum approach for optimal resource use",
      "Intuitive visual modeling interface",
      "Real-time constraint adjustment capabilities",
      "Integrates with existing ERP and supply chain systems",
    ],
    cons: [
      "Solution quality depends on problem formulation expertise",
      "Requires deep domain knowledge for effective implementation",
      "Limited to certain classes of optimization problems",
      "Occasional reliability issues with complex constraints",
    ],
    applications: [
      "Logistics and delivery route optimization",
      "Manufacturing production scheduling",
      "Network traffic optimization",
      "Energy grid load balancing",
      "Hospital staff and resource scheduling",
    ],
    testimonial:
      "OptimQ reduced our logistics costs by 27% by finding more efficient routing and loading patterns that our previous systems simply couldn't discover. The ROI was evident within the first month.",
    logoColor: "#EC4899",
  },
  {
    id: 5,
    name: "QSimulate",
    slug: "qsimulate",
    category: "Simulation",
    price: "Custom pricing",
    commentCount: 9,
    isVerified: true,
    rating: 4.8,
    overview:
      "QSimulate specializes in quantum-powered simulations for molecular modeling, material science, and physical systems. The platform enables researchers to model quantum mechanical systems with unprecedented accuracy, accelerating scientific discovery and materials development.",
    description:
      "QSimulate brings quantum computing power to scientific simulations that require quantum mechanical accuracy. The platform excels at modeling molecular interactions, chemical reactions, material properties, and quantum mechanical systems that are fundamentally challenging for classical computing approaches. Researchers in pharmaceuticals, materials science, and chemistry can leverage QSimulate to predict behaviors and properties of complex systems without expensive physical experimentation. The platform offers both pre-built simulation modules and a development framework for custom quantum simulation applications.",
    pros: [
      "Accurate modeling of quantum mechanical systems",
      "Exponential speedup for molecular simulations",
      "Predictive capabilities for material properties",
      "Intuitive 3D visualization of simulation results",
      "Collaboration tools for research teams",
    ],
    cons: [
      "Requires significant quantum resources for complex simulations",
      "Steep learning curve for custom simulation development",
      "Limited to certain simulation types",
      "Higher cost compared to classical simulation software",
    ],
    applications: [
      "Drug discovery and molecular modeling",
      "New materials development and testing",
      "Catalyst optimization for chemical processes",
      "Quantum chemistry research",
      "Battery technology improvement",
    ],
    testimonial:
      "QSimulate allowed us to accurately model complex protein folding that would have been impossible with classical methods. This has accelerated our drug discovery pipeline and provided insights we couldn't have obtained otherwise.",
    logoColor: "#F59E0B",
  },
  {
    id: 6,
    name: "QuantumChemistry",
    slug: "quantumchemistry",
    category: "Chemistry Analysis",
    price: "Free + from $159/mo",
    commentCount: 11,
    isVerified: false,
    rating: 4.6,
    overview:
      "QuantumChemistry provides specialized quantum computing tools for chemical analysis, reaction prediction, and molecular design. The platform enables chemists to model complex molecular interactions and simulate chemical reactions with quantum-level accuracy.",
    description:
      "QuantumChemistry is a specialized quantum computing platform designed for chemists and materials scientists. It focuses on accurately modeling chemical compounds, predicting reaction pathways, and designing new molecules with desired properties. The system can simulate the quantum mechanical behavior of electrons in molecules, enabling significantly more accurate predictions than classical computational chemistry methods. QuantumChemistry integrates with existing laboratory information management systems and includes specialized modules for pharmaceuticals, agrochemicals, and industrial chemical processes.",
    pros: [
      "Accurate quantum-level simulation of molecular behavior",
      "Predicts reaction outcomes with high reliability",
      "Accelerates discovery of new chemical compounds",
      "Reduces need for expensive laboratory experimentation",
      "Supports standard chemical notation and file formats",
    ],
    cons: [
      "Limited to molecular systems of certain sizes",
      "Requires chemistry domain expertise to use effectively",
      "Performance varies based on molecular complexity",
      "Integration challenges with some laboratory equipment",
    ],
    applications: [
      "Pharmaceutical drug discovery",
      "Industrial catalyst development",
      "Polymer and materials design",
      "Agrochemical research and development",
      "Biofuel optimization",
    ],
    testimonial:
      "QuantumChemistry enabled us to accurately predict the behavior of complex catalytic systems that classical methods consistently got wrong. This has fundamentally changed our research approach and accelerated our development timelines.",
    logoColor: "#8B5CF6",
  },
  {
    id: 7,
    name: "QuBit Pro",
    slug: "qubit-pro",
    category: "Quantum Computing",
    price: "From $399/mo",
    commentCount: 31,
    isVerified: true,
    rating: 4.9,
    overview:
      "QuBit Pro is a comprehensive quantum computing development platform that provides access to multiple quantum hardware providers through a unified interface. The platform includes advanced circuit design tools, quantum algorithm libraries, and optimization techniques for quantum code.",
    description:
      "QuBit Pro is the industry-leading development environment for quantum computing professionals. The platform provides unified access to a variety of quantum hardware providers, including superconducting, trapped ion, and photonic quantum computers. Features include a sophisticated circuit designer with simulation capabilities, extensive algorithm libraries, and tools for optimizing quantum code for specific hardware architectures. QuBit Pro supports both low-level quantum circuit programming and high-level quantum algorithm development through its comprehensive SDKs and APIs.",
    pros: [
      "Access to multiple quantum hardware providers",
      "Advanced circuit visualization and debugging tools",
      "Comprehensive algorithm libraries and code examples",
      "Automatic circuit optimization for different hardware",
      "Strong educational resources and community support",
    ],
    cons: [
      "Higher pricing tier than most quantum development tools",
      "Steep learning curve for beginners in quantum computing",
      "Performance dependent on underlying hardware providers",
      "Complex enterprise integration requirements",
    ],
    applications: [
      "Quantum algorithm research and development",
      "Education and training for quantum computing skills",
      "Quantum software product development",
      "Proof-of-concept quantum applications",
      "Enterprise quantum computing strategy implementation",
    ],
    testimonial:
      "QuBit Pro has become our standard development environment for all quantum projects. The ability to write once and run on multiple hardware platforms saves us enormous time and resources in our research.",
    logoColor: "#F43F5E",
  },
  {
    id: 8,
    name: "QuantumCloud",
    slug: "quantumcloud",
    category: "Cloud Computing",
    price: "Free + from $299/mo",
    commentCount: 18,
    isVerified: true,
    rating: 4.4,
    overview:
      "QuantumCloud provides hybrid quantum-classical cloud infrastructure, enabling organizations to incorporate quantum computing resources into their existing cloud environments. The platform seamlessly integrates with major cloud providers and supports hybrid quantum-classical workflows.",
    description:
      "QuantumCloud bridges classical and quantum computing through a sophisticated cloud infrastructure designed for enterprise needs. The platform enables seamless integration of quantum computing resources into existing cloud environments and workflows. Organizations can allocate quantum resources alongside classical computing instances, orchestrate hybrid workloads, and scale quantum usage based on need. QuantumCloud includes robust security features, resource management tools, and comprehensive APIs for integrating with existing DevOps pipelines and cloud services from major providers.",
    pros: [
      "Seamless integration with existing cloud infrastructure",
      "Pay-per-use quantum resource allocation",
      "Advanced hybrid quantum-classical orchestration",
      "Enterprise-grade security and compliance features",
      "Comprehensive monitoring and analytics dashboard",
    ],
    cons: [
      "Complex setup for full hybrid capabilities",
      "Requires cloud architecture expertise to optimize",
      "Variable performance based on quantum hardware availability",
      "Limited support for some specialized quantum processors",
    ],
    applications: [
      "Enterprise IT modernization with quantum capabilities",
      "Secure quantum-enhanced cloud services",
      "Scalable research and development environments",
      "Disaster recovery for quantum workloads",
      "Multi-region quantum resource distribution",
    ],
    testimonial:
      "QuantumCloud allowed us to incorporate quantum computing into our existing cloud infrastructure without disrupting our operations. The ability to scale quantum resources up and down based on project needs has been invaluable.",
    logoColor: "#06B6D4",
  },
  {
    id: 9,
    name: "Q-Error",
    slug: "q-error",
    category: "Error Correction",
    price: "From $149/mo",
    commentCount: 12,
    isVerified: true,
    rating: 4.7,
    overview:
      "Q-Error provides advanced quantum error correction solutions that significantly improve the reliability and accuracy of quantum computations. The platform implements sophisticated error detection and correction codes that mitigate the effects of quantum decoherence and gate errors.",
    description:
      "Q-Error addresses one of the fundamental challenges in quantum computing: managing errors that result from quantum decoherence and imperfect gate operations. The platform implements a suite of state-of-the-art quantum error correction codes and techniques that significantly improve the reliability and accuracy of quantum computations. Q-Error can be integrated with various quantum hardware platforms and development environments, providing transparent error mitigation that scales with the complexity of quantum circuits. The system includes real-time error monitoring, adaptive correction strategies, and detailed analytics on error rates and correction efficiency.",
    pros: [
      "Significantly improves quantum computation accuracy",
      "Adaptive error correction based on circuit characteristics",
      "Compatible with major quantum hardware platforms",
      "Detailed error analytics and visualization",
      "Minimal additional circuit depth overhead",
    ],
    cons: [
      "Additional qubit requirements for error correction",
      "Performance impact on smaller quantum systems",
      "Complex configuration for optimal results",
      "Not effective for all types of quantum noise",
    ],
    applications: [
      "Financial modeling requiring high precision",
      "Critical scientific simulations",
      "Cryptographic applications",
      "Quantum machine learning with noise sensitivity",
      "Fault-tolerant quantum algorithm development",
    ],
    testimonial:
      "Q-Error has been transformative for our quantum research. What were previously unreliable results are now consistently reproducible, enabling us to build more complex quantum algorithms with confidence.",
    logoColor: "#0EA5E9",
  },
  {
    id: 10,
    name: "QuantumNet",
    slug: "quantumnet",
    category: "Communication",
    price: "Custom pricing",
    commentCount: 9,
    isVerified: false,
    rating: 4.5,
    overview:
      "QuantumNet enables secure quantum communication networks with quantum key distribution (QKD) and entanglement-based protocols. The platform provides hardware and software solutions for implementing quantum-secure communication channels that are immune to future quantum computing threats.",
    description:
      "QuantumNet builds the foundation for quantum-secure communications infrastructure. The comprehensive platform includes both the hardware and software components needed to implement quantum key distribution (QKD) and entanglement-based communication protocols. QuantumNet secures data transmission against both current threats and future quantum computing capabilities that might otherwise break traditional encryption. The system integrates with existing network infrastructure and security systems while providing a migration path to fully quantum-secured communications. Enterprise and government organizations use QuantumNet to protect their most sensitive communications from advanced persistent threats and future quantum computing capabilities.",
    pros: [
      "Fundamentally secure communications based on quantum principles",
      "Future-proof against quantum computing threats",
      "Integrates with existing network infrastructure",
      "Comprehensive key management system",
      "Scalable from point-to-point to network implementations",
    ],
    cons: [
      "Requires specialized hardware for full implementation",
      "Distance limitations for certain protocols",
      "Higher cost than classical security solutions",
      "Complex deployment in existing enterprise environments",
    ],
    applications: [
      "Government and military secure communications",
      "Financial institution data transfer security",
      "Critical infrastructure protection",
      "Healthcare data transmission",
      "Intellectual property secure sharing",
    ],
    testimonial:
      "As a financial institution handling billions in transactions daily, QuantumNet gives us confidence that our communications will remain secure even when practical quantum computers become a reality. The implementation was complex but well worth the investment.",
    logoColor: "#A855F7",
  },
];

// Helper function to find a solution by slug
export function getSolutionBySlug(slug) {
  return solutionData.find((solution) => solution.slug === slug) || null;
}

// Helper function to get all solutions
export function getAllSolutions() {
  return solutionData;
}

// Helper function to get featured solutions
export function getFeaturedSolutions() {
  return solutionData.filter((solution) => solution.isVerified).slice(0, 4);
}

// Helper function to get new solutions
export function getNewSolutions() {
  return solutionData.slice(0, 6);
}
