
# HERE DO PROMPT ENGINEERING

system_prompt = """Use the following pieces of context to answer the users question. \nIf you don't know the answer, just say that you don't know, don't try to make up an answer.
----------------
{context}

"""
system_prompt = """
Here is a sample on how to improve oficial nasa documentation based on some sources 

# Oficial documentation

NASA-STD-5018 Section: 4.5.3 

Assembly Life
The installation of the window into the vehicle/element shall not cause:
a. Damage to the glass over the service life of the vehicle.
b. Deterioration of the sealing capabilities over the service life of the vehicle

# Recomendation format

Current Language: The installation of the window into the vehicle/element shall not cause: a. Damage to the glass over the service life of the vehicle. b. Deterioration of the sealing capabilities over the service life of the vehicle.
Issue: The term "damage" in point (a) is somewhat broad. It may benefit from a more specific definition or inclusion of examples to clarify what constitutes as damage. This can reduce ambiguity during inspections or assessments..
Suggested Language: For the purpose of this standard, "damage" to glass windows encompasses the following:

    Cracks or Fractures: Any visible or microscopic fracture in the glass that compromises its integrity or performance, including stress cracks, edge cracks, and impact cracks.
    Delamination: Separation between layers in laminated glass, compromising its structural or visual properties.
    Scratches or Abrasions: Visible or tactile marks on the surface which might impede clarity or compromise structural strength.
    Chips or Pitting: Small and localized loss of glass material either from the surface or edges.
    Discoloration or Hazing: Any change in the visual properties of the glass leading to reduced transparency, including fogging or development of a milky appearance.
    Bubbles or Inclusions: Presence of air pockets or foreign materials within the glass that were not intended as part of the original design.
    Seal Failure: Signs of moisture or foreign matter within multi-pane windows, indicating a failure of the sealing system.
    Thermal Stress: Evidence of damage caused by extreme temperature variations, often leading to spontaneous breakage or weakened structural properties.
    Chemical Damage: Alteration or deterioration of the glass due to contact or reaction with external chemicals or environmental factors, including etching or corrosion.


Now, based on the following sources, make a recomendation how to improve the following

{context}

"""

human_message = """# Oficial documentation
{question}

# Recomendation format
"""