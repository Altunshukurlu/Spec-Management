# Overview

Authors: Graduate Students and Kevin Sullivan, "A Constructive Logic
Approach to System Value Assurance: Concepts, Methods, and Tools,"
University of Virginia Department of Computer Science, Working Paper,
2015.

This repository contains a working paper and associated software
artifact by Kevin Sullivan and several University of Virginia Computer
Science graduate students. Copyright is held by the authors. Comments
and collaborations are welcome. Contact sullivan _at_ virginia.edu for
more information.

# Goal

The aim of this project is to develop and evaluate a new approach to
system assurance: a modular approach, taking constructive logic as an
organizing principal but replacing formal proof structures with more
diverse forms of evidence, and logical judgements based on proofs with
engineering judgments based on such evidence, to improve management of
complex projects for stakeholder value. The approach is meant at least
partly subsume dependability/safety properties and assurance as just
one of multiple properties that ultimately contribute to system value
and stakeholder satisfaction.

# State of the Art

Related efforts are ongoing in the area of safety and dependability
assurance cases. They include work by Rushby, Leveson, Knight, GSN,
CAE, etc. [citations needed]

## Arguments/Assurance
### Rushby: Hybrid Inductive/Deductive Reasoning
### Leveson: Socio-Technical Control Loops for Maintaining Properties
### GSN
### CAE
## Properties
### Boehm/Sullivan -- ility hierarchy
### Knight/Strunk/Sullivan -- survivability
### 



# Shortcomings in the State of the Art

Shortcomings in the current state of the art include

* lack of a satisfactory, practical, useful, theoretically defensible,
validated method for making judgments about validity of propositions
based on informal, incomplete, imperfect evidence
* overfocus on dependability properties to the exclusion of other
properties that are also critical in producing systems of value to
diverse stakeholders (e.g., Torvalds criticism of security zealots)
* inadequate expressiveness of claims language (basically and-trees,
  Horn clauses)
* inadequate support for system and assurance case evolution
* lack of flexibility, e.g., with respect to "pluggable" inference
  rules
* old-fashioned tools, e.g., desktop software based on Eclipse

# Our Approach 

We propose a method and a system that will enable engineers and
decision makers to
* manage and evolve representations of systems and their components,
environments, and stakeholders as the real-world subject matter to
which propositions (discussed next) refer
* employ concepts from constructive logic to build propositions
about systems and their components, environments, and stakeholders
* in particular, provide an extensible set of proposition
constructors, including the usual connectives of higher-order
predicate logic
* manage, evaluate, and evolve databases of such propositions
* support multiple interpretations of propositions, from assumptions
to requirements that are intended to be satisifed by future actions
*  manage, understand, and evaluate diverse forms of evidence
related to propositions
* support diverse inference rules and methods for deriving judgments
about propositions from evidence
* forms of evidence could include Software/system test results Structured, composite pieces of evidence Citations to external documents of many kinds Experience reports by qualified stakeholders Statistical analysis of data, e.g., from system operation Formal proofs, e.g., of correctness of code with respect to given specifications Certification of compliance with regulatory regimes Software and system inspections Static analysis Simulation results Prototype results Customer/user survey results (user testing)
* compute, manage and evolve judgements about such propositions
* support modular packaging of systems/components and associated value
assurance cases
* support compositional construction of larger systems and assurance
  arguments from component modules

# What's New?

First, system safety is just one of many properties that contribute to
system value. We will take the Boehm/Sullivan formal _ility_ ontology
as a starting point with the intent to replace safety or dependability
with value as the top level proposition in assurance cases.

Second, we will will replace the _and-trees_ of traditional safety
assurance clases with far more expressive notations modeled on the
structures of higher-order constructive logic. This will make it
possible, for example, to say that a stakeholder will be satisfied by
this _or_ that, whereas today's assurance cases can generally state
only that this _and_ that is required. 

Third, we will provide flexibility in the inference rules for such
logics. For example, in some cases we'll support logical deduction. In
other cases, we'll support probabilistic inference. Etc.

Fourth, we will base our prototype tool implementation on modern web
application technology. Our initial work will explore the use of the
so-called MEAN Stack---Mongo DB, Express, Angular, and Node.js---as
a platform for building highly interactive, responsive, and functional
web-based tools.

Fifth, we will support broad range of expressiveness other than and-trees.

# What Claims Do We Make for this Approach

* list them
* here

# Why Do We Think It Will Work?

We believe this approach will work for several reasons. First, it will
address today's tendency to over-focus on, and over-optimize
individual system properties, such as security or safety, at the
expense of other properties on which system value to stakeholders
ultimately depends. It's our view that systems engineering of complex
software-intensive CPH systems requires a far more complex balancing
of a far broader range of system properties.

# Who Will Care

We expect this work to be of interest to both the broader systems
engineering community and to the software engineering community, with
particular relevance to those working in areas of system requirements,
assurance cases, proof engineering,

# How Will We Know We're Succeeding?

# What are the Intermediate and Final Exams?
