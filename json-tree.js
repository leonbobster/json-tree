class Node {
    constructor(parent) {
        this.parent = parent
    }

    getChildren() {
        return null
    }
}

class ObjectNode extends Node {
    constructor(parent) {
        super(parent)
        this.props = []
    }

    getChildren() {
        return this.props
    }
}

class PropertyNode extends Node {
    constructor(parent, key) {
        super(parent)
        this.key = key
        this.value = null
    }

    getChildren() {
        return [this.value]
    }
}

class ScalarNode extends Node {
    constructor(parent, value) {
        super(parent)
        this.value = value
    }
}

class ArrayNode extends Node {
    constructor(parent) {
        super(parent)
        this.values = []
    }

    getChildren() {
        return this.values
    }
}

function treeBuilder(elem, parent = null) {
    if (elem instanceof Array) {
        const node = new ArrayNode(parent)
        node.values = elem.map(item => treeBuilder(item, node))
        return node
    } else if (typeof elem === 'object') {
        const node = new ObjectNode(parent)
        node.props = Object.keys(elem).map(key => {
            const prop = new PropertyNode(node, key)
            prop.value = treeBuilder(elem[key], prop)
            return prop
        })
        return node
    }
    return new ScalarNode(parent, '' + elem)
}

function traverseTree(node, callback, level = 0, hasNextSibling = false) {
    callback(node, level, hasNextSibling)
    if (node.getChildren() instanceof Array) {
        const children = node.getChildren();
        for (let i = 0; i < children.length; i++) {
            traverseTree(children[i], callback, level + 1, i < (children.length - 1))
        }
    }
}

function traverseParents(node, callback) {
    if (node === null) {
        return
    }
    callback(node)
    traverseParents(node.parent, callback)
}

module.exports = {
    Node,
    ScalarNode,
    ArrayNode,
    ObjectNode,
    PropertyNode,
    treeBuilder,
    traverseTree,
    traverseParents
}