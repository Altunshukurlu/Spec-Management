# Goal

The aim of this project is to develop and evaluate a new approach to
system assurance: one that will enable engineers and decision makers
to manage complex systems projects for stakeholder value.

# State of the Art and its Shortcomings

Major related efforts are ongoing in the area of safety and
dependability assurance cases. These efforts include work by Rushby,
Leveson, Knight, GSN, CAE, etc.

Key shortcomings of work of this kind include (1) overfocus on safety
and dependability properties to the exclusion of many other properties
that are important for producing systems of value to stakeholders; (2)
inadequate support for system and assurance case evolution; (3) lack
of flexibility, e.g., pluggable inference rules; (4) no disributed tool support; (5) fairly narrow range of expressiveness in notation
(essentially and-trees).

# New Approach and Why We Think It Will Work

First, we're going to provide a system that will enable engineers and
decision makers to state, manage, evolve, and make evidence-supported
judgements about system _value_ claims. System safety is just one of
many properties that contribute to system value. We will take Boehm
and Sullivan's formal _ility_ ontology as a starting point.

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

