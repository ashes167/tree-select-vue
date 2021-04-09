// 生成不重复的key
function compute() {
	const cache = {}
	return function getRandom() {
		let m = Math.random()
		while (cache[m]) {
			m = Math.random()
		}
		cache[m] = m
		return m
	}
}
const generateKey = compute()

const generateData = function (n) {
	// n为生成的数量
	let a = []
	for (let k = 1; k < n; k++) {
		a.push(
			{
				"label": `一级 ${k}`,
				"value": generateKey(),
				"level": 1,
				"children": [{
					"label": `二级 ${k}-1`,
					"value": +`${generateKey()}1`,
					"level": 2,
					"children": [{
						"label": `三级 ${k}-1-1`,
						"value": +`${generateKey()}11`,
						"level": 3
					}]
				}]
			}
		)
	}
	return a
}

export { generateData }
