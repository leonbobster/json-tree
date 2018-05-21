const {ArrayNode, ObjectNode} = require('./json-tree')

function treeRenderer(scalarRenderer, arrayRenderer, objectRenderer) {
    return node => {
        if (node instanceof ArrayNode)
            return arrayRenderer(node)
        else if (node instanceof ObjectNode)
            return objectRenderer(node)
        return scalarRenderer(node)
    }
}

module.exports = {
    treeRenderer
}