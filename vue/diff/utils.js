import * as nodeOps from "./nodeOps.js";

function each(obj, fn) {//遍历对象
  if (Object.prototype.toString.call(obj) !== '[object Object]') {
    console.error('只能遍历对象！')
    return
  }

  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      var val = obj[key];
      fn(key, val)
    }
  }
}

function setAttr(node, key, value) {
  switch (key) {
    case 'style':
      each(value, (key, val) => {
        node.style[key] = val
      })
      break
    case 'value':
      var tag = node.tag || ''
      tag = tag.toLowerCase()
      if (
        tag === 'input' || tag === 'textarea'
      ) {
        node.value = value
      } else {
        // if it is not a input or textarea, use `setAttribute` to set
        node.setAttribute(key, value)
      }
      break
    default:
      node.setAttribute(key, value)
      break
  }
}

function isUndef(v) {
  return v === undefined || v === null
}

function isDef(v) {
  return v !== undefined || v !== null
}

function createKeyToOldIdx(children, beginIdx, endIdx) {
  let i, key
  const map = {}
  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key
    if (isDef(key)) map[key] = i
  }
  return map
}

export { each, setAttr, isUndef, isDef, nodeOps, createKeyToOldIdx }