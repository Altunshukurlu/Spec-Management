# Goal

The aim of this project is to develop and evaluate a new approach to
system assurance: a modular approach, inspired by logic, one that is
meant to enable management of complex projects for stakeholder value.

# State of the Art

Related efforts are ongoing in the area of safety and dependability
assurance cases. They include work by Rushby, Leveson, Knight, GSN,
CAE, etc. [citations needed]

# Shortcomings in the State of the Art

Shortcomings in the current state of the art nclude

* overfocus on dependability properties to the exclusion of others
  important in producing systems that stakeholders value
* constrained expressiveness of claims language (basically and-trees)
* inadequate support for system and assurance case evolution
* lack of flexibility, e.g., pluggable inference rules
* old-fashioned tools

# New Approach 

We propose to develop and evaluate a method and a system that will
enable engineers and decision makers to
* employ concepts from constructive logic to build propositions
about systems and their components, environments, and stakeholders
* manage, evaluate, and evolve databases of such propositions
* support multiple interpretations of propositions, from assumptions
to requirements that are intended to be satisifed by future actions
*  manage, understand, and evaluate diverse forms of evidence
related to propositions
* support diverse inference rules and methods for deriving judgments
  about propositions from evidence
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

# Why Do We Think It Will Work?

We believe this approach will work for several reasons. First, it will
address today's tendency to over-focus on, and over-optimize
individual system properties, such as security or safety, at the
expense of other properties on which system value to stakeholders
ultimately depends. It's our view that systems engineering of complex
software-intensive CPH systems requires a far more complex balancing
of a far broader range of system properties.

# Who Will Care

# How Will We Know We're Succeeding?

# What are the Intermediate and Final Exams?
