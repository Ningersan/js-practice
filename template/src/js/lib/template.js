(function () {
    var Template = function(config) {
        this.data = config.data
        this.$el = document.querySelector(config.el)
        this.init()
    }

    Template.prototype.init = function() {
        var fragment = addTofragment(this.$el)
        this.compile(fragment, this.data)
        this.$el.appendChild(fragment)
    }

    Template.prototype.compile = function(node, scope) {
        var self = this
        if (node.childNodes && node.childNodes.length) {
            Array.prototype.slice.call(node.childNodes).forEach(function (child) {

                // 元素节点处理
                if (child.nodeType === 1) {
                    self.compileElementNode(child, scope)

                    // 文本节点处理
                } else if (child.nodeType === 3) {
                    child.textContent = self.compileTextNode(child, scope)
                }
            })
        }
    }

    Template.prototype.compileElementNode = function(node, scope) {
        var self = this

        // attributes 是nodeMap类型，可能会动态添加属性所以要先转换为数组
        var attrs = Array.prototype.slice.call(node.attributes)

        for (var key in attrs) {
            var attrName = attrs[key].name
            var attrValue = attrs[key].value
            var dir = attrName.split(':')

            if (attrName === 'v-if') {
                this.ifHandle(node, attrValue, scope)
            } else if (attrName === 'v-for') {
                this.forHandle(node, attrValue, scope)
            }

            // 添加bind属性
            if (dir[1] && node.hasAttributes(dir[1])) {
                node[dir[1]] = getValue(attrValue, scope)
            }

            // 移除属性
            if (dir[1] || attrName === 'v-if' || attrName === 'v-for') {
                node.removeAttribute(attrName)
            }
        }

        // 如果不是v-for，递归调用子节点
        if (attrName !== 'v-for') {
            return this.compile(node, scope)
        }
    }

    Template.prototype.compileTextNode = function(node, scope) {
        var text = node.textContent.trim()
        if (!text) {
            return
        }

        var result = []
        var regText = /\{\{(.+?)\}\}/g
        var matches = text.match(regText)
        var pieces = text.split(regText)

        pieces.forEach(function (piece) {
            if (matches && matches.indexOf('{{' + piece + '}}') != -1) {
                result.push(getValue(piece, scope))
            } else if (piece) {
                result.push(piece)
            }
        });

        return result.join('')
    }

    Template.prototype.ifHandle = function(node, str, scope) {
        if (!getValue(str, scope)) {
            node.style.display = 'none'
        }
    }

    Template.prototype.forHandle = function(node, str, scope) {
        var self = this
        var splits = str.split('of')

        // 记录v-for中的key值
        var key = splits[0].match(/let (.+?)$/)[1].trim()
        var parent = node.parentNode
        var fragment = document.createDocumentFragment()

        getValue(splits[1], scope).forEach(function(item) {
            var newScope = {}
            var clone = node.cloneNode(true)

            newScope[key] = item
            clone.removeAttribute('v-for')
            self.compile(clone, newScope)
            fragment.appendChild(clone)
        })

        parent.removeChild(node)
        parent.appendChild(fragment)
    }

    function getValue(str, scope) {
        if (scope) {
            with (scope) {
                return eval(str)
            }
        }
    }

    function addTofragment(node) {
        var fragment = document.createDocumentFragment()
        for (var i = 0, len = node.children.length; i < len; i++) {
            var child = node.children[i]
            if (child.nodeType === 1) {
                fragment.appendChild(child)
            }
        }
        return fragment
    }

    // function getAllFirstChild(node) {
    //     var child
    //     var fragment = document.createDocumentFragment()

    //     while (child = node.firstChild) {
    //         // if (!isWhitespace) {
    //             fragment.appendChild(child)
    //         // }
    //     }
    //     return fragment
    // }

    // function isWhitespace(node) {
    //     var pattern = /^[\t\n\r]+/
    //     return (node.nodeType == 8) || ((node.nodeType == 3) && (pattern.test(node.textContent)));
    // }

    window.Template = Template;

})(window)
