from pathlib import Path

fixes = [
    (
        Path("src/app/components/ContactInfoPanel.tsx"),
        "            </svg>\n          </motion.div>\n          <motion.div>",
        "            </svg>\n          </motion.div>\n          <motion.div>",
    ),
    (
        Path("src/app/components/ParallaxQuoteBanner.tsx"),
        "            ) : null}\n          </motion.div>\n        </motion.div>",
        "            ) : null}\n          </motion.div>\n        </motion.div>",
    ),
    (
        Path("src/app/components/WhyChooseGrid.tsx"),
        '            {String(index + 1).padStart(2, "0")}\n          </motion.div>',
        '            {String(index + 1).padStart(2, "0")}\n          </motion.div>',
    ),
]

# Apply div closing fixes (second line in each replacement uses </motion.div> -> </motion.div>)
fixes[0] = (
    fixes[0][0],
    fixes[0][1].replace("</motion.div>\n          <motion.div>", "</motion.div>\n          <motion.div>"),
    fixes[0][2].replace("</motion.div>\n          <motion.div>", "</motion.div>\n          <motion.div>"),
)
# The above is still wrong - do explicit:
fixes = [
    (
        Path("src/app/components/ContactInfoPanel.tsx"),
        "          </motion.div>\n          <motion.div>",
        "          </motion.div>\n          <motion.div>",
    ),
]
