# Inverse Square Law - Implementation Notes

This is the common library of all inverse square law sims: Coulomb's Law, Gravity Force Lab, and Gravity Force Lab Basics. Due to the needs of the inheriting sims, it's common to pass in large option objects to allow for freedom between the different requirements.

## Model
First, see the model overview at https://github.com/phetsims/inverse-square-law-common/blob/master/doc/model.md

The most fundamental interaction is between the two ISLCObjects within the ISLCModel space. The objects can only move in 1D and are constrained by the bounds of the sim as well as the nearest edge of the other object. The model's step function handles these constraints as well as force calculation and triggering the necessary events for visual updates.

While the objects have defined radii, the force calculation is based on their center-to-center distance.

## View

The scene graph construction is handled in inheriting sims, and ISLC simply creates the common nodes that they use.

### Object Nodes
These consist of a circle, a puller and rope, a force readout, and an arrow that visually corresponds to the force direction and magnitude. The puller is an ordered array of images that are invisible; by mapping force values to indices, we can set the visibility of the puller image that corresponds to the force value.

Force ranges are required for the mapping functions for the arrow width and puller indices.

## Query Parameters

We offer some development assistance with the query parameters that toggle the snapping grid for the sim and displaying the design mockup. See ISLQueryParameters.js for details.

## Misc

No screen nodes or model objects are ever destroyed from the start of the sim, we simply reset properties to initial values. Because of this, there is no need to dispose of listeners, and memory management is not an issue.