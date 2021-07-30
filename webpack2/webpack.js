/*
 * @Description: file content
 * @Author: xiaofang lan
 * @Date: 2021-07-29 15:47:42
 * @LastEditors: xiaofang lan
 * @LastEditTime: 2021-07-29 17:30:55
 */
const fs = require("fs")
const path = require("path")
const parser = require("@babel/parser") // 转换AST
const traverse = require("@babel/traverse").default // 用于节点遍历
const babel = require("@babel/core") // ES6转5

/**
 * @description: 分析单个文件依赖
 * @param {*} file
 * @return {*}
 */
function getModuleInfo(file) {
  // 读取文件
  const body = fs.readFileSync(file, "utf-8")

  // 转换ast语法树
  // const a = 123 // 字符串还是对象形式使用方便？思考，显然是对象，去了解一下字符串的解析
  const ast = parser.parse(body, {
    sourceType: 'module'
  })

  // 依赖收集 import xxx
  const deps = {}
  traverse(ast, {
    // visitor
    ImportDeclaration({
      node
    }) {
      // 入口文件运行时的路径
      const dirname = path.dirname(file)
      // 依赖文件的路径，转换成相对于webpack.js的路径。原本是相对于index.js入口文件的
      const astpath = './' + path.join(dirname, node.source.value)
      deps[node.source.value] = astpath
    }
  })
  // ES6转5
  const {
    code
  } = babel.transformFromAst(ast, null, {
    // 预设
    presets: ["@babel/preset-env"],
  });
  const info = {
    file,
    deps,
    code
  }

  return info
}
// const info = getModuleInfo("./src/index.js")
// console.log("info:", info);

/**
 * @description: 模块解析
 * @param {*} file
 * @return {*}
 */
function parseModules(file) {
  const entry = getModuleInfo(file)
  const temp = [entry]
  const depsGraph = {}
  getDeps(temp, entry)
  temp.forEach(info => {
    depsGraph[info.file] = {
      deps: info.deps,
      code: info.code,
    }
  })
  return depsGraph
}

/**
 * @description: 递归获取依赖
 * @param {*} temp
 * @param {*} deps
 * @return {*}
 */
function getDeps(temp, {
  deps
}) {
  Object.keys(deps).forEach(key => {
    const child = getModuleInfo(deps[key])
    temp.push(child)
    getDeps(child, child)
  })
}
// const content = parseModules("./src/index.js")
// console.log("content:", content);


function bundle(file) {
  const depsGraph = JSON.stringify(parseModules(file))
  return `(function (graph) {
    function require(file) {
      function absRequire(relPath) {
        return require(graph[file].deps[relPath])
      }
    var exports = {};
    (function (require,exports,code) {
      eval(code)
    })(absRequire,exports,graph[file].code)
      return exports
    }
      require('${file}')
    })(${depsGraph})`;
}
const content = bundle("./src/index.js")
!fs.existsSync("./dist") && fs.mkdirSync("./dist")
fs.writeFileSync("./dist/bundle.js", content)