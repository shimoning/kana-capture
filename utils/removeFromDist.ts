import * as fs from 'fs'
import * as path from 'path'

const deletePaths = [
  'demo',
  'favicon.svg',
]
const distDir = path.join(__dirname, '../dist')

const removeFromDist = () => {
  console.time('🕒 Removed from dist')
  if (!fs.existsSync(distDir)) {
    return
  }

  // 削除対象ループ
  deletePaths.forEach((removePath) => {
    const target = path.join(distDir, removePath)
    if (!fs.existsSync(target)) {
      return
    }
    // 削除
    fs.rm(target, { recursive: true }, (err) => {
      if (err) {
        console.log(err)
      } else {
        console.log(`🗑️ Deleted ${target}`)
      }
    })
  })
  console.timeEnd('🕒 Removed from dist')
}
removeFromDist()
