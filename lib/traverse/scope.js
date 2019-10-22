const {isFor, isProgram, isBlockStatement, isDeclaration, isFunction, isLet, getId, isReference, isVar, isCatchClause,} = require('../utils');
const _ = require('lodash');
const traverse = require('./index');
const forKeys = ['left', 'init'];

function Scope(node, parent) {
    this.block = node;
    this.parent = parent;
    this.references = {};
    this.declarations = {};
    this.getInfo();
}

Scope.prototype.getInfo = function () {
    let node = this.block;
    if (isFor(node)) {
        forKeys.forEach(key => {
            const n = node[key];
            if (!n) {
                return;
            }
            if (isLet(n)) {
                this.add(n);
            }
        });
        node = node.body;
    }

    if (isBlockStatement(node)) {
        _.each(node.body, n => {
            if (isLet(n)) {
                this.add(n);
            }
        })
    }

    if (isCatchClause(node)) {
        
    }

    if (isProgram(node) || isFunction(node)) {
        traverse(node, {
            enter: (n, parent) => {
                if (isFor(n)) {
                    forKeys.forEach(key => {
                        const n = node[key];
                        if (isVar) {
                            this.add(n);
                        }
                    })
                }
                if (isFunction(n)) {
                    return false;
                }
                if (n.type === 'Identifier' && isReference(n, parent)) {
                    this.add(n, true);
                }

                if (isDeclaration(n) && !isLet(node)) {
                    this.add(n);
                }
            }
        }, this)
    }

}

Scope.prototype.add = function (node, reference) {
    if (!node) {
        return;
    }
    add(node, this.references);
    if (!reference) {
        add(node, this.declarations);
    }
};


Scope.prototype.get = function (name, declaration) {
    return this.getOwn(name, declaration) || this.parent && this.parent.get(name, declaration);
};

Scope.prototype.getOwn = function (name, declaration) {
    const refs = declaration ? this.declarations : this.references;
    return refs[name]
};

function add(node, references) {
    _.defaults(references, getId(node));
}

module.exports = Scope;