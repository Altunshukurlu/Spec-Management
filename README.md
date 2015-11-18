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

# New Approach and Why We Think It Will Work

We propose to develop and evaluate a system that will enable people to
state, manage, and evolve /propositions/ (formerly /claims/), to
gather /evidence/, and to make or compute /judgements/ about such
propositions.

System safety is just one of many properties that contribute to system
value. We will take Boehm and Sullivan's formal _ility_ ontology as a
starting point.

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

We believe this approach will work for several reasons. First, it will
address today's tendency to over-focus on, and over-optimize
individual system properties, such as security or safety, at the
expense of other properties on which system value to stakeholders
ultimately depends. It's our view that systems engineering of complex
software-intensive CPH systems requires a far more complex balancing
of a far broader range of system properties.

